import { GlobalStatus } from '../../domain/entities/global-status';

export class GlobalStatusDto {
  constructor(
    public readonly name: string,
    public readonly description: string,
    public readonly table_header: string,
    public readonly active: boolean,
    public readonly id?: number,
  ) {}
  public static fromEntity(globalStatus: GlobalStatus): GlobalStatusDto {
    return new GlobalStatusDto(
      globalStatus.getName().value(),
      globalStatus.getDescription().value(),
      globalStatus.getTableHeader().value(),
      globalStatus.getActive().value(),
      globalStatus.getId() ? globalStatus.getId()!.value() : undefined,
    );
  }
}
