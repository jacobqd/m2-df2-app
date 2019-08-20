import {Injectable} from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class ScreenService {
    screenInfo;

    constructor(
    ) {
        this.getScreenInfo();
    }

    getScreenInfo() {
        this.screenInfo = {
            // 屏幕宽高
            screenWidth: window.innerWidth,
            screenHeight: window.innerHeight,

            // 渲染屏幕宽高
            deviceWidth: window.screen.width,
            deviceHeight: window.screen.height,

            // 缩放比例
            devicePixelRatio: window.devicePixelRatio,
        };
    }
}
