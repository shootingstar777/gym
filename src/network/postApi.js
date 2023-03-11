import {
  request
} from "./request";

export function addPost_(data) {
  return request({
    url: 'post/addPost',
    method: 'POST',
    data: data,
  })
}

export function getPosts_(data) {
  return request({
    url: 'post/getPosts',
    params: data
  })
}

export function addComment_(data){
  return request({
    url:'post/addComment',
    method:'POST',
    data:data
  })
}

export function getComment_(data){
  return request({
    url:'post/getComment',
    params:data
  })
}
export function addReply_(data){
  return request({
    url:'post/addReply',
    method:'POST',
    data:data
  })
}
export function getPersonal_(data){
  return request({
    url: 'post/getPersonal',
    params:data
  })
}
export function findSearch_(data){
  return request({
    url:'post/findSearch',
    params:data
  })
}
export function deletePost_(data){
  return request({
    url: 'post/deletePost',
    params:data
  })
}