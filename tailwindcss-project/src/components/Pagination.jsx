import React, { useContext, useState, useEffect, useRef } from 'react';
import ContextAPI from '@/components/contextAPI/ContextAPI';

const Pagination = () => {
  const { handleNextPage, handlePreviousPage, page, setPage, totalPages } = useContext(ContextAPI);
  const [pageNumbers, setPageNumbers] = useState([]);
  const visiblePageCount = 2; // Number of page links to show
  useEffect(() => {
    const generatePageNumbers = () => {
      const pages = [];
      if (!totalPages) {
        return [1]; // Show at least page 1 if totalPages is not available
      }

      if (totalPages <= visiblePageCount) {
        for (let i = 1; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        const middle = Math.ceil(visiblePageCount / 1);

        if (page <= middle) {
          for (let i = 1; i <= visiblePageCount; i++) {
            pages.push(i);
          }
          pages.push('...');
          pages.push(totalPages);
        } else if (page >= totalPages - middle + 1) {
          pages.push(1);
          pages.push('...');
          for (let i = totalPages - visiblePageCount + 1; i <= totalPages; i++) {
            pages.push(i);
          }
        } else {
          pages.push(1);
          pages.push('...');
          for (let i = page - middle + 2; i <= page + middle - 2; i++) {
            pages.push(i);
          }
          pages.push('...');
          pages.push(totalPages);
        }
      }
      setPageNumbers(pages);
    };

    generatePageNumbers();
  }, [page, totalPages]);

  const handlePageClick = (pageNumber) => {
    if (typeof pageNumber === 'number') {
      setPage(pageNumber);
    }
  };
  const [show,setShow]=useState(true)
 const handleInputShow=()=>{
  setShow(!show);
 }
 const inputPage=useRef();
  return (
    <>
    
    <nav aria-label="Page navigation example">
      <div className='relative  w-full z-44'>
      <input type="number" id="first_name" class={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-2 ${show?'hidden':''}`} placeholder="Enter Page number..."
       ref={inputPage}
       onKeyDown={(e) => {
        if (e.key === 'Enter') {
          const value = Number(inputPage.current.value);
          if (!isNaN(value) && value >= 1 && value <= totalPages) {
            setPage(value);
            setShow(true);
            inputPage.current.value="";
          } else{
            alert('Please enter Numbers between 1 and 500');
            inputPage.current.value="";
          }
        }
      }}
      />
        </div>
      <ul className="inline-flex gap-1 -space-x-px text-base h-10">
        <li>
          <button
            onClick={handlePreviousPage}
            disabled={page === 1}
            className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:bg-gray-100 disabled:cursor-not-allowed"
          >
            Previous
          </button>
        </li>
        {totalPages > 1 && (
          <div className="inline-flex gap-1 -space-x-px text-base h-10">
            {pageNumbers.map((pageNumber, index) => (
              <li key={index}>
                {typeof pageNumber === 'number' ? (
                  <button
                    onClick={() => {
                      handlePageClick(pageNumber)
                      handleInputShow()
                    }}
                    className={`flex items-center justify-center px-4 h-10 leading-tight hover:bg-gray-100 hover:text-gray-700  dark:hover:text-white ${
                      page === pageNumber ? 'dark:bg-blue-200 text-black font-bold hover:bg-gray-400 hover:text-black hover:font-bold':'dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700  text-gray-500 bg-white border border-gray-300'
                    }`}
                  >
                    {pageNumber}
                  </button>
                ) : (
                  <span className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400">
                    {pageNumber}
                  </span>
                )}
              </li>
            ))}
          </div>
        )}
        <li>
          <button
            onClick={handleNextPage}
            disabled={page === totalPages}
            className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:bg-gray-100 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
    </>
  );
};

export default Pagination;