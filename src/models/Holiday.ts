import { ParameterTableDetail } from "./parameter-table-detail-model";

export class Holiday {   
    
    holidayId:number;
    holidayDate:Date;
    referenceHoliday:ParameterTableDetail;
    description:string;
    activeFlag:boolean;
}