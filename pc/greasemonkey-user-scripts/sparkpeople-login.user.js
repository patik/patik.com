// ==UserScript==
// @name        SparkPeople Autologin
// @author      Craig Patik
// @namespace   http://www.patik.com
// @description Automatically checks the "remember me" box and logs in
// @include     http://www.sparkpeople.com/myspark/loginpage.asp*
// @include     http://sparkpeople.com/myspark/loginpage.asp*
// ==/UserScript==

document.getElementById('cbLRem').setAttribute('checked','checked');
//alert("wait");
var imgs = document.getElementsByTagName('img');
var i=0;
while (i<imgs.length) {
    if (imgs[i].getAttribute('name') == 'lg4_login') {
        var e = document.createEvent("MouseEvents");
        e.initEvent("click", true, true);
        imgs[i].parentNode.dispatchEvent(e);
        break;
    }
    i++;
}
