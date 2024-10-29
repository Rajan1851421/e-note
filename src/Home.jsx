import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
    return (
        <>
            <div className='w-full px-4 mx-auto bg-white'>
                <div className='flex flex-col md:flex-row items-center justify-center gap-10 py-10'>
                    <div className='flex justify-center'>
                        <img
                            className='h-96 w-full max-w-[24rem] object-cover' 
                            src="https://img.freepik.com/free-vector/critical-thinking-concept-illustration_114360-7972.jpg?ga=GA1.1.1476146066.1729933903&semt=ais_hybrid"
                            alt="Critical Thinking Concept"
                        />
                    </div>
                    <div className='w-full md:w-1/2 flex flex-col items-center md:items-start'>
                        <p className='text-md md:text-4xl lobster-regular text-center md:text-left'>
                            Feel free to modify any of this text to better fit your
                            <span className='text-green-800 mx-4 border-b-4 px-2 text-[40px]'>website's</span>
                            tone or branding! If you have specific sections in mind, let me know, and I can create more tailored content.
                        </p>
                        <Link to="/addnote" className='text-center mt-5 md:mt-10 bg-blue-800 w-full md:w-[30%] py-2 rounded-md hover:bg-blue-900 text-white'>
                            Get Started
                        </Link>
                    </div>
                </div>
            </div>


        </>
    )
}

export default Home