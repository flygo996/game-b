//第一步导入express
var express = require('express')
var app = express()
const Request = require('./request')

app.use(express.json())

// 解决浏览器跨域问题
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  res.header('Access-Control-Allow-Methods', '*')
  res.header('Content-Type', 'application/json;charset=utf-8')
  next()
})

//第二步，根据用户发送的请求方法method和请求路径url，做出响应
app.get('/', (req, res) => {
  let data = req.query //获取get请求参数 {}
  console.log(data)
  //第三步 根据要求获取到响应的数据对象
  //第四步 将响应数据发送给页面
  res.send('hello get ' + data)
})

app.post('/', (req, res) => {
  let data = req.body
  console.log(data)
  //根据数据做出响应
  //提交响应数据到客户端
  res.send('hello post ', data)
})

app.get('/getPrevResult', async (req, res) => {
  const result = await Request.prevResult()
  console.log(result)
  res.send(result)
})

app.listen(1200, () => {
  console.log(`Example app listening at http://localhost:${1200}`)
})
