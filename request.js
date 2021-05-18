const http = require('http')
const FormData = require('form-data')

// 下面几个每天会变化
const UserCBK = 'dd7312b62c23c79e147b6ee395dae857G54523f637568510859457061' // 每天会变化
const UserCookie = 'ASP.NET_SessionId=o5vypi45gqflvqyksezlch45; money=' // 每天会变化
const Host = '9219236534054549.dc.usc55.com'

// 下面几个不变的参数
const Origin = `http://${Host}`
const Path = '/totaldata/action.ashx'
const gIndex = 16 // '欧洲幸运5'的index
const gType = 9 // '单码1~5'的type

class Request {
  static base (form) {
    return new Promise((resolve, reject) => {
      const headers = form.getHeaders() //这个不能少
      headers.Cookie = UserCookie //自己的headers属性在这里追加
      headers.Host = Host
      headers.Origin = Origin

      const request = http.request(
        {
          method: 'POST',
          host: Host,
          path: Path,
          headers
        },
        res => {
          let str = ''
          res.on('data', buffer => {
            str += buffer
          })
          res.on('end', () => {
            const result = JSON.parse(str)
            console.log('result:', result.kymoney)
            resolve(result)
            return result
          })
          res.on('error', err => {
            console.log('error:', err)
            reject(err)
            return err
          })
        }
      )
      form.pipe(request)
    })
  }
  static async bet () {
    const form = new FormData()
    form.append('__CBK', UserCBK)
    form.append('__', 'downEntry')
    form.append('gIndex', gIndex)
    form.append('rebate', 2)
    form.append('data', '1:5')
    const res = await Request.base(form)
    console.log('bet-res:', res)
    return res
  }
  static async prevResult () {
    const form = new FormData()
    form.append('__CBK', UserCBK)
    form.append('__', 'memberGame')
    form.append('gIndex', gIndex)
    form.append('type', gType)
    form.append('rebate', 2)
    const res = await Request.base(form)
    console.log('prevResult-res:', res.kymoney)
    return res
  }
  // 分页查询历史结果
  static async result () {
    const form = new FormData()
    // __CBK: dd7312b62c23c79e147b6ee395dae857G54523f637568510859457061
    // __: result
    // page: 224 // 当前页码
    // gameIndex: 16
    form.append('__CBK', UserCBK)
    form.append('__', 'result')
    form.append('page', 1)
    form.append('gameIndex', gIndex)
    const res = await Request.base(form)
    console.log('prevResult-res:', res)
    return res
  }
}

// Request.bet()
// Request.prevResult()
module.exports = Request
