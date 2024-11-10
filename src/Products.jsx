import { useState } from 'react';
import { 
  useQuery,
} from '@tanstack/react-query'

import { Search } from './Search';
import { useDebounce } from './hooks';
import { ProductModal } from './ProductModal';

import {  AnimatePresence } from 'framer-motion';
 
export default function Products() {
  const [searchTerm, setSearchTerm] = useState(''); 
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [page, setPage] = useState(1);
  const pageSize = 16; 

  const { isLoading, error, data } = useQuery({
    queryKey: ['products', debouncedSearchTerm, page],
    queryFn: () =>
      fetch(`https://dummyjson.com/products/search?q=${debouncedSearchTerm}&skip=${(page - 1) * pageSize}&limit=${pageSize}`)
        .then((res) => res.json())
        .catch((err) => {
          throw new Error('Failed to fetch products', err);
        })
  });

  console.log(data)

  const totalItems = data?.total || 0; 
  const totalPages = Math.ceil(totalItems / pageSize); 

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  const handleNextPage = () => {
    if (data?.total > page * pageSize) setPage(page + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrevPage = () => {
    if (page > 1) setPage(page - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
 
  return (
    <div className="bg-white">
      <div className="mx-auto min-h-100  max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:min-w-[75rem] lg:max-w-7xl lg:px-8 ">
        <h1 className="text-4xl font-bold tracking-tight text-neutral-950">Products</h1>

        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        <div className='text-left max-w-[500px] mx-auto '>
          {error && <h3>Error.</h3>}
          
          {isLoading ? <h3>Loading...</h3>
          : 
          !data?.products?.length > 0 && <>No product match your search keyword for <b>"{searchTerm}"</b></>} 
        </div>
        
        <div className="grid min-h-100 grid-cols-1 min-h-screen mt-10 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8"> 
          {data?.products && data.products.map((product) => (
            <div 
              key={product.id} 
              onClick={() => handleProductClick(product)}
              className="group relative cursor-pointer	">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                <img
                  alt={product.title}
                  src={product.thumbnail}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
              <div className="mt-4">
                <div className='text-left'>
                  <h3 className="text-md text-gray-700 mb-3">
                    <a href={product.href}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.title}
                    </a>
                  </h3>
                  
                  <p className="text-sm font-medium text-gray-900 mb-3">&#8369; {product.price}</p>
                  <p className='line-clamp-2'>
                    {product.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>


        {data?.products?.length > 0 && 
          <>
          {/* Pagination */} 
            <div className="mt-12 flex justify-center space-x-4">
              <button 
                onClick={handlePrevPage} 
                disabled={page === 1}
                className="px-4 py-2 border-2 outline-none border-slate-900 text-gray-700 rounded disabled:opacity-50 disabled:cursor-not-allowed">
                Previous
              </button>

              <button 
                onClick={handleNextPage} 
                disabled={data && data.total <= page * pageSize}
                className="px-4 py-2 border-2 outline-none border-slate-900 rounded disabled:opacity-50 disabled:cursor-not-allowed">
                Next
              </button>
            </div>
            
            <p className="text-gray-700 mt-5">
              Page <b> {page}</b> of <b>{totalPages}</b>
            </p>
          </>
        }  
      </div>
      
      {/* Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <ProductModal product={selectedProduct} onClose={handleCloseModal} />
        )}
      </AnimatePresence>
    </div>
  );
}

