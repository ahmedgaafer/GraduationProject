export default function action (){
  const form = document.getElementById('loginForm');
  let state;
  form.addEventListener('submit', e =>{
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    return fetch('/api/auth/login/',{
      method:'POST',
      headers: {
        'Content-Type': 'application/json;'
      },
      body: JSON.stringify(data),
    })
    .then(res => res.json())
    .then(data => {
      return data;
    })
  });

    
}