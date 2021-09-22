import { INCREASE, REDUCE } from '../actions/actionType';
function Number(state = 0, action) {
  switch (action.type) {
    case INCREASE:
      return state + action.text;
    case REDUCE:
      return state - action.text;
    default:
      return state;
  }
}
export default Number;
