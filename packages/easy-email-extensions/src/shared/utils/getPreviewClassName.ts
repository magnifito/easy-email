import { classnames } from '@puralex/easy-email-core';
import { getNodeIdxClassName, getNodeTypeClassName } from '@puralex/easy-email-core';

export function getPreviewClassName(idx: string | null, type: string) {
  return classnames('email-block',
    idx && getNodeIdxClassName(idx),
    getNodeTypeClassName(type));
}
