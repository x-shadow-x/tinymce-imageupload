## Installing

Using npm:

```bash
$ npm install axios
```
## Example

Performing a `GET` request

```js
import tinymce from "tinymce";
import "tinymce-imageupload";

tinymce.init({
    selector: "#tinymceEditer",
    height: 500,
    branding: false,
    elementpath: false,
    menubar: "edit insert view format table tools",
    convert_urls: false,
    plugins: "imageupload", // 注意引入的组件时~需要去掉前面的tinymce-前缀
    toolbar: "imageupload", // 注意引入的组件时~需要去掉前面的tinymce-前缀
    autosave_interval: "20s",
    image_advtab: true,
    imageupload_url: '//localhost:3000', // 接收图片的后端地址
    table_default_styles: {
        width: "100%",
        borderCollapse: "collapse"
    }
});
```

## Result

![demo](https://raw.githubusercontent.com/x-shadow-x/tinymce-imageupload/master/demo.gif)