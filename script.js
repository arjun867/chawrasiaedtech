document.addEventListener("DOMContentLoaded", function () {
    
    // --- ON-SCROLL FADE-IN ANIMATION ---
    const fadeInSections = document.querySelectorAll('.fade-in-section');

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        rootMargin: '0px',
        threshold: 0.1 // A lower threshold to trigger earlier
    });

    fadeInSections.forEach(section => {
        sectionObserver.observe(section);
    });

    // --- TESTIMONIAL SLIDER ---
    const testimonials = [
        { name: "Sanak", text: "Chawrasia EdTech has an outstanding math teacher who truly knows how to bring the subject to life. Highly recommended!" },
        { name: "Rafia Naaz", text: "Fantastic teacher! Clear explanations and always help students grasp even the hardest concepts." },
        { name: "Ajay", text: "Takes extra care to explain each concept for proper understanding. Excellent communication skills and friendly." },
        { name: "Vaishali", text: "Good patience and good technique." },
        { name: "Imran", text: "The teacher of Chawrasia EdTech helped me with Engineering Mathematics. He makes sure I understand everything before moving on." }
    ];

    const slider = document.querySelector('.testimonial-slider');
    const dotsContainer = document.querySelector('.slider-dots');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    // This check ensures the script doesn't break on other pages
    if (slider && dotsContainer && prevBtn && nextBtn) {
        let currentSlide = 0;
        let autoSlideInterval;

        const populateSlider = () => {
            slider.innerHTML = '';
            dotsContainer.innerHTML = '';
            testimonials.forEach((testimonial, index) => {
                const slide = document.createElement('div');
                slide.classList.add('testimonial-item');
                slide.innerHTML = `
                    <p class="testimonial-text">"${testimonial.text}"</p>
                    <h4 class="testimonial-author">- ${testimonial.name}</h4>
                `;
                slider.appendChild(slide);

                const dot = document.createElement('span');
                dot.classList.add('dot');
                dot.dataset.slide = index;
                dotsContainer.appendChild(dot);
            });
        };

        populateSlider();

        const slides = document.querySelectorAll('.testimonial-item');
        const dots = document.querySelectorAll('.dot');

        const showSlide = (index) => {
            if (!slides.length) return;
            slider.style.transform = `translateX(-${index * 100}%)`;
            dots.forEach(dot => dot.classList.remove('active'));
            dots[index].classList.add('active');
            currentSlide = index;
        };

        const nextSlide = () => {
            if (!slides.length) return;
            let newIndex = currentSlide + 1;
            if (newIndex >= slides.length) newIndex = 0;
            showSlide(newIndex);
        };

        const prevSlide = () => {
            if (!slides.length) return;
            let newIndex = currentSlide - 1;
            if (newIndex < 0) newIndex = slides.length - 1;
            showSlide(newIndex);
        };

        const startAutoSlide = () => {
            stopAutoSlide(); // Clear any existing interval
            autoSlideInterval = setInterval(nextSlide, 7000);
        };

        const stopAutoSlide = () => {
            clearInterval(autoSlideInterval);
        };

        nextBtn.addEventListener('click', () => {
            nextSlide();
            stopAutoSlide();
            startAutoSlide();
        });

        prevBtn.addEventListener('click', () => {
            prevSlide();
            stopAutoSlide();
            startAutoSlide();
        });

        dots.forEach(dot => {
            dot.addEventListener('click', (e) => {
                const slideIndex = parseInt(e.target.dataset.slide);
                showSlide(slideIndex);
                stopAutoSlide();
                startAutoSlide();
            });
        });

        showSlide(0);
        startAutoSlide();
    }
});