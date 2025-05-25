document.querySelectorAll('.faq details').forEach((item) => {
  item.addEventListener('toggle', (event) => {
    if (event.target.open) {
      document.querySelectorAll('.faq details').forEach((otherItem) => {
        if (otherItem !== event.target) {
          otherItem.removeAttribute('open');
        }
      });
    }
  });
});


const slider = document.querySelector('.slider');
const prevButton = document.querySelector('.prev-button');
const nextButton = document.querySelector('.next-button');
const slides = Array.from(slider.querySelectorAll('img'));
const slideCount = slides.length;
let slideIndex = 0;

prevButton.addEventListener('click', showPreviousSlide);
nextButton.addEventListener('click', showNextSlide);

function showPreviousSlide() {
  slideIndex = (slideIndex - 1 + slideCount) % slideCount;
  updateSlider();
}

function showNextSlide() {
  slideIndex = (slideIndex + 1) % slideCount;
  updateSlider();
}

function updateSlider() {
  slides.forEach((slide, index) => {
    if (index === slideIndex) {
      slide.style.display = 'block';
    } else {
      slide.style.display = 'none';
    }
  });
}

updateSlider();


const banner = document.querySelector('.main-banner');
const header = document.querySelector('header');
const bannerWrapper = document.querySelector('.wrapper-banner');

function checkBannerPosition() {
    // Get the height of the header and the banner wrapper
    const headerHeight = header.offsetHeight;
    const bannerHeight = bannerWrapper.offsetHeight;

    // Get the current scaling factor
    const zoomLevel = window.devicePixelRatio || 1;

    // Declare padding based on zoom level
    let padding;

    if (zoomLevel > 1 && zoomLevel <= 1.5) {
        padding = headerHeight + 50;  // Adjust as needed for this zoom level
    } else if (zoomLevel > 1.5 && zoomLevel <= 2) {
        padding = headerHeight + 70; // Adjust as needed for this zoom level
    } else if (zoomLevel > 2) {
        padding = headerHeight + 90; // Adjust as needed for this zoom level
    } else {
        padding = 0; // Reset padding for normal zoom level
    }

    // Adjust styles based on the computed padding
    banner.style.paddingTop = `${padding}px`;
    bannerWrapper.style.height = zoomLevel > 1 ? `${bannerHeight + 1}px` : '100vh';
}

window.onload = checkBannerPosition;
window.onresize = checkBannerPosition;
window.addEventListener('orientationchange', checkBannerPosition);

checkBannerPosition();