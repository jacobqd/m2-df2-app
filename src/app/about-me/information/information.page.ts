import {Component, Inject, OnInit} from '@angular/core';
import {UserProvider} from '../../df/core/services/user/user';
import {AuthService} from '../../df/core/services/auth/auth-service';
import {User} from '../../df/models/system/user';
import {M2_DEVICE_INFO_PROVIDER} from '../../df/core/tokens/m2.tokens';
import {DeviceInfoInterface} from '../../df/core/app-error/interface/device-info.interface';
import {PlatFormInfo} from '../../df/core/app-error/models/plat_form_info';
import * as dayJs from 'dayjs';

export interface AppTimerInfo {
  index?: string ; appModule?: string; appComponent?: string; homeComponent?: string; splashScreen?: string;
}

@Component({
  selector: 'm2-information',
  templateUrl: './information.page.html',
  styleUrls: ['./information.page.scss'],
})
export class InformationPage implements OnInit {

  user: User;
  platformInfo: PlatFormInfo;
  appTimer: AppTimerInfo;

  constructor(private userProvider: UserProvider,
              private authService: AuthService,
              @Inject(M2_DEVICE_INFO_PROVIDER)  private deviceInfoInterface: DeviceInfoInterface) { }

  ngOnInit() {
    this.deviceInfoInterface.ready().then(item => {this.platformInfo = item; });
    this.authService.getAyscUser().subscribe(  user => this.user = user);
    this.appTimer = {};
    this.appTimer.index = dayJs(window.localStorage.getItem("index")).format( "HH:mm:ss SSS");
    this.appTimer.appModule = dayJs(window.localStorage.getItem("appModule")).format( "HH:mm:ss SSS");
    this.appTimer.appComponent = dayJs(window.localStorage.getItem("appComponent")).format( "HH:mm:ss SSS");
    this.appTimer.homeComponent = dayJs(window.localStorage.getItem("homeComponent")).format( "HH:mm:ss SSS");
    this.appTimer.splashScreen = dayJs(window.localStorage.getItem("splashScreen")).format( "HH:mm:ss SSS");
  }

}
