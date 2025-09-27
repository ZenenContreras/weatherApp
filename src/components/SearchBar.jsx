import { useState } from "react"

function SearchBar  (){
    const [isOpen, setIsOpen] = useState(false)

const cities = [{"name": "Lisboa", "country" : "Portugal"},{"name": "Lisboa", "country" : "Portugal"},{"name": "Lisboa", "country" : "Portugal"},{"name": "Lisboa", "country" : "Portugal"}]
    return (
        <div className=" font-dm pt-20 flex flex-col items-center mx-4">
            <h1 className="font-bold text-white text-5xl text-center">How’s the sky looking today?</h1>
            <div className="relative">
                <div className=" text-white py-10 w-full flex flex-col lg:flex-row items-center justify-center gap-4">
                        <input
                            className="h-12 bg-[#262540] w-full lg:w-140 rounded-xl pl-12 pr-5 placeholder-white"
                            type="text"
                            placeholder="Search for a place..."
                            onClick={()=>setIsOpen(!isOpen)}
                        />
                        <button className="bg-[#2B1B9C] h-12 rounded-xl w-full lg:w-26">
                            Search
                        </button>
                </div>
            {isOpen && (
                <div className="absolute top-full lg:top-[75%] right-0 w-full bg-[#262540] border border-gray-600 rounded-lg shadow-xl z-50 p-2 text-white font-sans flex flex-col items-center ">
                    {cities.map((cities)=>{
                        return (
                            <button className="p-4 rounded-lg w-full text-left">{cities.name}, {cities.country}</button>
                        )
                    })}
                </div>
            )}
            </div>
        </div>
    )
}

export default SearchBar   
