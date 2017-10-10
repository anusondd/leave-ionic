import { Employees } from './Employees';
import { Authorities } from './Authorities';

export class Usermanagement {
    id: number;
    username: string;
    password: string;
    enabled: boolean;
    effectiveDate: Date;
    employeeObjectemployeeId: Employees;
    authorities: Authorities[];
    userType: string;
}