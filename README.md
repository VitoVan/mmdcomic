![](http://ww4.sinaimg.cn/large/40dfde6fgw1f6sbbyd3u9j20jg0b4tah.jpg)

# MMDComic 

MMDComic is a online tool for Making comic via mmd models just in browser. 

## Install

```
git clone git@github.com:easychen/mmdcomic.git
cd mmdcomic
composer install --no-dev
php -S localhost:8888 route.php
```

Open chrome visiting http://localhost:8888/editor 

## add your own model

put model to `assets/mt/res/mmd` , then add a record to `assets/mt/list.data` in JSON format.

## add a pose

put pose file (*.vpd) to `assets/mt/res/vpd` , then add a record to `assets/mt/vpd.data` in JSON format.


## Credits

MMD model from [kreifish](http://kreifish.deviantart.com/art/KREI-MAYU-V1-DOWNLOAD-627525389) @ deviantart 
http://kreifish.deviantart.com/art/KREI-MAYU-V1-DOWNLOAD-627525389


# MMDComic 

MMDComic 是一个使用MMD模型在线制作漫画的小工具。 

## 安装

```
git clone git@github.com:easychen/mmdcomic.git
cd mmdcomic
composer install --no-dev
php -S localhost:8888 route.php
```

打开Chrome浏览器，访问 http://localhost:8888/editor 即可

## 添加模型

将模型目录放入 `assets/mt/res/mmd` 目录，并在 `assets/mt/list.data` 中按JSON格式添加记录即可。

## 添加姿势

将姿势文件(*.vpd)放入 `assets/mt/res/vpd` 目录，并在 `assets/mt/vpd.data` 中按JSON格式添加记录即可。



## 声明

内置的MMD模型来自 [kreifish](http://kreifish.deviantart.com/art/KREI-MAYU-V1-DOWNLOAD-627525389) @ deviantart 
http://kreifish.deviantart.com/art/KREI-MAYU-V1-DOWNLOAD-627525389