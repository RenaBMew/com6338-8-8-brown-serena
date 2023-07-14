// After submit, app should call to the Open Weather API's using the JavaScript fetch API
// app should display the current weather information on the page
// https://api.openweathermap.org/data/2.5/weather?q=&units=imperial&appid=45d56c548b8455a36b81e07e6ba78d5d

var URL = 'https://api.openweathermap.org/data/2.5/weather?q='
var KEY = '&units=imperial&appid=45d56c548b8455a36b81e07e6ba78d5d'
var weatherDiv = document.getElementById('weather')
var form = document.querySelector('form')

form.onsubmit = function(e) {
    e.preventDefault()
    var searchQuery = this.search.value
    if (!searchQuery) return
    form.search.value = ""
    fetch(URL + searchQuery + KEY)    
    .then(function(res) {
        return res.json()
    })
    .then(getWeather)    
    // Location not found on non city input
   
    .catch(() => {
        var notFound = document.createElement('p')
        notFound.textContent = 'Location not found!'
        weatherDiv.appendChild(notFound)
    })
} 

function getWeather(data){
    weatherDiv.innerHTML = ""
    console.log(data)

    // display city
    var city = document.createElement('h2')
    city.textContent = data.name + ', ' + data.sys.country
    weatherDiv.appendChild(city)

    // display map link - https://www.google.com/maps/search/?api=1&query=
    var mapLink = document.createElement('a')
    var latitude = data.coord.lat
    var longitude = data.coord.lon
    mapLink.href = 'https://www.google.com/maps/search/?api=1&query=' + latitude + ',' + longitude
    mapLink.target = '_blank'
    mapLink.textContent = 'click to view map'
    weatherDiv.appendChild(mapLink)

    // display conditions icon - weather.icon - https://openweathermap.org/img/wn/01n@2x.png
    var img = document.createElement('img')
    img.src = 'https://openweathermap.org/img/wn/' + data.weather[0].icon + '@2x.png'
    weatherDiv.appendChild(img) 

    // display conditions
    var currentConditions = document.createElement('p')
    currentConditions.style.textTransform = 'capitalize'
    currentConditions.textContent = data.weather[0].description
    weatherDiv.appendChild(currentConditions)

    // display current temp
    var currentTemp = document.createElement('p')
    currentTemp.textContent = 'Current: ' + data.main.temp + ' °F'
    weatherDiv.appendChild(currentTemp)

    // display 'feels like'
    var feelsLike = document.createElement('p')
    feelsLike.textContent = 'Feels Like: ' + data.main.feels_like + ' °F'
    weatherDiv.appendChild(feelsLike)

    // timestamp in milliseconds *1000 - use dt
    var ms = data.dt * 1000
    var date = new Date(ms)
    var timeString = date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit'
    })
    // display last updated time
    var lastUpdated = document.createElement('p')
    lastUpdated.textContent = 'Last Updated: ' + timeString
    weatherDiv.appendChild(lastUpdated)
}