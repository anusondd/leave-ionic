export class TableColumnOptions{
    field               :string;
    hidden              :boolean = false;
    header              :string;
    sortable            :boolean;
    filter              :boolean;
    filterPlaceholder   :string  = "คำค้นหา";
    style               :{}      = "";
    styleClass          :string  = "";
    template            :any;

    constructor(
        field   :string,
        header  :string,
        sortable:boolean,
        filter  :boolean){
            this.field    = field   ;     
            this.header   = header  ;    
            this.sortable = sortable;   
            this.filter   = filter  ;  

    }

}