using { com.solarc as db } from '../db/data-model';

service CatalogService@(path:'/SupplierOrders')
    {

    entity SupplierOrders as projection on db.SupplierOrder
    }