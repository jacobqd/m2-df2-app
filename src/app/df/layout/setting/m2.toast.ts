import {Injectable} from '@angular/core';
import {ModalController, ToastController} from '@ionic/angular';
import {ModalUpdatePage} from '../../common/components/modal-update/modal-update.page';

@Injectable({
    providedIn: 'root',
})
export class M2Toast {
    constructor(private toastController: ToastController,
                private modalController: ModalController) {}
    async presentToast(message: string) {
        const toast = await this.toastController.create({
            message: message,
            duration: 3000,
            position: 'top',
            animated: true,
            color: 'light'
        });
        toast.present();
    }
    async presentSuccessToast(message: string) {
        const toast = await this.toastController.create({
            // header: '成功',
            message: message,
            position: 'top',
            cssClass: "success", // 使用场景下的css 关键字：success，info，warning，danger
            duration: 3000, // 建议5秒
            buttons: [
                {
                    side: 'start',
                    icon: 'checkmark-circle', // 配置显示图标 配合场景使用 success：checkmark-circle，info：information-circle，warning：alert，danger：close-circle
                }
            ]
        });
        toast.present();
    }
    async presentInfoToast(message: string) {
        const toast = await this.toastController.create({
            // header: '成功',
            message: message,
            position: 'top',
            cssClass: "info", // 使用场景下的css 关键字：success，info，warning，danger
            duration: 3000, // 建议5秒
            buttons: [
                {
                    side: 'start',
                    icon: 'information-circle', // 配置显示图标 配合场景使用 success：checkmark-circle，info：information-circle，warning：alert，danger：close-circle
                }
            ]
        });
        toast.present();
    }
    async presentWarningToast(message: string) {
        const toast = await this.toastController.create({
            // header: '成功',
            message: message,
            position: 'top',
            cssClass: "warning", // 使用场景下的css 关键字：success，info，warning，danger
            duration: 3000, // 建议5秒
            buttons: [
                {
                    side: 'start',
                    icon: 'alert', // 配置显示图标 配合场景使用 success：checkmark-circle，info：information-circle，warning：alert，danger：close-circle
                }
            ]
        });
        toast.present();
    }
    async presentDangerToast(message: string) {
        const toast = await this.toastController.create({
            // header: '成功',
            message: message,
            position: 'top',
            cssClass: "danger", // 使用场景下的css 关键字：success，info，warning，danger
            buttons: [
                {
                    side: 'start',
                    icon: 'close-circle', // 配置显示图标 配合场景使用 success：checkmark-circle，info：information-circle，warning：alert，danger：close-circle
                }, {
                    // 这个是关闭按钮 不使用倒计时可以用（danger场景建议使用）
                    icon: 'close',
                    role: 'cancel',
                    handler: () => {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });
        toast.present();
    }

    // modal
    async presentModal(configObj) {
        let config = {
            component: ModalUpdatePage,
            // showBackdrop: true,
            // backdropDismiss: true
        };

        config = configObj ? Object.assign(config, configObj) : config;

        const modal = await this.modalController.create(config);
        return await modal.present();
    }
}
