import {
  GET_USER_SUCCESS,
  GET_USER_ERROR,
  GET_USER_PENDING,
} from '../actions/actionType';
// const initState = {
//   user: {},
// };
function User(state = {}, action) {
  switch (action.type) {
    case GET_USER_SUCCESS:
      return {
        userInfo: {
          nickName: action.user.nickname,
          signature: action.user.signature,
        },
        hasSuccess: true,
        HasError: null,
      };
    case GET_USER_ERROR:
      return {
        userInfo: {
          nickName: null,
          signature: null,
        },
        hasSuccess: false,
        hasError: action.errorInfo,
      };
    case GET_USER_PENDING:
      return {
        userInfo: {
          nickName: undefined,
          signature: undefined,
        },
        hasSuccess: null,
        pending: action.pendingInfo,
      };
    default:
      return state;
  }
}
export default User;
