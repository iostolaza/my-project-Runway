
// js/runway.js

// Initialize Firebase (replace with your config)
const firebaseConfig = {
  apiKey: "KEY",
  authDomain: "PROJECT.firebaseapp.com",
  projectId: "PROJECT-ID",
  storageBucket: "PROJECT.appspot.com",
  messagingSenderId: "MESSAGING-SENDER-ID",
  appId: "APP-ID"
};

// For script tags in the browser (no import), use window.firebase:
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

async function loadFeaturedGallery() {
  const gallery = document.getElementById('featured-gallery');
  if (!gallery) return;
  gallery.innerHTML = "Loading...";

  try {
    const snapshot = await db.collection('featured').get();
    gallery.innerHTML = '';
    snapshot.forEach(doc => {
      const data = doc.data();
      const card = document.createElement('div');
      card.className = 'runway-card';
      card.innerHTML = `
        <img src="${data.imgUrl || data.imageUrl}" alt="${data.title || ''}" />
        <div class="card-content">
          <h3>${data.title || ''}</h3>
          <p>${data.description || data.caption || ''}</p>
        </div>
      `;
      gallery.appendChild(card);
    });
    if (gallery.innerHTML === '') gallery.innerHTML = '<p>No featured items found.</p>';
  } catch (err) {
    gallery.innerHTML = `<p style="color:red;">Error loading gallery.</p>`;
    console.error(err);
  }
}

document.addEventListener('DOMContentLoaded', loadFeaturedGallery);

const collectionsData = {
  nature: {
    images: [
      '/assets/runway-assets/Nature-beach-overhead-DK.jpg',
      '/assets/runway-assets/Nature-Serene-snow-Ukraine.jpg',
      '/assets/runway-assets/Nature-Volanic-IT.jpg',
      '/assets/runway-assets/Nature-women-group-ice-bath.jpg'
    ],
    desc: [
      'Serenity, where land meets ocean',
      'Snowy escapes and volcanic wonders.',
      'Italian volcanic landscapes.',
      'Ice bath group immersion.'
    ]
  },
  global: {
    images: [
      '/assets/runway-assets/Global-Native-woman-PE.jpg',
      '/assets/runway-assets/Global-Street-food-KR.jpg',
      '/assets/runway-assets/Global-Transamerica-pyramid-SF.jpg',
      '/assets/runway-assets/Global-Venice-boat-IT.jpg'
    ],
    desc: [
      'Native fashion from Peru.',
      'Street food culture, Korea.',
      'San Francisco cityscape.',
      'Venetian boat ride, Italy.'
    ]
  },
  modern: {
    images: [
      '/assets/runway-assets/Modern-women-sun-bathing.jpg',
      '/assets/runway-assets/Modern-woman-posing-NY.jpg',
      '/assets/runway-assets/Modern-woman-model-city.jpg',
      '/assets/runway-assets/Modern-man-smile-fall.jpg'
    ],
    desc: [
      'Modern beach style.',
      'NYC urban modern looks.',
      'Chic in the city.',
      'Autumn modern men.'
    ]
  },
  street: {
    images: [
      '/assets/runway-assets/Street-cafe-FR.jpg',
      '/assets/runway-assets/Street-city-bus.jpg',
      '/assets/runway-assets/Street-dining-KR.jpg',
      '/assets/runway-assets/Street-yellow-cablecar-DE.jpg'
    ],
    desc: [
      'Parisian cafes and street life.',
      'Urban bus culture.',
      'Korean street dining.',
      'Berlin cablecar style.'
    ]
  },
  wedding: {
    images: [
      '/assets/runway-assets/Wedding-couple-engagement.jpg',
      '/assets/runway-assets/Wedding-couple-smiling.jpg',
      '/assets/runway-assets/Wedding-kiss.jpg',
      '/assets/runway-assets/Wedding-woman-celebration.jpg'
    ],
    desc: [
      'Romantic engagement moments.',
      'Smiles and celebration.',
      'The perfect kiss.',
      'Celebration in style.'
    ]
  }
};

document.addEventListener('DOMContentLoaded', function () {
  // In-card image carousel logic
  document.querySelectorAll('.collection-card').forEach(card => {
    const collection = card.dataset.collection;
    let idx = 0;
    const img = card.querySelector('.collection-image');
    const desc = card.querySelector('.collection-desc');
    const imgCount = card.querySelector('.img-count');
    const total = collectionsData[collection].images.length;
    function updateCard() {
      img.src = collectionsData[collection].images[idx];
      desc.textContent = collectionsData[collection].desc[idx];
      imgCount.textContent = `${idx + 1} / ${total}`;
    }
    card.querySelector('.carousel-arrow.in-card.left').onclick = e => {
      e.stopPropagation();
      idx = (idx - 1 + total) % total;
      updateCard();
    };
    card.querySelector('.carousel-arrow.in-card.right').onclick = e => {
      e.stopPropagation();
      idx = (idx + 1) % total;
      updateCard();
    };
    updateCard();
  });

  // Outer carousel scroll navigation
  const carousel = document.querySelector('.collections-track');
  document.querySelector('.carousel-arrow.outer.left').onclick = function () {
    carousel.scrollBy({ left: -350, behavior: 'smooth' });
  };
  document.querySelector('.carousel-arrow.outer.right').onclick = function () {
    carousel.scrollBy({ left: 350, behavior: 'smooth' });
  };
});
