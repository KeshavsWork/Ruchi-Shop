import React, { useState , useEffect} from 'react'

const Search = () => {
    const placeholder = [
        "Seach Dry Fruits...",
        "Search Spices...",
        "Explore Walnuts...",
        "Get Almonds...",
        "Search Fresh Spices...",
    ]
    const [index, setIndex] = useState(0);
    useEffect(() => {
      const timer = setInterval(() => {
        setIndex((prevIndex)=>(prevIndex+1)%placeholder.length)
      }, 3000);
    
      return () => clearInterval(timer);
    }, [])
    
  return (
    <div className='p-3 '>
      <input type="text" placeholder={placeholder[index]} className='w-full h-8'/>
    </div>
  )
}

export default Search