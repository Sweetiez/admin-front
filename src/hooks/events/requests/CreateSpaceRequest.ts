export default class CreateSpaceRequest {
  address: string;
  city: string;
  zipCode: string;
  places: number;

  constructor(address: string, city: string, zipCode: string, places: number) {
    this.address = address;
    this.city = city;
    this.zipCode = zipCode;
    this.places = places;
  }

  public isValid(): boolean {
    return (
      this.isAddressValid() &&
      this.isCityValid() &&
      this.isZipCodeValid() &&
      this.isPlacesValid()
    );
  }

  private isAddressValid(): boolean {
    return !(this.address.trim() === '');
  }

  private isCityValid(): boolean {
    return !(this.city.trim() === '');
  }

  private isZipCodeValid(): boolean {
    return !(this.zipCode.trim() === '');
  }

  private isPlacesValid(): boolean {
    return this.places > 0;
  }
}
