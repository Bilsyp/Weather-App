const key = "67a9ace4af7542e5b5b12854232602"


const input = document.querySelector("form input")

const ios = _.max([4, 2, 8, 6]);
const start = _.debounce(search, [600])

async function fetchData(lat, lon) {
  if (input.value !== "") {
    const fetchDatas = await fetch(`http://api.weatherapi.com/v1/current.json?key=${key}&q=${input.value}`)
    const data = await fetchDatas.json()
    return data
  } else {
    // with Parameter for Default
    const fetchDatax = await fetch(`http://api.weatherapi.com/v1/current.json?key=${key}&q=${lat},${lon}`)
    const datax = await fetchDatax.json()
    return datax
  }

}
async function search() {
  const ul = document.querySelector("form ul")
  const data = await fetchData()
  console.log(data)
  if (input.value == "") {
    ul.innerHTML = ""
  } else {
    ul.innerHTML = `
  <li data-lat=${data.location.lat} data-lon=${data.location.lon} >${data.location.name}
  <span>${data.location.region}</span>
  </li>
  `
    const li = document.querySelector("form ul li");
    li.addEventListener("click", () => {
      generateWheater(data)
    })
  }
}

function generateWheater(data) {
  const wheater = document.querySelector(".wheater")
  const icons = 'http:' + data.current.condition.icon

  const template = `<div class="">
              <h2 class="font-bold text-orange-600 text-3xl">Wheater</h2>
              <div>
              <div class="flex my-10 justify-center gap-x-10 items-center">
              <h2>${data.current.temp_c} &#8451;</h2>
              <h2>${data.current.temp_f} &#8457;</h2>
              </div>
               <div class="text-center mx-auto flex justify-center">
                <img class='w-40' src='${icons}'/>
                </div>
                 <h3 class="text-2xl font-bold">${data.location.name}</h3>
                 <h2 class="font-semibold text-sm">${data.current.condition.text}</h2>
              </div>
            </div>
            <div class ="flex gap-x-5 justify-around items-center my-10 text-center">
            <div>
                <h2>lat</h2>
                <p>${data.location.lat}</p>
              </div> 
            <div>
              <h2>lon</h2> 
              <p>${data.location.lon}
              </p> 
              </div> 
              <div>
              <h2>country</h2> 
              <p>${data.location.country}</p> 
              </div>
              </div>`
  wheater.innerHTML = template

}

function checkItems() {
  console.log("Stop")

}
input.addEventListener("keyup", start);

// Default location

document.addEventListener("DOMContentLoaded", () => {
  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  async function success(pos) {
    const crd = pos.coords;
    const data = await fetchData()

    console.log("Your current position is:");
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);
    generateWheater(crd.latitude,crd.longitude)
  }

  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  navigator.geolocation.getCurrentPosition(success, error, options);
  

})