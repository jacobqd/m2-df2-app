/**
 *  整理后的通用验证器
 * */
import {AbstractControl, ValidationErrors} from "@angular/forms";
import * as dayJs from 'dayjs';
import 'dayjs/plugin/isLeapYear';

/**自定义校验**/
export class M2Validator2 {

  static cellPhone(control: AbstractControl): ValidationErrors {
    const reg = /^1[3|4|5|7|8|9][0-9]\d{8}$/;
    if (!reg.test(control.value)) {
      return {cellPhone: '手机号码格式不正确!'};
    } else {
      return null;
    }
  }

  static idCard(control: AbstractControl): ValidationErrors {
    if (!control.value) {
      return null;
    }
    const val = validateIdCard(control.value);
    if (val) {
      return {idCard: val};
    } else {
      return null;
    }
  }

}

/*
 * 身份证15位编码规则：dddddd yymmdd xx p
 * dddddd：6位地区编码
 * yymmdd: 出生年(两位年)月日，如：910215
 * xx: 顺序编码，系统产生，无法确定
 * p: 性别，奇数为男，偶数为女
 *
 * 身份证18位编码规则：dddddd yyyymmdd xxx y
 * dddddd：6位地区编码
 * yyyymmdd: 出生年(四位年)月日，如：19910215
 * xxx：顺序编码，系统产生，无法确定，奇数为男，偶数为女
 * y: 校验码，该位数值可通过前17位计算获得
 *
 * 前17位号码加权因子为 Wi = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ]
 * 验证位 Y = [ 1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2 ]
 * 如果验证码恰好是10，为了保证身份证是十八位，那么第十八位将用X来代替
 * 校验位计算公式：Y_P = mod( ∑(Ai×Wi),11 )
 * i为身份证号码1...17 位; Y_P为校验码Y所在校验码数组位置
*/
function validateIdCard(idCard) {
  // 15位和18位身份证号码的正则表达式
  const regIdCard = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
  const allCity = {
    11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古", 21: "辽宁", 22: "吉林", 23: "黑龙江", 31: "上海", 32: "江苏",
    33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南", 42: "湖北", 43: "湖南", 44: "广东", 45: "广西", 46: "海南",
    50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西藏", 61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾",
    81: "香港", 82: "澳门", 91: "国外"
  };
  // 如果通过该验证，说明身份证格式正确，但准确性还需计算
  if (regIdCard.test(idCard)) {
    console.log("格式正确");
    if (idCard.length === 18) {
      console.log("18位");
      // 校验地区代码
      if (allCity[+idCard.substr(0, 2)] == null) {
        return "身份证号码地区代码错误！";
      }
      // 18 位身份号码检测
      // 出生日期的合法性检查
      // 闰年月日:((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))
      // 平年月日:((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))
      // if (moment([+idCard.substr(6, 4)]).isLeapYear()) {
      if (dayJs(idCard.substr(6, 4)).isLeapYear()) {
        // 是闰年
        const regLeapYear = /^((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))$/;
        if (!regLeapYear.test(idCard.substr(10, 4))) {
          return "身份证号出生年月不正确！";
        }
      } else {
        // 是平年
        const regNotLeapYear = /^((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))$/;
        if (!regNotLeapYear.test(idCard.substr(10, 4))) {
          return "身份证号出生年月不正确！";
        }
      }
      // 校验验证码
      const idCardWi = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2); // 将前17位加权因子保存在数组里
      const idCardY = new Array(1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2); // 这是除以11后，可能产生的11位余数、验证码，也保存成数组
      let idCardWiSum = 0; // 用来保存前17位各自乖以加权因子后的总和
      for (let i = 0; i < 17; i++) {
        idCardWiSum += idCard.substring(i, i + 1) * idCardWi[i];
      }
      const idCardMod = idCardWiSum % 11; // 计算出校验码所在数组的位置
      const idCardLast = idCard.substring(17); // 得到最后一位身份证号码
      // 如果等于2，则说明校验码是10，身份证号码最后一位应该是X
      if (idCardMod === 2) {
        if (!(idCardLast === "X" || idCardLast === "x")) {
          return "身份证号码校验码错误！";
        }
      } else {
        // 用计算出的验证码与最后一位身份证号码匹配，如果一致，说明通过，否则是无效的身份证号码
        if (!(idCardLast === idCardY[idCardMod])) {
          return "身份证号码校验码错误！";
        }
      }
      return null;
    }
    return null;
  } else {
    return "身份证格式不正确!";
  }
}

