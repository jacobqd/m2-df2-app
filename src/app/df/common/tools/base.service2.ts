/**
 * 通用服务基类，继承之后已经包括全部CRUD方法
 *
 */
import {Observable} from "rxjs/index";
import {map} from "rxjs/operators";
import {Api} from "../../core/services/http/api";
import {RequestParamModel} from "../../models/request.param.model";
import {BaseModel2} from "../../models/base-model2";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: "root",
  useFactory: (api: Api) => new BaseService2(api),
  deps: [Api]
})
export class BaseService2 {


  constructor(protected api: Api)  {

  }

  getListByCondition(reqParam: RequestParamModel, entity: any): Observable<BaseModel2<any>>  {
    // @ts-ignore
    return this.api.post( `${entity.url}/search`, entity, reqParam)

      .pipe(map((resp: any) => resp as BaseModel2<any>));
  }

  addData(entity: any): Observable<BaseModel2<any>>  {
    // @ts-ignore
    return this.api.post(entity.url, entity)
      .pipe(map((resp: any) => resp as BaseModel2<any>));
  }

  updateData(entity: any): Observable<BaseModel2<any>>  {
    // @ts-ignore
    return this.api.put(`${entity.url}/${entity.id}`, entity)
      .pipe(map((resp: any) => resp as BaseModel2<any>));
  }

  getDataById(entity: any): Observable<BaseModel2<any>>  {
    // @ts-ignore
    return this.api.get(`${entity.url}/${entity.id}`)
      .pipe(map((resp: any) => resp as BaseModel2<any>));
  }

  deleteDataById(entity: any): Observable<BaseModel2<any>>  {
    // @ts-ignore
    return this.api.delete(`${entity.url}/${entity.id}`)
      .pipe(map((resp: any) => resp as BaseModel2<any>));
  }

  getAllData(entity: any): Observable<BaseModel2<any>>  {
    // @ts-ignore
    return this.api.get(`${entity.url}/getSysAppId`)
      .pipe(map((resp: any) => resp as BaseModel2<any>));
  }

  getDataExcel(entity: any): Observable<any> {

    // @ts-ignore
    return this.api.exportExcel(`${entity.url}/export/excel`, entity);
  }
}
