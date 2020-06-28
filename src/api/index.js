import http from '@/config/httpConfig'


//注册
export const REGISTER = params => { return http.post(`admin/register`,  params ) };
//登录
export const LOGIN = params => { return http.post(`admin/login`,  params ) };
//审核、提交信息
export const UPDATE = params => { return http.post(`admin/update`,   {"data":params }) };
//普通会员提交基本健康数据
export const UPDATA = params => { return http.post(`admin/updateData`,   {"data":params }) };
//普通会员提交基本健康数据-拉取
export const UPDATA_DETAIL = params => { return http.post(`admin/indexData?user_id=`+params,   {}) };
//拉取详情
export const DETAIL = params => { return http.post(`admin/detail?user_id=`+params,  {}) };
//拉取列表 会员、医生、机构
export const LIST = params => { return http.get(`admin/list`,  {'params':params} ) };
//添加会员
export const ADD_MEMBER= params => { return http.post(`admin/company/member/add`,  {"data":params} ) };
//审核
export const CHECK = params => { return http.post(`admin/check`,  {"data":params} ) };
//上传文件
export const UPLOAD = params => { return http.post(`admin/upload`,  params ) };

//添加健康数据-拉取之前的数据
export const ADDDATA_LAST= params => { return http.get(`admin/lastData`,  {'params':params}) };
//添加健康数据
export const ADDDATA = params => { return http.post(`admin/xueya/addData`,  params) };
export const ADDDATA_XT = params => { return http.post(`admin/xuetang/addData`,  params) };
export const ADDDATA_XZ = params => { return http.post(`admin/xuezhi/addData`,  params) };
//健康曲线
export const GETDATA_BP = params => { return http.get(`admin/xueya`,  {'params':params}) };
export const GETDATA_XT = params => { return http.get(`admin/xuetang`,  {'params':params}) };
export const GETDATA_XZ = params => { return http.get(`admin/xuezhi`,  {'params':params}) };
//健康曲线 list
export const GETDATA_BP_LIST = params => { return http.get(`admin/xueya/list`,  {'params':params}) };
export const GETDATA_XT_LIST = params => { return http.get(`admin/xuetang/list`,  {'params':params}) };
export const GETDATA_XZ_LIST = params => { return http.get(`admin/xuezhi/list`,  {'params':params}) };

//授权医生可查看数据
export const IMPOWER = params => { return http.post(`admin/impower`,  params) };

//查看留言
export const MESSAGE = params => { return http.get(`admin/message`,  {'params':params}) };
//添加留言
export const MESSAGEADD = params => { return http.post(`admin/message/add`,  params) };

//添加职员
export const ADD_STAFF= params => { return http.post(`admin/company/member/addEmploye`,  {"data":params} ) };
//职员列表
export const STAFF_LIST= params => { return http.get(`admin/company/member/clerkList`,  {'params':params} ) };