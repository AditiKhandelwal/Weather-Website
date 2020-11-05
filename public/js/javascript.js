console.log('Client side js file is loaded')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) =>{
    e.preventDefault()      // avoid browser from getting refreshed 
    console.log('testing!')
    const location = search.value
    messageOne.textContent ='Loading...'
    messageTwo.textContent =''
    fetch('/weather?address=' + location).then((response) =>{
    response.json().then((data) =>{
         if(data.error)
         {
            messageOne.textContent = data.error
         }
         else{
             messageTwo.textContent = data.forecastData
             messageOne.textContent = data.location
         }
    })
})
})