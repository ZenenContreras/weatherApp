import NavBar from './components/Navbar'
import SearchBar from './components/SearchBar'
import Weather from './components/Weather'

function App() {

  return (
    <div className='h-full bg-[#02012C] md:px-[70px] lg:px-[240px] '>
      <NavBar/>
      <SearchBar />
      <Weather />
    </div>
    
  )
}

export default App
