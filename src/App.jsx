import NavBar from './components/NavBar.jsx'
import SearchBar from './components/SearchBar.jsx'
import Weather from './components/Weather.jsx'
import { useState } from 'react'

function App() {
  const [isLoading, setIsLoading] = useState(false)
  const [weatherData, setWeatherData] = useState(null)
  const [temperatureUnit, setTemperatureUnit] = useState('C') // 'C' o 'F'
  console.log(temperatureUnit)

  const handleCitySelect = async (city) =>{
    console.log("Ciudad seleccionada: ", city)
    setIsLoading(true)

    try{
      //llamada a la api
      const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${city.latitude}&longitude=${city.longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m&hourly=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`)

      //guardamos los datos
      const data = await response.json()
      console.log("Datos del clima: ", data)

      //guardamos el estado del clima
      setWeatherData({
        ...data,
        location: {
          name: city.name,
          country: city.country
        }
      })

    }catch(error){
      console.error("Error al obtener el clima:  ", error)
    }finally{
      setIsLoading(false)
    }

  }

  const handleUnitChange = (unit) => {
    setTemperatureUnit(unit) // 'C' o 'F'
  }

  return (
    <div className='h-full bg-[#02012C] md:px-[70px] lg:px-[240px] '>
      <NavBar currentUnit={temperatureUnit} onUnitChange={handleUnitChange}/>
      <SearchBar onCitySelect={handleCitySelect} />
      <Weather  temperatureUnit={temperatureUnit} weatherData={weatherData} isLoading={isLoading} />
    </div>
    
  )
}

export default App
