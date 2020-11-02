const md5 = require("./md5.js")
function md5Data(data){
  var sdic = Object.keys(data).sort();
  var sum = '';
  for (let ki in sdic) {
    if (!isNaN(ki) && data[sdic[ki]] !== '') {
      sum += sdic[ki] + data[sdic[ki]];
    }
  }
  sum = sum.replace(/\s*/g, "")
  sum = encodeURIComponent(sum)
  sum=sum.replace(/\(/g,"%28")
  sum=sum.replace(/\)/g,"%29")
  sum=sum.replace(/\'/g,"%27")
  sum=sum.replace(/\!/g,"%21")
  sum=sum.replace(/\~/g,"%7E")
  sum += '0YvAkEA4aScEGe1ce2tGK/YmUoxyngSz0c2PtXc6eUHMrbPWBqamXUh3DGLx5kT8'
  let result = md5.hexMD5(sum)
  return result;
}


function md5Data1(name,data) {
 let sum = ''
  sum = name + data
  sum = sum.replace(/\s*/g, "")
  sum = encodeURIComponent(sum)
  sum=sum.replace(/\(/g,"%28")
  sum=sum.replace(/\)/g,"%29")
  sum=sum.replace(/\'/g,"%27")
  sum=sum.replace(/\!/g,"%21")
  sum=sum.replace(/\~/g,"%7E")
  sum += '0YvAkEA4aScEGe1ce2tGK/YmUoxyngSz0c2PtXc6eUHMrbPWBqamXUh3DGLx5kT8'
  let result = md5.hexMD5(sum)
  return result;
}


function base64({ url, type }) {
  return new Promise((resolve, reject) => {
    wx.getFileSystemManager().readFile({
      filePath: url, //选择图片返回的相对路径
      encoding: 'base64', //编码格式
      success: res => {
        resolve(res.data)
      },
      fail: res => reject(res.errMsg)
    })
  })
}


function stylePrice(price){
  var x = 4.23323;//测试的数字
  var y = String(x).indexOf(".") + 1;//获取小数点的位置
  var count = String(x).length - y;//获取小数点后的个数
  if (y > 0) {
    alert("这个数字是小数，有" + count + "位小数");
  } else {
    alert("不是小数");
  }
}

function formatDecimal(val){
  if (val == undefined || val == '') return
  var y = val.toString().indexOf(".");
  if(y==-1)  return val+".00"
  return  parseFloat(val.toString().slice(0,y) + "." +val.toString().slice(y+1, y+3))
}

const timeDiff=(a,b)=>{
     let diff = b-a
     let h=Math.floor(diff / 3600)
     diff=diff%3600
     let m = Math.floor(diff / 60);
     diff = diff % 60;
     let s = diff;
     return [h,m,s]
}
module.exports = {
  md5Data: md5Data,
  base64: base64,
  md5Data1: md5Data1,
  formatDecimal:formatDecimal,
  timeDiff:timeDiff
}
