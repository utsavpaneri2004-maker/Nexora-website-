/*====================================================
NEXORA AI - MAIN JS (PART 1)
====================================================*/

document.addEventListener("DOMContentLoaded", () => {

    /*=========================
    Sticky Navbar
    =========================*/

    const header = document.querySelector("header");

    window.addEventListener("scroll", () => {

        if (!header) return;

        if (window.scrollY > 80) {

            header.classList.add("sticky");

        } else {

            header.classList.remove("sticky");

        }

    });


    /*=========================
    Smooth Scroll
    =========================*/

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener("click", function (e) {

            const target = document.querySelector(this.getAttribute("href"));

            if (!target) return;

            e.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });


    /*=========================
    Active Navigation
    =========================*/

    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll("nav ul li a");

    function activeMenu() {

        let scrollY = window.pageYOffset;

        sections.forEach(section => {

            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 120;
            const id = section.getAttribute("id");

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {

                navLinks.forEach(link => {

                    link.classList.remove("active");

                    if (link.getAttribute("href") === "#" + id) {

                        link.classList.add("active");

                    }

                });

            }

        });

    }

    window.addEventListener("scroll", activeMenu);


    /*=========================
    Counter Animation
    =========================*/

    const counters = document.querySelectorAll(".counter");

    const counterObserver = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            const counter = entry.target;
            const target = Number(counter.dataset.target);

            let count = 0;

            const update = () => {

                const increment = Math.ceil(target / 60);

                if (count < target) {

                    count += increment;

                    if (count > target) count = target;

                    counter.innerText = count + "+";

                    requestAnimationFrame(update);

                } else {

                    counter.innerText = target + "+";

                }

            };

            update();

            counterObserver.unobserve(counter);

        });

    });

    counters.forEach(counter => {

        counterObserver.observe(counter);

    });


    /*=========================
    Scroll Reveal Animation
    =========================*/

    const revealItems = document.querySelectorAll(

        ".why-card,.pricing-card,.portfolio-card,.testimonial-card,.stat-card,.faq-item,.brand-grid div,.tool-grid div"

    );

    const revealObserver = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

            }

        });

    }, {

        threshold: 0.15

    });

    revealItems.forEach(item => {

        revealObserver.observe(item);

    });


    /*=========================
    Portfolio Filter
    =========================*/

    const filterBtns = document.querySelectorAll(".filter-btn");
    const cards = document.querySelectorAll(".portfolio-card");

    filterBtns.forEach(btn => {

        btn.addEventListener("click", () => {

            filterBtns.forEach(b => b.classList.remove("active"));

            btn.classList.add("active");

            const filter = btn.dataset.filter;

            cards.forEach(card => {

                if (filter === "all") {

                    card.style.display = "block";

                } else {

                    if (card.classList.contains(filter)) {

                        card.style.display = "block";

                    } else {

                        card.style.display = "none";

                    }

                }

            });

        });

    });

});
/*====================================================
NEXORA AI - MAIN JS (PART 2)
====================================================*/

/*=========================
Image Lightbox
=========================*/

