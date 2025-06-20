
// public/js/contact-form.js

// Determine API root by hostname
const hostname = window.location.hostname;
const API_ROOT = (
  hostname === 'myprojectrunway.com' ||
  hostname === 'www.myprojectrunway.com'
)
  ? 'https://projectrunway-api-b99afb2eca22.herokuapp.com'
  : 'http://localhost:5000';

const MAX_RETRIES = 1;  
const RETRY_DELAY_MS = 500;  

console.log(`contact-form.js loaded; using API_ROOT=${API_ROOT}`);

async function postData(payload, retries = MAX_RETRIES) {
  try {
    const resp = await fetch(`${API_ROOT}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const { ok, status } = resp;
    if (!ok) {
      throw new Error(`HTTP ${status}`);
    }

    return await resp.json();
  } catch (err) {
    console.warn(`postData error: ${err.message}`);
    if (retries > 0) {
      console.log(`Retrying in ${RETRY_DELAY_MS}ms... (${retries} left)`);
      await new Promise(r => setTimeout(r, RETRY_DELAY_MS));
      return postData(payload, retries - 1);
    }
    throw err;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');
  const submitBtn = form.querySelector('button[type="submit"]');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    submitBtn.disabled = true;   
    console.log('Form submit triggered');         

    const payload = {
      name:    form.name.value,
      email:   form.email.value,
      message: form.message.value,
    };

    try {
      const result = await postData(payload);
      console.log('🔔 server response:', result);

      if (result.success) {
        alert('Message sent!');
        form.reset();
      } else {
        alert('Error: ' + (result.error || 'Unknown error'));
      }
    } catch (err) {
      console.error('Final failure:', err);
      alert('Unable to send message. Please try again later.');
    } finally {
      submitBtn.disabled = false;
    }


  });
});
