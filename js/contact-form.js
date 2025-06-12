// js/contact-form.js

// your public API root
const API_ROOT = 'https://projectrunway-api.herokuapp.com';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.form-section form');
  if (!form) return;  // only run on the contact page

  form.addEventListener('submit', async e => {
    e.preventDefault();

    const data = {
      name:    form.name.value.trim(),
      email:   form.email.value.trim(),
      message: form.message.value.trim()
    };

    try {
      const res = await fetch(`${API_ROOT}/api/inquiries`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(data)
      });
      const json = await res.json();

      if (json.success) {
        alert('✅ Message sent!');
        form.reset();
      } else {
        throw new Error(json.error || 'Server error');
      }
    } catch (err) {
      console.error('Form submission error:', err);
      alert('❌ Failed to send message.');
    }
  });
});
