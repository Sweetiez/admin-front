import SweetTrayModel from './SweetTrayModel';

export default class TrayModel {
  id: string | undefined;
  name: string | undefined;
  price: number | undefined;
  state: string | undefined;
  description: string | undefined;
  sweets: SweetTrayModel[] | undefined;
  images: string[] | undefined;
  highlight: string | undefined;
  flavor: string | undefined;
  rating: number | undefined;
}
