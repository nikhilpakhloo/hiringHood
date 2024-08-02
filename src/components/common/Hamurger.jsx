import React from 'react'

export default function Hamurger({toggleMenu,isMenuOpen}) {
  return (
    <div>
        
        <button
            onClick={toggleMenu}
            className="lg:hidden p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={
                  isMenuOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
          </button>
    </div>
  )
}
