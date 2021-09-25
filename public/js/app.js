console.log('client sode javascript is loaded');




const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#message1')
const message2 = document.querySelector('#message2')




weatherForm.addEventListener('submit', (event) => {

  event.preventDefault()

  const location = search.value

  fetch('http://localhost:4000/weather?address='+location).then((response) => {
    response.json().then((data) =>{
      if (data.error) {
        message1.textContent = data.error
        console.log(data.error)
      }else {
        message2.textContent = data.location + '  ' + data.forecast
        console.log(data.location);
        console.log(data.forecast);
      }
    })
  })

})
