import NavBar from './components/NavBar.jsx'
import SearchBar from './components/SearchBar.jsx'
import Weather from './components/Weather.jsx'

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
