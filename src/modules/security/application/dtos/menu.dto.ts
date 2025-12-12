import { Menu } from '../../domain/entities/menu';

export class MenuDto<T> {
  constructor(
    public readonly active: boolean,
    public readonly children: T[],
    public readonly permissions: number[],
    public readonly decription: string,
    public readonly icon: string,
    public readonly name: string,
    public readonly order: number,
    public readonly parent: T,
    public readonly required_auth: boolean,
    public readonly show: boolean,
    public readonly title: string,
    public readonly uri: string,
    public readonly id?: number,
  ) {}
  public static fromEntity<T>(menu: Menu<T>): MenuDto<T> {
    const permissions = menu
      .getPermissions()
      .map((permission) => permission.value());
    const children = menu.getChildren().map((child) => child.value());
    return new MenuDto(
      menu.getActive().value(),
      children,
      permissions,
      menu.getDescription().value(),
      menu.getIcon().value(),
      menu.getName().value(),
      menu.getOrder().value(),
      menu.getParent().value(),
      menu.getRequiredAuth().value(),
      menu.getShow().value(),
      menu.getTitle().value(),
      menu.getUri().value(),
      menu.getId() ? menu.getId()?.value() : undefined,
    );
  }
}
