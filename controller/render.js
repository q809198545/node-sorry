const fs = require('fs')
const md5 = require('md5')
const path = require('path')
const rootPath = path.resolve(__dirname + "/..")
var execSync = require('child_process').execSync;

function renderAss(templateName, sentences, filename) {
    outputFilePath = "/public/cache/" + filename + ".ass"
    templatePath = rootPath + "/public/templates/" + templateName + "/template.ejs"
    console.log(rootPath)
    template = fs.readFileSync(templatePath, "utf8") //先读文件  
    renderedAssText = require('ejs').render(template, {
        'sentences': sentences
    })
    fs.writeFileSync(rootPath + outputFilePath, renderedAssText)
    return outputFilePath
}

function makeGifWithFfmpeg(templateName, sentences, filename) {
    assPath = renderAss(templateName, sentences, filename)
    gifPath = "./public/cache/" + filename
    videoPath = "./public/templates/" + templateName + "/template.mp4"
    console.log(assPath, gifPath, videoPath)
    var cmd = "ffmpeg -i " + videoPath + " -r 8 -vf ass=." + assPath + ",scale=300:-1 -y " + gifPath
    cmd = path.resolve(cmd).replace(eval(/\\/g), '/') //cmd只能识别window路径
    console.log(cmd);
    try {
        execSync(cmd);
    } catch (e) {
        console.log(e);
    }
}

function renderGif(templateName, sentences) {
    filename = templateName + "-" + md5(JSON.stringify(sentences)) + ".gif"
    gifPath = rootPath + "/public/cache/" + filename
    var exists = fs.existsSync(rootPath + "/public/cache/" + filename)
    if (exists) {
        return filename
    } else {
        makeGifWithFfmpeg(templateName, sentences, filename)
        return filename
    }
}

class Render {
    action(req, res, next) {
        var name = req.params.name;
        var sentences = req.body;
        var str = "";
        req.on("data", function (dt) {
            str += dt;
        });
        req.on("end", function () {
                console.log(str);
                var sentences = JSON.parse(str);
                var filename = renderGif(name, sentences);
                res.send('<p><a href="/cache/' + filename + '" target="_blank"><p>点击下载</p></a></p>');
                });
        }

    }

    module.exports = new Render();