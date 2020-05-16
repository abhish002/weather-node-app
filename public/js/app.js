console.log('client side js is loaded');

const form = document.querySelector('form')
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const address = e.target.querySelector('input').value;
    const error = document.querySelector('#error-message');
    const loading = document.querySelector('#loading');
    const location = document.querySelector('#location');
    const forecast = document.querySelector('#forecast');

    loading.textContent = 'Loading..';
    location.textContent = '';
    forecast.textContent = '';
    error.textContent = '';    

    fetch(`/weather?address=${address}`)
        .then(res => res.json())
        .then(data => {
            loading.textContent = '';

            if (data.error) {
                error.textContent = data.error
            } else {
                location.innerHTML = `<b>Location</b>: ${data.location}`;
                forecast.innerHTML = `<b>Forecast</b>: ${data.forecast}`;
            }
        })
});

