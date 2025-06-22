


// Initialize Firebase (use your config)
const firebaseConfig = {
    apiKey: "YOUR-API-KEY",
    authDomain: "YOUR-PROJECT.firebaseapp.com",
    projectId: "YOUR-PROJECT-ID",
    storageBucket: "...",
    messagingSenderId: "...",
    appId: "..."
  };
  
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  
  async function loadFeatured() {
    const gallery = document.getElementById('featured-gallery');
    gallery.innerHTML = "Loading...";
    const snapshot = await db.collection('featured').get();
    gallery.innerHTML = '';
    snapshot.forEach(doc => {
      const data = doc.data();
      const card = document.createElement('div');
      card.className = 'runway-card';
      card.innerHTML = `
        <img src="${data.imgUrl}" alt="${data.title}" />
        <div class="card-content">
          <h3>${data.title}</h3>
          <p>${data.description}</p>
        </div>
      `;
      gallery.appendChild(card);
    });
  }
  
  document.addEventListener('DOMContentLoaded', loadFeatured);