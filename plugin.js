import style from "./css/style.js";
import pluginAPI from "./js/main.js";

(function () {
    "use strict";
    const global = tinymce.util.Tools.resolve("tinymce.PluginManager");
    const imgList = { length: 0 };

    function open (editor) {

        editor.windowManager.open({
            title: "本地图片上传",
            width: 500,
            height: 400,
            html: `
                ${style}
                <div class="mce-box-content" id="mceBoxContent">
                    <label class="add-img">
                        <input type="file" id="imgFile" name="file" multiple="multiple" hidden>
                    </label>
                </div>
            `,
            buttons: [{
                text: 'Ok',
                subtype: 'primary',
                onclick: function (e) {
                    pluginAPI.uploadpic(editor, imgList, tinyMCE.activeEditor.getParam('imageupload_url'));
                    editor.windowManager.close();
                }
            }, {
                text: 'Close',
                onclick: function () {
                    editor.windowManager.close();
                }
            }]
        });
    };

    function commandRegister(editor) {
        editor.addCommand("mceImageUpload", function () {

            open(editor);

            const $imgFile = document.getElementById("imgFile");
            const $mceBoxContent = document.getElementById("mceBoxContent");

            $imgFile.addEventListener("change", (e) => {
                const filesLise = Array.prototype.slice.call(e.target.files);
                const orignalLen = imgList.length;

                pluginAPI.imagePreview(filesLise, orignalLen, $mceBoxContent);

                filesLise.forEach((item, index) => {
                    imgList[imgList.length] = item;
                    imgList.length = imgList.length + 1;
                });
            })

            pluginAPI.on($mceBoxContent, "del-btn", "click", (e) => {
                const elemIndex = e.target.getAttribute("index");
                const parentNode = pluginAPI.parentNodes(e.target, 'prev-img-out-box');
                parentNode.remove();
                delete imgList[elemIndex];
                imgList.length = imgList.length - 1;
            })
        });
    };
    
    function componentRegister (editor) {
        editor.addButton("imageupload", {
            title: "上传图片",
            icon: "image",
            cmd: "mceImageUpload",
            // image : url + '/img/icon.png'
        });
        editor.addMenuItem("imageupload", {
            icon: "image",
            context: "insert",
            cmd: "mceImageUpload"
        });
    };

    global.add("imageupload", function (editor) {
        componentRegister(editor);
        commandRegister(editor);
    });

    function Plugin() {}

    return Plugin;

})()
