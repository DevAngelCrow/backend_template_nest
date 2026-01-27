import { DepartmentDto } from '../../../dtos/department.dto';

export class UpdateDepartmentCommand {
  constructor(public readonly department_dto: DepartmentDto) {}
}
