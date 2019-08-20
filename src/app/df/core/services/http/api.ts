import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {APP_SERVE_URL, FILE_SERVE_URL, REQUEST_TIMEOUT} from '../../constants';

import {Observable, throwError} from 'rxjs';
import {timeoutWith} from 'rxjs/internal/operators';

/**
 * Api is a generic REST Api handler. Set your API url first.
 */
@Injectable({
    providedIn: 'root',
})
export class Api {
    url: string = APP_SERVE_URL;

    constructor(public http: HttpClient) {
    }

    get(endpoint: string, params?: any, reqOpts?: any, ver?: string) {
        if (!reqOpts) {
            reqOpts = {
                params: new HttpParams()
            };
        }

        // Support easy query params for GET requests
        if (params) {
            if (typeof params === 'string') {
                reqOpts.params = new HttpParams({fromString: params});
            } else {
                let newP: HttpParams = reqOpts.params;
                for (const k in params) {
                    newP = newP.set(k, params[k]);
                }
                reqOpts.params = newP;
            }

        }
        let _url = this.url;
        if (ver) {
            _url += '/v' + ver;
        } else {
            _url += '/v1';
        }
        return this.http.get(_url + '/' + endpoint, reqOpts)
            .pipe(timeoutWith(REQUEST_TIMEOUT, throwError({error: '请求超时'})));
    }

    post(endpoint: string, body: any, params?: any, reqOpts?: any, ver?: string) {
        if (!reqOpts) {
            reqOpts = {
                params: new HttpParams(),
                headers: new HttpHeaders()
            };
        }

        // Support easy query params for GET requests
        if (params) {
            if (typeof params === 'string') {
                reqOpts.params = new HttpParams({fromString: params});
            } else {
                let newP: HttpParams = reqOpts.params;
                for (const k in params) {
                    newP = newP.set(k, params[k]);
                }
                reqOpts.params = newP;
            }

        }
        let _url = this.url;
        if (ver) {
            _url += '/v' + ver;
        } else {
            _url += '/v1';
        }
        const m2Headers = new HttpHeaders().set('Content-Type', 'application/json;charset=UTF-8');
        reqOpts.headers = m2Headers;
        return this.http.post(_url + '/' + endpoint, body, reqOpts)
            .pipe(timeoutWith(REQUEST_TIMEOUT, throwError({error: '请求超时'})));
    }


    put(endpoint: string, body: any, reqOpts?: any, ver?: string) {
        let _url = this.url;
        if (ver) {
            _url += '/v' + ver;
        } else {
            _url += '/v1';
        }
        return this.http.put(_url + '/' + endpoint, body, reqOpts)
            .pipe(timeoutWith(REQUEST_TIMEOUT, throwError({error: '请求超时'})));
    }

    delete(endpoint: string, reqOpts?: any, ver?: string) {
        let _url = this.url;
        if (ver) {
            _url += '/v' + ver;
        } else {
            _url += '/v1';
        }
        return this.http.delete(_url + '/' + endpoint, reqOpts)
            .pipe(timeoutWith(REQUEST_TIMEOUT, throwError({error: '请求超时'})));
    }

    patch(endpoint: string, body: any, reqOpts?: any, ver?: string) {
        let _url = this.url;
        if (ver) {
            _url += '/v' + ver;
        } else {
            _url += '/v1';
        }
        return this.http.put(_url + '/' + endpoint, body, reqOpts);
    }

    exportExcel(endpoint: string, body: any, params?: any, reqOpts?: any, ver?: string) {
        if (!reqOpts) {
            reqOpts = {
                params: new HttpParams(),
                responseType: 'blob'
            };
        }

        // Support easy query params for GET requests
        if (params) {
            if (typeof params === 'string') {
                reqOpts.params = new HttpParams({fromString: params});
            } else {
                let newP: HttpParams = reqOpts.params;
                for (const k in params) {
                    newP = newP.set(k, params[k]);
                }
                reqOpts.params = newP;
            }

        }
        let _url = this.url;
        if (ver) {
            _url += '/v' + ver;
        } else {
            _url += '/v1';
        }
        return this.http.post(_url + '/' + endpoint, body, reqOpts);
    }

    downloadFile(endpoint: string, params?: any, reqOpts?: any, ver?: string) {
        if (!reqOpts) {
            reqOpts = {
                params: new HttpParams(),
                responseType: 'blob'
            };
        }

        // Support easy query params for GET requests
        if (params) {
            if (typeof params === 'string') {
                reqOpts.params = new HttpParams({fromString: params});
            } else {
                let newP: HttpParams = reqOpts.params;
                for (const k in params) {
                    newP = newP.set(k, params[k]);
                }
                reqOpts.params = newP;
            }

        }
        let _url = this.url;
        if (ver) {
            _url += '/v' + ver;
        } else {
            _url += '/v1';
        }
        return this.http.get(_url + '/' + endpoint, reqOpts);
    }

    authFile(endpoint: string, params?: any, reqOpts?: any) {
        if (!reqOpts) {
            reqOpts = {
                params: new HttpParams(),
                responseType: 'blob'
            };
        }

        // Support easy query params for GET requests
        if (params) {
            if (typeof params === 'string') {
                reqOpts.params = new HttpParams({fromString: params});
            } else {
                let newP: HttpParams = reqOpts.params;
                for (const k in params) {
                    newP = newP.set(k, params[k]);
                }
                reqOpts.params = newP;
            }

        }
        return this.http.get(FILE_SERVE_URL + '/auth-pic/' + endpoint, reqOpts);
    }
}
