function getBlobURL(code, type){
  let blob = new Blob([code], { type });
  return window.URL.createObjectURL(blob);
}

var jo = 'console.log("hello world")';

let urltest = getBlobURL(jo,'text/javascript');
console.log(urltest);

https://jsbin.com/hizunomumu/edit?html,js,output