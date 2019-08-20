import { Pipe, PipeTransform } from '@angular/core';
/*
 *
*/
@Pipe({name: 'filterString'})
export class FilterStrPipe implements PipeTransform {
  constructor( ) {}
  transform(value: string, filter: string): string {
    if (value) {
      value = value.replace(filter, "");
    }
   return value;
  }
}
