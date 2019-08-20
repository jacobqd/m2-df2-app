import { Pipe, PipeTransform } from '@angular/core';
import {SysDictCacheServcie} from '../../../core/services/data-cache/dict-cache.service';
/*
 *
*/
@Pipe({name: 'sysDictMultiple'})
export class SysDictMultiplePipe implements PipeTransform {
  constructor(private sysDictFindService: SysDictCacheServcie ) {}
  transform(value: string, param: string): string {
    if (!value) {
      return "";
    }
    const dictType = param[0] ? param[0] : "";
    const separate = param[1] ? param[1] : ",";
    const valueList = value.split(separate);
    let retureValue = "";
    for (let i = 0; i < valueList.length; i++) {
      retureValue = retureValue + this.sysDictFindService.getSysDictByTypeAndValue(dictType, valueList[i]) + separate;
    }
    retureValue = retureValue.substr(0, retureValue.length - 1);
   return retureValue;
  }
}
