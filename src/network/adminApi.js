import { request } from "./request";


export function adminLogin_(data){
  return request({
    url: 'admin/adminLogin',
    method:'POST',
    data:data
  })
}


export function getAllApply_(data){
  return request({
    url: 'admin/getAllApply',
    params:data
  })
}

export function cancelEnsure_(data) {
  return request({
    url: 'admin/cancelEnsure',
    params: data
  })
}

export function passApply_(data) {
  return request({
    url: 'admin/passApply',
    params: data
  })
}

export function refuseApply_(data) {
  return request({
    url: 'admin/refuseApply',
    params: data
  })
}

export function cancelRefuse_(data) {
  return request({
    url: 'admin/cancelRefuse',
    params: data
  })
}

export function adminGetAllPost_(){
  return request({
    url: 'admin/adminGetAllPost'
  })
}
export function deleteChange_(data){
  return request({
    url: 'admin/deleteChange',
    params:data
  })
}
export function getAllUsers_(data) {
  return request({
    url: 'admin/getAllUsers',
    params:data
  })
}
export function addPower_(data) {
  return request({
    url: 'admin/addPower',
    params:data
  })
}

