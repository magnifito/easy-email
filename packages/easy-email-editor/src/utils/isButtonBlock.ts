import { BasicType, AdvancedType } from '@puralex/easy-email-core';

export function isButtonBlock(blockType: any) {
  return blockType === BasicType.BUTTON || blockType === AdvancedType.BUTTON;
}