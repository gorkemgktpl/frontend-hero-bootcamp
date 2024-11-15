document.addEventListener('DOMContentLoaded', function () {

    const numKampanyalar = document.getElementById('kampanyalar').querySelectorAll('.slide').length;
    const numReklamlar = document.getElementById('reklamlar').querySelectorAll('.slide').length;
    const numOneCikanlar = document.getElementById('one-cikanlar').querySelectorAll('.slide').length;
    const numDots = {
        'kampanyalar': numKampanyalar,
        'reklamlar': numReklamlar,
        'one-cikanlar': numOneCikanlar,
    };

    addNavDots(numDots['kampanyalar']);

    window.addEventListener('scroll', function () {
        const header = document.querySelector('.header');
        header.classList.toggle('scrolled', window.scrollY > 50);
    });

    const sliderButtons = document.querySelectorAll('.slider-buttons button');
    const sliders = document.querySelectorAll('.slider');

    function addNavDots(numDots) {
        const navDotContainer = document.getElementById('navigation-dots');
        const existingDots = navDotContainer.querySelectorAll(".nav-dot");
        existingDots.forEach(element => navDotContainer.removeChild(element));
        for (let i = 0; i < numDots; i++) {
            const dot = document.createElement('div');
            dot.classList.add('nav-dot');
            if (i === 0) {
                dot.classList.add('active');
            }
            navDotContainer.appendChild(dot);
        }

        document.querySelectorAll('.nav-dot').forEach((dot, index) => {
            dot.addEventListener('click', () => {
                const activeSlider = document.querySelector('.slider.active');

                let currentSlide = activeSlider.querySelectorAll('.slide.active');
                currentSlide[0].classList.remove('active');

                let currentDot = document.querySelectorAll('.nav-dot.active');
                currentDot[0].classList.remove('active');

                activeSlider.querySelectorAll('.slide')[index].classList.add('active');
                document.querySelectorAll('.nav-dot')[index].classList.add('active');
            });
        });
    }

    // Slider değiştirme fonksiyonu
    function changeSlider(sliderId) {
        sliderButtons.forEach(button => button.classList.remove('active'));
        sliders.forEach(slider => slider.classList.remove('active'));

        const activeButton = document.querySelector(`[data-slider="${sliderId}"]`);
        const activeSlider = document.getElementById(sliderId);

        activeButton.classList.add('active');
        activeSlider.classList.add('active');

        addNavDots(numDots[sliderId]);
        resetSlides(activeSlider);
    }

    // Slide değiştirme fonksiyonu
    function changeSlide(slider, direction) {
        const slides = slider.querySelectorAll('.slide');
        const dots = document.querySelectorAll('.nav-dot');
        let currentIndex = Array.from(slides).findIndex(slide => slide.classList.contains('active'));

        slides[currentIndex].classList.remove('active');
        dots[currentIndex].classList.remove('active');

        currentIndex = direction === 'next' ?
            (currentIndex + 1) % slides.length :
            (currentIndex - 1 + slides.length) % slides.length;

        slides[currentIndex].classList.add('active');
        dots[currentIndex].classList.add('active');
    }

    // Slider'ı ilk durumuna getir
    function resetSlides(slider) {
        const slides = slider.querySelectorAll('.slide');
        const dots = document.querySelectorAll('.nav-dot');

        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        slides[0]?.classList.add('active');
        dots[0]?.classList.add('active');
    }

    // Event Listeners
    sliderButtons.forEach(button => {
        button.addEventListener('click', () => {
            changeSlider(button.dataset.slider);
        });
    });

    document.querySelectorAll('.prev-arrow, .next-arrow').forEach(arrow => {
        arrow.addEventListener('click', () => {
            const activeSlider = document.querySelector('.slider.active');
            changeSlide(activeSlider, arrow.classList.contains('next-arrow') ? 'next' : 'prev');
        });
    });
});

