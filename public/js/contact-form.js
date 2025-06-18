// public/js/contact-form.js

const hostname = window.location.hostname;
let API_ROOT;

if (hostname === 'myprojectrunway.com' || hostname === 'www.myprojectrunway.com') {
  API_ROOT = 'https://projectrunway-api-175ac734850a.herokuapp.com';
} else {
  API_ROOT = 'http://localhost:5000';
}

// const API_ROOT = 'https://projectrunway-api-175ac734850a.herokuapp.com';

console.log('contact-form.js loaded');               // confirm file is served

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    console.log('Form submit triggered');             // confirm handler bound

    const payload = {
      name:    form.name.value,
      email:   form.email.value,
      message: form.message.value,
    };

    try {
      const resp = await fetch(`${API_ROOT}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const result = await resp.json();
      console.log('🔔 server response:', result);
      if (result.success) {
        alert('Message sent!');
        form.reset();
      } else {
        alert('Error: ' + result.error);
      }
    } catch (err) {
      console.error('Fetch error:', err);
      alert('Network or CORS error — check console.');
    }
  });
});
