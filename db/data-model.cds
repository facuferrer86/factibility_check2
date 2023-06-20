namespace com.solarc;


entity SupplierOrder {
        @title : 'Purchase Order'
        key PurchaseOrderNumber  : String(258);
        @title : 'Business Partner'
        BusinessPartnerName : String(258);
        @title : 'Customer'
        CustomerNumber : Integer;
        @title : 'Transaction Date'
        TransactionDate : Date;
        @title : 'NetAmount'
        NetAmount : String(258);
        @title : 'Currency'
        Currency : String(258);
        @title : 'Description'
        TransactionDescription : String(258);
        @title : 'Status'
        TransactionStatus: String(258);
        @title : 'BlockStatus'
        BlockStatus: Boolean;
    }