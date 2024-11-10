
export const Search = ({ searchTerm, setSearchTerm }) => {

  const clear = () => {
    setSearchTerm(''); 
  }

  return (
    <div className="max-w-[500px] mx-auto mt-12 mb-4 sticky">
      <label htmlFor="search" className="block text-lg font-medium text-gray-900 text-left">
        Search
      </label>
      <div className="relative mt-2 rounded-md shadow-sm">
        <input
          id="search"
          name="search"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Enter keyword here..."
          className="block bg-white w-full rounded-md py-1.5 pl-4 pr-20 text-gray-900 border-solid border-2 border-slate-500 sm:text-sm/6"
          aria-label="Search products"
        />

        {searchTerm && 
         <div onClick={clear} className="absolute right-3 top-2 hover:opacity-50 cursor-pointer rounded-full bg-slate-100 ">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
          </svg>
        </div>
        }
      </div>
    </div>
  );
}