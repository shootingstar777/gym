import {
  request
} from "./request";

export function getTableData_(data) {
  return request({
    url: 'apply/getTableData',
    params: data
  })
}
export function getTomApply_(data){
  return request({
    url: 'apply/getTomApply',
    params:data
  })
}
export function getEquipmentData_() {
  return request({
    url: 'apply/getEquipmentData'
  })
}

export function getPeriodData_() {
  return request({
    url: 'apply/getPeriodData'
  })
}

export function applyGround_(data) {
  return request({
    url: 'apply/applyGround',
    method: 'POST',
    data: data
  })
}

export function getApplyDetail_(data) {
  return request({
    url: 'apply/getApplyDetail',
    params: data
  })
}
export function cancelApply_(data){
  return request({
    url: 'apply/cancelApply',
    params:data
  })
}

