export const SET_IMAGE = 'SET_IMAGE'
export const SAVE_IMAGE = 'SAVE_IMAGE'

export const addImage = (image: string) => ({type: SET_IMAGE, image})
export const saveImage = () => ({type: SAVE_IMAGE})