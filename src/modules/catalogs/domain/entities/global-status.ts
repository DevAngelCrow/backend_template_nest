import { GlobalStatusActive } from '../value-objects/goblal-status-value-object/global-status-active';
import { GlobalStatusDescription } from '../value-objects/goblal-status-value-object/global-status-description';
import { GlobalStatusId } from '../value-objects/goblal-status-value-object/global-status-id';
import { GlobalStatusName } from '../value-objects/goblal-status-value-object/global-status-name';
import { GlobalStatusTableHeader } from '../value-objects/goblal-status-value-object/global-status-table-header';

export class GlobalStatus {
  constructor(
    private readonly name: GlobalStatusName,
    private readonly description: GlobalStatusDescription,
    private readonly table_header: GlobalStatusTableHeader,
    private readonly active: GlobalStatusActive,
    private readonly id?: GlobalStatusId,
  ) {}
  public getId(): GlobalStatusId | undefined {
    return this.id;
  }
  public getName(): GlobalStatusName {
    return this.name;
  }
  public getDescription(): GlobalStatusDescription {
    return this.description;
  }
  public getTableHeader(): GlobalStatusTableHeader {
    return this.table_header;
  }
  public getActive(): GlobalStatusActive {
    return this.active;
  }
}
