import { Pipe, PipeTransform } from '@angular/core';
import {OrgCacheService} from '../../../core/services/data-cache/org-cache.service';
/*
 *
*/
@Pipe({name: 'org'})
export class OrgPipe implements PipeTransform {
  constructor(private orgFindService: OrgCacheService ) {}
  transform(value: string): string {
   return this.orgFindService.getOrgNameById(value);
  }
}
