function $ (q) {return document.querySelector(q); }

if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('~/main-sw.js').then(function(registration) {
        // Registration was successful
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      }, function(err) {
        // registration failed :(
        console.log('ServiceWorker registration failed: ', err);
      });
    });
  }

  const menu = document.querySelector(".menu");
  let menuVisible = false;
  
  const toggleMenu = command => {
    menu.style.display = command === "show" ? "block" : "none";
    menuVisible = !menuVisible;
  };
  
  const setPosition = ({ top, left }) => {
    menu.style.left = `${left}px`;
    menu.style.top = `${top}px`;
    toggleMenu("show");
  };
  
  window.addEventListener("click", e => {
    if(menuVisible)toggleMenu("hide");
  });
  
const NO_DISPLAY = 'display:none;';
const NONE = '';

  window.addEventListener("contextmenu", e => {
    e.preventDefault();
    if (!clickedButton) return;
    const origin = {
      left: e.pageX,
      top: e.pageY
    };
    setPosition(origin);
    $('#menu-remove').setAttribute('style', (clickedButton ? NONE : NO_DISPLAY));
    $('#menu-open').setAttribute('style', (clickedButton ? NONE : NO_DISPLAY));
    $('#menu-openWin').setAttribute('style', (clickedButton ? NONE : NO_DISPLAY));
    $('#menu-openApp').setAttribute('style', (clickedButton ? NONE : NO_DISPLAY));
    return false;
  });
