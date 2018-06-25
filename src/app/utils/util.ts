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
// 解析token
export let getToken = () => {
  let token;
    const strCookie = document.cookie;
    const arrCookie = strCookie.split(';');
    for (let i = 0; i < arrCookie.length; i++) {
      const arr = arrCookie[i].split('=');
      if (arr[0].trim() === 'adminToken') {
        token = arr[1];
      }
    }
  // return 'eyJhbGciOiJIUzUxMiJ9.eyJhdXRob3JpdGllcyI6IlJPTEVfQURNSU4sQVVUSF9VU0VSIiwic3ViIjoiMzA0LDEiLCJleHAiOjE1Mjk2Mzk1NjN9.jHWmVAYZQT384S_232zXKq6i9i5v7_cnLJuyGfffRT_XZ7JXd1WgxaLG1Ug3MWwxxzMezCT9tHQwd2ndmbZ_CQ';
  return token;
};
