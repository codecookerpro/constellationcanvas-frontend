import { get, patch, put } from './axios';

export const getBoardDetail = async (boardUUID) => {
  return await get(['boards', boardUUID]);
};

export const switchCanvas = async (boardUUID, index) => {
  return await put(['boards', 'canvas', boardUUID], { currentCanvas: index });
};

export const updateBoard = async (boardUUID, params) => {
  return await patch(['boards', boardUUID], params);
};
