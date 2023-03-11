import {
  request
} from "./request";
//登录接口
export function login_(data) {
  return request({
    url: 'user/login',
    method: 'POST',
    data: data,

  })
}
//注册接口
export function register_(data) {
  return request({
    url: 'user/register',
    method: 'POST',
    data: data,
  })
}