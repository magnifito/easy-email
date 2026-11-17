import { getBlockNodeByIdx } from './getBlockNodeByIdx';

export function scrollBlockEleIntoView({ idx }: { idx: string }) {
  setTimeout(() => {
    const editBlock = getBlockNodeByIdx(idx);
    editBlock?.scrollIntoView({
      block: 'nearest',
      behavior: 'auto',
    });
  }, 50);
}
