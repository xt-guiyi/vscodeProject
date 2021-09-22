import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as userActions from '../../../../store/actions/getUser';

const user = (props) => {
  // console.log(props);
  let data;
  if (props.user.pending) {
    data = '等待中....';
  } else if (props.user.hasSuccess) {
    data = props.user.userInfo.nickName;
  } else if (props.user.hasError) {
    data = '网络开小差咯';
  }
  return (
    <div>
      <h2>User</h2>
      <p>{data}</p>
      {/* <p>{props.user.userInfo.signature}</p>  */}
      <button onClick={() => props.userActions.getUser()}>get</button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.User,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    userActions: bindActionCreators(userActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(user);
