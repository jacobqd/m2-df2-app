// https://angular.io/guide/styleguide#style-04-12
export function throwIfAlreadyLoaded(parentModule: any, moduleName: string) {
  if (parentModule) {
    throw new Error(`${moduleName} 已经被加载. Import ${moduleName} in the AppModule only.`);
  }
}
