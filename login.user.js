// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      2024-03-05
// @description  try to take over the world!
// @author       You
// @match        https://tahvel.edu.ee/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=edu.ee
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  function getCookie(name) {
    var dc = document.cookie;
    var prefix = name + "=";
    var begin = dc.indexOf("; " + prefix);
    if (begin == -1) {
      begin = dc.indexOf(prefix);
      if (begin != 0) return null;
    } else {
      begin += 2;
      var end = document.cookie.indexOf(";", begin);
      if (end == -1) {
        end = dc.length;
      }
    }
    // because unescape has been deprecated, replaced with decodeURI
    //return unescape(dc.substring(begin + prefix.length, end));
    return decodeURI(dc.substring(begin + prefix.length, end));
  }

  function killme() {
    var myCookie = getCookie("XSRF-TOKEN");

    if (myCookie != null) {
      // do cookie doesn't exist stuff;

      console.log("Exist");
    } else {
      console.log("Doesn' exist");

      var loginbtn = document.getElementById("login-button-hitarea");
      var content = document.getElementById("content-and-sidenav-wrapper");

      document.getElementById("site-sidenav-wrapper").remove();
      document.getElementById("main-content").remove();
      document.getElementById("help-menu").remove();
      document.getElementById("main-menu-button-wrapper").remove();
      document.getElementById("footer").remove();

      loginbtn.click();
      loginbtn.remove();

      document.querySelector(".md-dialog-backdrop").remove();
      content.appendChild(document.querySelector(".md-dialog-size"));
      var style = document.createElement("style");

      style.innerHTML = `md-dialog .md-tab-markup {
    width: 100%;
  }
  md-dialog .md-button {
    padding: 0 0px;
    margin: 0px 0px 0px 0px;
  }
  md-dialog .line {
    width : 100%;
    background: rgb(255,64,129);
  }
  .md-dialog-size {
    width: 50%;
    height: 100%;
  }
  @media (max-width: 600px) {
  .md-dialog-size {
    height: 450px;
  }
}`;

      content.style.cssText +=
        "display:flex;justify-content:center;margin-inline:auto;width:100%;height:80%;margin-block:14rem";
      document.querySelector(".md-padding").style.cssText +=
        "height:max-content;width:max-content";
      document.querySelector(".md-button").style.cssText =
        "height:100%;width:100%";

      content.appendChild(style);

      document.querySelector(".md-dialog-container").remove();
      document.querySelector(".md-scroll-mask").remove();
      document.querySelector(".md-toolbar-tools").remove();
    }
  }

  setTimeout(function () {
    killme();
  }, 2000);
})();
