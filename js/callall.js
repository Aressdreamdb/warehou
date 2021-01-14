// 随机颜色获取
// 方法一：
function color1() {
  var str = "#";
  for (var i = 0; i < 3; i++) {
    var n = Math.floor(Math.random() * 256);
    n = n.toString(16);
    if (n.length === 1) {
      n = "0" + n;
    }
    str += n;
  }
  return str;
}
// 方法二：

function color2() {
  return `rgb(${parseInt(Math.random() * 256)},
              ${parseInt(Math.random() * 256)},
              ${parseInt(Math.random() * 256)})`;
}

// 范围随机数

function Rrn(a, b) {
  var max = Math.max(a, b);
  var min = Math.min(a, b);

  var sub = max - min;

  var rn = Math.floor(Math.random() * (sub + 1));

  res = rn + min;

  return res;
}

// 语义型输出现在时间

function textDate() {
  var time = new Date();
  var y = time.getFullYear();
  var M = time.getMonth();
  var d = time.getDate();
  var h = time.getHours();
  var m = time.getMinutes();
  var s = time.getSeconds();

  var str = ["日", "一", "二", "三", "四", "五", "六"];
  var week = time.getDay();
  weeks = "星期" + str[week];

  M = M < 10 ? "0" + M : M;
  d = d < 10 ? "0" + d : d;
  h = h < 10 ? "0" + h : h;
  m = m < 10 ? "0" + m : m;
  s = s < 10 ? "0" + s : s;

  var newTime = `现在时间是${y}年${M}月${d}日 ${weeks} ${h}时${m}分${s}秒`;

  return newTime;
}

// 封装差值函数**********(不太会)

function difference(a, b) {
  var diff = Math.ceil(Math.abs(a.getTime() - b.getTime()) / 1000);

  return {
    day: parseInt(diff / (60 * 60 * 24)),
    hours: parseInt((diff % (60 * 60 * 24)) / (60 * 60)),
    minutes: parseInt((diff % (60 * 60)) / 60),
    seconds: diff % 60,
  };
}


function myGetStyle(element, style) {
  if (window.getComputedStyle) {
      return window.getComputedStyle(element)[style];
  } else {
      return element.currentStyle[style];
  }
}


function myGetBgImgStyle( element ){
  let obj ={};
  let str = myGetStyle( element , 'backgroundSize' );
  const arr = str.split(' ');
  if(arr.length === 1){
      obj.width = parseInt( arr[0] );
      obj.height = parseInt( arr[0] );
  }else{
      obj.width = parseInt( arr[0] );
      obj.height = parseInt( arr[1] );
  }
  return obj;
}

// move运动函数
function myRemoveClass(element, Attr) {
  var classStr = element.className;
  var classArr = classStr.split(' ');
  for (var i = 0; i <= classArr.length - 1; i++) {
      if (classArr[i] === Attr) {
          classArr.splice(i, 1);
          i--;
      }
  }
  element.className = classArr.join(' ');
}

function move(element, typeObj, fun) {
  console.log(this);

  const IntervalObj = {};

  for (let type in typeObj) {

      IntervalObj[type] = setInterval(() => {

          var startVal = type === 'opacity' ? myGetStyle(element, type) * 100 : parseInt(myGetStyle(element, type));

          var endVal = type === 'opacity' ? typeObj[type] * 100 : typeObj[type];

          var speed = (endVal - startVal) / 5;

          speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

          startVal += speed;

          element.style[type] = type === 'opacity' ? startVal / 100 : startVal + 'px';

          if (startVal === endVal) {

              clearInterval(IntervalObj[type]);

              delete (IntervalObj[type]);

              const typeArr = Object.keys(IntervalObj);

              if (typeArr.length === 0) {
                  typeof (fun) === 'function' ? fun() : '';
              }
          }

      }, 30);

  }
}