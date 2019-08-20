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
import {SysResource} from "../../models/system/sys-resource";

@Injectable({
  providedIn: "root",
  useFactory: (api: Api) => new BaseService(api),
  deps: [Api]
})
export class BaseService<T> {


  constructor(protected api: Api)  {

  }

  getListByCondition(reqParam: RequestParamModel, entity: T): Observable<BaseModel2<T>>  {
    // @ts-ignore
    return this.api.post( `${entity.url}/search`, entity, reqParam)

      .pipe(map((resp: any) => resp as BaseModel2<T>));
  }

  addData(entity: T): Observable<BaseModel2<T>>  {
    // @ts-ignore
    return this.api.post(entity.url, entity)
      .pipe(map((resp: any) => resp as BaseModel2<T>));
  }

  updateData(entity: T): Observable<BaseModel2<T>>  {
    // @ts-ignore
    return this.api.put(`${entity.url}/${entity.id}`, entity)
      .pipe(map((resp: any) => resp as BaseModel2<T>));
  }

  getDataById(entity: T): Observable<BaseModel2<T>>  {
    // @ts-ignore
    return this.api.get(`${entity.url}/${entity.id}`)
      .pipe(map((resp: any) => resp as BaseModel2<T>));
  }

  deleteDataById(entity: T): Observable<BaseModel2<T>>  {
    // @ts-ignore
    return this.api.delete(`${entity.url}/${entity.id}`)
      .pipe(map((resp: any) => resp as BaseModel2<T>));
  }

  getAllData(entity: T): Observable<BaseModel2<T>>  {
    // @ts-ignore
    return this.api.get(`${entity.url}/getSysAppId`)
      .pipe(map((resp: any) => resp as BaseModel2<T>));
  }

  getDataExcel(entity: T): Observable<any> {

    // @ts-ignore
    return this.api.exportExcel(`${entity.url}/export/excel`, entity);
  }
}
