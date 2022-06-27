export default class PublishTrayRequest {
  id: string | undefined;
  highlight: string | undefined;

  constructor(id: string | undefined, highlight: string | undefined) {
    this.id = id;
    this.highlight = highlight;
  }
}
