import React, { useContext, useState, useEffect, useRef } from 'react';
import ContextAPI from '@/contextAPI/ContextAPI';

const Pagination = () => {
  const { handleNextPage, handlePreviousPage, page, setPage, totalPages } = useContext(ContextAPI);
  const [pageNumbers, setPageNumbers] = useState([]);
  const [editableIndex, setEditableIndex] = useState(null);
  const inputRefs = useRef({});
  const visiblePageCount = 2;

  useEffect(() => {
    const generatePageNumbers = () => {
      const pages = [];
      if (!totalPages) return [1];

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

  const handlePageClick = (index) => {
    setEditableIndex(index);
    setTimeout(() => {
      inputRefs.current[index]?.focus();
    }, 0);
  };

  const handleInputConfirm = (index, value) => {
    const num = Number(value);
    if (!isNaN(num) && num >= 1 && num <= totalPages) {
      setPage(num);
    } else {
      alert(`Enter a valid page number between 1 and ${totalPages}`);
    }
    setEditableIndex(null);
  };

  return (
    <nav aria-label="Page navigation example">
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
        {pageNumbers.map((pageNumber, index) => (
          <li key={index}>
            {typeof pageNumber === 'number' ? (
              editableIndex === index ? (
                <input
                  type="number"
                  defaultValue={pageNumber}
                  ref={(el) => (inputRefs.current[index] = el)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleInputConfirm(index, e.target.value);
                    }
                  }}
                  onBlur={() => setEditableIndex(null)}
                  className="w-12 text-center rounded border border-gray-300 dark:bg-gray-800 dark:text-white"
                />
              ) : (
                <button
                onClick={()=>setPage(pageNumber)}
                  onDoubleClick={() => handlePageClick(index)}
                  className={`flex items-center justify-center px-4 h-10 leading-tight hover:bg-gray-100 hover:text-gray-700 dark:hover:text-white ${
                    page === pageNumber
                      ? 'dark:bg-blue-200 text-black font-bold hover:bg-gray-400 hover:text-black hover:font-bold'
                      : 'dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 text-gray-500 bg-white border border-gray-300'
                  }`}
                >
                  {pageNumber}
                </button>
              )
            ) : (
              <span className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400">
                {pageNumber}
              </span>
            )}
          </li>
        ))}
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
  );
};

export default Pagination;
