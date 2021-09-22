/**
 * 取随机文件名
 * @param { String } base64String base64编码
 * @param { String } dir 上传目录
 */
export function getFileName(base64String,dir, originFileName) {
  let imageBlob = _imageBase64ToBlob(base64String)
  let BlobUrl =  _blobToUrl(imageBlob)
  return (
    dir +
    new Date().getTime() +
    Math.random()
      .toString(36)
      .substring(3, 20) +
    _getSuffix(BlobUrl)
  ) + '.' + originFileName.split('.')[1];
}

/**
 * base64转blob
 * @param { String } urlData base64字符串
 * @param { String } type 文件类型
 */
function _imageBase64ToBlob(urlData, type='image/jpeg') {
    try {
        var arr = urlData.split(',')
        var mime = arr[0].match(/:(.*?);/)[1] || type;
        // 去掉url的头，并转化为byte
        var bytes = window.atob(arr[1]);
        // 处理异常,将ascii码小于0的转换为大于0
        var ab = new ArrayBuffer(bytes.length);
        // 生成视图（直接针对内存）：8位无符号整数，长度1个字节
        var ia = new Uint8Array(ab);
        
        for (var i = 0; i < bytes.length; i++) {
            ia[i] = bytes.charCodeAt(i);
        }

        return new Blob([ab], {
            type: mime
        });
    }
    catch (e) {
        var ab = new ArrayBuffer(0);
        return new Blob([ab], {
            type: type,
        });
    }
}

/**
 * blob转Url
 * @param { Blob } blob_data Blob对象
 */
function _blobToUrl(blob_data) {
    return URL.createObjectURL(blob_data)
}

  

/**
 * 
 * @param { String } blobUrl blobUrl
 */
function _getSuffix(blobUrl) {
  let pos = blobUrl.lastIndexOf('.');
  let suffix = '';
  if (pos != -1) {
    suffix = blobUrl.substring(pos);
  }
  return suffix;
}
