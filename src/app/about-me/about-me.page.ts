import { Component, OnInit } from '@angular/core';
import {Storage} from "@ionic/storage";
import {UserProvider} from '../df/core/services/user/user';
import {Router} from '@angular/router';


@Component({
  selector: 'm2-about-me',
  templateUrl: './about-me.page.html',
  styleUrls: ['./about-me.page.scss'],
})
export class AboutMePage implements OnInit {
  driver: string;
  constructor(private userProvider: UserProvider,
              private router: Router,
              private storage: Storage) { }

  ngOnInit() {
    this.showStorageDriver();
  }

  openRemote() {

  }

  showStorageDriver() {
    this.driver = this.storage.driver;
  }

  logout() {
    this.userProvider.logout().then( () => {
      this.router.navigateByUrl("").then(() => {});
    });
  }
}
