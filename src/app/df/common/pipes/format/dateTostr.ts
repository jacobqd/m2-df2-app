import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'DateTostrPipe'})
export class DateTostrPipe implements PipeTransform {
  constructor() {
  }

  transform(value: string): string {
    /*    const _inputdate = new Date(value);
        const _year = '' + _inputdate.getFullYear();
        const _month = String(+_inputdate.getMonth() + 1);
        const _day = String(_inputdate.getDate());

        return _year + '-' + _month + '-' + _day;*/

    // console.log('value', value);

    const _inputdate = new Date(value);
    const _year = '' + _inputdate.getFullYear();
    let _month = String(+_inputdate.getMonth() + 1);
    let _day = String(_inputdate.getDate());

    if (_month.length == 1) {
      _month = '0' + _month;
    }
    if (_day.length == 1) {
      _day = '0' + _day;
    }

    return _year + _month + _day;
  }
}
