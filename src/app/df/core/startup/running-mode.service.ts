import {Injectable} from "@angular/core";

/**
 * 运行模式类，主要是辅助于判断页面在那种终端打开，便于自动调整页面高度偏移量，与left-right的布局指定是共同作用。
 * left-right、top-leftRight主要表述当前应用编译时采用那种布局方式，需要自动计算高端偏移量
 * 运行模式pc和noFrame，主要是运行时判断页面的外层包裹方式，比如top-leftRight编译模式下的页面同样可以在钉钉中打开，那么高度需要一个偏移量
 */
@Injectable({ providedIn: 'root' })
export class RunningModeService {
  private _mode = "frame";
  getMode(): string {
    return this._mode;
  }
  setMode(value: string) {
    this._mode = value;
  }
  constructor() {}
}
