import {AfterViewInit, Component, OnInit} from '@angular/core';
import {NgLog} from '../df/core/advanced/m2-decorator';

@Component({
  selector: 'm2-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})

@NgLog()
export class HomePage implements OnInit, AfterViewInit {

  constructor() {      }

  ngOnInit() {
  }
  ngAfterViewInit(): void {
    window.localStorage.setItem("homeComponent" , new Date().toISOString());
  }

}
