let listBg = document.querySelectorAll('.bg');
let banner = document.querySelector('.banner');
let tabs = document.querySelectorAll('.tab');
let container = document.querySelector('.container');
let heightDefault = container.offsetHeight;
let topBefore = 0;
let body = document.querySelector('body');

window.addEventListener('wheel', function(event){
    event.preventDefault();
    const scrollSpeed = 0.2;
    const scrollValue = window.scrollY + (event.deltaY/3) * scrollSpeed;
    window.scrollTo(0, scrollValue);



    let top = scrollValue;
    listBg.forEach((bg, index) => {
        if(index != 0){
            bg.animate({
                transform: `translateY(${(-top*index)}px)`
            }, { duration: 1000, fill: "forwards" });
        }
        if(index == listBg.length - 1){
            tabs.forEach(tab => {
                tab.animate({
                    transform: `translateY(${(-top*index)}px)`
                }, { duration: 500, fill: "forwards" });
            })

            if(topBefore < top){
                setHeight = heightDefault-window.scrollY*index;
                container.animate({
                    height: `${(setHeight + 100)}px`
                }, { duration: 50, fill: "forwards" });
                topBefore = window.scrollY;
            }
        }
        tabs.forEach((tab, index) => {
            if((tab.offsetTop - top) <= window.innerHeight*(index+1)){
                let content = tab.getElementsByClassName('content')[0];
                let transformContent = window.innerHeight*(index+1) - (tab.offsetTop - top);
                console.log(tab);
                content.animate({
                    transform: `translateY(${(-transformContent + (100*index))}px)`
                }, { duration: 500, fill: "forwards" });
            }
        })
    })
}, { passive: false });


function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function checkScrollDirectionAndAnimateImages() {
    const images = document.querySelectorAll('.portrait-images img');
    images.forEach(img => {
        const rect = img.getBoundingClientRect();
        const isVisible = (rect.top + rect.height > 0) && (rect.top < window.innerHeight);
        if (isVisible) {
            img.classList.add('fade-in-scroll-visible');
        } else {
            img.classList.remove('fade-in-scroll-visible');
        }
    });
}

document.addEventListener('DOMContentLoaded', checkScrollDirectionAndAnimateImages);
window.addEventListener('scroll', checkScrollDirectionAndAnimateImages);
let lastScroll = 0;
const footer = document.querySelector('.footer');

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll <= 0) {
    footer.classList.remove('footer-animate-up', 'footer-animate-down');
    return;
  }
  
  if (currentScroll > lastScroll && !footer.classList.contains('footer-animate-up')) {
    footer.classList.remove('footer-animate-down');
    footer.classList.add('footer-animate-up');
  } else if (currentScroll < lastScroll && footer.classList.contains('footer-animate-up')) {
    footer.classList.remove('footer-animate-up');
    footer.classList.add('footer-animate-down');
  }

  lastScroll = currentScroll;
});
