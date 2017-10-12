import { ParameterTableDetail } from "./parameter-table-detail-model";

export class Employees {

    employeeStartDate: Date;
    employeeResignDate: Date;
    employeeId: number;
    employeeCode: string;
    employeeFirstName: string;
    employeeLastName: string;
    emailAddress: string;
    employeeTelNo: string;
    activeFlag: boolean;
    employeeFullName: string;
    employeePrefixFullName: string;
    probationFlag: string;
    workStatusText: string;
    workingAge: string;
    employeePrefix: ParameterTableDetail;
    employeePosition: ParameterTableDetail;
    employeeDepartment: ParameterTableDetail;
    causeOfResign: ParameterTableDetail;
    causeOfProbationFail: string;
}