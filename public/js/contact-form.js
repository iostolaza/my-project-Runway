// js/contact-form.js

// your public API root
const API_ROOT ='https://projectrunway-api-175ac734850a.herokuapp.com/api/contact';

// new contact-form.
document.querySelector('form').addEventListener('submit', async function(e) {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  const response = await fetch(API_ROOT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, message })
  });

  const result = await response.json();
  if (result.success) {
    alert('Message sent successfully!');
    document.querySelector('form').reset();
  } else {
    alert('Error: ' + result.message);
  }
});
