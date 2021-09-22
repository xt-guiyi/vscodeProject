import * as constType from './actionType';

// 计数action
export const addNumber = (text = 1) => {
  return {
    type: constType.INCREASE,
    text: text,
  };
};

export const reduceNumber = (text = 1) => {
  return {
    type: constType.REDUCE,
    text: text,
  };
};
