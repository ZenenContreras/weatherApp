import { useState } from "react"

function SearchBar ({ onCitySelect }){
    const [isOpen, setIsOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState("") //lo que escribe el usuario
    const [cities, setCities] = useState([]) //ciudades encontras
    const [isLoading, setIsLoading] = useState(false) //si esta buscando una ciudad

    const searchCities = async (query) =>{
        //validar si el usario escribio mas de 3 letras
        if (query.length <3){
            setCities([])
            return
        }

        setIsLoading(true)

        try{
            //llamada a la API de geocoding para buscar una ciudad con su longitud y latitud
            const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=5&language=en&format=json`)
            const data = await response.json()
            console.log("Ciudades encontradas: ", data)

            // si no hay resultados guardamos un string vacio
            setCities(data.results || [])
        }catch (error){
            console.error("Error al buscar ciudades: ", error)
            setCities([])

        }finally{
            setIsLoading(false)
        }

    }

    // FUNCIÓN: Se ejecuta cada vez que el usuario escribe
    const handleInputChange = (e) => {
        const value = e.target.value
        setSearchTerm(value) // Actualizamos lo que se muestra en el input
        searchCities(value) // Buscamos ciudades
        setIsOpen(true) // Abrimos el dropdown
    }

    // FUNCIÓN: Se ejecuta cuando el usuario hace clic en una ciudad
    const handleCitySelect = (city) => {
        setSearchTerm(`${city.name}, ${city.country}`) // Mostramos la ciudad en el input
        setIsOpen(false) // Cerramos el dropdown
        onCitySelect(city) // ¡IMPORTANTE! Llamamos la función del padre
    }



    return (
        <div className=" m font-dm pt-20 flex flex-col items-center mx-4">
            <h1 className="font-bold text-white text-5xl text-center">How’s the sky looking today?</h1>
            <div className="relative">
                <div className=" text-white  py-10  flex flex-col lg:flex-row items-center justify-center gap-4">
                        <img src="/icon-search.svg" className="absolute z-50 left-4 top-13 "/>
                        <input
                            className=" relative h-12 bg-[#262540] w-[350px] lg:w-140 rounded-xl pl-12 pr-5 placeholder-white"
                            type="text"
                            placeholder="Search for a place..."
                            onChange={handleInputChange}
                            onFocus={()=> setIsOpen(!isOpen)}
                        />
                        <button className="bg-[#2B1B9C] h-12 rounded-xl w-full lg:w-26">
                            Search
                        </button>  
                </div>
            {isOpen && (
                <div className="absolute top-[85%] lg:top-[75%] right-0 w-full bg-[#262540] border border-gray-600 rounded-lg shadow-xl z-50 p-2 text-white font-sans flex flex-col items-center ">
                        {isLoading ? (
                            <div class="animate-spin inline-block size-6 border-4 border-current border-t-transparent text-white rounded-full" role="status" aria-label="loading">
                            </div>
                        ) : cities.length > 0 ? (
                            cities.map((city, index) => (
                                <button
                                    key={index}
                                    className="p-4 rounded-lg w-full text-left hover:bg-[#3C3B5E] transition-colors"
                                    onFocus={()=> handleCitySelect(city)}
                                >
                                    {city.name}, {city.country}
                                    {city.admin1 && `, ${city.admin1}`}
                                </button>
                            ))
                        ): searchTerm.length > 1 ? (
                            <div className="p-4 text-gray-400">No cities Founded</div>
                        ) : null}
                </div>
            )}
            </div>
        </div>
    )
}

export default SearchBar   
