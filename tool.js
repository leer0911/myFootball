const fs = require('fs');
const path = require('path');
const filePath = path.resolve('./assets/img');
const plist = require('plist');

const readFile = filePath => {
    return new Promise((resolve, reject) => {
        fs.readFile(
            filePath,
            { flag: 'r+', encoding: 'utf8' },
            (error, data) => {
                if (error) reject(error);
                resolve(data);
            }
        );
    });
};

const writeFile = (filePath, wData) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(filePath, wData, error => {
            if (error) reject(error);
            resolve();
            console.log('写入成功!');
        });
    });
};

const asyncFn = (readPath, writePath) => {
    (async () => {
        const json = await readFile(readPath);
        const { frames, meta } = JSON.parse(json);
        let formatJson = {
            frames: {},
            metadata: {
                format: 3,
                pixelFormat: 'RGBA8888',
                premultiplyAlpha: false,
                realTextureFileName: meta.image,
                size: `{${meta.size.w},${meta.size.h}}`,
                smartupdate: meta.smartupdate,
                textureFileName: meta.image
            }
        };
        for (const key in frames) {
            let item = frames[key];
            let { sourceSize, frame } = item;
            formatJson.frames[key] = {
                aliases: [],
                spriteOffset: '{0,0}',
                spriteSize: `{${sourceSize.w},${sourceSize.h}}`,
                spriteSourceSize: `{${sourceSize.w},${sourceSize.h}}`,
                textureRect: `{{${frame.x},${frame.y}},{${frame.w},${
                    frame.h
                }}}`,
                textureRotated: false
            };
        }
        const res = plist.build(formatJson);
        writeFile(writePath, res);
    })();
};

const fileDisplay = filePath => {
    fs.readdir(filePath, function(err, files) {
        if (err) {
            console.warn(err);
        } else {
            //遍历读取到的文件列表
            files.forEach(function(filename) {
                //获取当前文件的绝对路径
                const filedir = path.join(filePath, filename);
                const extname = path.extname(filename);
                //根据文件路径获取文件信息，返回一个fs.Stats对象
                fs.stat(filedir, function(eror, stats) {
                    if (eror) {
                        console.warn('获取文件stats失败');
                    } else {
                        const isFile = stats.isFile(); //是文件
                        const isDir = stats.isDirectory(); //是文件夹
                        if (isFile && extname === '.json') {
                            asyncFn(
                                filedir,
                                filedir.replace('.json', '.plist')
                            );
                        }
                        if (isDir) {
                            fileDisplay(filedir); //递归，如果是文件夹，就继续遍历该文件夹下面的文件
                        }
                    }
                });
            });
        }
    });
};

fileDisplay(filePath);
