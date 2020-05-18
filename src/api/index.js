import http from '@/config/httpConfig'


//注册
export const register = params => { return http.post(`api/register`, { data: params }) };
//登录
export const login = params => { return http.post(`api/login`, { data: params }) };
