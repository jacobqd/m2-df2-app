/**
 * SysResourceModel
 * 由m2Gen<by liangchao@m2plat.com>自动生成
 * 1.该文件是对app开发的model文件，请拷贝到app应用里
 * 2.默认全部生成string类型，如果需要根据数据库自动分析类型请指出下次版本支持一下
 * 3.默认只能生成java文件，请拷贝时按照angular规范修改文件名
 * Mon Dec 11 14:39:32 CST 2017
 */
export class SysResource {

    id: string;

    parentId: string;
    parentIds: string;

    resourceCode: string;

    resourceName: string;

    extPermission: string;

    createBy: string;

    createByName: string;

    createDate: string;

    updateBy: string;

    updateByName: string;

    updateDate: string;

    remarks: string;

    delFlag: string;

    permission?: string;

    position?: string;

    url = "sys_resources";
}
