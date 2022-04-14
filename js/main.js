const warpper = document.querySelector('.wrapper'),
    inputPart = warpper.querySelector('.input-part'),
    infoTxt = inputPart.querySelector('.info-text'),
    inputField = inputPart.querySelector('input'),
    locationBtn = inputPart.querySelector('button')
let tempApi;



inputField.addEventListener('keyup', e => {
    if (e.key = 'Enter' && inputField.value != '') {
        requestApi(inputField.value)
    }
})

function requestApi(city) {
    tempApi = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=3fcf81928648ed81141be245e032222c`
    fetchData()
}

function fetchData() {
    infoTxt.innerText = 'Getting Weather Details';
    infoTxt.classList.add('pending')
    fetch(tempApi).then(response => response.json()).then(result => weatherDetails(result))

}
locationBtn.addEventListener('click', () => {
    if (navigator.geolocation) { //// if browser support location
        navigator.geolocation.getCurrentPosition(onSuccess, onError)

    } else(console.error('not define'))
})

function onSuccess(position) {
    const { latitude, longitude } = position.coords
    tempApi = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=3fcf81928648ed81141be245e032222c`;
    fetchData()
    console.log(position.weather)
}

function onError(error) {
    infoTxt.innerText = error.message;
    infoTxt.classList.add('error');

}

function weatherDetails(info) {
    infoTxt.classList.replace('pending', 'error')

    if (info.cod == "404") {
        infoTxt.innerText = `'${inputField.value}' city name not found `;
    } else {
        infoTxt.classList.remove('pending', 'error');
        warpper.classList.add('active')

        //////////// get value by object //////
        const city = info.name
        const country = info.sys.country
        const { description, id } = info.weather[0]
        const { feels_like, humidity, temp } = info.main
            /////get elements by html var //////

        warpper.querySelector('.temp .number').innerHTML = Math.floor(temp);
        warpper.querySelector('.weather').innerHTML = description;
        warpper.querySelector('.location span').innerHTML = `${country} ${city}`;
        warpper.querySelector('.details .temp .number').innerHTML = Math.floor(feels_like);
        warpper.querySelector('.details .temp .number2').innerHTML = humidity;


    }
    console.log(info)
}