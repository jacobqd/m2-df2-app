import {Component, OnInit, Input} from '@angular/core';
import {Router} from '@angular/router';
import {ModalController} from "@ionic/angular";
import {NavParams} from '@ionic/angular';

@Component({
  selector: 'app-modal-update',
  templateUrl: 'modal-update.page.html',
  styleUrls: ['modal-update.page.scss']
})

export class ModalUpdatePage implements OnInit {
  @Input() title: string;
  @Input() remoteVersion: string;
  @Input() upgradeContent: string;
  @Input() event;

  progressNum = null;

  constructor(public router: Router,
              private modalCtrl: ModalController,
              private navParams: NavParams) {
    console.log('navParams', navParams);
    console.log('navParams event', navParams.get('event'));
  }

  ngOnInit() {
    setTimeout((() => {
      this.init();
    }));

  }

  enterFun() {
    this.progressNum = 0;
    this.event.next({
      name: "enter"
    });
  }


  cancelFun() {
    this.event.next({
      name: "cancel"
    });
    this.dismiss();
  }

  init() {
    console.log('this.event', this.event);
    this.event.subscribe(event => {
      console.log('modalEvent', event);
      if (event.name === 'updateProgress') {
        this.progressNum = event.data;

        if (this.progressNum === 100) {
          this.dismiss();
        }
      }
    });
  }


  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }
}
