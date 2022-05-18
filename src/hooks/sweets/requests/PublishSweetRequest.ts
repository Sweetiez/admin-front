export default class PublishSweetRequest {
    id: string | undefined;
    highlight: string | undefined;

    constructor(id: string | undefined, highlight: string | undefined) {
        this.id = id;
        this.highlight = highlight;
    }
}