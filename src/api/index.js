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
export const LIST = params => { return http.get(`admin/list?role=${params.role}&page=${params.page}`,  {} ) };
//审核
export const CHECK = params => { return http.post(`admin/check`,  {"data":params} ) };
//上传文件
export const UPLOAD = params => { return http.post(`admin/upload`,  params ) };