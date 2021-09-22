/**
 * 取随机文件名
 * @param { File } base64String base64编码
 * @param { String } dir 上传目录
 */
export function getFileName(file, dir) {
  let BlobUrl = URL.createObjectURL(file)
  console.log(BlobUrl)
  return (
    dir +
    new Date().getTime() +
    Math.random()
      .toString(36)
      .substring(3, 20) 
  ) + '.' + file.name.split('.')[1];
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


/**
 * blob转Url
 * @param { Blob } blob_data Blob对象
 */
function _blobToUrl(blob_data) {
    return URL.createObjectURL(blob_data)
}



