import {Pipe, PipeTransform} from "@angular/core";
import {Menu} from "../../../core/services/menu/menu";



@Pipe({ name: 'menuShowFilter' })
export class MenuShowPipe implements PipeTransform {
  transform(menus: Menu[]) {
    // 只返回单层哦，注意哦
    return menus.filter(menu => !menu.isHidden);
  }
}
