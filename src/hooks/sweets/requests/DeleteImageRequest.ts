export default class DeleteImageRequest {
  imageUrl: string | undefined;

  constructor(imageUrl: string | undefined) {
    this.imageUrl = imageUrl;
  }
}
