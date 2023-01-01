// Hamburger menu

const menuIcon = document.querySelector('.menu__icon');
const menuNav = document.querySelector('.menu__nav');
const main = document.querySelector('main');
if (menuIcon) {
    menuIcon.addEventListener("click", () => {
        document.body.classList.toggle('lock');
        menuIcon.classList.toggle('active');
        menuNav.classList.toggle('active');
        main.classList.toggle('cover');
    });
}


// Scrolling on click

const hLogo = document.querySelector('.header__logo');
hLogo.addEventListener("click", (e) => {
    if (menuIcon.classList.contains('active')) {
        closeMenu();
    }
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
    e.preventDefault();
});

const navLinks = document.querySelectorAll('.nav-link[data-goto]');
if (navLinks.length > 0) {
    navLinks.forEach(navLink => {
        navLink.addEventListener("click", onNavLinkClick);
    });

    function onNavLinkClick(e) {
        const navLink = e.target;
        if (navLink.dataset.goto && document.querySelector(navLink.dataset.goto)) {
            const gotoBlock = document.querySelector(navLink.dataset.goto);
            let gotoBlockValue = gotoBlock.getBoundingClientRect().top + scrollY - document.querySelector('header').offsetHeight;

            if (menuIcon.classList.contains('active')) {
                closeMenu();
            }

            window.scrollTo({
                top: gotoBlockValue,
                behavior: "smooth",
            });
            e.preventDefault();
        }
    }
}

function closeMenu() {
    document.body.classList.remove('lock');
    menuIcon.classList.remove('active');
    menuNav.classList.remove('active');
    main.classList.remove('cover');
}


// Hide / show header on scrolling

let lastScroll = 0;
const defaultOffset = 84;
const header = document.querySelector('header');

const scrollPosition = () => window.scrollY || document.documentElement.scrollTop;
const containsHide = (e) => e.classList.contains('hide');

window.addEventListener('scroll', () => {
    if (scrollPosition() > lastScroll && !containsHide(header) && scrollPosition() > defaultOffset) { // scroll down
        header.classList.add('hide');
        console.log('down');
    } else if (scrollPosition() < lastScroll && containsHide(header)) { // scroll up
        header.classList.remove('hide');
        console.log('up');
    }
    lastScroll = scrollPosition();
})