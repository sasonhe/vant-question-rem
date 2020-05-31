import axios from 'axios'
import QS from 'qs'
/*
 * 根据环境变量区分接口的默认地址
 */
axios.defaults.baseURL = process.env.VUE_APP_BASE_API;
/*
 * 设置超时时间和跨域是否允许携带凭证
 */
axios.defaults.timeout = 1000 * 60 * 10;
axios.defaults.withCredentials = true;
/*
 * 设置请求传递数据的格式（看服务器要求什么格式）
 * x-www-form-urlencoded
 */
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';//application/x-www-form-urlencoded ; application/json
axios.defaults.transformRequest = data => QS.stringify(data);

/*
 * 响应拦截器
 * 服务器返回信息  -> [拦截的统一处理] -> 客户端JS获取到信息
 */
axios.interceptors.response.use(
  response => {

    return response.data
  },
  error => {
		return Promise.reject(error);
  });
export default axios;
