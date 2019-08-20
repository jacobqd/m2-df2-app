import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'm2-error',
  templateUrl: './error.page.html',
  styleUrls: ['./error.page.scss'],
})
export class ErrorPage implements OnInit {

  errorMsg: string;
  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe( param => {
      this.errorMsg = param.get("errorMsg");
    });
    this.errorMsg = this.errorMsg ? this.errorMsg : "抱歉，App遇到问题，无法响应您的要求！";
  }

}
