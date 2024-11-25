import React from "react";

const Homepage = () => {
  return (
    <div className="flex flex-col justify-center items-center relative  text-white overflow-hidden h-[90vh]">
      <svg
        className="absolute top-0 left-0 w-64 h-64 text-blue-500 opacity-20 animate-spin-slow"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 18a8 8 0 110-16 8 8 0 010 16z" />
      </svg>

      <svg
        className="absolute bottom-0 right-0 w-48 h-48 text-purple-600 opacity-25 animate-ping"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 18a8 8 0 110-16 8 8 0 010 16z" />
      </svg>

      <div
        className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full animate-bounce shadow-xl"
        style={{
          backgroundImage: 'url("/logo.png")',
          backgroundSize: "cover",
        }}
      ></div>

      <div className="mt-8 text-center">
        <h1 className="text-4xl font-bold animate-pulse text-black">
          Welcome to Admin Dashboard
        </h1>
        <p className="mt-4 text-gray-300">
          Manage users, roles, and permissions efficiently with our Role-Based
          Access Control system.
        </p>
      </div>

      <div className="mt-12">
        <button
          className="px-6 py-3 text-lg font-semibold text-gray-900 bg-white rounded-md shadow-md hover:shadow-lg hover:scale-105 transform transition duration-300"
        >
          Learn More
        </button>
      </div>

      <svg
        className="absolute top-1/2 left-1/2 w-96 h-96 text-pink-500 opacity-10 animate-spin-reverse"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zm0 22C6.486 22 2 17.514 2 12S6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z" />
      </svg>
    </div>
  );
};

export default Homepage;
