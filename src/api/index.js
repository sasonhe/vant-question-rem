import http from '@/utils/http'

/**
 * 获取菜单列表信息
 * @param  {[type]} data [参数]
 * @return {[type]}      [JSON]
 */
const getQuestionList = data => http.get('/api/swer/findUrls.do',{params:data}) //获取信息
const findSwer= data => http.get('/api/swer/findSwer.do',{params:data}) //2.	用户点击姓名进入的接口
const insertScore = data => http.post('/api/swer/insertScore.do',data) //提交
const getList = data => http.get('/api/swer/getList.do',{params:data}) //大屏显示
const setList = data => http.get('/api/swer/setList.do',{params:data}) //设置



export default {
  getQuestionList,
  findSwer,
  insertScore,
  getList,
  setList
}
