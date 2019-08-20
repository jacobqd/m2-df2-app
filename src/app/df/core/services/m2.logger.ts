import {Injectable} from "@angular/core";
import {AppData} from "../../../df-ext/app-data";
import {IS_DEBUG} from "../constants";

@Injectable({
  providedIn: 'root'
})
export class M2Logger {
  titleConsole = " text-shadow: 0 1px 0 #ccc,0 2px 0 #c9c9c9,0 3px 0 #bbb,0 4px 0 #b9b9b9," +
    "0 5px 0 #aaa,0 6px 1px rgba(0,0,0,.1),0 0 5px rgba(0,0,0,.1),0 1px 3px rgba(0,0,0,.3),0 3px 5px" +
    " rgba(0,0,0,.2),0 5px 10px rgba(0,0,0,.25),0 10px 10px rgba(0,0,0,.2),0 20px 20px rgba(0,0,0,.15);color: #009688;font-size:2.5em";
  themeConsole = `color: #009688; font-weight: bold`;
  isDebug = IS_DEBUG;
  constructor() {
    if (this.isDebug) {
      console.log(`%c${AppData.app.name}`, this.titleConsole);
    } else {
      console.log(`%c非调试模式，Log输出已关闭!`, this.titleConsole);
    }
  }

  log(message: string) {
    if (this.isDebug) {
      console.log(`%c${message}`, this.themeConsole);
    }
  }
  logObj(obj: any)  {
    if (this.isDebug) {
      console.log("%c%o", this.themeConsole, obj);
    }
  }
  count(message: string) {
    if (this.isDebug) {
      console.count(`${message}`);
    }
  }
}
