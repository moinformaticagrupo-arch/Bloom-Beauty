```javascript
/* ==========================================================
   BLOOM BEAUTY
   SCRIPT.JS
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ======================================================
       ELEMENTOS
    ====================================================== */

    const header = document.querySelector(".header");
    const menuToggle = document.querySelector(".menu-toggle");
    const navbar = document.querySelector(".navbar");

    const backToTop = document.querySelector(".back-to-top");

    const galleryItems = document.querySelectorAll(".gallery-item");
    const galleryFilters = document.querySelectorAll(".gallery-filter");

    const lightbox = document.querySelector(".lightbox");
    const lightboxImage = document.querySelector(".lightbox-content img");
    const lightboxCaption = document.querySelector(".lightbox-caption");

    const lightboxClose = document.querySelector(".lightbox-close");
    const lightboxPrev = document.querySelector(".lightbox-prev");
    const lightboxNext = document.querySelector(".lightbox-next");

    const bookingForm = document.querySelector(".booking-form");


    /* ======================================================
       HEADER AL HACER SCROLL
    ====================================================== */

    function updateHeader() {

        if (!header) return;

        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    }

    window.addEventListener("scroll", updateHeader);

    updateHeader();


    /* ======================================================
       MENÚ MOBILE
    ====================================================== */

    if (menuToggle && navbar) {

        menuToggle.addEventListener("click", () => {

            navbar.classList.toggle("active");

            document.body.classList.toggle("no-scroll");

            const icon = menuToggle.querySelector("i");

            if (icon) {

                if (navbar.classList.contains("active")) {

                    icon.classList.remove("fa-bars");
                    icon.classList.add("fa-xmark");

                } else {

                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");
                }
            }
        });


        /* Cerrar menú al tocar un enlace */

        const navLinks = navbar.querySelectorAll("a");

        navLinks.forEach(link => {

            link.addEventListener("click", () => {

                navbar.classList.remove("active");

                document.body.classList.remove("no-scroll");

                const icon = menuToggle.querySelector("i");

                if (icon) {

                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");
                }
            });

        });
    }


    /* ======================================================
       ENLACES DEL NAVBAR
       MARCAR SECCIÓN ACTIVA
    ====================================================== */

    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".navbar a[href^='#']");

    function updateActiveLink() {

        let currentSection = "";

        sections.forEach(section => {

            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionTop + sectionHeight
            ) {
                currentSection = section.getAttribute("id");
            }

        });

        navLinks.forEach(link => {

            link.classList.remove("active");

            const href = link.getAttribute("href");

            if (href === `#${currentSection}`) {
                link.classList.add("active");
            }

        });
    }

    window.addEventListener("scroll", updateActiveLink);

    updateActiveLink();


    /* ======================================================
       GALERÍA - FILTROS
    ====================================================== */

    let visibleGalleryItems = [];

    function updateVisibleGalleryItems() {

        visibleGalleryItems = Array.from(galleryItems)
            .filter(item => {

                return window.getComputedStyle(item).display !== "none";

            });
    }


    galleryFilters.forEach(filter => {

        filter.addEventListener("click", () => {

            /* Quitar active */

            galleryFilters.forEach(button => {
                button.classList.remove("active");
            });

            /* Activar botón */

            filter.classList.add("active");

            const category = filter.dataset.filter;

            galleryItems.forEach(item => {

                const itemCategory = item.dataset.category;

                if (
                    category === "all" ||
                    category === "*" ||
                    itemCategory === category
                ) {

                    item.classList.remove("hidden");

                } else {

                    item.classList.add("hidden");

                }

            });

            updateVisibleGalleryItems();
        });

    });

    updateVisibleGalleryItems();


    /* ======================================================
       LIGHTBOX
    ====================================================== */

    let currentImageIndex = 0;


    function getImageData(item) {

        if (!item) return null;

        const image = item.querySelector("img");

        if (!image) return null;

        const titleElement = item.querySelector(".gallery-overlay h3");
        const categoryElement = item.querySelector(".gallery-overlay span");

        return {
            src: image.getAttribute("src"),
            alt: image.getAttribute("alt") || "Bloom Beauty",
            title: titleElement
                ? titleElement.textContent.trim()
                : "",
            category: categoryElement
                ? categoryElement.textContent.trim()
                : ""
        };
    }


    function openLightbox(index) {

        updateVisibleGalleryItems();

        if (!visibleGalleryItems.length) return;

        if (index < 0) {
            index = visibleGalleryItems.length - 1;
        }

        if (index >= visibleGalleryItems.length) {
            index = 0;
        }

        currentImageIndex = index;

        const data = getImageData(
            visibleGalleryItems[currentImageIndex]
        );

        if (!data || !lightbox || !lightboxImage) return;

        lightboxImage.src = data.src;
        lightboxImage.alt = data.alt;

        if (lightboxCaption) {

            lightboxCaption.innerHTML = `
                ${
                    data.category
                        ? `<span>${data.category}</span>`
                        : ""
                }

                ${
                    data.title
                        ? `<h3>${data.title}</h3>`
                        : ""
                }
            `;
        }

        lightbox.classList.add("active");

        document.body.classList.add("no-scroll");
    }


    function closeLightbox() {

        if (!lightbox) return;

        lightbox.classList.remove("active");

        document.body.classList.remove("no-scroll");

        /*
         * Dejamos que la transición termine antes
         * de limpiar la imagen.
         */

        setTimeout(() => {

            if (lightboxImage) {
                lightboxImage.src = "";
            }

        }, 300);
    }


    function showPreviousImage() {

        updateVisibleGalleryItems();

        currentImageIndex--;

        if (currentImageIndex < 0) {
            currentImageIndex = visibleGalleryItems.length - 1;
        }

        openLightbox(currentImageIndex);
    }


    function showNextImage() {

        updateVisibleGalleryItems();

        currentImageIndex++;

        if (currentImageIndex >= visibleGalleryItems.length) {
            currentImageIndex = 0;
        }

        openLightbox(currentImageIndex);
    }


    /* ======================================================
       ABRIR LIGHTBOX
    ====================================================== */

    galleryItems.forEach(item => {

        item.addEventListener("click", event => {

            /*
             * Si se hizo click en un enlace dentro
             * de la tarjeta, no abrir el Lightbox.
             */

            if (event.target.closest("a")) {
                return;
            }

            updateVisibleGalleryItems();

            const index = visibleGalleryItems.indexOf(item);

            if (index !== -1) {
                openLightbox(index);
            }

        });

    });


    /* ======================================================
       CERRAR LIGHTBOX
    ====================================================== */

    if (lightboxClose) {

        lightboxClose.addEventListener("click", closeLightbox);

    }


    /*
     * Cerrar haciendo click en el fondo
     */

    if (lightbox) {

        lightbox.addEventListener("click", event => {

            if (event.target === lightbox) {
                closeLightbox();
            }

        });

    }


    /* ======================================================
       FLECHAS DEL LIGHTBOX
    ====================================================== */

    if (lightboxPrev) {

        lightboxPrev.addEventListener(
            "click",
            showPreviousImage
        );

    }

    if (lightboxNext) {

        lightboxNext.addEventListener(
            "click",
            showNextImage
        );

    }


    /* ======================================================
       TECLADO
    ====================================================== */

    document.addEventListener("keydown", event => {

        if (!lightbox || !lightbox.classList.contains("active")) {
            return;
        }

        if (event.key === "Escape") {

            closeLightbox();

        }

        if (event.key === "ArrowLeft") {

            showPreviousImage();

        }

        if (event.key === "ArrowRight") {

            showNextImage();

        }

    });


    /* ======================================================
       SWIPE EN CELULAR
    ====================================================== */

    let touchStartX = 0;
    let touchEndX = 0;

    if (lightbox) {

        lightbox.addEventListener("touchstart", event => {

            touchStartX = event.changedTouches[0].screenX;

        }, { passive: true });


        lightbox.addEventListener("touchend", event => {

            touchEndX = event.changedTouches[0].screenX;

            const difference = touchEndX - touchStartX;

            if (Math.abs(difference) < 50) {
                return;
            }

            if (difference > 0) {

                showPreviousImage();

            } else {

                showNextImage();

            }

        }, { passive: true });

    }


    /* ======================================================
       BOTÓN VOLVER ARRIBA
    ====================================================== */

    function updateBackToTop() {

        if (!backToTop) return;

        if (window.scrollY > 500) {

            backToTop.classList.add("show");

        } else {

            backToTop.classList.remove("show");

        }
    }

    window.addEventListener("scroll", updateBackToTop);

    updateBackToTop();


    if (backToTop) {

        backToTop.addEventListener("click", () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }


    /* ======================================================
       ANIMACIÓN DE ELEMENTOS AL HACER SCROLL
    ====================================================== */

    const animatedElements = document.querySelectorAll(
        ".service-card, .review-card, .contact-card, .about-image"
    );

    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.style.opacity = "1";
                        entry.target.style.transform = "translateY(0)";

                        observer.unobserve(entry.target);
                    }

                });

            },
            {
                threshold: 0.12
            }
        );


        animatedElements.forEach(element => {

            element.style.opacity = "0";
            element.style.transform = "translateY(25px)";
            element.style.transition =
                "opacity 0.7s ease, transform 0.7s ease";

            observer.observe(element);

        });

    }


    /* ======================================================
       FORMULARIO DE TURNOS
    ====================================================== */

    if (bookingForm) {

        bookingForm.addEventListener("submit", event => {

            event.preventDefault();

            const nameInput = bookingForm.querySelector(
                'input[name="nombre"], input[name="name"]'
            );

            const serviceSelect = bookingForm.querySelector(
                'select[name="servicio"], select[name="service"]'
            );

            const dateInput = bookingForm.querySelector(
                'input[type="date"]'
            );

            const name = nameInput
                ? nameInput.value.trim()
                : "";

            const service = serviceSelect
                ? serviceSelect.value
                : "";

            const date = dateInput
                ? dateInput.value
                : "";


            /*
             * Validación básica
             */

            if (!name) {

                alert("Por favor, ingresá tu nombre.");

                if (nameInput) {
                    nameInput.focus();
                }

                return;
            }


            if (serviceSelect && !service) {

                alert("Por favor, seleccioná un servicio.");

                serviceSelect.focus();

                return;
            }


            if (dateInput && !date) {

                alert("Por favor, seleccioná una fecha.");

                dateInput.focus();

                return;
            }


            /*
             * Mensaje de confirmación
             */

            alert(
                `¡Gracias, ${name}! 🌸\n\n` +
                `Tu solicitud de turno fue recibida.` +
                (
                    service
                        ? `\nServicio: ${service}`
                        : ""
                ) +
                (
                    date
                        ? `\nFecha: ${date}`
                        : ""
                )
            );

            bookingForm.reset();

        });

    }


    /* ======================================================
       AÑO AUTOMÁTICO DEL FOOTER
    ====================================================== */

    const yearElements = document.querySelectorAll(
        "[data-year]"
    );

    yearElements.forEach(element => {

        element.textContent = new Date().getFullYear();

    });


    /* ======================================================
       PREVENIR IMÁGENES ROTAS
    ====================================================== */

    document.querySelectorAll("img").forEach(image => {

        image.addEventListener("error", () => {

            /*
             * No reemplazamos la imagen automáticamente.
             * De esta manera podés detectar fácilmente
             * qué archivo falta dentro de /img/.
             */

            image.classList.add("image-error");

        });

    });


    /* ======================================================
       LOG DE INICIO
    ====================================================== */

    console.log(
        "🌸 Bloom Beauty - Sitio web cargado correctamente."
    );

});
```
