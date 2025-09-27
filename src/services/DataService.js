const FetchCity = async () =>{
    try{
        const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${ciudad}`)
        const cities = await response.json()

        return cities
    }catch (err){
        throw new Error(err)
    }

}

export default FetchCity