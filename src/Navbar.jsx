import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaPlus } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { Link } from 'react-router-dom';

function Navbar() {
    const [length,setLength] = useState('')
    useEffect(()=>{
        axios.get(`https://67209095cf285f60d77a49f6.mockapi.io/My_note/`)
        .then(response=>
            // console.log(response.data.length),
            setLength(response.data.length)
        )
    },[])
    return (
        <>
            <nav className="bg-white border-gray-200 dark:bg-gray-900 sticky top-0">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSS-nL1kn5nrRDzqe9B3wDoff0I3npDiWS3Pg&s"
                            className="h-10 rounded-full" alt="Flowbite Logo" />

                    </Link>
                    <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                    </button>
                    <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                        <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                            <li>
                                <Link to="/" className="flex items-center block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500" aria-current="page"> <FaHome className='mx-1 ' /> Home</Link>
                            </li>
                            <li>
                                <Link to="/addnote" className="flex items-center block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"> <FaPlus className='mx-1' /> Add Note</Link>
                            </li>
                            <li className="relative text-white">
                            <Link to='/allnotes'> 
                                My Notes
                               <span className="absolute bottom-3 right-[-2] bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                                    {length}
                                </span></Link>
                            </li>


                        </ul>
                    </div>
                </div>
            </nav>


        </>
    )
}

export default Navbar