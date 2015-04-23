var fs = require('fs');
var path = require('path');
var basePath = path.join(__dirname,"../public/img/p");
var files = fs.readdirSync(basePath);
var reg = /^\d/;
files.forEach(function(val,index,arr){
  if(reg.test(val)){
    console.log(val);
    var oldP = path.join(basePath,val);
    var newP = path.join(basePath,"t"+val);
    console.log("%s - > %s",oldP, newP);
    fs.renameSync(oldP,newP);
  }
});
//console.log(files);