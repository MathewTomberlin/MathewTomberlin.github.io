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
const modalImg1 = document.querySelector("[data-image1-img]");
const modalImg2 = document.querySelector("[data-image2-img]");
const modalImg3 = document.querySelector("[data-image3-img]");
const modalImg4 = document.querySelector("[data-image4-img]");
const modalImg5 = document.querySelector("[data-image5-img]");
const modalImg6 = document.querySelector("[data-image6-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");
const modalLink1 = document.querySelector("[data-modal-link1]");
const modalLink2 = document.querySelector("[data-modal-link2]");

// modal toggle function
//const testimonialsModalFunc = function () {
//  modalContainer.classList.toggle("active");
//  overlay.classList.toggle("active");
//}

// modal toggle function
const portfolioModalFunc = function () {
    modalContainer.classList.toggle("active");
    overlay.classList.toggle("active");
}

// add click event to all modal items
//for (let i = 0; i < testimonialsItem.length; i++) {
//
//  testimonialsItem[i].addEventListener("click", function () {
//
//    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
//    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
//    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
//    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;
//
//    testimonialsModalFunc();
//
//  });
//
//}

// add click event to all modal items
for (let i = 0; i < portfolioItem.length; i++) {

    portfolioItem[i].addEventListener("click", function () {
        modalImg1.src = "";
        modalImg1.alt = "";
        modalImg2.src = "";
        modalImg2.alt = "";
        modalImg3.src = "";
        modalImg3.alt = "";
        modalImg4.src = "";
        modalImg4.alt = "";
        modalImg5.src = "";
        modalImg5.alt = "";
        modalImg6.src = "";
        modalImg6.alt = "";
        modalLink1.href = "";
        modalLink2.href = "";
        modalLink1.innerHTML = "";
        modalLink2.innerHTML = "";

        if (this.querySelector("[data-project-img1]") != null) {
            modalImg1.src = this.querySelector("[data-project-img1]").src;
            modalImg1.alt = this.querySelector("[data-project-img1]").alt;
        }

        if (this.querySelector("[data-project-img2]") != null) {
            modalImg2.src = this.querySelector("[data-project-img2]").src;
            modalImg2.alt = this.querySelector("[data-project-img2]").alt;
        }

        if (this.querySelector("[data-project-img3]") != null) {
            modalImg3.src = this.querySelector("[data-project-img3]").src;
            modalImg3.alt = this.querySelector("[data-project-img3]").alt;
        }

        if (this.querySelector("[data-project-img4]") != null) {
            modalImg4.src = this.querySelector("[data-project-img4]").src;
            modalImg4.alt = this.querySelector("[data-project-img4]").alt;
        }

        if (this.querySelector("[data-project-img5]") != null) {
            modalImg5.src = this.querySelector("[data-project-img5]").src;
            modalImg5.alt = this.querySelector("[data-project-img5]").alt;
        }

        if (this.querySelector("[data-project-img6]") != null) {
            modalImg6.src = this.querySelector("[data-project-img6]").src;
            modalImg6.alt = this.querySelector("[data-project-img6]").alt;
        }

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

        portfolioModalFunc();

    });

}

// add click event to modal close button
//modalCloseBtn.addEventListener("click", testimonialsModalFunc);
//overlay.addEventListener("click", testimonialsModalFunc);

// add click event to modal close button
modalCloseBtn.addEventListener("click", portfolioModalFunc);
overlay.addEventListener("click", portfolioModalFunc);

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