import { get } from './axios';

export const getBoardDetail = async (boardUUID) => {
  return await get(['boards', boardUUID]);
};
