
// js/email-form.js

document.addEventListener('DOMContentLoaded', function () {
  const params = new URLSearchParams(window.location.search);
  if(params.get('email')) {
    document.getElementById('email').value = params.get('email');
  }

  document.getElementById('unsubscribe-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const res = await fetch('/unsubscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    if(res.ok) {
      document.getElementById('form-container').innerHTML = `
        <div class="confirmation">
          <strong>${email}</strong> has been unsubscribed from our emails.<br>
          Sorry to see you go!
        </div>
      `;
    } else {
      document.getElementById('form-container').innerHTML = `
        <div class="confirmation" style="background:#fde8e8; color:#d43a3a;">
          Something went wrong. Please try again, or contact us.
        </div>
      `;
    }
  });
});
