// ==UserScript==
// @name         Tahvel Simplified (Gert, Patrick, Peter, Kristofer)
// @namespace    http://tampermonkey.net/
// @version      2024-03-19
// @description  Tahvel remake
// @author       Gert Mägi, Parick Lapimaa, Peter Saan and Kristofer Jürgenstein
// @match        https://tahvel.edu.ee/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=edu.ee
// @grant        none
// ==/UserScript==

const UPDATE_COOLDOWN = 100;
const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

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
			console.log("Logged In");

			let updateQueued = false;
			const observer = new MutationObserver(() => {
				if (updateQueued) return;
				updateQueued = true;

				setTimeout(() => {
					updateQueued = false;

					TopBar();
					NavBar();
					ChangeBG();
					Pages();
				}, UPDATE_COOLDOWN);
			});

			var config = { attributes: true, childList: true, subtree: true };
			observer.observe(document.body, config);

			return;
		}

		console.log("Not Logged In");
		document.querySelector("body").remove();
		window.location.href = "https://tahvel.edu.ee/hois_back/haridLogin";
		return;
	}

	function TopBar() {
		const main = document.getElementById("main-wrapper");

		if (main.children[0].children[2].children[5] === undefined) return;
		console.log("Topbar");

		main.children[0].children[2].children[3].remove();
		main.children[0].children[2].children[2].remove();

		document.getElementById("user-menu-name").innerHTML += "🔫";
	}

	function NavBar() {
		const sideNav = document.getElementById("sidenav-list");

		if (sideNav.children[10] === undefined) return;
		console.log("Navbar");

		sideNav.children[10].remove();
		sideNav.children[9].remove();
		sideNav.children[7].remove();
		sideNav.children[6].remove();
		sideNav.children[5].remove();
		sideNav.children[4].remove();

		let newSidebarButton = sideNav.children[4].children[0].children[0];
		newSidebarButton.innerHTML = newSidebarButton.innerHTML.replace(
			"Teated",
			"Tunnitöö"
		);
		newSidebarButton.setAttribute("href", "#/students/study");

		newSidebarButton = sideNav.children[4];
		newSidebarButton.remove();
		sideNav.insertBefore(newSidebarButton, sideNav.children[2]);

		let homeworkButton = sideNav.children[3].children[0].children[0];
		homeworkButton.innerHTML = homeworkButton.innerHTML.replace(
			"Ülesanded",
			"Kodutööd"
		);

		document.getElementById("repr-link-wrapper").remove();
		document.getElementById("site-sidenav-wrapper").style.background =
			"transparent";
	}

	function ChangeBG() {
		const bg = document.getElementById("content-and-sidenav-wrapper");

		if (bg === undefined) return;
		if (bg.style.backgroundImage !== "") return;
		bg.style.backgroundImage = "Loading Image...";

		console.log("Background");

		let studentId;
		fetch("https://tahvel.edu.ee/hois_back/user")
			.then((res) => res.json())
			.then((data) => {
				studentId = data.student;
				fetch("https://tahvel.edu.ee/hois_back/students/" + studentId)
					.then((res) => res.json())
					.then((data) => {
						let newImg = document.createElement("img");
						newImg.src =
							"data:" + data.photo.ftype + ";base64," + data.photo.fdata;
						bg.style.backgroundImage = "url(" + newImg.src + ")";
					});
			});
	}

	function Pages() {
		console.log("Override Pages");

		if (window.location.href === "https://tahvel.edu.ee/#/") {
			const homeDataSectionsContainer = document.getElementById(
				"home-data-sections-container"
			);

			if (homeDataSectionsContainer.children[0].children[1] !== undefined) {
				homeDataSectionsContainer.children[0].children[1].remove();
			}

			const mainContent = document.getElementById("main-content");

			if (mainContent.style.background !== "transparent") {
				mainContent.style.background = "transparent";
				mainContent.children[0].style.background = "transparent";
				mainContent.children[0].children[0].children[1].style.background =
					"transparent";
				mainContent.children[0].children[0].children[1].children[0].style.background =
					"transparent";
			}

			const oldHomeworkButton = document.querySelector(
				"button + button.home-data-section-tab-title.md-button.md-ink-ripple>span"
			);

			if (oldHomeworkButton !== null) {
				oldHomeworkButton.parentElement.remove();
			}

			document
				.querySelectorAll("span.home-timetable-section-event-type")
				.forEach((element) => {
					element.remove();
				});

			document
				.querySelectorAll("div.home-timetable-section-room-and-type")
				.forEach((element) => {
					if (element.children[0].innerHTML.length === 1)
						element.children[0].remove();
				});

			document
				.querySelectorAll("td.home-tasks-section-date-and-checkbox")
				.forEach((element) => {
					const checkbox = element.querySelector("md-checkbox");
					if (checkbox !== null) {
						checkbox.remove();
					}

					element.style.display = "table-cell";
					element.style.verticalAlign = "middle";
				});

			return;
		}

		if (window.location.href === "https://tahvel.edu.ee/#/students/journals") {
			const headers = document.querySelectorAll("table>thead>tr");
			for (const header of headers) {
				if (header.children.length !== 7) continue;

				header.children[6].remove();
				header.children[3].remove();
				header.children[2].remove();
			}

			const containers = document.querySelectorAll("table>tbody");

			for (const container of containers) {
				if (container.children[0] === undefined) continue;
				if (container.children[0].children.length !== 7) continue;

				for (const child of container.children) {
					child.children[6].remove();
					child.children[3].remove();
					child.children[2].remove();

					const grades = child.querySelector("td.md-cell>span");

					for (let i = 0; i < grades.children.length; i++) {
						if (i % 2 === 0) {
							const grade = grades.children[i].children[0];

							if (grade.innerHTML === "2" || grade.innerHTML === "X") {
								grade.classList.add("bad");
							}
						}
					}
				}
			}

			const mainContent = document.getElementById("main-content");

			const nav = mainContent.querySelector("md-nav-bar");
			if (nav !== null) {
				nav.remove();
			}

			return;
		}

		if (window.location.href === "https://tahvel.edu.ee/#/students/study") {
			const mainContent = document.getElementById("main-content");

			const nav = mainContent.querySelector("md-nav-bar");
			if (nav !== null) {
				nav.remove();
			}

			return;
		}

		if (window.location.href === "https://tahvel.edu.ee/#/students/tasks") {
			const mainContent = document.getElementById("main-content");

			const nav = mainContent.querySelector("md-nav-bar");
			if (nav !== null) {
				nav.remove();
			}

			return;
		}
	}

	setTimeout(Login, 100);
})();
