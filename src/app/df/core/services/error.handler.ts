import {ErrorHandler, Injectable} from '@angular/core';
import {M2Toast} from '../../layout/setting/m2.toast';
@Injectable({
    providedIn: 'root'
})
export class M2ErrorHandler implements ErrorHandler {
    constructor(private m2Toast: M2Toast) {}
    handleError(error) {
        // do something with the exception
        this.m2Toast.presentToast("App运行发生错误！").then();
        console.log(error);
    }
}
