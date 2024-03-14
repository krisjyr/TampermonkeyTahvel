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

            Pages();
            TopBar();
            NavBar();

            window.addEventListener('popstate', function(event) {
                setTimeout(Pages, 1000)
            });

            return
        }

        console.log("Not Logged In")
        document.querySelector('body').remove();
        window.location.href = "https://tahvel.edu.ee/hois_back/haridLogin"
        return
    }

    function TopBar() {
        const main = document.getElementById("main-wrapper")
        main.children[0].children[2].children[3].remove()
        main.children[0].children[2].children[2].remove()

        document.getElementById("user-menu-name").innerHTML += "🔫"
    }

    function NavBar() {
         const sideNav = document.getElementById("sidenav-list");

        sideNav.children[10].remove();
        sideNav.children[9].remove();
        sideNav.children[7].remove();
        sideNav.children[6].remove();
        sideNav.children[5].remove();
        sideNav.children[4].remove();

        let newSidebarButton = sideNav.children[4].children[0].children[0]
        newSidebarButton.innerHTML = newSidebarButton.innerHTML.replace("Teated", "Tunnitöö")
        newSidebarButton.setAttribute("href", "#/students/study")

        newSidebarButton = sideNav.children[4]
        newSidebarButton.remove();
        sideNav.insertBefore(newSidebarButton, sideNav.children[2])

        let homeworkButton = sideNav.children[3].children[0].children[0]
        homeworkButton.innerHTML = homeworkButton.innerHTML.replace("Ülesanded", "Kodutööd")

        document.getElementById("repr-link-wrapper").remove();
    }

    function Pages() {
        console.log("Override Pages")

        if (window.location.href === "https://tahvel.edu.ee/#/") {
            document.getElementById("home-data-sections-container-small").children[3].remove()
            document.getElementById("home-data-sections-container").children[0].children[1].remove()
        }

        if (window.location.href === "https://tahvel.edu.ee/#/students/journals") {
            const header = document.querySelector("table>thead>tr");
            header.children[6].remove()
            header.children[3].remove()
            header.children[2].remove()

            const container = document.querySelector("table>tbody");

            for (const child of container.children) {
                child.children[6].remove()
                child.children[3].remove()
                child.children[2].remove()

                const grades = child.querySelector("td.md-cell>span");

                for (let i = 0; i < grades.children.length; i++) {
                    if (i % 2 === 0) {
                        const grade = grades.children[i].children[0]

                        if (grade.innerHTML === "2" || grade.innerHTML === "X") {
                            grade.classList.add("bad")
                        }
                    }
                }
            }
        }
    }

    //Login();
    setTimeout(Login, 500);
})()
