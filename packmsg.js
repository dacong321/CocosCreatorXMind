//-- 执行此文件，将pathroot路径下的文件全部读出，然后写入另一个文件
(function(){
    var fs = require('fs');
    var path = require('path');
    //-- __dirname 当前文件的全路径
    let pathroot = __dirname ;
    let destroot = __dirname +"//..//" + "msg"; 
    console.log("destroot ==" ,  destroot);     //-- d:\Client\network\msg.src//..//msg

    var formatJson = function(obj){
        var new_obj = {};
        //-- 遍历这个（文件总对象、或者对象）
        for(let name in obj){
            //-- （文件总对象、或者对象） 属性值 ！= except
            if (obj[name] != 'except'){
                let temp = obj[name];
                if (typeof (obj[name]) == 'object' && !(obj[name] instanceof Array)){
                    temp = formatJson(obj[name]);
                    temp = JSON.parse(temp);
                }
                new_obj[name] = temp;
            }
        }
        return JSON.stringify(new_obj);
    }

    var visitDir = function( dirRoot , dstRoot){
        //-- 读取当前路径下的文件，//-- d:\Client\network\msg.src
        fs.readdirSync(dirRoot ).forEach(function (filename) {
            //filename 包括后缀，如packmsg.js
            if (filename.indexOf('.') == -1){
                //无.后缀， 是文件夹。'\\'转义符
                visitDir(dirRoot+'\\' + filename, dstRoot + "\\" + filename);
            }
            //正则表达式，查询filename字符串是否包含 .src.json
            if (!/\.src.json$/.test(filename)) {
                return;
            }
            //-- 得到新的文件名（就是去除 .src.json  后缀的文件）
            var name = path.basename(filename, '.src.json');
            //-- 读取文件内容
            var protoStr = fs.readFileSync(dirRoot + '\\' + filename);
            //-- 将json字符串转换成对象
            var proto = JSON.parse(protoStr);
            //-- 得到写入文件路径
            let filePath = dstRoot + "\\" + name + ".json";
            //-- 将proto对象转成json的文件内容写入文件
            fs.writeFileSync(filePath, formatJson(proto));
        });
    }
    visitDir(pathroot,destroot);
})();