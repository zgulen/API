const url = "https://api.openweathermap.org/data/2.5/"
const key = "0c782db722756c7a678544f42572f87d"

const button = document.querySelector("button")
const inputValue = document.querySelector("input")
let arr = []
const ulCities = document.querySelector(".cities")

//! when error occurs elements below will show up
const span = document.querySelector(".msg")
const error = document.createElement("p")
span.appendChild(error)
//! ----------
button.addEventListener("click", (e) => {
    e.preventDefault()
    let link = `${url}weather?q=${inputValue.value}&appid=${key}&units=metric&lang=en`
    fetch(link)
        .then(weather => {
            if (!weather.ok) {
                throw new Error()
            }
            return weather.json()
        })
        .then(displayResult)
        .catch(errorMessage)

})

const displayResult = (result) => {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === document.querySelector("input").value) {
            error.textContent = "You already chose this city"
            inputValue.value = ""
            return
        }
    }
    //! input value deleted and focused
    inputValue.focus()
    //! creating elements
    let li = document.createElement("li")
    let city = document.createElement("p")
    let temperature = document.createElement("span")
    let icon = document.createElement("img")
    let description = document.createElement("figcaption")
    //! classes
    li.className = "city"
    city.className = "city-name"
    temperature.className = "city-temp"
    icon.className = "city-icon"
    //! where are elements
    ulCities.appendChild(li)
    li.appendChild(city)
    li.appendChild(temperature)
    li.appendChild(icon)
    li.appendChild(description)
    //! elements contents
    city.innerHTML = `${result.name}  <sup>${result.sys.country}</sup>`
    temperature.textContent = `${Math.round(result.main.temp)}°C`
    description.textContent = `${result.weather[0].description}`
    const iconurl = "http://openweathermap.org/img/w/" + result.weather[0].icon + ".png";
    icon.src = iconurl
    //! delete text content
    error.textContent = ""
    // console.log(city.textContent.toLowerCase().slice(0, city.textContent.indexOf(" ")+1))


    
    console.log(arr)
    arr.push(document.querySelector("input").value)

    inputValue.value = ""
}

const errorMessage = () => {
    error.textContent = "There is no such city"
}

inputValue.addEventListener("keydown", (e) => {
    if (e.key == "Enter") {
        e.preventDefault()
        // button.click()
        let link = `${url}weather?q=${inputValue.value}&appid=${key}&units=metric&lang=en`
        fetch(link)
            .then(weather => {
                if (!weather.ok) {
                    throw new Error()
                }
                return weather.json()
            })
            .then(displayResult)
            .catch(errorMessage)
    }

})


