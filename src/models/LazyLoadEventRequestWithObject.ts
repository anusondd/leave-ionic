import { LazyLoadEvent } from 'primeng/primeng';
export class LazyLoadEventRequestWithObject{

    public loadLazyEvent : LazyLoadEvent;
    public objectList : any[];
    public object:any;
    
    constructor(
         loadLazyEvent : LazyLoadEvent,
         object:any,
         objectList : any[]
    ){
        this.loadLazyEvent = loadLazyEvent;
        this.object = object;
        this.objectList = objectList;
    }

}