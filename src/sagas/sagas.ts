import { takeLatest } from "redux-saga/effects";

function* saveImage() {
  console.log("SAVE_IMAGE saga called");
}

function* saveImageSaga() {
  yield takeLatest("SAVE_IMAGE", saveImage);
}

export default saveImageSaga;
