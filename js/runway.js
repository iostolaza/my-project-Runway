
// js/runway.js

const collections = [
  {
    name: "Nature Collection",
    images: [
      { src: "/assets/runway-assets/Nature-beach-overhead-DK.jpg", desc: "Serenity, where land meets ocean." },
      { src: "/assets/runway-assets/Nature-Serene-snow-Ukraine.jpg", desc: "Snowy escapes and volcanic wonders." },
      { src: "/assets/runway-assets/Nature-Volanic-IT.jpg", desc: "Italian volcanic landscapes." },
      { src: "/assets/runway-assets/Nature-women-group-ice-bath.jpg", desc: "Ice bath group immersion." },
    ]
  },
  {
    name: "Global Collection",
    images: [
      { src: "/assets/runway-assets/Global-Native-woman-PE.jpg", desc: "Native fashion from Peru." },
      { src: "/assets/runway-assets/Global-Street-food-KR.jpg", desc: "Street food culture, Korea." },
      { src: "/assets/runway-assets/Global-Transamerica-pyramid-SF.jpg", desc: "San Francisco cityscape." },
      { src: "/assets/runway-assets/Global-Venice-boat-IT.jpg", desc: "Venetian boat ride, Italy." },
    ]
  },
  {
    name: "Modern Collection",
    images: [
      { src: "/assets/runway-assets/Modern-women-sun-bathing.jpg", desc: "Modern beach style." },
      { src: "/assets/runway-assets/Modern-woman-posing-NY.jpg", desc: "NYC urban modern looks." },
      { src: "/assets/runway-assets/Modern-woman-model-city.jpg", desc: "Chic in the city." },
      { src: "/assets/runway-assets/Modern-man-smile-fall.jpg", desc: "Autumn modern men." },
    ]
  },
  {
    name: "Street Collection",
    images: [
      { src: "/assets/runway-assets/Street-cafe-FR.jpg", desc: "Street-side cafe in Paris, France." },
      { src: "/assets/runway-assets/Street-city-bus.jpg", desc: "Bustling transit ride, Chicago." },
      { src: "/assets/runway-assets/Street-dining-KR.jpg", desc: "Korean street dining, Busan." },
      { src: "/assets/runway-assets/Street-yellow-cablecar-DE.jpg", desc: "Yellow cablecar rolling, Berlin." },
    ]
  },
  {
    name: "Wedding Collection",
    images: [
      { src: "/assets/runway-assets/Wedding-couple-engagement.jpg", desc: "Romantic engagement moments." },
      { src: "/assets/runway-assets/Wedding-couple-smiling.jpg", desc: "Smiles and celebration." },
      { src: "/assets/runway-assets/Wedding-kiss.jpg", desc: "The perfect kiss." },
      { src: "/assets/runway-assets/Wedding-woman-celebration.jpg", desc: "Celebration in style." },
    ]
  }
];

const track = document.getElementById('carouselTrack');
collections.forEach((col, colIdx) => {
  const card = document.createElement('div');
  card.className = 'carousel-card';
  card.innerHTML = `
    <div class="inner-carousel" data-col="${colIdx}">
      <button class="inner-arrow left" aria-label="Prev">&#8249;</button>
      <img src="${col.images[0].src}" class="carousel-image" alt="${col.name}" data-idx="0">
      <button class="inner-arrow right" aria-label="Next">&#8250;</button>
      <span class="img-count">1 / ${col.images.length}</span>
    </div>
    <div class="carousel-card-info">
      <h3>${col.name}</h3>
      <p class="carousel-card-desc">${col.images[0].desc}</p>
    </div>
  `;
  track.appendChild(card);
  track.scrollLeft = 0;
});

// Inner carousel logic for each card
document.querySelectorAll('.inner-carousel').forEach((inner, i) => {
  const col = collections[i];
  let idx = 0;
  const img = inner.querySelector('.carousel-image');
  const desc = inner.parentElement.querySelector('.carousel-card-desc');
  const count = inner.querySelector('.img-count');
  const left = inner.querySelector('.inner-arrow.left');
  const right = inner.querySelector('.inner-arrow.right');

  function update() {
    img.src = col.images[idx].src;
    desc.textContent = col.images[idx].desc;
    count.textContent = `${idx + 1} / ${col.images.length}`;
  }
  left.onclick = e => { e.stopPropagation(); idx = (idx - 1 + col.images.length) % col.images.length; update(); };
  right.onclick = e => { e.stopPropagation(); idx = (idx + 1) % col.images.length; update(); };
});

