import { ParameterTableDetail } from './parameter-table-detail-model';
import { ApproveLevel } from './ApproveLevel';
export class ApproveType{
    approveTypeId: number;
    approveTypeName: string;
    departmentCode: ParameterTableDetail;
    activeFlag: boolean;
    approveLevels: ApproveLevel[];
    approveTypedDpartment: string;
    approveLevelDetail: string;
}