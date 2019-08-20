export class Menu {
  id: string;
  title: string;
  isOpen?: boolean;
  isHidden?: boolean;
  isNoCache?: boolean;
  icon?: string;
  navUrl?: string;
  children?: Menu[];
  auth?: string;
  extPermission?: string[];
}
