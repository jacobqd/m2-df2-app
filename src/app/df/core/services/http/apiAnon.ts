import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {APP_SERVE_URL, REQUEST_TIMEOUT} from "../../constants";
import {timeoutWith} from "rxjs/operators";
import {throwError} from "rxjs";

/**
 * Api is a generic REST Api handler. Set your API url first.
 */
@Injectable({
  providedIn: 'root',
})
export class ApiAnon {
  url: string = APP_SERVE_URL + "/anon";
  constructor(public http: HttpClient) {
  }

  get(endpoint: string, params?: any, reqOpts?: any) {
    if (!reqOpts) {
      reqOpts = {
        params: new HttpParams()
      };
    }

    // Support easy query params for GET requests
    if (params) {
      if (typeof params === "string") {
        reqOpts.params = new HttpParams({fromString: params});
      } else {
        let newP: HttpParams = reqOpts.params;
        for ( const k in params) {
          newP = newP.set(k, params[k]);
        }
        reqOpts.params = newP;
      }

    }
    return this.http.get(this.url + '/' + endpoint, reqOpts)
      .pipe(timeoutWith(REQUEST_TIMEOUT, throwError({ error: "请求超时"})));
  }

  post(endpoint: string, body: any, params?: any, reqOpts?: any) {
    if (!reqOpts) {
      reqOpts = {
        params: new HttpParams()
      };
    }

    // Support easy query params for GET requests
    if (params) {
      if (typeof params === "string") {
        reqOpts.params = new HttpParams({fromString: params});
      } else {
        let newP: HttpParams = reqOpts.params;
        for (const k in params) {
          newP = newP.set(k, params[k]);
        }
        reqOpts.params = newP;
      }

    }
    return this.http.post(this.url + '/' + endpoint, body, reqOpts)
      .pipe(timeoutWith(REQUEST_TIMEOUT, throwError({ error: "请求超时"})));
  }



  put(endpoint: string, body: any, reqOpts?: any) {
    return this.http.put(this.url + '/' + endpoint, body, reqOpts)
      .pipe(timeoutWith(REQUEST_TIMEOUT, throwError({ error: "请求超时"})));
  }

  delete(endpoint: string, reqOpts?: any) {
    return this.http.delete(this.url + '/' + endpoint, reqOpts)
      .pipe(timeoutWith(REQUEST_TIMEOUT, throwError({ error: "请求超时"})));
  }

  patch(endpoint: string, body: any, reqOpts?: any) {
    return this.http.put(this.url + '/' + endpoint, body, reqOpts);
  }

  exportExcel(endpoint: string, body: any, params?: any, reqOpts?: any) {
    if (!reqOpts) {
      reqOpts = {
        params: new HttpParams(),
        responseType: "blob"
      };
    }

    // Support easy query params for GET requests
    if (params) {
      if (typeof params === "string") {
        reqOpts.params = new HttpParams({fromString: params});
      } else {
        let newP: HttpParams = reqOpts.params;
        for ( const k in params) {
          newP = newP.set(k, params[k]);
        }
        reqOpts.params = newP;
      }

    }
    return this.http.post(this.url + '/' + endpoint, body, reqOpts);
  }
  downloadFile(endpoint: string, params?: any, reqOpts?: any) {
    if (!reqOpts) {
      reqOpts = {
        params: new HttpParams(),
        responseType: "blob"
      };
    }

    // Support easy query params for GET requests
    if (params) {
      if (typeof params === "string") {
        reqOpts.params = new HttpParams({fromString: params});
      } else {
        let newP: HttpParams = reqOpts.params;
        for ( const k in params) {
          newP = newP.set(k, params[k]);
        }
        reqOpts.params = newP;
      }

    }
    return this.http.get(this.url + '/' + endpoint, reqOpts);
  }
}
