

export default function apiCall (api, data, msg){
  const file = document.getElementById('imageFile').files[0];
  const formData = new FormData();
  formData.append('picture', file);
  fetch(,{
    method:'POST',
     
      body: formData,
  })
  .then(res => res.json())
  .then(data => {
    const message = `The System recognized this image as ${data.Type}.\nThe result of the diagnoses is ${data.Result}`;
    info(7000, message)
  })
  
}