import http from '@/config/httpConfig'


//注册
export const REGISTER = params => { return http.post(`admin/register`,  params ) };
//登录
export const LOGIN = params => { return http.post(`admin/login`,  params ) };
//审核、提交信息
export const UPDATE = params => { return http.post(`admin/update`,   {"data":params }) };
//拉取详情
export const DETAIL = params => { return http.post(`admin/detail?user_id=`+params,  {}) };
//拉取列表 会员、医生、机构
export const LIST = params => { return http.get(`admin/list`,  {'params':params} ) };
//审核
export const CHECK = params => { return http.post(`admin/check`,  {"data":params} ) };
//上传文件
export const UPLOAD = params => { return http.post(`admin/upload`,  params ) };
//添加健康数据
export const ADDDATA = params => { return http.post(`admin/xueya/addData`,  params) };
//健康曲线
export const GETDATA_BP = params => { return http.get(`admin/xueya`,  {'params':params}) };

//授权医生可查看数据
export const IMPOWER = params => { return http.post(`admin/impower`,  params) };

//查看留言
export const MESSAGE = params => { return http.GET(`admin/message`,  {'params':params}) };
//添加留言
export const MESSAGEADD = params => { return http.post(`admin/message/add`,  params) };