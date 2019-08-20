import { Pipe, PipeTransform } from '@angular/core';
import {SysDictCacheServcie} from '../../../core/services/data-cache/dict-cache.service';
/*
 *
*/
@Pipe({name: 'sysDict'})
export class SysDictPipe implements PipeTransform {
  constructor(private sysDictFindService: SysDictCacheServcie ) {}
  transform(value: string, dictType: string): string {
   return this.sysDictFindService.getSysDictByTypeAndValue(dictType, value);
  }
}
