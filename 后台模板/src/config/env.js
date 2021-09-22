// alpha: 1045  beta: 1048  master: 1032 
const channelId = 1045
// alpha: 100001  beta: 100002  master: 100007
const wgChannelId= 100001

// 后台接口请求链接
const adminUrl = new Map([
  [1045, 'https://alpha-wangge.fpwan.com'],
  [1048, 'https://beta-wangge.fpwan.com'],
  [1032, 'https://wangge.fpwan.com'],
])


// 企业微信用户端
const gridClientUrlList = new Map([
  [1045, 'https://alpha-wg.fpwan.com'],
  [1048, 'https://beta-wg.fpwan.com'],
  [1032, 'https://wg.fpwan.com'],
])

// oss单文件
const gridOssHtml = new Map([
  [1045, 'https://fpwan-hall-alpha.oss-cn-hangzhou.aliyuncs.com'],
  [1048, 'https://fpwan-hall-beta.oss-cn-hangzhou.aliyuncs.com'],
  [1032, 'https://fpwan-hall-stable.oss-cn-hangzhou.aliyuncs.com'],
])


const requestUrl = adminUrl.get(channelId)
const gridClientUrl = gridClientUrlList.get(channelId)
const gridOssUrl = gridOssHtml.get(channelId)
export  {
  channelId,
  requestUrl,
  wgChannelId,
  gridClientUrl,
  gridOssUrl
}