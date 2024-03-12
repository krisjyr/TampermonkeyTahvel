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
        const dc = document.cookie;
        const prefix = name + "=";
        let begin = dc.indexOf("; " + prefix);
        let end;

        if (begin == -1) {
            begin = dc.indexOf(prefix);
            if (begin != 0) return null;
        } else {
            begin += 2;
            end = document.cookie.indexOf(";", begin);

            if (end == -1) {
                end = dc.length;
            }
        }

        return decodeURI(dc.substring(begin + prefix.length, end));
    }

    function Login() {
        var myCookie = getCookie("XSRF-TOKEN");

        if (myCookie != null) {
            console.log("Logged In")
            MainPage();
            return
        }

        console.log("Not Logged In")
        document.querySelector('body').remove();
        window.location.href = "https://tahvel.edu.ee/hois_back/haridLogin"
        return
    }

    function MainPage() {
        const sideNav = document.getElementById("sidenav-list");

        sideNav.children[10].remove();
        sideNav.children[9].remove();
        sideNav.children[8].remove();
        sideNav.children[7].remove();
        sideNav.children[6].remove();
        sideNav.children[5].remove();
        sideNav.children[4].remove();

        document.getElementById("repr-link-wrapper").remove();
        document.getElementById("user-menu-name").innerHTML += "🔫"

        const main = document.getElementById("main-wrapper")
        main.children[0].children[2].children[3].remove()
        main.children[0].children[2].children[2].remove()

        document.getElementById("home-data-sections-container-small").children[3].remove()
        console.log(document.getElementById("home-data-sections-container").children[0].children[1].remove())
    }

    //Login();
    setTimeout(Login, 200);
})()
