import { BasicType, AdvancedType } from '@puralex/easy-email-core';

export function isTableBlock(blockType: any) {
  return blockType === AdvancedType.TABLE;
}
