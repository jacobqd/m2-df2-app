import {CurrencyPipe} from "@angular/common";
import {Pipe} from "@angular/core";
@Pipe({ name: 'cnCurrency' })
export class CNCurrencyPipe extends CurrencyPipe {
  transform(
    // tslint:disable-next-line:no-any
    value: any,
    currencyCode: string = '￥',
    display: 'code' | 'symbol' | 'symbol-narrow' | boolean = 'code',
    digits?: string,
  ): string | null {
    // tslint:disable-next-line:no-any
    return super.transform(value, currencyCode, display as any, digits);
  }
}
