const fs = require('fs') ;
const fetch = require('node-fetch');
const qiniu = require('qiniu');
const config = new qiniu.conf.Config();
config.zone = qiniu.zone.Zone_z0;
const formUploader = new qiniu.form_up.FormUploader(config)
const imgPaths = fs.readdirSync('./images');
const IMAGE_KEY = 'uploads/images/extends/';
const baseHost = 'https://o86bvekvw.qnssl.com/'
const uploadImages = {};

// 多图上传
imgPaths.forEach((imgPath) => {
  if(imgPath.indexOf('DS_Store') > -1) return;
  const url = './images/' + imgPath
  const today = Date.now();
  const key = IMAGE_KEY + today + imgPath;
  upload(key, url)
})

// 多图上传完成回调
function onComplete(data) {
  fs.writeFileSync('./upload.json', JSON.stringify(data, null, '\t'), err => {
    if (err) {
      console.log('写入失败=>', err);
    }
  })
}

// 第一个为key
function upload(key, imgPath) {
  const putExtra = new qiniu.form_up.PutExtra();
  return getToken()
  .then(data => {
    const { token } = data;
    formUploader.putFile(token, key, imgPath, putExtra, (respErr, respBody, respInfo) => {
      if (respErr) {
        throw respErr;
      }
      if (respInfo.statusCode == 200) {
        const imgQiniuUrl = baseHost + respBody.key
        console.log('图片上传成功==>', imgQiniuUrl);
        uploadImages[imgPath] = imgQiniuUrl
        // 处理图片上传结束，为什么这边return后调用者拿到的是一个undefined呢
        if (Object.keys(uploadImages).length >= imgPaths.length - 1) {
          onComplete(uploadImages)
        }
      } else {
        console.log('fail==>', respInfo.statusCode);
        console.log(respBody);
      }
    })
  })
}

// 获取token
function getToken() {
  return fetch('https://www.tshe.com/images/token', {method: 'POST'})
  .then(res => res.json())
  .then(json => json)
  .catch(e => console.log('get token fail==>', e))
}