import { AnyAction } from '@reduxjs/toolkit';

export const isRequestAction = (name: string, action: AnyAction) => {
  return action.type.startsWith(name) && action.type.endsWith('REQUEST');
};

export const isFullfillAction = (name: string, action: AnyAction) => {
  return action.type.startsWith(name) && action.type.endsWith('FULFILL');
};
