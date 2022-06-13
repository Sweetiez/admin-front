export default class StepModel {
  id: string | undefined;
  order: number | undefined;
  description: string | undefined;

  constructor(
    id: string | undefined,
    order: number | undefined,
    description: string | undefined,
  ) {
    this.id = id;
    this.order = order;
    this.description = description;
  }
}
