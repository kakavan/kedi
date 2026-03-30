// Данные галереи — каждая карточка содержит основное изображение и массив суб-изображений
const galleryItems = [
  {
    title: "Мостовая тень (1010)",
    size: "42,43",
    subtitle: "Без категории",
    mainImg: "img/1010/1010.jpg",
    subImages: [
	{ src: "img/1010/1010.jpg", caption: "Мостовая тень" }
    ],
    link: "https://t.me/ten_tons_old_all"
  },
  {
    title: "Песчаный берег (1040)",
    size: "41,42,43",
    subtitle: "Без категории",
    mainImg: "img/1040/1041.jpg",
    subImages: [
	{ src: "img/1040/1040.jpg", caption: "Песчаный берег" },
	{ src: "img/1040/1041.jpg", caption: "Песчаный берег" }
    ],
    link: "https://t.me/ten_tons_old_all"
  },
  {
    title: "Северный камень (1020)",
    size: "41,42",
    subtitle: "Без категории",
    mainImg: "img/1020/1021.jpg",
    subImages: [
	{ src: "img/1020/1020.jpg", caption: "Северный камень" },
	{ src: "img/1020/1021.jpg", caption: "Северный камень" }
    ],
    link: "https://t.me/ten_tons_old_all"
  },
  {
    title: "Хвойный ветер (1030)",
    size: "41,43",
    subtitle: "Без категории",
    mainImg: "img/1030/1031.jpg",
    subImages: [
	{ src: "img/1030/1030.jpg", caption: "Хвойный ветер" },
	{ src: "img/1030/1031.jpg", caption: "Хвойный ветер" }
    ],
    link: "https://t.me/ten_tons_old_all"
  }
];

// Генерация HTML-карточек
const container = document.getElementById('gallery-container');
galleryItems.forEach(item => {
  const div = document.createElement('div');
  div.className = 'products_item';
  div.innerHTML = `
    <a href="#" class="products_image" data-index="${container.children.length}">
      <img src="${item.mainImg}" alt="${item.title}">
    </a>
    <a href="${item.link}" class="products_name">
	Модель: <span>${item.title}</span><br>
	Размер: <span>${item.size}</span><br>
	</a>
    <a href="${item.link}" class="product_button">Online</a>
  `;
  container.appendChild(div);
});

// Lightbox
let currentGalleryIndex = 0;
let currentImageIndex = 0;
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');

// Открытие по клику
container.addEventListener('click', e => {
  if (e.target.closest('.products_image')) {
    e.preventDefault();
    const index = e.target.closest('.products_image').dataset.index;
    openLightbox(parseInt(index));
  }
});

function openLightbox(galleryIndex) {
  currentGalleryIndex = galleryIndex;
  currentImageIndex = 0;
  showImage();
  lightbox.style.display = 'block';
}

function showImage() {
  const item = galleryItems[currentGalleryIndex];
  const imgData = item.subImages[currentImageIndex];
  lightboxImg.src = imgData.src;
  lightboxCaption.textContent = imgData.caption;
}

function changeImage(direction) {
  const total = galleryItems[currentGalleryIndex].subImages.length;
  currentImageIndex = (currentImageIndex + direction + total) % total;
  showImage();
}

// Закрытие по крестику или клику вне изображения
document.querySelector('.close').addEventListener('click', () => {
  lightbox.style.display = 'none';
});

lightbox.addEventListener('click', e => {
  if (e.target === lightbox) {
    lightbox.style.display = 'none';
  }
});

// Управление клавиатурой
document.addEventListener('keydown', e => {
  if (lightbox.style.display === 'block') {
    if (e.key === 'Escape') lightbox.style.display = 'none';
    if (e.key === 'ArrowLeft') changeImage(-1);
    if (e.key === 'ArrowRight') changeImage(1);
  }
});
