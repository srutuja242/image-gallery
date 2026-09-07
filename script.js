/* ==========================================
   IMAGE DATA
========================================== */

const images = [

    {
        title: "Mountain Escape",
        category: "nature",
        url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=80"
    },

    {
        title: "Ocean Dreams",
        category: "nature",
        url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80"
    },

    {
        title: "City Lights",
        category: "architecture",
        url: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=900&q=80"
    },

    {
        title: "Wild Companion",
        category: "animals",
        url: "https://images.unsplash.com/photo-1549366021-9f761d450615?auto=format&fit=crop&w=900&q=80"
    },

    {
        title: "Desert Journey",
        category: "travel",
        url: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&w=900&q=80"
    },

    {
        title: "Forest Adventure",
        category: "nature",
        url: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=900&q=80"
    },

    {
        title: "Modern Architecture",
        category: "architecture",
        url: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=900&q=80"
    },

    {
        title: "Urban Journey",
        category: "travel",
        url: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=900&q=80"
    },

    {
        title: "Wild Beauty",
        category: "animals",
        url: "https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&w=900&q=80"
    },

    {
        title: "Golden Mountains",
        category: "nature",
        url: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=900&q=80"
    },

    {
        title: "Ancient Streets",
        category: "architecture",
        url: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=900&q=80"
    },

    {
        title: "Tropical Adventure",
        category: "travel",
        url: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80"
    }

];


let filteredImages = [...images];

let currentIndex = 0;

let favorites = new Set();


/* ==========================================
   DOM ELEMENTS
========================================== */

const gallery =
    document.getElementById("gallery");

const searchInput =
    document.getElementById("searchInput");

const filters =
    document.querySelectorAll(".filter");

const lightbox =
    document.getElementById("lightbox");

const lightboxImage =
    document.getElementById("lightboxImage");

const lightboxTitle =
    document.getElementById("lightboxTitle");

const lightboxCategory =
    document.getElementById("lightboxCategory");

const currentImage =
    document.getElementById("currentImage");

const totalImages =
    document.getElementById("totalImages");

const favoriteButton =
    document.getElementById("favoriteButton");

const downloadButton =
    document.getElementById("downloadButton");

const noResults =
    document.getElementById("noResults");

const imageCount =
    document.getElementById("imageCount");


/* ==========================================
   RENDER GALLERY
========================================== */

function renderGallery() {

    gallery.innerHTML = "";

    imageCount.textContent =
        `${filteredImages.length} Photos`;


    if (filteredImages.length === 0) {

        noResults.style.display = "block";

        return;

    }


    noResults.style.display = "none";


    filteredImages.forEach(
        (image, index) => {

            const card =
                document.createElement("div");

            card.className =
                "gallery-card";


            card.style.animationDelay =
                `${index * 0.05}s`;


            card.innerHTML = `

                <img
                    src="${image.url}"
                    alt="${image.title}"
                    loading="lazy"
                >

                <div class="card-overlay">

                    <span class="card-category">
                        ${image.category}
                    </span>

                    <h3 class="card-title">
                        ${image.title}
                    </h3>

                </div>
            `;


            card.addEventListener(
                "click",
                () => openLightbox(index)
            );


            gallery.appendChild(card);

        }
    );
}


/* ==========================================
   FILTER
========================================== */

filters.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            filters.forEach(
                btn =>
                    btn.classList.remove("active")
            );


            button.classList.add("active");


            const category =
                button.dataset.category;


            filterGallery(
                category,
                searchInput.value
            );
        }
    );

});


function filterGallery(
    category = "all",
    search = ""
) {

    filteredImages =
        images.filter(image => {

            const categoryMatch =
                category === "all" ||
                image.category === category;


            const searchMatch =
                image.title
                    .toLowerCase()
                    .includes(
                        search.toLowerCase()
                    );


            return categoryMatch &&
                   searchMatch;
        });


    renderGallery();
}


/* ==========================================
   SEARCH
========================================== */

searchInput.addEventListener(
    "input",
    () => {

        const activeFilter =
            document.querySelector(
                ".filter.active"
            );


        const category =
            activeFilter.dataset.category;


        filterGallery(
            category,
            searchInput.value
        );

    }
);


