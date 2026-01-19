window.addEventListener('load', () =>  {
    setTimeout(() => {
        document.querySelector('.loading').classList.add('hidden');
    }, 1000);
})

const menuItems = document.querySelectorAll('.menu-item');
const header = document.querySelector('.header');
const footer = document.querySelector('.footer');
const menu = document.querySelector('.menu');
const backBtn = document.querySelectorAll('.back-btn');

let sectionId;
let isAnimating = false;

menuItems.forEach(item => {
    item.addEventListener('click', () => {
        if (isAnimating) return;
        isAnimating = true;

        sectionId = item.dataset.section;
        window.scrollTo({ top: 0, behavior: 'smooth' });
        hideMenu();
    });
});

// Hide the menu with animations and then show the active section
function hideMenu() {
    menuItems.forEach(item => {
        item.style.opacity = '1';
        item.style.animation = 'none';
    });

    menuItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.transition = 'all 0.4s ease-out';
            item.style.opacity = '0';
            item.style.transform = 'translateY(40px) scale(0.9)';
        }, index * 100); 
    });

    header.style.animation = 'none';
    header.style.opacity = '1';
    footer.style.animation = 'none';
    footer.style.opacity = '1';

    void header.offsetWidth;

    header.style.transition = 'opacity 0.4s ease';
    header.style.opacity = '0';
    footer.style.transition = 'opacity 0.4s ease';
    footer.style.opacity = '0';

    setTimeout(() => {
        header.style.display = 'none';
        menu.style.display = 'none';
        footer.style.display = 'none';
        
        showActiveSection();

    }, 1000);   

}

// Show the section corresponding to the clicked menu item
function showActiveSection() {

    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
    }

    // Animate stats if introduction section
    if (sectionId === 'introduction') {
        setTimeout(animateStats, 500);
    }

    isAnimating = false;

}

// Hide the currently active section and reset its styles
function hideActiveSection() {

    const activeSection = document.querySelector('.layout-section.active');
    if (!activeSection) return;

    activeSection.style.animation = 'none';
    activeSection.style.opacity = '1';

    void activeSection.offsetWidth;

    activeSection.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    activeSection.style.opacity = '0';
    activeSection.style.transform = 'translateY(-20px)';

    setTimeout(() => {
        activeSection.classList.remove('active');

        showMainMenu();

        activeSection.style.animation = '';
        activeSection.style.opacity = '';
        activeSection.style.transform = '';
        activeSection.style.transition = '';

    }, 1000);

}

// Show the main menu and animate its items back in
function showMainMenu() {
    header.style.display = 'block';
    menu.style.display = 'grid';
    footer.style.display = 'flex';

    header.style.opacity = '0';
    footer.style.opacity = '0';

    void header.offsetWidth;

    header.style.transition = 'opacity 0.4s ease';
    footer.style.transition = 'opacity 0.4s ease';

    header.style.opacity = '1';
    footer.style.opacity = '1';

    menuItems.forEach((item, index) => {
        item.style.display = 'flex';
        item.style.opacity = '0';
        item.style.transform = 'translateY(40px) scale(0.9)';

        setTimeout(() => {
            item.style.transition = 'all 0.4s ease-out';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0) scale(1)';
        }, index * 100);
    });
}

backBtn.forEach(el => {
    el.addEventListener('click', () => {
        hideActiveSection();
    })
})


// Animate stats of introduction section
function animateStats() {
    const metricValues = document.querySelectorAll('.metrics-value[data-target]');
    metricValues.forEach((el, index) => {
        setTimeout(() => {
            const target = parseInt(el.dataset.target);
            let current = 0;
            const increment = target / 40;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                el.textContent = Math.floor(current);
            }, 30);
        }, index * 200);
    })
}

// Global Category Filtering for Portfolio and Services Sections
const tabBtn = document.querySelectorAll('.tab-btn');
const servicesItems = document.querySelectorAll('.services-item');
const portfolioFilter = document.querySelectorAll('.portfolio-filter');
const portfolioCards  = document.querySelectorAll('.portfolio-card');

function filterElements(parentOfBtn, elements, category, btn) {
    parentOfBtn.forEach(el => el.classList.remove('is-active'));
    btn.classList.add('is-active');

    elements.forEach(el => {
        if (category === 'all' || el.dataset.category === category) {
            el.style.display = 'flex';
            el.style.animation = 'tabFade 0.4s ease-out';
        } else {
            el.style.display = 'none';
        }
    });
}

function handleFilter(buttons, items) {
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const selectedCategory = btn.dataset.category;
            filterElements(buttons, items, selectedCategory, btn);
        });
    });
}

handleFilter(tabBtn, servicesItems);
handleFilter(portfolioFilter, portfolioCards);


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