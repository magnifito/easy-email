const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { createRequire } = require('node:module');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
const editorRequire = createRequire(path.join(root, 'packages/easy-email-editor/package.json'));
const ts = editorRequire('typescript');
const lodash = editorRequire('lodash');
const core = editorRequire('@puralex/easy-email-core');

function loadSource(file, mocks, timers) {
  const source = readFileSync(path.join(root, file), 'utf8');
  const compiled = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS },
  }).outputText;
  const context = {
    exports: {},
    console,
    setTimeout: (fn, delay) => timers.push({ fn, delay }),
    require: name => {
      if (!Object.hasOwn(mocks, name)) throw new Error(`Unexpected import: ${name}`);
      return mocks[name];
    },
  };
  vm.runInNewContext(compiled, context, { filename: file });
  return context.exports;
}

function block(label, children = []) {
  return { type: core.BasicType.SECTION, data: { value: { label } }, attributes: {}, children };
}

function setupMove(children) {
  const values = { content: block('page', children), subject: '', subTitle: '' };
  const timers = [];
  let focus;
  const { useBlock } = loadSource('packages/easy-email-editor/src/hooks/useBlock.ts', {
    '@puralex/easy-email-core': core,
    lodash,
    react: { useCallback: fn => fn, useContext: () => ({}) },
    './useEditorContext': { useEditorContext: () => ({
      formState: { values },
      formHelpers: { getState: () => ({ values }), change: (idx, value) => lodash.set(values, idx, value) },
    }) },
    '@/components/Provider/RecordProvider': { RecordContext: {} },
    './useFocusIdx': { useFocusIdx: () => ({ focusIdx: 'content', setFocusIdx: idx => { focus = idx; } }) },
    './useEditorProps': { useEditorProps: () => ({ autoComplete: false }) },
    '@/utils': { scrollBlockEleIntoView: () => {} },
  }, timers);
  const hook = useBlock();
  return { values, hook, flush: () => timers.forEach(timer => timer.fn()), focus: () => focus };
}

for (const [name, from, to, options, expected, focusIndex] of [
  ['move down', 0, 1, undefined, ['B', 'A', 'C'], 1],
  ['move up', 2, 1, undefined, ['A', 'C', 'B'], 1],
  ['drag before later sibling', 0, 2, { destinationIsInsertion: true }, ['B', 'A', 'C'], 1],
  ['drag immediately after itself', 0, 1, { destinationIsInsertion: true }, ['A', 'B', 'C'], 0],
  ['drag to end', 0, 3, { destinationIsInsertion: true }, ['B', 'C', 'A'], 2],
  ['drag upward', 2, 0, { destinationIsInsertion: true }, ['C', 'A', 'B'], 0],
]) {
  test(name, () => {
    const state = setupMove(['A', 'B', 'C'].map(label => block(label)));
    state.hook.moveBlock(core.getChildIdx('content', from), core.getChildIdx('content', to), options);
    state.flush();
    assert.deepEqual(state.values.content.children.map(item => item.data.value.label), expected);
    assert.equal(state.focus(), core.getChildIdx('content', focusIndex));
  });
}

test('drag between parents keeps the destination index', () => {
  const state = setupMove([block('left', [block('A')]), block('right', [block('B')])]);
  const left = core.getChildIdx('content', 0);
  const right = core.getChildIdx('content', 1);
  state.hook.moveBlock(core.getChildIdx(left, 0), core.getChildIdx(right, 1), { destinationIsInsertion: true });
  state.flush();
  assert.equal(state.values.content.children[0].children.length, 0);
  assert.deepEqual(state.values.content.children[1].children.map(item => item.data.value.label), ['B', 'A']);
  assert.equal(state.focus(), core.getChildIdx(right, 1));
});

for (const present of [true, false]) {
  test(present ? 'scroll selected block without recentering' : 'ignore a removed block when scrolling', () => {
    const timers = [];
    let options;
    let selected;
    const { scrollBlockEleIntoView } = loadSource('packages/easy-email-editor/src/utils/scrollBlockEleIntoView.ts', {
      './getBlockNodeByIdx': { getBlockNodeByIdx: idx => {
        selected = idx;
        return present ? { scrollIntoView: value => { options = value; } } : null;
      } },
    }, timers);
    scrollBlockEleIntoView({ idx: 'content.children.[1]' });
    assert.equal(selected, undefined);
    assert.equal(timers[0].delay, 50);
    timers[0].fn();
    assert.equal(selected, 'content.children.[1]');
    assert.equal(options?.block, present ? 'nearest' : undefined);
    assert.equal(options?.behavior, present ? 'auto' : undefined);
  });
}
