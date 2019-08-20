import {Injectable} from "@angular/core";
import {SettingsService} from "./setting.service";
import {AppData} from "../../../df-ext/app-data";

@Injectable({
  providedIn: 'root',
})
export class StartupService {
  private _ready: Promise<any>;
  constructor(private settingService: SettingsService) {
    this._ready = new Promise((resolve, reject) => {
      this.settingService.setApp(AppData.app);
      resolve("startup is ready!");
    });
  }
  ready(): Promise<any> {
    return this._ready;
  }
}
