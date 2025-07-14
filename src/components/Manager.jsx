import React from 'react'
import KajuRaw from 'C:/Users/wania/OneDrive/ドキュメント/Keshav/Projects/Projects/2.2/my-project/src/assets/kaju-raw-5.jpg';
import Almo from '../assets/Almo.jpg';
import Pistachios from '../assets/Pistachios.jpg';
import Kharik from '../assets/Kharik.webp';
import Raisin from '../assets/raisin.jpg';
import Walnut from '../assets/Walnut.jpg';
import Figs from '../assets/Figs.png';
import Miri from '../assets/Miri.jpg';
import Cardamom from '../assets/Cardamom.jpg';

const Manager = ({onAddToCart}) => {
  
    const productList = [
    //      { id: 0, name: 'Cashew', price: 'Rs.260/kg', image: KajuRaw },
    // { id: 1, name: 'Almonds', price: 'Rs.240/kg', image: Almo },
    // { id: 2, name: 'Pistachios', price: 'Rs.1200/kg', image: Pistachios },
    // { id: 3, name: 'Kharik', price: 'Rs.320/Kg', image: Kharik },
    // { id: 4, name: 'Raisins', price: 'Rs.400/Kg', image: Raisin },
    // { id: 5, name: 'Walnuts', price: 'Rs.800/kg', image: Walnut },
    // { id: 6, name: 'Figs', price: 'Rs.900/kg', image: Figs },
    // { id: 8, name: 'Black Pepper', price: 'Rs.600/kg', image: Miri },
    // { id: 9, name: 'Cardamom', price: 'Rs.1500/kg', image: Cardamom }
            {id: 0, name: 'Cashew', price: 'Rs.260/kg', image: './src/assets/kaju-raw-5.jpg'},
        { id: 1, name: 'Almonds', price: 'Rs.240/kg', image: './src/assets/Almo.jpg' },
        { id: 2, name: 'Pistachios', price: 'Rs.1200/kg', image: './src/assets/Pistachios.jpg' },
        { id: 3, name: 'Kharik', price: 'Rs.320/Kg', image: './src/assets/Kharik.webp' },
        { id: 4, name: 'Raisins', price: 'Rs.400/Kg', image: './src/assets/raisin.jpg' },
        { id: 5, name: 'Walnuts', price: 'Rs.800/kg', image: './src/assets/Walnut.jpg' },
        { id: 6, name: 'Figs', price: 'Rs.900/kg', image: './src/assets/Figs.png' },
        { id: 8, name: 'Black Pepper', price: 'Rs.600/kg', image: './src/assets/Miri.jpg' },
        { id: 9, name: 'Cardamom', price: 'Rs.1500/kg', image: './src/assets/Cardamom.jpg' }
 
      ];
  return (
    <div className='headline manbg bg-cover'>
      <div className=" text-2xl md:text-5xl flex justify-center py-8 px-3">
          Straight from nature to your home. 
      </div>

      <div className='products-container p-8 '>
      <h1 className='font-bold text-4xl mb-6 text-center'>Our Products</h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 bg-{wheat}'>
        {productList.map((product) => (
          <div
            key={product.id}
            className='product-card border rounded-lg shadow-lg p-4 hover:shadow-2xl transition duration-300'
          >
            <img
              src={`/${product.image}`} 
              alt={product.name}
              className='h-48 w-full lg:w-3/4 mx-auto bg-auto mb-4 rounded'
            />
            <h2 className='text-xl font-semibold mb-2'>{product.name}</h2>
            <p className='text-gray-600'>{product.price}</p>
            <button 
                onClick={() => onAddToCart(product) }
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Add to Cart
              </button>
          </div>
        ))}
      </div>
    </div>
    </div>
  )
}

export default Manager
