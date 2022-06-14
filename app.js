const url = "https://api.openweathermap.org/data/2.5/"
const key = "0c782db722756c7a678544f42572f87d"

const button = document.querySelector("button")
const inputValue = document.querySelector("input")
const ulCities = document.querySelector(".cities")

button.addEventListener("click", () =>{
    let link = `${url}weather?q=${inputValue.value}&appid=${key}&units=metric&lang=en`
    fetch(link)
    .then(weather =>{
        if(!weather.ok){
            throw new Error("something went wrong")
        }
        return weather.json()
    })
    .then(displayResult)
    .catch((err) => console.log(err))
})

const displayResult = (result) =>{
    console.log(result)
    let li = document.createElement("li")
    let city = document.createElement("p")
    let temperature = document.createElement("span")
    let icon = document.createElement("img")
    let description = document.createElement("figcaption")
    li.className = "city"
    city.className = "city-name"
    temperature.className = "city-temp"
    icon.className = "city-icon"
    ulCities.appendChild(li)
    li.appendChild(city)
    li.appendChild(temperature)
    li.appendChild(icon)
    li.appendChild(description)
    city.innerHTML = `${result.name}  <sup>${result.sys.country}</sup>`
    temperature.textContent = `${Math.round(result.main.temp_max)}°C`
    description.textContent = `${result.weather[0].description}`
    const iconurl = "http://openweathermap.org/img/w/" + result.weather[0].icon + ".png";
    icon.src = iconurl
}


