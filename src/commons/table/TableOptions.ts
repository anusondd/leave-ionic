import { LazyLoadEventRequestWithObject } from './../../models/LazyLoadEventRequestWithObject';
import { TableColumnOptions } from './TableColumnOptions';

export class TableOptions<T> {
    path                :string;
    postData            :{};
    postDataList        :any[];
    lazyLoadEvents      :LazyLoadEventRequestWithObject;

    tableName           :string;
    dataKey             :string;
    selectionMode       :string     = "single";
    onRowSelect         :Function   = function onRowSelect(){};
    rows                :number     = 10;
    paginator           :boolean    = true;
    pageLinks           :number     = 5;
    rowsPerPageOptions  :number[]   = [5,10,20,50,100];
    tableColumnOptions  :TableColumnOptions[]
    selectedObject :T;

    dataList            :T[]      = [];
    totalRecords        :number     = 0;
    onLazyLoad          :Function   = function onRowSelect(){};

    constructor(
        tableName           :string,
        path                :string,
        postData            :{},
        dataKey             :string,
        tableColumnOptions  :TableColumnOptions[]
    ){
        this.path               = path              ;
        this.postData           = postData          ;
        this.tableName          = tableName         ;
        this.dataKey            = dataKey           ;
        this.tableColumnOptions = tableColumnOptions;
    }
}
