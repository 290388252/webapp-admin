// Created by Yanchao in 16/05/2018
// 解析url地址转化对象
export let urlParse = (url) => {
  const obj = {};
  const reg = /[?&][^?&]+=[^?&]+/g;
  const arr = url.match(reg);

  if (arr) {
    arr.forEach(function (item) {
      const tempArr = item.substring(1).split('=');
      const key = decodeURIComponent(tempArr[0]);
      const val = decodeURIComponent(tempArr[1]);
      obj[key] = val;
    });
  }
  return obj;
};
export let getAdminToken = () => {
  let token;
  const strCookie = document.cookie;
  const arrCookie = strCookie.split(';');
  for (let i = 0; i < arrCookie.length; i++) {
    const arr = arrCookie[i].split('=');
    if (arr[0].trim() === 'adminToken') {
      token = arr[1];
    }
  }
 /* token = 'eyJhbGciOiJIUzUxMiJ9.eyJhdXRob3JpdGllcyI6IlJPTEVfQURNSU4sQVVUSF9VU0VSIiwic3ViIjoiMzc1LDEsb0trWnkwNXY1UWVaTG' +
    'FCVlhJb3FnZ0k1QmFtTSIsImV4cCI6MTU0MTQ0MTc1Nn0.npZcjPg1FhT9ay-7aYDRhTKghEzB_5LOCTwpHFgn02VJfsHh' +
    '9NgwafDyGAfW0uk1tDpmSvjpZGpvHMNJdLwJ6g';*/
  return token;
};
// 解析token
export let getToken = () => {
  let token;
    const strCookie = document.cookie;
    const arrCookie = strCookie.split(';');
    for (let i = 0; i < arrCookie.length; i++) {
      const arr = arrCookie[i].split('=');
      if (arr[0].trim() === 'shopToken') {
        token = arr[1];
      }
    }
    /*token = 'eyJhbGciOiJIUzUxMiJ9.eyJhdXRob3JpdGllcyI6IlJPTEVfQURNSU4sQVVUSF9VU0VSIiwic3ViIjoiMTc0OTAsMCxvS2taeTA2e' +
      'Hh0TElWSVJKOGVJcEJZaVVXaHZzIiwiZXhwIjoxNTQyMzcyMjAwfQ.UHODOUy-uh9FGgehNAR3TaSBRusNIjIrU5PbB31I8Ibc3XiG3A' +
      'buUvc8TKOxRaBmqQVAb-BAilicPrBS_XbRNw';*/
  return token;
};
