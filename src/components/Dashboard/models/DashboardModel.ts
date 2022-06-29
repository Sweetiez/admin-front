import CharItemModel from './CharItemModel';
import MinimalOrderModel from './MinimalOrderModel';
import DashboardInformationsModel from './DashboardInformationsModel';
import DashboardSaleModel from './DashboardSaleModel';

export default class DashboardModel {
  salesChart: CharItemModel[] | undefined;
  tenFirstOrders: MinimalOrderModel[] | undefined;
  informations: DashboardInformationsModel | undefined;
  topSales: DashboardSaleModel[] | undefined;
}
