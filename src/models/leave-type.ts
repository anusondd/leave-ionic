
import { WorkingPeriodType } from "./working-period-type";

export class LeaveType {
    leaveTypeId: number;
    leaveTypeName: string;
    probationFlag: boolean;
    countWorkingFlag: boolean;
    holidayFlag: boolean;
    effectiveDate: Date;
    activeFlag: boolean;
    leaveDay: number;
    leaveCondition: string;
    workingPeriodTypes :WorkingPeriodType[];
    maxLeaveDay:string;
}