const menuButton = document.getElementById("menuButton");
const navbar = document.getElementById("navbar");

const navLinks = document.querySelectorAll(".nav-link");

const themeButton = document.getElementById("themeButton");

const year = document.getElementById("year");

const projectGalleries = document.querySelectorAll(".project-gallery");

const projectPreviewVideos = document.querySelectorAll(".project-preview-video");

const imageModal = document.getElementById("imageModal");

const imageModalPreview = document.getElementById("imageModalPreview");

const imageModalCaption = document.getElementById("imageModalCaption");

const imageModalClose = document.getElementById("imageModalClose");

let lastFocusedGallery;


projectPreviewVideos.forEach(function (video) {

    function setPreviewSpeed() {

        video.playbackRate = 2;

    }

    setPreviewSpeed();

    video.addEventListener("loadedmetadata", setPreviewSpeed);

});


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


function closeImageModal() {

    imageModal.classList.remove("is-open");

    imageModal.setAttribute("aria-hidden", "true");

    document.body.classList.remove("modal-open");

    if (lastFocusedGallery) {

        lastFocusedGallery.focus();

    }

}


projectGalleries.forEach(function (gallery) {

    gallery.addEventListener("click", function () {

        const screenshots = gallery.querySelectorAll(".project-screenshot");

        const activeScreenshot = Array.from(screenshots).reduce(
            function (visibleScreenshot, screenshot) {

                const visibleOpacity = parseFloat(
                    window.getComputedStyle(visibleScreenshot).opacity
                );

                const screenshotOpacity = parseFloat(
                    window.getComputedStyle(screenshot).opacity
                );

                return screenshotOpacity > visibleOpacity
                    ? screenshot
                    : visibleScreenshot;

            }
        );

        const projectName = gallery
            .closest(".project-card")
            .querySelector("h3")
            .textContent;

        lastFocusedGallery = gallery;

        imageModalPreview.src = activeScreenshot.currentSrc || activeScreenshot.src;

        imageModalPreview.alt = projectName + " screenshot";

        imageModalCaption.textContent = projectName;

        imageModal.classList.add("is-open");

        imageModal.setAttribute("aria-hidden", "false");

        document.body.classList.add("modal-open");

        imageModalClose.focus();

    });

});


imageModalClose.addEventListener("click", closeImageModal);


imageModal.addEventListener("click", function (event) {

    if (event.target === imageModal) {

        closeImageModal();

    }

});


document.addEventListener("keydown", function (event) {

    if (event.key === "Escape" && imageModal.classList.contains("is-open")) {

        closeImageModal();

    }

});


year.textContent =
    new Date().getFullYear();
