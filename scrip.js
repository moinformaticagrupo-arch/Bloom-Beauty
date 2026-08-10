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

    const galleryItems =
        document.querySelectorAll(".gallery-item");

    const galleryFilters =
        document.querySelectorAll(".gallery-filter");

    const lightbox =
        document.querySelector(".lightbox");

    const lightboxImage =
        document.querySelector(".lightbox-content img");

    const lightboxCaption =
        document.querySelector(".lightbox-caption");

    const lightboxClose =
        document.querySelector(".lightbox-close");

    const lightboxPrev =
        document.querySelector(".lightbox-prev");

    const lightboxNext =
        document.querySelector(".lightbox-next");

    const bookingForm =
        document.querySelector(".booking-form");


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


    window.addEventListener(
        "scroll",
        updateHeader
    );

    updateHeader();


    /* ======================================================
       MENÚ MOBILE
    ====================================================== */

    if (menuToggle && navbar) {

        menuToggle.addEventListener(
            "click",
            () => {

                navbar.classList.toggle(
                    "active"
                );

                document.body.classList.toggle(
                    "no-scroll"
                );


                const icon =
                    menuToggle.querySelector("i");


                if (icon) {

                    if (
                        navbar.classList.contains(
                            "active"
                        )
                    ) {

                        icon.classList.remove(
                            "fa-bars"
                        );

                        icon.classList.add(
                            "fa-xmark"
                        );

                    } else {

                        icon.classList.remove(
                            "fa-xmark"
                        );

                        icon.classList.add(
                            "fa-bars"
                        );

                    }

                }

            }
        );


        navbar
            .querySelectorAll("a")
            .forEach(link => {

                link.addEventListener(
                    "click",
                    () => {

                        navbar.classList.remove(
                            "active"
                        );

                        document.body.classList.remove(
                            "no-scroll"
                        );


                        const icon =
                            menuToggle.querySelector(
                                "i"
                            );


                        if (icon) {

                            icon.classList.remove(
                                "fa-xmark"
                            );

                            icon.classList.add(
                                "fa-bars"
                            );

                        }

                    }
                );

            });

    }


    /* ======================================================
       NAVBAR - SECCIÓN ACTIVA
    ====================================================== */

    const sections =
        document.querySelectorAll(
            "section[id]"
        );

    const navLinks =
        document.querySelectorAll(
            ".navbar a[href^='#']"
        );


    function updateActiveLink() {

        let currentSection = "";


        sections.forEach(section => {

            const sectionTop =
                section.offsetTop - 150;

            const sectionHeight =
                section.offsetHeight;


            if (
                window.scrollY >= sectionTop &&
                window.scrollY <
                    sectionTop + sectionHeight
            ) {

                currentSection =
                    section.getAttribute("id");

            }

        });


        navLinks.forEach(link => {

            link.classList.remove(
                "active"
            );


            const href =
                link.getAttribute("href");


            if (
                href ===
                `#${currentSection}`
            ) {

                link.classList.add(
                    "active"
                );

            }

        });

    }


    window.addEventListener(
        "scroll",
        updateActiveLink
    );

    updateActiveLink();


    /* ======================================================
       GALERÍA - FILTROS
    ====================================================== */

    let visibleGalleryItems = [];


    function updateVisibleGalleryItems() {

        visibleGalleryItems =
            Array.from(galleryItems)
                .filter(item => {

                    return (
                        window.getComputedStyle(
                            item
                        ).display !== "none"
                    );

                });

    }


    galleryFilters.forEach(filter => {

        filter.addEventListener(
            "click",
            () => {

                galleryFilters.forEach(
                    button => {

                        button.classList.remove(
                            "active"
                        );

                    }
                );


                filter.classList.add(
                    "active"
                );


                const category =
                    filter.dataset.filter;


                galleryItems.forEach(
                    item => {

                        const itemCategory =
                            item.dataset.category;


                        if (
                            category === "all" ||
                            category === "*" ||
                            itemCategory === category
                        ) {

                            item.classList.remove(
                                "hidden"
                            );

                            item.style.display =
                                "";

                        } else {

                            item.classList.add(
                                "hidden"
                            );

                            item.style.display =
                                "none";

                        }

                    }
                );


                updateVisibleGalleryItems();

            }
        );

    });


    updateVisibleGalleryItems();


    /* ======================================================
       LIGHTBOX
    ====================================================== */

    let currentImageIndex = 0;


    function escapeHTML(texto) {

        const div =
            document.createElement(
                "div"
            );

        div.textContent =
            texto || "";

        return div.innerHTML;

    }


    function getImageData(item) {

        if (!item) return null;


        const image =
            item.querySelector("img");


        if (!image) return null;


        const titleElement =
            item.querySelector(
                ".gallery-overlay h3"
            );


        const categoryElement =
            item.querySelector(
                ".gallery-overlay span"
            );


        return {

            src:
                image.getAttribute(
                    "src"
                ),

            alt:
                image.getAttribute(
                    "alt"
                ) ||
                "Bloom Beauty",

            title:
                titleElement
                    ? titleElement.textContent.trim()
                    : "",

            category:
                categoryElement
                    ? categoryElement.textContent.trim()
                    : ""

        };

    }


    function openLightbox(index) {

        updateVisibleGalleryItems();


        if (
            !visibleGalleryItems.length
        ) {

            return;

        }


        if (index < 0) {

            index =
                visibleGalleryItems.length - 1;

        }


        if (
            index >=
            visibleGalleryItems.length
        ) {

            index = 0;

        }


        currentImageIndex =
            index;


        const data =
            getImageData(
                visibleGalleryItems[
                    currentImageIndex
                ]
            );


        if (
            !data ||
            !lightbox ||
            !lightboxImage
        ) {

            return;

        }


        lightboxImage.src =
            data.src;

        lightboxImage.alt =
            data.alt;


        if (lightboxCaption) {

            lightboxCaption.innerHTML = `

                ${
                    data.category
                        ? `<span>${escapeHTML(
                            data.category
                        )}</span>`
                        : ""
                }

                ${
                    data.title
                        ? `<h3>${escapeHTML(
                            data.title
                        )}</h3>`
                        : ""
                }

            `;

        }


        lightbox.classList.add(
            "active"
        );


        document.body.classList.add(
            "no-scroll"
        );

    }


    function closeLightbox() {

        if (!lightbox) return;


        lightbox.classList.remove(
            "active"
        );


        document.body.classList.remove(
            "no-scroll"
        );


        setTimeout(() => {

            if (lightboxImage) {

                lightboxImage.src =
                    "";

            }

        }, 300);

    }


    function showPreviousImage() {

        updateVisibleGalleryItems();


        if (
            !visibleGalleryItems.length
        ) {

            return;

        }


        currentImageIndex--;


        if (
            currentImageIndex < 0
        ) {

            currentImageIndex =
                visibleGalleryItems.length - 1;

        }


        openLightbox(
            currentImageIndex
        );

    }


    function showNextImage() {

        updateVisibleGalleryItems();


        if (
            !visibleGalleryItems.length
        ) {

            return;

        }


        currentImageIndex++;


        if (
            currentImageIndex >=
            visibleGalleryItems.length
        ) {

            currentImageIndex = 0;

        }


        openLightbox(
            currentImageIndex
        );

    }


    /* ======================================================
       ABRIR LIGHTBOX
    ====================================================== */

    galleryItems.forEach(item => {

        item.addEventListener(
            "click",
            event => {

                if (
                    event.target.closest("a")
                ) {

                    return;

                }


                updateVisibleGalleryItems();


                const index =
                    visibleGalleryItems.indexOf(
                        item
                    );


                if (index !== -1) {

                    openLightbox(
                        index
                    );

                }

            }
        );

    });


    /* ======================================================
       CERRAR LIGHTBOX
    ====================================================== */

    if (lightboxClose) {

        lightboxClose.addEventListener(
            "click",
            closeLightbox
        );

    }


    if (lightbox) {

        lightbox.addEventListener(
            "click",
            event => {

                if (
                    event.target ===
                    lightbox
                ) {

                    closeLightbox();

                }

            }
        );

    }


    /* ======================================================
       FLECHAS LIGHTBOX
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

    document.addEventListener(
        "keydown",
        event => {

            if (
                !lightbox ||
                !lightbox.classList.contains(
                    "active"
                )
            ) {

                return;

            }


            if (
                event.key ===
                "Escape"
            ) {

                closeLightbox();

            }


            if (
                event.key ===
                "ArrowLeft"
            ) {

                showPreviousImage();

            }


            if (
                event.key ===
                "ArrowRight"
            ) {

                showNextImage();

            }

        }
    );


    /* ======================================================
       SWIPE CELULAR
    ====================================================== */

    let touchStartX = 0;
    let touchEndX = 0;


    if (lightbox) {

        lightbox.addEventListener(
            "touchstart",
            event => {

                touchStartX =
                    event.changedTouches[0]
                        .screenX;

            },
            {
                passive: true
            }
        );


        lightbox.addEventListener(
            "touchend",
            event => {

                touchEndX =
                    event.changedTouches[0]
                        .screenX;


                const difference =
                    touchEndX -
                    touchStartX;


                if (
                    Math.abs(difference) <
                    50
                ) {

                    return;

                }


                if (difference > 0) {

                    showPreviousImage();

                } else {

                    showNextImage();

                }

            },
            {
                passive: true
            }
        );

    }


    /* ======================================================
       BOTÓN VOLVER ARRIBA
    ====================================================== */

    function updateBackToTop() {

        if (!backToTop) return;


        if (window.scrollY > 500) {

            backToTop.classList.add(
                "show"
            );

        } else {

            backToTop.classList.remove(
                "show"
            );

        }

    }


    window.addEventListener(
        "scroll",
        updateBackToTop
    );


    updateBackToTop();


    if (backToTop) {

        backToTop.addEventListener(
            "click",
            () => {

                window.scrollTo({

                    top: 0,

                    behavior: "smooth"

                });

            }
        );

    }


    /* ======================================================
       ANIMACIONES
    ====================================================== */

    const animatedElements =
        document.querySelectorAll(
            ".service-card, .review-card, .contact-card, .about-image"
        );


    if (
        "IntersectionObserver" in
        window
    ) {

        const observer =
            new IntersectionObserver(
                entries => {

                    entries.forEach(
                        entry => {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.style.opacity =
                                    "1";


                                entry.target.style.transform =
                                    "translateY(0)";


                                observer.unobserve(
                                    entry.target
                                );

                            }

                        }
                    );

                },
                {
                    threshold: 0.12
                }
            );


        animatedElements.forEach(
            element => {

                element.style.opacity =
                    "0";


                element.style.transform =
                    "translateY(25px)";


                element.style.transition =
                    "opacity 0.7s ease, transform 0.7s ease";


                observer.observe(
                    element
                );

            }
        );

    }


    /* ======================================================
       FORMULARIO DE TURNOS
    ====================================================== */

    if (bookingForm) {

        bookingForm.addEventListener(
            "submit",
            event => {

                event.preventDefault();


                const nameInput =
                    bookingForm.querySelector(
                        'input[name="nombre"], input[name="name"]'
                    );


                const serviceSelect =
                    bookingForm.querySelector(
                        'select[name="servicio"], select[name="service"]'
                    );


                const dateInput =
                    bookingForm.querySelector(
                        'input[type="date"]'
                    );


                const name =
                    nameInput
                        ? nameInput.value.trim()
                        : "";


                const service =
                    serviceSelect
                        ? serviceSelect.value
                        : "";


                const date =
                    dateInput
                        ? dateInput.value
                        : "";


                if (!name) {

                    alert(
                        "Por favor, ingresá tu nombre."
                    );


                    if (nameInput) {

                        nameInput.focus();

                    }


                    return;

                }


                if (
                    serviceSelect &&
                    !service
                ) {

                    alert(
                        "Por favor, seleccioná un servicio."
                    );


                    serviceSelect.focus();


                    return;

                }


                if (
                    dateInput &&
                    !date
                ) {

                    alert(
                        "Por favor, seleccioná una fecha."
                    );


                    dateInput.focus();


                    return;

                }


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

            }
        );

    }


    /* ======================================================
       OPINIONES
       SOLO 1 O 5 ESTRELLAS
    ====================================================== */

    const reviewsGrid =
        document.querySelector(
            ".reviews-grid"
        );


    const STORAGE_KEY =
        "bloomBeautyOpiniones";


    /* ======================================================
       OBTENER OPINIONES
    ====================================================== */

    function obtenerOpiniones() {

        try {

            const datos =
                localStorage.getItem(
                    STORAGE_KEY
                );


            if (!datos) {

                return [];

            }


            const opiniones =
                JSON.parse(datos);


            if (
                !Array.isArray(
                    opiniones
                )
            ) {

                return [];

            }


            return opiniones;

        } catch (error) {

            console.error(
                "Error al cargar opiniones:",
                error
            );


            return [];

        }

    }


    /* ======================================================
       GUARDAR OPINIONES
    ====================================================== */

    function guardarOpiniones(
        opiniones
    ) {

        try {

            localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify(
                    opiniones
                )
            );


            return true;

        } catch (error) {

            console.error(
                "Error al guardar opiniones:",
                error
            );


            return false;

        }

    }


    /* ======================================================
       MOSTRAR OPINIONES
    ====================================================== */

    function mostrarOpiniones() {

        if (!reviewsGrid) {

            return;

        }


        const opiniones =
            obtenerOpiniones();


        reviewsGrid
            .querySelectorAll(
                ".review-card.user-review"
            )
            .forEach(
                card => {

                    card.remove();

                }
            );


        opiniones.forEach(
            opinion => {

                const rating =
                    Number(
                        opinion.estrellas
                    ) === 1
                        ? 1
                        : 5;


                const estrellas =
                    rating === 1
                        ? "★"
                        : "★★★★★";


                const nombre =
                    String(
                        opinion.nombre ||
                        "Clienta"
                    ).trim();


                const texto =
                    String(
                        opinion.texto ||
                        ""
                    ).trim();


                const inicial =
                    nombre
                        .charAt(0)
                        .toUpperCase();


                const card =
                    document.createElement(
                        "article"
                    );


                card.className =
                    "review-card user-review";


                card.innerHTML = `

                    <div class="stars">
                        ${estrellas}
                    </div>

                    <p>
                        “${escapeHTML(
                            texto
                        )}”
                    </p>

                    <div class="review-author">

                        <div class="author-avatar">
                            ${escapeHTML(
                                inicial
                            )}
                        </div>

                        <div>

                            <strong>
                                ${escapeHTML(
                                    nombre
                                )}
                            </strong>

                            <span>
                                Clienta Bloom Beauty
                            </span>

                        </div>

                    </div>

                `;


                reviewsGrid.appendChild(
                    card
                );

            }
        );

    }


    /* ======================================================
       CREAR SISTEMA DE OPINIONES
    ====================================================== */

    if (reviewsGrid) {

        let reviewsActions =
            document.querySelector(
                ".reviews-actions"
            );


        if (!reviewsActions) {

            reviewsActions =
                document.createElement(
                    "div"
                );


            reviewsActions.className =
                "reviews-actions";


            if (
                reviewsGrid.parentElement
            ) {

                reviewsGrid.parentElement.appendChild(
                    reviewsActions
                );

            }

        }


        /* ==================================================
           BOTÓN DEJAR OPINIÓN
        ================================================== */

        let opinionButton =
            document.getElementById(
                "openReviewButton"
            );


        if (!opinionButton) {

            opinionButton =
                document.createElement(
                    "button"
                );


            opinionButton.type =
                "button";


            opinionButton.id =
                "openReviewButton";


            opinionButton.className =
                "btn btn-primary";


            opinionButton.innerHTML = `
                Dejar mi opinión
                <i class="fa-solid fa-star"></i>
            `;


            reviewsActions.appendChild(
                opinionButton
            );

        }


        /* ==================================================
           FORMULARIO
        ================================================== */

        let reviewFormContainer =
            document.getElementById(
                "reviewFormContainer"
            );


        if (!reviewFormContainer) {

            reviewFormContainer =
                document.createElement(
                    "div"
                );


            reviewFormContainer.id =
                "reviewFormContainer";


            reviewFormContainer.className =
                "review-form-container";


            reviewFormContainer.style.display =
                "none";


            reviewFormContainer.innerHTML = `

                <div class="review-form-box">

                    <button
                        type="button"
                        class="review-form-close"
                        id="closeReviewButton"
                        aria-label="Cerrar">

                        <i class="fa-solid fa-xmark"></i>

                    </button>


                    <span class="section-subtitle">
                        TU EXPERIENCIA
                    </span>


                    <h3>
                        Dejá tu opinión
                    </h3>


                    <form id="reviewForm">


                        <div class="form-group">

                            <label for="reviewName">
                                Tu nombre
                            </label>


                            <input
                                type="text"
                                id="reviewName"
                                name="reviewName"
                                placeholder="Escribí tu nombre"
                                maxlength="40"
                                autocomplete="name"
                                required>

                        </div>


                        <!-- =================================
                             VALORACIÓN
                             SOLO 1 O 5
                        ================================== -->

                        <div class="form-group">

                            <label>
                                Tu valoración
                            </label>


                            <div
                                class="review-stars-input"
                                id="reviewStarsInput">

                                <!-- OPCIÓN 1 -->

                                <button
                                    type="button"
                                    class="rating-option"
                                    data-star="1"
                                    aria-label="1 estrella">

                                    <span class="rating-stars">
                                        ⭐
                                    </span>

                                    <span class="rating-text">
                                        1 estrella
                                    </span>

                                </button>


                                <!-- OPCIÓN 5 -->

                                <button
                                    type="button"
                                    class="rating-option selected"
                                    data-star="5"
                                    aria-label="5 estrellas">

                                    <span class="rating-stars">
                                        ⭐⭐⭐⭐⭐
                                    </span>

                                    <span class="rating-text">
                                        5 estrellas
                                    </span>

                                </button>

                            </div>


                            <input
                                type="hidden"
                                id="reviewRating"
                                name="reviewRating"
                                value="5">

                        </div>


                        <div class="form-group">

                            <label for="reviewText">
                                Tu opinión
                            </label>


                            <textarea
                                id="reviewText"
                                name="reviewText"
                                rows="5"
                                maxlength="300"
                                placeholder="Contanos qué te pareció tu experiencia..."
                                required></textarea>


                            <small>
                                Máximo 300 caracteres.
                            </small>

                        </div>


                        <button
                            type="submit"
                            class="btn btn-primary btn-full">

                            Publicar opinión

                            <i class="fa-solid fa-paper-plane"></i>

                        </button>


                        <p
                            id="reviewMessage"
                            class="review-message">
                        </p>


                    </form>

                </div>

            `;


            if (
                reviewsGrid.parentElement
            ) {

                reviewsGrid.parentElement.appendChild(
                    reviewFormContainer
                );

            }

        }


        /* ==================================================
           ELEMENTOS DEL FORMULARIO
        ================================================== */

        const reviewForm =
            document.getElementById(
                "reviewForm"
            );


        const reviewName =
            document.getElementById(
                "reviewName"
            );


        const reviewText =
            document.getElementById(
                "reviewText"
            );


        const reviewRating =
            document.getElementById(
                "reviewRating"
            );


        const reviewMessage =
            document.getElementById(
                "reviewMessage"
            );


        const reviewStarsInput =
            document.getElementById(
                "reviewStarsInput"
            );


        const closeReviewButton =
            document.getElementById(
                "closeReviewButton"
            );


        /* ==================================================
           ABRIR FORMULARIO
        ================================================== */

        opinionButton.addEventListener(
            "click",
            () => {

                reviewFormContainer.style.display =
                    "flex";


                document.body.classList.add(
                    "no-scroll"
                );


                setTimeout(() => {

                    if (reviewName) {

                        reviewName.focus();

                    }

                }, 100);

            }
        );


        /* ==================================================
           CERRAR FORMULARIO
        ================================================== */

        function cerrarFormularioOpinion() {

            reviewFormContainer.style.display =
                "none";


            document.body.classList.remove(
                "no-scroll"
            );

        }


        if (closeReviewButton) {

            closeReviewButton.addEventListener(
                "click",
                cerrarFormularioOpinion
            );

        }


        reviewFormContainer.addEventListener(
            "click",
            event => {

                if (
                    event.target ===
                    reviewFormContainer
                ) {

                    cerrarFormularioOpinion();

                }

            }
        );


        /* ==================================================
           SELECCIÓN 1 O 5
        ================================================== */

        if (
            reviewStarsInput &&
            reviewRating
        ) {

            const ratingButtons =
                reviewStarsInput.querySelectorAll(
                    ".rating-option"
                );


            function actualizarRating(
                cantidad
            ) {

                ratingButtons.forEach(
                    button => {

                        const valor =
                            Number(
                                button.dataset.star
                            );


                        button.classList.toggle(
                            "selected",
                            valor === cantidad
                        );

                    }
                );

            }


            ratingButtons.forEach(
                button => {

                    button.addEventListener(
                        "click",
                        () => {

                            const cantidad =
                                Number(
                                    button.dataset.star
                                );


                            if (
                                cantidad !== 1 &&
                                cantidad !== 5
                            ) {

                                return;

                            }


                            reviewRating.value =
                                cantidad;


                            actualizarRating(
                                cantidad
                            );

                        }
                    );

                }
            );


            /* 5 estrellas seleccionadas al abrir */

            reviewRating.value = 5;

            actualizarRating(5);

        }


        /* ==================================================
           GUARDAR OPINIÓN
        ================================================== */

        if (reviewForm) {

            reviewForm.addEventListener(
                "submit",
                event => {

                    event.preventDefault();


                    const nombre =
                        reviewName
                            ? reviewName.value.trim()
                            : "";


                    const texto =
                        reviewText
                            ? reviewText.value.trim()
                            : "";


                    let estrellas =
                        reviewRating
                            ? Number(
                                reviewRating.value
                            )
                            : 5;


                    /*
                     * Solo aceptamos 1 o 5.
                     */

                    if (
                        estrellas !== 1 &&
                        estrellas !== 5
                    ) {

                        estrellas = 5;

                    }


                    if (!nombre) {

                        if (reviewName) {

                            reviewName.focus();

                        }

                        return;

                    }


                    if (!texto) {

                        if (reviewText) {

                            reviewText.focus();

                        }

                        return;

                    }


                    const opiniones =
                        obtenerOpiniones();


                    opiniones.push({

                        id:
                            Date.now(),

                        nombre:
                            nombre,

                        texto:
                            texto,

                        estrellas:
                            estrellas,

                        fecha:
                            new Date()
                                .toISOString()

                    });


                    const guardado =
                        guardarOpiniones(
                            opiniones
                        );


                    if (!guardado) {

                        if (reviewMessage) {

                            reviewMessage.textContent =
                                "No se pudo guardar la opinión.";

                        }

                        return;

                    }


                    mostrarOpiniones();


                    reviewForm.reset();


                    /*
                     * Volver a 5 estrellas
                     */

                    if (reviewRating) {

                        reviewRating.value =
                            5;

                    }


                    if (reviewStarsInput) {

                        reviewStarsInput
                            .querySelectorAll(
                                ".rating-option"
                            )
                            .forEach(
                                button => {

                                    button.classList.toggle(
                                        "selected",
                                        Number(
                                            button.dataset.star
                                        ) === 5
                                    );

                                }
                            );

                    }


                    if (reviewMessage) {

                        reviewMessage.textContent =
                            "¡Gracias por tu opinión! 💖";


                        reviewMessage.classList.add(
                            "success"
                        );

                    }


                    setTimeout(
                        () => {

                            cerrarFormularioOpinion();


                            if (reviewMessage) {

                                reviewMessage.textContent =
                                    "";

                                reviewMessage.classList.remove(
                                    "success"
                                );

                            }

                        },
                        1500
                    );

                }
            );

        }

    }


    /* ======================================================
       CARGAR OPINIONES
    ====================================================== */

    mostrarOpiniones();


    /* ======================================================
       WHATSAPP
    ====================================================== */

    const whatsappNumber =
        "543816253661";


    document
        .querySelectorAll(
            "[data-whatsapp]"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                event => {

                    event.preventDefault();


                    const servicio =
                        button.dataset.servicio ||
                        "un servicio";


                    const mensaje =
                        `Hola Bloom Beauty 💖, quiero consultar por ${servicio}.`;


                    const url =
                        `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                            mensaje
                        )}`;


                    window.open(
                        url,
                        "_blank"
                    );

                }
            );

        });


    /* ======================================================
       AÑO AUTOMÁTICO
    ====================================================== */

    const yearElements =
        document.querySelectorAll(
            "[data-year]"
        );


    yearElements.forEach(
        element => {

            element.textContent =
                new Date().getFullYear();

        }
    );


    /* ======================================================
       IMÁGENES ROTAS
    ====================================================== */

    document
        .querySelectorAll("img")
        .forEach(image => {

            image.addEventListener(
                "error",
                () => {

                    image.classList.add(
                        "image-error"
                    );

                }
            );

        });


    /* ======================================================
       INICIO
    ====================================================== */

    console.log(
        "🌸 Bloom Beauty - Sitio web cargado correctamente."
    );

});
```

