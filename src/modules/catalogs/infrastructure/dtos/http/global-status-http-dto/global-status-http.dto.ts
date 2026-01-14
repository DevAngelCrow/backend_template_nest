import { GlobalStatus } from 'src/modules/catalogs/domain/entities/global-status';

export class GlobalStatusHttpDto {
  constructor(
    public readonly name: string,
    public readonly description: string,
    public readonly table_header: string,
    public readonly active: boolean,
    public readonly id?: number,
  ) {}
  public static fromEntity(globalStatus: GlobalStatus): GlobalStatusHttpDto {
    return new GlobalStatusHttpDto(
      globalStatus.getName().value(),
      globalStatus.getDescription().value(),
      globalStatus.getTableHeader().value(),
      globalStatus.getActive().value(),
      globalStatus.getId() ? globalStatus.getId()?.value() : undefined,
    );
  }
}
