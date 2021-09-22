import * as constType from './actionType';
import Axios from 'axios';

// 获得用户名action
export const getUser = () => {
  return (dispatch) => {
    dispatch(setPending(true));
    Axios.get('http://123.56.98.236:3000/login/cellphone?', {
      params: {
        phone: 18627242500,
        password: 'xt200145',
      },
    })
      .then((response) => {
        let userData = {
          nickname: response.data.profile.nickname,
          signature: response.data.profile.signature,
        };
        dispatch(setUser(userData));
      })
      .catch((e) => {
        dispatch(setError(true));
      });
  };
};

//成功设置Action
function setUser(user) {
  return {
    type: constType.GET_USER_SUCCESS,
    user,
  };
}

//失败设置Action
function setError(errorInfo) {
  return {
    type: constType.GET_USER_ERROR,
    errorInfo,
  };
}

//设置等待Action
function setPending(pendingInfo) {
  return {
    type: constType.GET_USER_PENDING,
    pendingInfo,
  };
}
