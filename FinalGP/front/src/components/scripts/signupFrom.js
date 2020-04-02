

export default function action (){
  const form = document.getElementById('signupForm');


  form.addEventListener('submit', e => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    console.table(data);
  });
}