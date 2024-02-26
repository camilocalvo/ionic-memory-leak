export interface ImageState {
    imageToUpload: string | null
    images: Array<string>
}

export const initialState: ImageState = {
    imageToUpload: null,
    images: []
}