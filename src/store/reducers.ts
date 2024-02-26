import {combineReducers} from 'redux'
import { SET_IMAGE } from './actions';
import { ImageState, initialState } from './types';

const imageStateReducer = (state: ImageState = initialState, action: any) => {
    switch (action.type) {
      case SET_IMAGE:
        return { ...state, imageToUpload: action.image };
      default:
        return state;
    }
  };
  

export default combineReducers({
    imageStateReducer
})