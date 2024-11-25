import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav aria-label="Page navigation example" className="flex justify-center mt-4">
      <ul className="flex items-center space-x-1">
        <li>
          <button
            onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
            className={`flex items-center px-4 py-2 text-sm text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 ${
              currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={currentPage === 1}
            aria-label="Previous"
          >
            <svg
              className="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 1 1 5l4 4"
              />
            </svg>
          </button>
        </li>

        {pageNumbers.map((number) => (
          <li key={number}>
            <button
              onClick={() => onPageChange(number)}
              className={`flex items-center px-4 py-2 text-sm border border-gray-300 hover:bg-gray-100 hover:text-gray-700 ${
                number === currentPage
                  ? "z-10 text-blue-600 border-blue-300 bg-blue-50"
                  : "text-gray-500 bg-white"
              }`}
              aria-current={number === currentPage ? "page" : undefined}
            >
              {number}
            </button>
          </li>
        ))}

        <li>
          <button
            onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
            className={`flex items-center px-4 py-2 text-sm text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 ${
              currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={currentPage === totalPages}
            aria-label="Next"
          >
            <svg
              className="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 9 4-4-4-4"
              />
            </svg>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
