let httpCode = {
  400: '请求参数错误',
  401: '权限不足, 请重新登录',
  403: '服务器拒绝本次访问',
  404: '请求资源未找到',
  500: '内部服务器错误',
  501: '服务器不支持该请求中使用的方法',
  502: '网关错误',
  504: '网关超时'
}
export default function ({ $axios, redirect }) {
  $axios.onRequest(config => {
    // console.log('Making request to ' + config.url)
  })
  $axios.onError(error => {
    // 根据请求失败的http状态码去给用户相应的提示
    let tips = error.response.status in httpCode ? httpCode[error.response.status] : error.response.data.message
    let errors = {
      status: error.response.status,
      message: tips
    }
    return Promise.reject(errors)
  })
}