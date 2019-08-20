 import * as CryptoJS from "crypto-js";
import {Subject} from "rxjs";
import "reflect-metadata";
import {IS_DEBUG, M2_ENCRYPT_KEY} from "../constants";

/**
 * m2 df中对装饰器的定义
 * by 梁超 2018.7.25
 */

// NgLog装饰器用于验证对生命周期钩子的拦截
export function NgLog(): ClassDecorator {
  return function ( constructor: any ) {

      // You can add/remove events for your needs
      const LIFECYCLE_HOOKS = [
        'ngOnInit',
        'ngOnChanges',
        'ngAfterViewInit',
        'ngOnDestroy'
      ];
      const component = constructor.name;

      LIFECYCLE_HOOKS.forEach(hook => {
        const original = constructor.prototype[hook];

        constructor.prototype[hook] = function ( ...args ) {
          console.log(`%c ${component} - ${hook}`, `color: #009688; font-weight: bold`, ...args);
          if (original) {
            original.apply(this, args);
          }
        };
      });


  };
}

// M2Decrypt解密装饰器，配置在需要解密返回值的方法上
export function M2Decrypt():  MethodDecorator {
  return function ( target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    if (!IS_DEBUG) {
      const originalMethod = descriptor.value;
      descriptor.value = function (...args: any[]) {
        const result = originalMethod.apply(this, args);
        const _result = new Subject<any>();
        const newResult = _result.asObservable();
        result.subscribe(value => {
          const key  = CryptoJS.enc.Latin1.parse(M2_ENCRYPT_KEY);
          const iv   = CryptoJS.enc.Latin1.parse(M2_ENCRYPT_KEY);
          const stime = new Date().getTime();
          const decrypt = CryptoJS.AES.decrypt(value, key, {
            mode : CryptoJS.mode.ECB,
            padding : CryptoJS.pad.Pkcs7
          });
          const decryptResult = JSON.parse(CryptoJS.enc.Utf8.stringify(decrypt).toString());
          _result.next(decryptResult);
        });
        return newResult;
      };
    }
    return descriptor;
  };
}

// M2EncryptRequired和M2Encrypt 需要配对使用，M2Encrypt放在需要加密的方法上，M2EncryptRequired来控制需要加密的参数
export const requiredEncryptMetadataKey = Symbol("M2EncryptRequired");
export function M2EncryptRequired(): ParameterDecorator {
  return function (target: Object, propertyKey: string | symbol, parameterIndex: number) {
    if (!IS_DEBUG) {
      const existingRequiredParameters: number[] = Reflect.getOwnMetadata(requiredEncryptMetadataKey, target, propertyKey) || [];
      existingRequiredParameters.push(parameterIndex);
      Reflect.defineMetadata(requiredEncryptMetadataKey, existingRequiredParameters, target, propertyKey);
    }
  };
}
export function M2Encrypt(): MethodDecorator {
  return function ( target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    if (!IS_DEBUG) {
      const originalMethod = descriptor.value;
      descriptor.value = function (...args: any[]) {
        const requiredParameters: number[] = Reflect.getOwnMetadata(requiredEncryptMetadataKey, target, propertyKey);
        const key = CryptoJS.enc.Latin1.parse(M2_ENCRYPT_KEY);
        const iv = CryptoJS.enc.Latin1.parse(M2_ENCRYPT_KEY);

        if (requiredParameters) {
          for (const parameterIndex of requiredParameters) {

            const inputPara = JSON.stringify(arguments[parameterIndex]);
            const srcs = CryptoJS.enc.Utf8.parse(inputPara);
            const encrypted = CryptoJS.AES.encrypt(srcs, key, {
              mode: CryptoJS.mode.ECB,
              padding: CryptoJS.pad.Pkcs7
            });
            arguments[parameterIndex] = encrypted.toString();
          }
        }
        return originalMethod.apply(this, arguments);
      };
    }
    return descriptor;
  };
}
