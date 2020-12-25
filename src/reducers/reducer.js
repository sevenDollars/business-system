import { RECOMMEND_REQUEST, RECOMMEND_SUCCESS, RECOMMEND_ERROR } from '../constants/actionTypes';
import initialState from './initialState';

export default (state = initialState, action) => {
  switch (action.type) {
    case RECOMMEND_REQUEST:
      return state;
    case RECOMMEND_SUCCESS:
    case RECOMMEND_ERROR:
      // return Object.assign({}, state, {
      //   list: list,
      //   isEnd: action.data && action.data.data.length === 0,
      // });
      return state;
    default:
      return state;
  }
};
