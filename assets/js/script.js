'use strict';

// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

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

const copyItem = document.querySelectorAll("[data-info-copy]");
const eyeItem = document.querySelectorAll(".project-item-icon-box");

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

        //Add videos for this portfolio item
        let projectVideos = this.querySelectorAll("[data-project-video]");
        for (let projVid of projectVideos) {
            let item = modalImgList.appendChild(document.createElement('li'));
            item.className = "modal-item";
            let vid = item.appendChild(document.createElement('video'));
            vid.controls = true;
            let source = vid.appendChild(document.createElement('source'));
            let vidSrc = projVid.querySelector("source");
            source.src = vidSrc.src;
            source.type = vidSrc.type;
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

function fallbackCopyTextToClipboard(text) {
    var textArea = document.createElement("textarea");
    textArea.value = text;

    // Avoid scrolling to bottom
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        var successful = document.execCommand('copy');
        var msg = successful ? 'successful' : 'unsuccessful';
        console.log('Fallback: Copying text command was ' + msg);
    } catch (err) {
        console.error('Fallback: Oops, unable to copy', err);
    }

    document.body.removeChild(textArea);
}
function copyTextToClipboard(text) {
    if (!navigator.clipboard) {
        fallbackCopyTextToClipboard(text);
        return;
    }
    navigator.clipboard.writeText(text);
}

const tooltip = document.querySelector('.tooltip-text');
for (let i = 0; i < copyItem.length; i++) {
    copyItem[i].addEventListener('click', function (event) {
        copyTextToClipboard('Mathew Tomberlin');
        tooltip.style.background = 'rgb(50,255,50)';
        tooltip.textContent = 'Copied!';
    });
    copyItem[i].addEventListener('mouseover', function (event) {
        document.body.style.cursor = 'cell';
        tooltip.textContent = 'Copy?';
        tooltip.style.background = 'rgb(150,150,150)';
    });
    copyItem[i].addEventListener('mouseout', function (event) {
        document.body.style.cursor = 'default';
    });
    copyItem[i].addEventListener('mousemove', function (event) {
        tooltip.style.left = (event.pageX + 10) + 'px';
        tooltip.style.top = (event.pageY - 30) + 'px';
        tooltip.style.display = 'block';
    });
    copyItem[i].addEventListener('mouseout', function (event) {
        tooltip.style.display = 'none';
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