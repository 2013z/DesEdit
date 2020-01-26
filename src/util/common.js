export const getObjType = obj => {
  var toString = Object.prototype.toString;
  var map = {
    "[object Boolean]": "boolean",
    "[object Number]": "number",
    "[object String]": "string",
    "[object Function]": "function",
    "[object Array]": "array",
    "[object Date]": "date",
    "[object RegExp]": "regExp",
    "[object Undefined]": "undefined",
    "[object Null]": "null",
    "[object Object]": "object"
  };
  if (obj instanceof Element) {
    return "element";
  }
  return map[toString.call(obj)];
};
/**
 * 对象深拷贝
 */
export const deepClone = data => {
  var type = getObjType(data);
  var obj;
  if (type === "array") {
    obj = [];
  } else if (type === "object") {
    obj = {};
  } else {
    // 不再具有下一层次
    return data;
  }
  if (type === "array") {
    for (var i = 0, len = data.length; i < len; i++) {
      obj.push(deepClone(data[i]));
    }
  } else if (type === "object") {
    for (var key in data) {
      obj[key] = deepClone(data[key]);
    }
  }
  return obj;
};

/**
 * 生成随机len位数字
 */
export const randomLenNum = (len, date) => {
  let random = "";
  random = Math.ceil(Math.random() * 100000000000000)
    .toString()
    .substr(0, len || 4);
  if (date) random = random + Date.now();
  return random;
};

/**
 * 浏览器类型判断
 */
export const navType = () => {
  var Sys = {};
  var ua = navigator.userAgent.toLowerCase();
  var s;
  (s = ua.match(/msie ([\d.]+)/))
    ? (Sys.ie = s[1])
    : (s = ua.match(/firefox\/([\d.]+)/))
    ? (Sys.firefox = s[1])
    : (s = ua.match(/chrome\/([\d.]+)/))
    ? (Sys.chrome = s[1])
    : (s = ua.match(/opera.([\d.]+)/))
    ? (Sys.opera = s[1])
    : (s = ua.match(/version\/([\d.]+).*safari/))
    ? (Sys.safari = s[1])
    : 0;
  if (Sys.ie <= "6.0") {
    return "IE";
  } else if (Sys.ie >= "7.0") {
    return "IE";
  } else if (Sys.firefox) {
    return "FIREFOX";
  } else if (Sys.chrome) {
    return "CHROME";
  } else {
    return "";
  }
};
