fetch('/api/inquiries', {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({name, email, message})
  })
  .then(r => r.json()).then(console.log);
  