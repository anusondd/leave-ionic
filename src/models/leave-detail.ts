import { Employees } from "./Employees";
import { LeaveType } from "./leave-type";


export class LeaveDetail {
    leaveDetailId: number;
    leaveType: LeaveType[];
    employee: Employees[];
    dateStart: Date;
    dateEnd: Date;
    timeStartFlag: string;
    timeEndFlag: string;
    description: string;
    pathFile: string;
    dateOfLeave: number;
}