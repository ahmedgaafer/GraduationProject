

export default function action (){
  const form = document.getElementById('signupForm');
  

  form.addEventListener('submit', e => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    console.table(data);
    
    fetch('/api/auth/register/',{
      method:'POST',
      headers: {
        'Content-Type': 'application/json;'
      },
      body: JSON.stringify(data),
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
    })
  });
}