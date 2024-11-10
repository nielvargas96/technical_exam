import { motion } from 'framer-motion';
import React from 'react'; 

export function ProductModal({ product, onClose }) {
  if (!product) return null;
  
  console.log(product.images)
 
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <motion.div
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { delay: 0.5 } }}
      transition={{ ease: [0.76, 0, 0.24, 1] }}
      className='absolute left-0 top-0 w-full h-full bg-black bg-opacity-50 ' onClick={onClose} />
      
      <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 50, opacity: 0 }}
      transition={{ ease: [0.76, 0, 0.24, 1] }}
      
      className="bg-white h-full sm:h-auto px-8 py-12 rounded-md max-w-xl w-full relative ">
      <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 border-0 hover:opacity-50"
        >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
          <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
        </svg>
        </button>
        <div className="flex flex-col">
          <div className=''>
            <div className='flex items-center'>
              <img 
                alt={product.title}
                src={product.thumbnail}
                className="mx-auto w-64 h-64 object-cover rounded-md"
              />
            </div>
            <div className='text-left'>
              <p className='mb-2'><small>More images:</small></p>
              <div className='flex-start items-center grid gap-1 grid-cols-4'>
              
                {product.images.slice(0, 4).map((image, index) => (
                  <div className='bg-gray-300 flex items-center mb-4 p-2'>
                    <img
                    key={index}
                    alt={`${product.title} - ${index + 1}`}
                    src={image}
                    className="mx-auto w-16 h-16 object-cover rounded-md "
                  />
                  </div>
                ))}

            </div>
            </div>
          </div>
          <div className='text-left'>
            <h2 className="text-2xl font-bold mb-2">{product.title}</h2>
            <p className="text-lg font-medium text-gray-900 mb-2">
              &#8369; {product.price}
            </p>
            <p className="text-sm text-gray-700">{product.description}</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
