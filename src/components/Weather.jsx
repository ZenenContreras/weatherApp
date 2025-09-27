import { useState } from "react"

function Weather () {
    const [isOpen, setIsOpen] = useState(false)
    const [dayClicked, setDay] = useState("")

    const weatherIcon = {
        "sunny" : "./icon-sunny.webp"
    }

    const days = ["Monday" , "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

    const dailyForescast = [
        {"day": "Tue", "max": "20", "min" : "14", "icon": "./icon-drizzle.webp"},
        {"day": "Wed", "max": "20", "min" : "14", "icon": "./icon-drizzle.webp"},
        {"day": "Thu", "max": "20", "min" : "14", "icon": "./icon-drizzle.webp"},
        {"day": "Fri", "max": "20", "min" : "14", "icon": "./icon-drizzle.webp"},
        {"day": "Sat", "max": "20", "min" : "14", "icon": "./icon-drizzle.webp"},
        {"day": "Sun", "max": "20", "min" : "14", "icon": "./icon-drizzle.webp"},
        {"day": "Mon", "max": "20", "min" : "14", "icon": "./icon-drizzle.webp"},
    ] 

    const hourlyForecast = [
        {"icon": "./icon-drizzle.webp","hour" : "3PM" , "weather" : "20"},
        {"icon": "./icon-drizzle.webp","hour" : "4PM" , "weather" : "20"},
        {"icon": "./icon-drizzle.webp","hour" : "5PM" , "weather" : "20"},
        {"icon": "./icon-drizzle.webp","hour" : "6PM" , "weather" : "20"},
        {"icon": "./icon-drizzle.webp","hour" : "7PM" , "weather" : "20"},
        {"icon": "./icon-drizzle.webp","hour" : "8PM" , "weather" : "20"},
        {"icon": "./icon-drizzle.webp","hour" : "9PM" , "weather" : "20"},
        {"icon": "./icon-drizzle.webp","hour" : "10PM" , "weather" : "20"},
    ]

    return (
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-4 text-white pb-12 px-4 flex-1">
            <div className="flex flex-col lg:col-span-2 gap-5 h-full flex-1">
                <div className="bg-[url('./bg-today-small.svg')] min-h-[200px] md:min-h-[250px] lg:min-h-[300px] md:bg-[url('./bg-today-large.svg')] lg:bg-[url('./bg-today-large.svg')] bg-cover bg-center bg-no-repeat flex items-center justify-between font-bold p-4 md:p-6 lg:p-8 rounded-2xl">
                    <div className="flex flex-col gap-2">
                        <span className="text-sm md:text-base lg:text-lg">City, Country</span>
                        <span className="text-xs md:text-sm lg:text-base">Date</span>
                    </div>
                    <div className="flex flex-row items-center gap-2">
                        <img src={weatherIcon.sunny} alt="" className="h-20 md:h-32 lg:h-48 object-contain"/>
                        <span className="text-4xl md:text-6xl lg:text-8xl">20°</span>
                    </div>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4   gap-4 lg:gap-8 ">
                    <div className="aspect-square flex flex-col items-center justify-around  bg-gray-800 rounded-lg  p-4">
                        <span className="font-semibold lg:text-2xl">Feels Like</span>
                        <span className="text-2xl lg:text-4xl">18°</span>
                    </div>
                    <div className="aspect-square flex flex-col items-center justify-around  bg-gray-800 rounded-lg p-4">
                        <span className="font-semibold lg:text-2xl">Humidity</span>
                        <span className="text-2xl lg:text-4xl">46%</span>
                    </div>
                    <div className="aspect-square flex flex-col items-center justify-around  bg-gray-800 rounded-lg  p-4">
                        <span className="font-semibold lg:text-2xl">Wind</span>
                        <span className="text-2xl lg:text-4xl">14 km/h</span>
                    </div>
                    <div className="aspect-square flex flex-col items-center justify-around  bg-gray-800 rounded-lg p-4">
                        <span className="font-semibold lg:text-2xl">Precipitation</span>
                        <span className="text-2xl lg:text-4xl">0mm</span>
                    </div>
                </div>
                <div className="flex-1 flex flex-col pt-4 justify-around">
                    <h2 className="md:text-2xl font-semibold">Daily Forecast</h2>
                    <div className="grid gap-4 grid-cols-3 md:grid-cols-7">
                        {dailyForescast.map((day, index)=>{
                            return (
                                <div className="bg-gray-800 flex flex-col items-center gap-4 rounded-lg p-4 mt-6 " key={index}>
                                    <span>{day.day}</span>
                                    <img src={day.icon} alt="" className="max-h-12"/>
                                    <div className="flex flex-row justify-between gap-6">
                                        <span>{day.max}°</span>
                                        <span>{day.min}°</span>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
            <div className="  lg:col-span-1 bg-gray-800 rounded-lg font-bold p-2 h-full">
                <div className="relative flex flex-row items-center p-5">
                    <h1 className="sm:text-md lg:text-lg">Hourly Forecast</h1>
                    <button onClick={()=>setIsOpen(!isOpen)} className='bg-[#3C3B5E] ml-14 md:ml-35 p-2 rounded-md flex justify-between gap-3 items-center text-white'>
                        <img src="./icon-units.svg" alt="" className='ml-2 w-4 h-4 bg-transparent'/>
                        <span className='font-dm'>Days</span>
                        <img src="./icon-dropdown.svg" alt="" className={`mr-2 w-4 h-4 transition-transform duration-200 bg-transparent ${isOpen ? 'rotate-180' : ''}`}/>
                    </button>
                    {isOpen && (
                        <div>
                            <div className="absolute top-full right-3 w-52 bg-[#262540] border border-gray-600 rounded-lg shadow-xl z-50 py-2 text-white font-sans flex flex-col  text-left">
                                {days.map((day,index)=>{
                                    return(
                                        <button onClick={()=>setDay(day)} className={`mx-2 my-1 p-2 pt-3 pl-3 rounded-lg text-left ${dayClicked === day && 'bg-[#302F4A]'}`} key={index}>{day}</button>
                                    )
                                    
                                })}
                            </div>
                        </div>
                    )}
                </div>
                    {hourlyForecast.map((hour, index)=>{
                        return (
                            <div className="flex justify-between items-center p-2 bg-[#302F4A] border-[#3C3B5E] border-1 m-4 rounded-lg" key={index}>
                                <div className="flex items-center">
                                    <img src={hour.icon} alt="" className="w-12 h-auto" />
                                    <span>{hour.hour}</span>
                                </div>
                                <span>{hour.weather}°</span>
                            </div>

                            
                        )
                    })}
            </div>
        </section>
    )
}

export default Weather