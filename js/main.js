const warpper = document.querySelector('.wrapper'),
    inputPart = warpper.querySelector('.input-part'),
    infoTxt = inputPart.querySelector('.info-text'),
    inputField = inputPart.querySelector('input'),
    locationBtn = inputPart.querySelector('button')




inputField.addEventListener('keyup', e => {
    if (e.key = 'Enter' && inputField.value != '') {
        requestApi(inputField.value)
    }
})

function requestApi(city) {
    let tempApi = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=3fcf81928648ed81141be245e032222c`
    fetch(tempApi).then(response => response.json()).then(result => weatherDetails(result))
}

locationBtn.addEventListener('click', () => {
    if (navigator.geolocation) { //// if browser support location
        navigator.geolocation.getCurrentPosition(onSuccess, onError)
    } else(console.error('not define'))
})

function onSuccess(position) {
    console.log(position)
}

function onError(error) {
    console.log(error.message)
}

function weatherDetails(info) {
    console.log(info)
}