// Outer main carousel scroll logic
const scrollPx = 340;
document.querySelector('.carousel-arrow.left').onclick = () => {
  track.scrollBy({ left: -scrollPx, behavior: 'smooth' });
};
document.querySelector('.carousel-arrow.right').onclick = () => {
  track.scrollBy({ left: scrollPx, behavior: 'smooth' });
};

document.querySelectorAll('.highlight-img').forEach(img => {
  img.addEventListener('click', function () {
    document.getElementById('highlightModalImg').src = this.src;
    document.getElementById('highlightModal').style.display = 'flex';
  });
});
document.querySelector('.modal-close').onclick = function () {
  document.getElementById('highlightModal').style.display = 'none';
};
document.querySelector('.modal-bg').onclick = function () {
  document.getElementById('highlightModal').style.display = 'none';
};

// --- Modal Logic for Viewing Full Collection ---
let currentModalCol = null, currentModalIdx = 0;

document.querySelectorAll('.carousel-card').forEach((card, i) => {
  card.addEventListener('click', function (e) {
    // Only trigger if clicking OUTSIDE the inner-carousel arrows
    if (e.target.classList.contains('inner-arrow')) return;
    openCollectionModal(i, 0);
  });
});

function openCollectionModal(colIdx, imgIdx) {
  const col = collections[colIdx];
  currentModalCol = colIdx;
  currentModalIdx = imgIdx;
  document.getElementById('collectionModal').style.display = 'flex';
  updateCollectionModal();
}
function updateCollectionModal() {
  const col = collections[currentModalCol];
  const img = col.images[currentModalIdx];
  document.getElementById('collectionModalImg').src = img.src;
  document.querySelector('.collection-modal-caption').textContent = img.desc;
  document.getElementById('collectionModalCount').textContent =
    `${currentModalIdx + 1} / ${col.images.length}`;
}
document.getElementById('collectionModalPrev').onclick = function () {
  const col = collections[currentModalCol];
  currentModalIdx = (currentModalIdx - 1 + col.images.length) % col.images.length;
  updateCollectionModal();
};
document.getElementById('collectionModalNext').onclick = function () {
  const col = collections[currentModalCol];
  currentModalIdx = (currentModalIdx + 1) % col.images.length;
  updateCollectionModal();
};
document.querySelector('#collectionModal .modal-close').onclick =
  document.querySelector('#collectionModal .modal-bg').onclick = function () {
    document.getElementById('collectionModal').style.display = 'none';
};



// Initialize Firebase (replace with your config)
// const firebaseConfig = {
//   apiKey: "KEY",
//   authDomain: "PROJECT.firebaseapp.com",
//   projectId: "PROJECT-ID",
//   storageBucket: "PROJECT.appspot.com",
//   messagingSenderId: "MESSAGING-SENDER-ID",
//   appId: "APP-ID"
// };

// // For script tags in the browser (no import), use window.firebase:
// firebase.initializeApp(firebaseConfig);
// const db = firebase.firestore();

// async function loadFeaturedGallery() {
//   const gallery = document.getElementById('featured-gallery');
//   if (!gallery) return;
//   gallery.innerHTML = "Loading...";

//   try {
//     const snapshot = await db.collection('featured').get();
//     gallery.innerHTML = '';
//     snapshot.forEach(doc => {
//       const data = doc.data();
//       const card = document.createElement('div');
//       card.className = 'runway-card';
//       card.innerHTML = `
//         <img src="${data.imgUrl || data.imageUrl}" alt="${data.title || ''}" />
//         <div class="card-content">
//           <h3>${data.title || ''}</h3>
//           <p>${data.description || data.caption || ''}</p>
//         </div>
//       `;
//       gallery.appendChild(card);
//     });
//     if (gallery.innerHTML === '') gallery.innerHTML = '<p>No featured items found.</p>';
//   } catch (err) {
//     gallery.innerHTML = `<p style="color:red;">Error loading gallery.</p>`;
//     console.error(err);
//   }
// }

// Place this inside a <script> tag after your HTML, or in an external JS file

