window.addEventListener('load', () =>  {
    setTimeout(() => {
        document.querySelector('.loading').classList.add('hidden')
    }, 1000);
})

const menuItems = document.querySelectorAll('.menu-item');
const header = document.querySelector('.header');
const footer = document.querySelector('.footer');
const menu = document.querySelector('.menu');
const contact = document.getElementById('contact');
const sections = document.querySelector('.layout-section');

let activeSection;
let isAnimating = false;
menuItems.forEach(item => {
    item.addEventListener('click', () => {
        if (isAnimating) return;
        isAnimating = true;

        activeSection = item.dataset.section;
        hidePageElements();
    });
});

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
        menu.style.display = 'none';
        footer.style.display = 'none';
        
        const targetSection = document.getElementById(activeSection);
        if (targetSection) {
            targetSection.classList.add('active');
        }

        isAnimating = false;
    }, 1000);

}


// Portfolio Category Filter Function
const filterButtons =  document.querySelectorAll('.portfolio-filters button')
const portfolioCards  = document.querySelectorAll('.portfolio-card');

function filterGallery(category, btn) {
    filterButtons.forEach(b => b.classList.remove('is-active'));
    btn.classList.add('is-active');

    portfolioCards.forEach(item => {
        if (category === 'all' || item.dataset.category === category) {
            item.style.display = 'block';
            item.style.animation = 'tabFade 0.4s ease-out';
        } else {
            item.style.display = 'none';
        }
    });
}

filterButtons.forEach(el => {
    el.addEventListener('click', () => {
        let selectedCategory = el.dataset.category;
        filterGallery(selectedCategory, el);
    });
})


// Contact Form Submission Handling
const form = document.querySelector('.contact-form');
const submitBtn = document.querySelector('.contact-form-submit');
const inputs = form.querySelectorAll('input, textarea');

async function sendMessage() {
    await new Promise(resolve => setTimeout(resolve, 2000));
}

function toggleButton(isSending) {
    submitBtn.disabled = isSending;
    submitBtn.textContent = isSending
        ? 'Sending...'
        : 'Send Message';
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const allFilled = [...inputs].every(input => input.value.trim() !== '');
    if (!allFilled) return;

    toggleButton(true);

    try {
        await sendMessage();
        form.reset();
        alert('🌿 Message sent successfully! We’ll sprout back to you soon.');
    } finally {
        toggleButton(false);
    }
});





