import http from '@/utils/http'

/**
 * 获取菜单列表信息
 * @param  {[type]} data [参数]
 * @return {[type]}      [JSON]
 */
const getQuestionList = data => http.post(`/api/swer/${data.id}.do`) //获取信息
const insertScore = data => http.post('/api/swer/insertScore.do',data) //提交
const getList = data => http.get('/api/swer/getList.do',{params:data}) //提交

export default {
  getQuestionList,
  insertScore,
  getList
}
