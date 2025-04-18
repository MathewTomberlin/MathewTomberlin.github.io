'use strict';

// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

const portfolioItem = document.querySelectorAll("[data-portfolio-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImgList = document.querySelector("[data-modal-img-list]");
const modalImgListArrowL = document.querySelector("[data-modal-img-list-arrow-l]");
const modalImgListArrowR = document.querySelector("[data-modal-img-list-arrow-r]");
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
    if (!modalContainer.classList.contains('active')){
        sessionStorage.removeItem("project");
    }
    setTimeout(setupScroll, 10);
}

const loadModal = function (i) {
    var item = portfolioItem[i];

    modalLink1.href = "";
    modalLink2.href = "";
    modalLink1.innerHTML = "";
    modalLink2.innerHTML = "";

    // Clear old images in modal
    let nodes = modalImgList.childNodes;
    for(let nodeIndex = nodes.length-1; nodeIndex >= 0; nodeIndex--) {
        let node = nodes[nodeIndex];
        node.remove();
    }

    //Add videos for this portfolio item
    let projectVideos = item.querySelectorAll("[data-project-video]");
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

    //Add images for this portfolio item
    let projectImages = item.querySelectorAll("[data-project-img]");
    for (let projImg of projectImages) {
        let item = modalImgList.appendChild(document.createElement('li'));
        item.className = "modal-item";
        let img = item.appendChild(document.createElement('img'));
        img.src = projImg.src;
        img.alt = projImg.alt;
        img.className = "modal-img";
    }

    //Update link1 and link2
    modalTitle.innerHTML = item.querySelector("[data-project-title]").innerHTML;
    modalText.innerHTML = item.querySelector("[data-project-text]").innerHTML;
    if (item.querySelector("[data-project-link1]") != null) {
        modalLink1.href = item.querySelector("[data-project-link1]").href;
        modalLink1.innerHTML = item.querySelector("[data-project-link1]").innerHTML;
    }

    if (item.querySelector("[data-project-link2]") != null) {
        modalLink2.href = item.querySelector("[data-project-link2]").href;
        modalLink2.innerHTML = item.querySelector("[data-project-link2]").innerHTML;
    }

    modalImgList.scrollTo(0, 0);
    toggleModalShown();
};

// add click event to all modal items
for (let i = 0; i < portfolioItem.length; i++) {
    portfolioItem[i].addEventListener("click", function () {
        var projNameEl = this.querySelector("[data-project-title]");
        var projName = null;
        if (projNameEl !== null) {
            projName = projNameEl.textContent;
        }

        if (projName !== null) {
            loadModal(i);
            sessionStorage.setItem("project", projName);
        }
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
    let loaded = "";
    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
        loaded = this.innerHTML.toLowerCase();
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }
    if (loaded !== "") {
        sessionStorage.setItem("page", pages[i].dataset.page);
    }
  });
}

window.onload = function () {
    var loadedPage = sessionStorage.getItem("page");
    if (loadedPage !== null) {
        for (let i = 0; i < pages.length; i++) {
            if (loadedPage === pages[i].dataset.page) {
                pages[i].classList.add("active");
                navigationLinks[i].classList.add("active");
                window.scrollTo(0, 0);
            } else {
                pages[i].classList.remove("active");
                navigationLinks[i].classList.remove("active");
            }
        }
    }

    var proj = sessionStorage.getItem("project");
    if (proj !== null) {
        for (let i = 0; i < portfolioItem.length; i++) {
            var projNameEl = portfolioItem[i].querySelector("[data-project-title]");
            if (projNameEl !== null) {
                var projName = projNameEl.textContent;
                if (proj === projName) {
                    loadModal(i);
                }
            }
        }
    }
};

window.addEventListener("beforeunload", () => {
    sessionStorage.setItem("scrollPosition", window.scrollY);
});

window.addEventListener("load", () => {
    const scrollPosition = sessionStorage.getItem("scrollPosition");
    if (scrollPosition !== null) {
        window.scrollTo(0, parseInt(scrollPosition, 10));
    }
});

window.addEventListener("resize", () => {
    updateScrollArrows();
});

modalImgList.addEventListener("scroll", (event) => {
    updateScrollArrows();
});

function setupScroll() {
    const scrollLength = modalImgList.clientWidth - modalImgList.scrollWidth;
    if (scrollLength >= 0) {
        modalImgListArrowR.classList.remove('active');
    } else {
        modalImgListArrowR.classList.add('active');
    }
}

function updateScrollArrows() {
    const barPos = modalImgList.scrollLeft;
    const scrollLength = modalImgList.clientWidth - modalImgList.scrollWidth;
    const scrollAmount = Math.abs(barPos / scrollLength);
    if (scrollLength >= 0) {
        modalImgListArrowL.classList.remove('active');
        modalImgListArrowR.classList.remove('active');
    } else {
        if (scrollAmount >= 0.95) {
            modalImgListArrowR.classList.remove('active');
        } else {
            modalImgListArrowR.classList.add('active');
        }

        if (scrollAmount <= 0) {
            modalImgListArrowL.classList.remove('active');
        } else {
            modalImgListArrowL.classList.add('active');
        }
    }
}