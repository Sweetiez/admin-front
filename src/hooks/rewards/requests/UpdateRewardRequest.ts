export default class UpdateRewardRequest {
  id: string;
  rewardName: string;
  cost: number;
  productId: string;
  productType: string;
  state: string;

  constructor(
    id: string,
    rewardName: string,
    cost: number,
    productId: string,
    productType: string,
    state: string,
  ) {
    this.id = id;
    this.rewardName = rewardName;
    this.cost = cost;
    this.productId = productId;
    this.productType = productType;
    this.state = state;
  }
}
