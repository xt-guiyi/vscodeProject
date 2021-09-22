import { getQueryString } from '@/utils/url.js'

export function weChatShare() {
  setTimeout(() => {
    const shareData = {
      title: '方片农行进件工具',
      desc: '欢迎使用农行进件对接工具',
      link: 'https://' + window.location.host + '/fpagbank/index.html?channelId='+getQueryString('channelId')+'#/',
      imgUrl: 'https://img.fphdcdn.com/hall/small/sharePosterGoodsDetailBdwImg.png',
    }
    FPHDSdk.setShareInfo(shareData)
    wx.error(function(res){
      alert(res.errMsg)
      console.log(res)
        // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
    });
  }, 500);
}