const portfolioImages = document.querySelectorAll(".portfolio-image img");
const lightbox = document.querySelector(".lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeLightbox = document.querySelector(".close-lightbox");

if (lightbox && lightboxImg && closeLightbox) {

    portfolioImages.forEach(img => {

        img.addEventListener("click", () => {

            lightbox.style.display = "flex";
            lightboxImg.src = img.src;

        });

    });

    closeLightbox.addEventListener("click", () => {

        lightbox.style.display = "none";

    });

    lightbox.addEventListener("click", (e) => {

        if (e.target === lightbox) {

            lightbox.style.display = "none";

        }

    });

}


/*=========================
Video Hover Autoplay
=========================*/

const videoCards = document.querySelectorAll(".video-card");

videoCards.forEach(card => {

    const video = card.querySelector("video");

    if (!video) return;

    card.addEventListener("mouseenter", () => {

        video.play().catch(() => {});

    });

    card.addEventListener("mouseleave", () => {

        video.pause();
        video.currentTime = 0;

    });

});


/*=========================
Video Popup
=========================*/

const modal = document.getElementById("videoModal");
const popupVideo = document.getElementById("popupVideo");
const closeVideo = document.querySelector(".close-video");

if (modal && popupVideo && closeVideo) {

    videoCards.forEach(card => {

        card.addEventListener("click", () => {

            popupVideo.src = card.dataset.video;

            popupVideo.load();

            modal.classList.add("active");

            popupVideo.play().catch(() => {});

        });

    });

    function closePopup() {

        popupVideo.pause();
        popupVideo.currentTime = 0;
        popupVideo.src = "";

        modal.classList.remove("active");

    }

    closeVideo.addEventListener("click", closePopup);

    modal.addEventListener("click", (e) => {

        if (e.target === modal) {

            closePopup();

        }

    });

    document.addEventListener("keydown", (e) => {

        if (e.key === "Escape") {

            closePopup();

        }

    });

}


/*=========================
FAQ Accordion
=========================*/

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {

    const answer = item.querySelector("p");

    if (!answer) return;

    answer.style.display = "none";

    item.addEventListener("click", () => {

        const isOpen = answer.style.display === "block";

        document.querySelectorAll(".faq-item p").forEach(p => {

            p.style.display = "none";

        });

        if (!isOpen) {

            answer.style.display = "block";

        }

    });

});
/*====================================================
NEXORA AI - MAIN JS (PART 3)
====================================================*/


/*=========================
Scroll Progress Bar
=========================*/

const progress = document.querySelector(".scroll-progress");

window.addEventListener("scroll", () => {

    if (!progress) return;

    const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;

    const progressWidth =
        (window.pageYOffset / totalHeight) * 100;

    progress.style.width = progressWidth + "%";

});


/*=========================
Back To Top
=========================*/

const topBtn = document.querySelector(".back-to-top");

window.addEventListener("scroll", () => {

    if (!topBtn) return;

    if (window.scrollY > 400) {

        topBtn.classList.add("show");

    } else {

        topBtn.classList.remove("show");

    }

});

if (topBtn) {

    topBtn.addEventListener("click", () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

}


/*=========================
Button Ripple Effect
=========================*/

document.querySelectorAll(".btn,.btn-outline").forEach(btn => {

    btn.addEventListener("click", function (e) {

        const ripple = document.createElement("span");

        const rect = this.getBoundingClientRect();

        ripple.style.left = e.clientX - rect.left + "px";
        ripple.style.top = e.clientY - rect.top + "px";

        ripple.classList.add("ripple");

        this.appendChild(ripple);

        setTimeout(() => {

            ripple.remove();

        }, 600);

    });

});


/*=========================
Contact Form
=========================*/

const form = document.querySelector(".contact-form");

if (form) {

    form.addEventListener("submit", function (e) {

        e.preventDefault();

        alert("Thank you! Your message has been sent.");

        form.reset();

    });

}


/*=========================
Typing Hero Title
=========================*/

const heroTitle = document.querySelector(".hero h1");

if (heroTitle) {

    const text = heroTitle.innerText;

    heroTitle.innerText = "";

    let i = 0;

    function typing() {

        if (i < text.length) {

            heroTitle.innerHTML += text.charAt(i);

            i++;

            setTimeout(typing, 40);

        }

    }

    typing();

}


/*=========================
Parallax Hero
=========================*/

const hero = document.querySelector(".hero");

window.addEventListener("scroll", () => {

    if (!hero) return;

    hero.style.backgroundPositionY =
        window.pageYOffset * 0.4 + "px";

});


/*=========================
Portfolio Hover Zoom
=========================*/

document.querySelectorAll(".portfolio-card").forEach(card => {

    card.addEventListener("mouseenter", () => {

        card.style.transform = "translateY(-12px)";

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform = "translateY(0)";

    });

});


/*=========================
Console
=========================*/

console.log("🚀 Nexora AI Loaded Successfully");