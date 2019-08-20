export class AppListModel {
  name: string;
  icon?: string; // 仅支持阿里巴巴图标的icon名称
  component: any;
  color?: string;
  mode?: string; // 默认modal，可以选择drawer
  width?: string; // 控制drawer拉开宽度
}
