/**
 * 获取链接查询参数
 * @param {String}} key 查询参数
 */
export const getQueryString = (key) => {
  var url = location.search || location.hash;
  var requestObj = new Object();
  if (url.indexOf("?") != -1) {
    var str = url.slice(url.indexOf("?") + 1);
    var strs = str.split("&");
    for (var i = 0; i < strs.length; i++) {
      requestObj[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
    }
  }
  if (key == undefined) {
    return requestObj;
  }
  return requestObj[key];can
}