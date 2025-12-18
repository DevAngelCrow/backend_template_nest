export interface Menu {
  active: boolean;
  description: string;
  icon: string;
  name: string;
  order: number;
  parent: Menu | null;
  required_auth: boolean;
  show: boolean;
  title: string;
  uri: string;
  permissions: Permission[];
  children: Child[];
  id: number;
}
export interface Permission {
  id: number;
  name: string;
  description: string;
  id_category_permission: number;
  active: boolean;
}

export interface Child {
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
  children: Child[];
  id: number;
}
