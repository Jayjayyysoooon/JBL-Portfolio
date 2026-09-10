const menuButton = document.getElementById("menuButton");
const navbar = document.getElementById("navbar");

const navLinks = document.querySelectorAll(".nav-link");

const themeButton = document.getElementById("themeButton");

const year = document.getElementById("year");


function setTheme(theme) {

    const icon = themeButton.querySelector("i");
    const isLight = theme === "light";

    document.documentElement.dataset.theme = theme;

    icon.classList.toggle("fa-moon", !isLight);
    icon.classList.toggle("fa-sun", isLight);

    themeButton.setAttribute(
        "aria-label",
        isLight ? "Switch to dark mode" : "Switch to light mode"
    );

    themeButton.setAttribute(
        "title",
        isLight ? "Switch to dark mode" : "Switch to light mode"
    );

    localStorage.setItem("portfolio-theme", theme);

}


const savedTheme = localStorage.getItem("portfolio-theme");

if (savedTheme === "light" || savedTheme === "dark") {

    setTheme(savedTheme);

}


menuButton.addEventListener("click", function () {

    navbar.classList.toggle("active");

});


navLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        navbar.classList.remove("active");

    });

});


window.addEventListener("scroll", function () {

    let currentSection = "";

    const sections = document.querySelectorAll("section");


    sections.forEach(function (section) {

        const sectionTop =
            section.offsetTop - 150;

        if (window.scrollY >= sectionTop) {

            currentSection =
                section.getAttribute("id");

        }

    });


    navLinks.forEach(function (link) {

        link.classList.remove("active");


        if (
            link.getAttribute("href") ===
            "#" + currentSection
        ) {

            link.classList.add("active");

        }

    });

});


themeButton.addEventListener("click", function () {

    const currentTheme = document.documentElement.dataset.theme;

    setTheme(currentTheme === "light" ? "dark" : "light");

});


year.textContent =
    new Date().getFullYear();
