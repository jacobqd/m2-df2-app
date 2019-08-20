import {Component, OnInit} from '@angular/core';
import {UserProvider} from '../../../core/services/user/user';
import {ToastController} from '@ionic/angular';
import {AuthService} from '../../../core/services/auth/auth-service';
import {Router} from '@angular/router';
import {M2Toast} from '../../../layout/setting/m2.toast';

@Component({
    selector: 'm2-login1',
    templateUrl: './login1.page.html',
    styleUrls: ['./login1.page.scss'],
})
export class Login1Page implements OnInit {
    backgrounds = [
        'assets/imgs/background/background-1.jpg',
        'assets/imgs/background/background-2.jpg',
        'assets/imgs/background/background-4.jpg'
    ];

    options = {
        speed: 400,
        effect : 'fade',
        fade: {
            crossFade: false,
        },
        loop: true,
        autoplay: true};

    userInfo: any = {};
    account = {
        username: "1015",
        password: "his123",
        remember: false
    };

    constructor(private userProvider: UserProvider,
                private m2Toast: M2Toast,
                private router: Router,
                private authService: AuthService) { }

    ngOnInit() {
    }

    doLogin() {
        let redirectUrl = this.authService.redirectUrl;
        if (!redirectUrl) {
            redirectUrl = "";
        }
        this.userProvider.login(this.account).then((rt: boolean) => {
            if (rt) {
                this.router.navigateByUrl(redirectUrl).then();
            } else {
                this.m2Toast.presentDangerToast("登陆失败！");
            }
        }).catch( (err) => {
            this.m2Toast.presentDangerToast(err.error.message);
        });
    }
}
