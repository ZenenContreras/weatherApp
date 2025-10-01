import { useState } from 'react'

function NavBar({currentUnit, onUnitChange}) {
    const [isOpen, setisOpen] = useState(false)
    const [allow, setAllow] = useState(true)

    const triggerBlink = () => {
        setAllow(false);
        setTimeout(() => {
            setAllow(true);
        }, 1000);
    };

    return (
        <nav className='flex p-5  justify-between items-center font-dm'>
            <img src="./logo.svg" alt="" className='w-[130px] md:w-[140px] lg:w-[150px]' />

            <div className='relative'>
                <button onClick={()=> setisOpen(!isOpen)} className='bg-[#262540] mt-1 py-1 px-1.5 rounded-md flex justify-between gap-3 items-center text-white'>
                    <img src="./icon-units.svg" alt="" className='ml-2 w-4 h-4 bg-transparent'/>
                    <span className='font-dm'>Units</span>
                    <img src="./icon-dropdown.svg" alt="" className={`mr-2 w-4 h-4 transition-transform duration-200 bg-transparent ${isOpen ? 'rotate-180' : ''}`}/>
                </button>

                {isOpen && (
                    <div >
                        <div className="absolute top-full right-0 mt-2 w-52 bg-[#262540] border border-gray-600 rounded-lg shadow-xl z-50 py-2 text-white font-sans flex flex-col items-center ">
                            {currentUnit === 'C' ? (
                                <div className=' m-1'>
                                    <button onClick={()=> onUnitChange('F')} className={`text-left p-2 rounded-lg w-44 ${!allow && 'animate-pulse bg-opacity-25 bg-blue-500'}`} >
                                        Switch to Imperial
                                    </button>
                                </div>
                            ): (
                                <div className=' m-1'>
                                    <button onClick={()=> onUnitChange('C')} className={`text-left p-2 rounded-lg w-44 ${!allow && 'animate-pulse bg-blue-500'}`}>
                                        Switch to Metric
                                    </button>
                                </div>
                            )}
                            <div className='flex flex-col items-start justify-start gap-2 '>
                                <hr className='w-full'/>
                                <span className='text-[#ACACB7] text-sm'>Temperature</span>
                                <button onClick={currentUnit === 'F' ? triggerBlink : undefined} className={`flex flex-row justify-between p-2 rounded-lg w-44 ${currentUnit === 'C' ? 'bg-[#302F4A]' : ''}`} >
                                    Celsius (°C)
                                    {currentUnit === 'C' && (
                                        <img src="./icon-checkmark.svg" alt="" />
                                    )}
                                </button>
                                <button onClick={currentUnit === 'C' ? triggerBlink : undefined} className={`flex flex-row justify-between p-2 rounded-lg w-44 ${currentUnit === 'F' ? 'bg-[#302F4A]' : ''}`} >
                                    Fahrenheit (°F)
                                    {currentUnit === 'F' && (
                                        <img src="./icon-checkmark.svg" alt="" />
                                    )}
                                </button>

                                <hr className='w-full'/>
                                
                                <span className='text-[#ACACB7] text-sm'>Wind Speed</span>
                                <button onClick={currentUnit === 'F' ? triggerBlink : undefined} className={`flex flex-row justify-between p-2 rounded-lg w-44 ${currentUnit === 'C' ? 'bg-[#302F4A]' : ''}`} >
                                    km/h
                                    {currentUnit === 'C' && (
                                        <img src="./icon-checkmark.svg" alt="" />
                                    )}
                                </button>
                                <button onClick={currentUnit === 'C' ? triggerBlink : undefined} className={`flex flex-row justify-between p-2 rounded-lg w-44 ${currentUnit === 'F' ? 'bg-[#302F4A]' : ''}`} >
                                    mph
                                    {currentUnit === 'F' && (
                                        <img src="./icon-checkmark.svg" alt="" />
                                    )}
                                </button>
                                
                                <hr className='w-full'/>

                                <span className='text-[#ACACB7] text-sm'>Precipitation</span>
                                <button onClick={currentUnit === 'F' ? triggerBlink : undefined} className={`flex flex-row justify-between p-2 rounded-lg w-44 ${currentUnit === 'C' ? 'bg-[#302F4A]' : ''}`} >
                                    Millimeters (mm)
                                    {currentUnit === 'C' && (
                                        <img src="./icon-checkmark.svg" alt="" />
                                    )}
                                </button>
                                <button onClick={currentUnit === 'C' ? triggerBlink : undefined} className={`flex flex-row justify-between p-2 rounded-lg w-44 ${currentUnit === 'F' ? 'bg-[#302F4A]' : ''}`} >
                                    Inches (in)
                                    {currentUnit === 'F' && (
                                        <img src="./icon-checkmark.svg" alt="" />
                                    )}
                                </button>

                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    )
}

export default NavBar
