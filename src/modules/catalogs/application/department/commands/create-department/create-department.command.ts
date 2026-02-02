import { DepartmentDto } from '../../../dtos/department.dto';

export class CreateDepartmentCommand {
  constructor(public readonly department_dto: DepartmentDto) {}
}
