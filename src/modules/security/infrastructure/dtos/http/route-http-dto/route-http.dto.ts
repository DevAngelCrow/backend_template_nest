import { Route } from '@/modules/security/domain/entities/route';

export class RouteHttpDto {
  constructor(
    public readonly name: string,
    public readonly description: string,
    public readonly icon: string,
    public readonly uri: string,
    public readonly active: boolean,
    public readonly show: boolean,
    public readonly order: number,
    public readonly id?: number,
    public readonly title?: string,
  ) {}
  public static fromEntity(route: Route): RouteHttpDto {
    return new RouteHttpDto(
      route.getName().value(),
      route.getDescription().value(),
      route.getIcon().value(),
      route.getUri().value(),
      route.getActive().value(),
      route.getShow().value(),
      route.getOrder().value(),
      route.getId() ? route.getId()?.value() : undefined,
      route.getTitle() ? route.getTitle()?.value() : undefined,
    );
  }
}
