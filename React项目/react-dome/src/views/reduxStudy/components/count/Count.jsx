import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as countActions from '../../../../store/actions/countNumber';

function Count(props) {
  // console.log(props);
  return (
    <div>
      <div>{props.value}</div>
      <button onClick={() => props.countActions.addNumber(20)}>增加</button>
      <button onClick={() => props.countActions.reduceNumber(20)}>减少</button>
    </div>
  );
}

const mapStateToProps = (state) => {
  // console.log(state);
  return {
    value: state.Number,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    countActions: bindActionCreators(countActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Count);
