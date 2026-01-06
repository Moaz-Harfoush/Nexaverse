window.addEventListener('load', () =>  {
    setTimeout(() => {
        document.querySelector('.loading').classList.add('hidden')
    }, 1000);
})

const menuItems = document.querySelectorAll('.menu-item');
const header = document.querySelector('.header');
const footer = document.querySelector('.footer');

function hidePageElements() {
    // Prepare menu items: reset opacity and stop any animation
    menuItems.forEach(item => {
        item.style.opacity = '1';
        item.style.animation = 'none';
    });

    // Exit menu items with stagger effect (delay each one)
    menuItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.transition = 'all 0.4s ease-out';
            item.style.opacity = '0';
            item.style.transform = 'translateY(40px) scale(0.9)';
        }, index * 100); 
    });

    // Prepare header and footer: reset opacity and stop animation
    header.style.animation = 'none';
    header.style.opacity = '1';
    footer.style.animation = 'none';
    footer.style.opacity = '1';

    // Force browser to recalc layout to make transitions smooth
    void header.offsetWidth;

    // Fade out header and footer
    header.style.transition = 'opacity 0.4s ease';
    header.style.opacity = '0';
    footer.style.transition = 'opacity 0.4s ease';
    footer.style.opacity = '0';

    // After all animations complete, hide elements completely
    setTimeout(() => {
        header.style.display = 'none';
        menuItems.style.display = 'none';
        footer.style.display = 'none';
    }, 1000);

}


