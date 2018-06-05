// Created by Yanchao in 16/05/2018
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
  return 'eyJhbGciOiJIUzUxMiJ9.eyJyYW5kb21LZXkiOiJubnVzc2MiLCJzdWIiOiJ7XCJpZFwiOlwiMzczXCIsXCJvcGVuSWRcIjpcIjIwODgwMjIzMzQwNTU2MjJcIixcInBheVR5cGVcIjpcIjJcIixcInR5cGVcIjoyfSIsImV4cCI6MTUyODc3MTg3NiwiaWF0IjoxNTI4MTY3MDc2fQ.MyTF2TqtEX3zNNTShANv3jhUtlOybK94Q3pXvcsM3bhB7HjF0XHQG4ylNKt-2Lp6G0Z1crvE6Sfd2UYnE3nXEA';
  // return token;
};