/* ==========================================
   OPEN LIGHTBOX
========================================== */

function openLightbox(index) {

    currentIndex = index;

    updateLightbox();

    lightbox.classList.add("show");

    document.body.style.overflow =
        "hidden";
}


/* ==========================================
   UPDATE LIGHTBOX
========================================== */

function updateLightbox() {

    const image =
        filteredImages[currentIndex];


    if (!image) {
        return;
    }


    lightboxImage.src =
        image.url;


    lightboxImage.alt =
        image.title;


    lightboxTitle.textContent =
        image.title;


    lightboxCategory.textContent =
        image.category;


    currentImage.textContent =
        currentIndex + 1;


    totalImages.textContent =
        filteredImages.length;


    downloadButton.href =
        image.url;


    favoriteButton.textContent =
        favorites.has(image.url)
            ? "♥"
            : "♡";
}


/* ==========================================
   CLOSE LIGHTBOX
========================================== */

document
    .getElementById("closeLightbox")
    .addEventListener(
        "click",
        closeLightbox
    );


function closeLightbox() {

    lightbox.classList.remove("show");

    document.body.style.overflow =
        "";
}


/* ==========================================
   NEXT IMAGE
========================================== */

document
    .getElementById("next")
    .addEventListener(
        "click",
        nextImage
    );


function nextImage() {

    currentIndex++;

    if (
        currentIndex >=
        filteredImages.length
    ) {

        currentIndex = 0;

    }


    updateLightbox();
}


/* ==========================================
   PREVIOUS IMAGE
========================================== */

document
    .getElementById("previous")
    .addEventListener(
        "click",
        previousImage
    );


function previousImage() {

    currentIndex--;

    if (currentIndex < 0) {

        currentIndex =
            filteredImages.length - 1;

    }


    updateLightbox();
}


/* ==========================================
   FAVORITE
========================================== */

favoriteButton.addEventListener(
    "click",
    () => {

        const image =
            filteredImages[currentIndex];


        if (favorites.has(image.url)) {

            favorites.delete(image.url);

        } else {

            favorites.add(image.url);

        }


        updateLightbox();
    }
);


/* ==========================================
   KEYBOARD NAVIGATION
========================================== */

document.addEventListener(
    "keydown",
    event => {

        if (
            !lightbox.classList.contains("show")
        ) {

            return;

        }


        switch (event.key) {

            case "ArrowRight":

                nextImage();

                break;


            case "ArrowLeft":

                previousImage();

                break;


            case "Escape":

                closeLightbox();

                break;
        }

    }
);


/* ==========================================
   CLICK OUTSIDE IMAGE
========================================== */

lightbox.addEventListener(
    "click",
    event => {

        if (
            event.target === lightbox
        ) {

            closeLightbox();

        }

    }
);


/* ==========================================
   TOUCH / SWIPE SUPPORT
========================================== */

let touchStartX = 0;

let touchEndX = 0;


lightbox.addEventListener(
    "touchstart",
    event => {

        touchStartX =
            event.changedTouches[0].screenX;

    }
);


lightbox.addEventListener(
    "touchend",
    event => {

        touchEndX =
            event.changedTouches[0].screenX;


        const difference =
            touchStartX - touchEndX;


        if (Math.abs(difference) < 50) {
            return;
        }


        if (difference > 0) {

            nextImage();

        } else {

            previousImage();

        }

    }
);


/* ==========================================
   THEME
========================================== */

const themeButton =
    document.getElementById("themeButton");


let lightMode = false;


themeButton.addEventListener(
    "click",
    () => {

        lightMode =
            !lightMode;


        if (lightMode) {

            document.body.style.background =
                "#eef1f8";

            document.body.style.color =
                "#111827";

            themeButton.textContent =
                "☾";

        } else {

            document.body.style.background =
                "#080a12";

            document.body.style.color =
                "#ffffff";

            themeButton.textContent =
                "☀";

        }

    }
);


/* ==========================================
   INITIAL LOAD
========================================== */

renderGallery();