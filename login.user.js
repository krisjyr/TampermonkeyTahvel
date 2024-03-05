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

(function() {
    'use strict';
    var loginbtn = document.getElementById("login-button-hitarea")
    var content = document.getElementById("content-and-sidenav-wrapper")

    document.getElementById("site-sidenav-wrapper").remove()
    document.getElementById("main-content").remove()
    document.getElementById("help-menu").remove()
    document.getElementById("main-menu-button-wrapper").remove()

    loginbtn.click()
    loginbtn.remove()

    document.querySelector(".md-dialog-backdrop").remove()
    content.appendChild(document.querySelector(".md-dialog-size"))
    var style = document.createElement('style')

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
    width: 400px;
    height: 400px;
  }
  @media (max-width: 600px) {
  .md-dialog-size {
    height: 450px;
  }
}`
    
    content.style

    content.appendChild(style)

    document.querySelector(".md-dialog-container").remove()
    document.querySelector(".md-scroll-mask").remove()
    document.querySelector(".md-toolbar-tools").remove()


})();
