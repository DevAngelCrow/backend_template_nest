export interface menu {
  active: boolean;
  description: string;
  icon: string;
  name: string;
  order: number;
  parent: menu | null;
  required_auth: boolean;
  show: boolean;
  title: string;
  uri: string;
  permissions: permission[];
  children: child[];
  id: number;
}
export interface permission {
  id: number;
  name: string;
  description: string;
  id_category_permission: number;
  active: boolean;
}

export interface child {
  active: boolean;
  description: string;
  icon: string;
  name: string;
  order: number;
  id_parent: number | null;
  required_auth: boolean;
  show: boolean;
  title: string;
  uri: string;
  children: child[];
  id: number;
}
