'use strict';

// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
//const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
//sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });

// testimonials variables
//const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const portfolioItem = document.querySelectorAll("[data-portfolio-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImgList = document.querySelector("[data-modal-img-list]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");
const modalLink1 = document.querySelector("[data-modal-link1]");
const modalLink2 = document.querySelector("[data-modal-link2]");

// modal toggle function
const toggleModalShown = function () {
    modalContainer.classList.toggle("active");
    overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < portfolioItem.length; i++) {
    portfolioItem[i].addEventListener("click", function () {
        modalLink1.href = "";
        modalLink2.href = "";
        modalLink1.innerHTML = "";
        modalLink2.innerHTML = "";

        // Clear old images in modal
        let nodes = modalImgList.childNodes;
        while (nodes.length > 0) {
            let node = nodes[0];
            node.remove();
        }

        //Add images for this portfolio item
        let projectImages = this.querySelectorAll("[data-project-img]");
        for (let projImg of projectImages) {
            let item = modalImgList.appendChild(document.createElement('li'));
            item.className = "modal-item";
            let img = item.appendChild(document.createElement('img'));
            img.src = projImg.src;
            img.alt = projImg.alt;
            img.className = "modal-img";
        }

        //Update link1 and link2
        modalTitle.innerHTML = this.querySelector("[data-project-title]").innerHTML;
        modalText.innerHTML = this.querySelector("[data-project-text]").innerHTML;
        if (this.querySelector("[data-project-link1]") != null) {
            modalLink1.href = this.querySelector("[data-project-link1]").href;
            modalLink1.innerHTML = this.querySelector("[data-project-link1]").innerHTML;
        }

        if (this.querySelector("[data-project-link2]") != null) {
            modalLink2.href = this.querySelector("[data-project-link2]").href;
            modalLink2.innerHTML = this.querySelector("[data-project-link2]").innerHTML;
        }
        toggleModalShown();
    });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", toggleModalShown);
overlay.addEventListener("click", toggleModalShown);

// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}