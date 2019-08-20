import {Injectable} from "@angular/core";
import {Title} from "@angular/platform-browser";



@Injectable({ providedIn: 'root' })
export class SettingsService {
  private _app: any = null;

  get app() {
    return this._app;
  }
  constructor(private title: Title) {}
  setApp(value: any) {
    this._app = value;
    this.title.setTitle(value.name);
    return true;
  }
  setTitle(value: string) {
    if ( value) {
      this.title.setTitle(this._app.name + "-" + value);
    } else {
      this.title.setTitle(this._app.name);
    }

  }
}
