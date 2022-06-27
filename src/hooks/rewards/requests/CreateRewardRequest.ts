export default class CreateRewardRequest {
  rewardName: string;
  cost: number;
  productId: string;
  productType: string;

  constructor(
    rewardName: string,
    cost: number,
    productId: string,
    productType: string,
  ) {
    this.rewardName = rewardName;
    this.cost = cost;
    this.productId = productId;
    this.productType = productType;
  }
}
