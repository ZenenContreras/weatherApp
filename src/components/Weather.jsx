import { useState } from "react"

function Weather ({weatherData, isLoading}) {
    const [isOpen, setIsOpen] = useState(false)
    const [dayClicked, setDay] = useState("")

    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

    // FUNCIÓN: Obtener icono según el código del clima
    const getWeatherIcon = (weatherCode) => {
        const icons = {
            0: "./icon-sunny.webp",    // Despejado
            1: "./icon-sunny.webp",     // Mayormente despejado
            2: "./icon-partly-cloudy.webp",     // Parcialmente nublado
            3: "./icon-overcast.webp",    // Nublado
            45: "./icon-fog.webp",   // Niebla
            48: "./icon-fog.webp",   // Niebla con escarcha
            51: "./icon-rain.webp",  // Llovizna ligera
            53: "./icon-rain.webp",  // Llovizna moderada
            55: "./icon-fog.webp",  // Llovizna densa
            61: "./icon-rain.webp",  // Lluvia ligera
            63: "./icon-rain.webp",  // Lluvia moderada
            65: "./icon-rain.webp",  // Lluvia fuerte
            71: "./icon-snow.webp",  // Nieve ligera
            73: "./icon-snow.webp",  // Nieve moderada
            75: "./icon-snow.webp",  // Nieve fuerte
            80: "./icon-storm.webpp", // Nieve fuerte
            95: "./icon-storm.webpp",  // Tormenta
            96: "./icon-storm.webpp" // Tormenta

        }
        return icons[weatherCode] || "./icon-sunny.webp"
    }

    const getDayName = (dateString) => {
        const date = new Date(dateString)
        const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
        return dayNames[date.getDay()]
    }

    const formatHour = (timeString) => {
        const date = new Date(timeString)
        const hour = date.getHours()
        
        if (hour === 0) return "12AM"
        if (hour < 12) return `${hour}AM`
        if (hour === 12) return "12PM"
        return `${hour - 12}PM`
    }

    if (isLoading) {
        return (
            <section className="min-h-[700px] grid grid-cols-1 lg:grid-cols-3 gap-4 text-white pb-12 px-4 flex-1">
                <div className="flex row items-center justify-center lg:col-span-3 gap-2 h-64">
                    <span class="animate-spin inline-block size-6 border-4 border-current border-t-transparent text-white rounded-full" role="status" aria-label="loading">
                    </span>
                    <div className="text-xl">Loading weather data</div>
                </div>
            </section>
        )
    }

    if (!weatherData) {
        return (
            <section className="min-h-[700px] grid grid-cols-1 lg:grid-cols-3 gap-4 text-white pb-12 px-4 flex-1">
                <div className="flex items-center justify-center lg:col-span-3 h-64">
                    <div className="text-xl">Search A city to see de Weather data</div>
                </div>
            </section>
        )
    }

    // Extraemos los datos que necesitamos
    const current = weatherData.current
    const daily = weatherData.daily
    const hourly = weatherData.hourly
    const location = weatherData.location

    // Preparamos los datos horarios (próximas 8 horas)
    const hourlyForecast = hourly.time.slice(0, 8).map((time, index) => ({
        hour: formatHour(time),
        weather: Math.round(hourly.temperature_2m[index]),
        icon: getWeatherIcon(hourly.weather_code[index])
    }))


    // Preparamos los datos diarios (próximos 7 días)
    const dailyForescast = daily.time.slice(0, 7).map((date, index) => ({
        day: getDayName(date),
        max: Math.round(daily.temperature_2m_max[index]),
        min: Math.round(daily.temperature_2m_min[index]),
        icon: getWeatherIcon(daily.weather_code[index])
    }))

    return (
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-4 text-white pb-12 px-4 flex-1">
            <div className="flex flex-col lg:col-span-2 gap-5 h-full flex-1">
                {/* Tarjeta principal */}
                <div className="bg-[url('./bg-today-small.svg')] min-h-[200px] md:min-h-[250px] lg:min-h-[300px] md:bg-[url('./bg-today-large.svg')] lg:bg-[url('./bg-today-large.svg')] bg-cover bg-center bg-no-repeat flex items-center justify-between font-bold p-4 md:p-6 lg:p-8 rounded-2xl">
                    <div className="flex flex-col gap-2">
                        <span className="text-sm md:text-base lg:text-lg">
                            {location.name}, {location.country}
                        </span>
                        <span className="text-xs md:text-sm lg:text-base">
                            {new Date().toLocaleDateString('es-ES', { 
                                weekday: 'long', 
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric' 
                            })}
                        </span>
                    </div>
                    <div className="flex flex-row items-center gap-2">
                        <img 
                            src={getWeatherIcon(current.weather_code)} 
                            alt="weather icon" 
                            className="h-20 md:h-32 lg:h-48 object-contain"
                        />
                        <span className="text-4xl md:text-6xl lg:text-8xl">
                            {Math.round(current.temperature_2m)}°
                        </span>
                    </div>
                </div>

                {/* Tarjetas de información */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
                    <div className="aspect-square flex flex-col items-center justify-around bg-gray-800 rounded-lg p-4">
                        <span className="font-semibold lg:text-2xl">Feels Like</span>
                        <span className="text-2xl lg:text-4xl">
                            {Math.round(current.apparent_temperature)}°
                        </span>
                    </div>
                    <div className="aspect-square flex flex-col items-center justify-around bg-gray-800 rounded-lg p-4">
                        <span className="font-semibold lg:text-2xl">Humidity</span>
                        <span className="text-2xl lg:text-4xl">
                            {current.relative_humidity_2m}%
                        </span>
                    </div>
                    <div className="aspect-square flex flex-col items-center justify-around bg-gray-800 rounded-lg p-4">
                        <span className="font-semibold lg:text-2xl">Wind</span>
                        <span className="text-2xl lg:text-4xl">
                            {Math.round(current.wind_speed_10m)} km/h
                        </span>
                    </div>
                    <div className="aspect-square flex flex-col items-center justify-around bg-gray-800 rounded-lg p-4">
                        <span className="font-semibold lg:text-2xl">Precipitation</span>
                        <span className="text-2xl lg:text-4xl">
                            {current.precipitation || 0}mm
                        </span>
                    </div>
                </div>

                {/* Pronóstico diario */}
                <div className="flex-1 flex flex-col pt-4 justify-around">
                    <h2 className="md:text-2xl font-semibold">Daily Forecast</h2>
                    <div className="grid gap-4 grid-cols-3 md:grid-cols-7">
                        {dailyForescast.map((day, index) => (
                            <div className="bg-gray-800 flex flex-col items-center gap-4 rounded-lg p-4 mt-6" key={index}>
                                <span>{day.day}</span>
                                <img src={day.icon} alt="" className="max-h-12"/>
                                <div className="flex flex-row justify-between gap-6">
                                    <span>{day.max}°</span>
                                    <span>{day.min}°</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Pronóstico horario */}
            <div className="lg:col-span-1 bg-gray-800 rounded-lg font-bold p-2 h-full">
                <div className="relative flex flex-row items-center p-5">
                    <h1 className="sm:text-md lg:text-lg">Hourly Forecast</h1>
                    <button 
                        onClick={() => setIsOpen(!isOpen)} 
                        className='bg-[#3C3B5E] ml-14 md:ml-35 p-2 rounded-md flex justify-between gap-3 items-center text-white'
                    >
                        <img src="./icon-units.svg" alt="" className='ml-2 w-4 h-4 bg-transparent'/>
                        <span className='font-dm'>Days</span>
                        <img 
                            src="./icon-dropdown.svg" 
                            alt="" 
                            className={`mr-2 w-4 h-4 transition-transform duration-200 bg-transparent ${isOpen ? 'rotate-180' : ''}`}
                        />
                    </button>
                    {isOpen && (
                        <div>
                            <div className="absolute top-full right-3 w-52 bg-[#262540] border border-gray-600 rounded-lg shadow-xl z-50 py-2 text-white font-sans flex flex-col text-left">
                                {days.map((day, index) => (
                                    <button 
                                        onClick={() => setDay(day)} 
                                        className={`mx-2 my-1 p-2 pt-3 pl-3 rounded-lg text-left ${dayClicked === day && 'bg-[#302F4A]'}`} 
                                        key={index}
                                    >
                                        {day}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
                {hourlyForecast.map((hour, index) => (
                    <div className="flex justify-between items-center p-2 bg-[#302F4A] border-[#3C3B5E] border-1 m-4 rounded-lg" key={index}>
                        <div className="flex items-center">
                            <img src={hour.icon} alt="" className="w-12 h-auto" />
                            <span>{hour.hour}</span>
                        </div>
                        <span>{hour.weather}°</span>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Weather