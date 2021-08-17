import { get, patch, post, put } from './axios';

export const getBoard = async (boardUUID) => {
  return await get(['boards', boardUUID]);
};

export const switchCanvas = async (boardUUID, index) => {
  return await put(['boards', 'canvas', boardUUID], { currentCanvas: index });
};

export const updateBoard = async (boardUUID, params) => {
  return await patch(['boards', boardUUID], params);
};

export const createFigure = async (params) => {
  return await post(['boards', 'figure'], params);
};
