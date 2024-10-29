import React, { useEffect, useState } from 'react'
import { LuPencilLine } from "react-icons/lu";
import { toast } from 'react-toastify';
import axios from 'axios';

function AddNote() {
    const [date, setDate] = useState('');
    const [note, setNotes] = useState()
    const [status, setStatus] = useState(false)
    const [loading, setLoading] = useState(false)
    const [title, setTitle] = useState('')

    console.log(note)
    useEffect(() => {
        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleDateString("en-US", {
            year: 'numeric', month: 'long', day: 'numeric',
            hour: '2-digit', minute: '2-digit'
        });
        setDate(formattedDate);
    }, []);

    const HandleSave = () => {
        const requestData = {
            date: date,
            note: note,
            title: title.toLowerCase()
        };
        if (note && title) {
            setLoading(true)
            axios.post(`https://67209095cf285f60d77a49f6.mockapi.io/My_note`, requestData)
                .then(response => {
                    console.log(response);
                    setLoading(false)
                    toast.success("Your Note hase been Saved")
                    setNotes("")
                    setTitle("")
                })
                .catch(error => {
                    console.log(error);
                });

        } else {
            setStatus(true);
            setTimeout(() => {
                setStatus(false);
            }, 3000);
            toast.error("Please add some text")
        }
    }

    // const HandleSave = () => {
    //     if (!note) {
    //         setStatus(true);
    //         setTimeout(() => {
    //             setStatus(false);
    //         }, 3000);
    //     } else {
    //         setLoading(true)
    //         const noteData = {
    //             date: date,
    //             content: note
    //         };
    //         const existingNotes = JSON.parse(localStorage.getItem("savedNotes")) || [];
    //         existingNotes.push(noteData);
    //         localStorage.setItem("savedNotes", JSON.stringify(existingNotes));
    //         alert("Note saved successfully!");
    //         setStatus(false);
    //         setNotes('');
    //         setLoading(false)
    //     }
    // };


    const handleCancel = () => {
        setNotes('');
        setStatus(false);
    };
    return (
        <>
            <div className='mx-auto w-[95%] '>
                <div className=''>
                    <h1 className='text-md md:text-3xl py-4 font-bold flex flex-row items-center '>You can add our notes for future <LuPencilLine className='mx-3 text-[#1E1B4B] ' /> </h1>
                </div>
                <span className='orbitron-date'>{date}</span>
                {status ? <p className='text-red-500 font-bold text-md md:text:xl '>Plase add some text</p> : ""}

                <div className='flex flex-col mt-4'>
                    <label htmlFor="">Note Title</label>
                    <input value={title} type="text" onChange={(e) => setTitle(e.target.value)} className='border px-2' placeholder='Enter Your Title' />
                    <textarea value={note} placeholder='Add Your Notes ....' className='w-full h-[250px] mt-4 p-4 ' name="" id="" onChange={(e) => setNotes(e.target.value)} >

                    </textarea>


                </div>


                <div className='flex justify-center items-center gap-8 mt-2 md:mt-5 '>
                    <a onClick={HandleSave} href="#_" class="px-5 py-2.5 relative rounded group font-medium text-white font-medium inline-block">
                        <span class="absolute top-0 left-0 w-full h-full rounded opacity-50 filter blur-sm bg-gradient-to-br from-purple-600 to-blue-500"></span>
                        <span class="h-full w-full inset-0 absolute mt-0.5 ml-0.5 bg-gradient-to-br filter group-active:opacity-0 rounded opacity-50 from-purple-600 to-blue-500"></span>
                        <span class="absolute inset-0 w-full h-full transition-all duration-200 ease-out rounded shadow-xl bg-gradient-to-br filter group-active:opacity-0 group-hover:blur-sm from-purple-600 to-blue-500"></span>
                        <span class="absolute inset-0 w-full h-full transition duration-200 ease-out rounded bg-gradient-to-br to-purple-600 from-blue-500"></span>
                        <span class="relative">
                            {loading ? "Please Wait.." : "Save"}
                        </span>
                    </a>
                    <a onClick={handleCancel} href="#_" class="px-5 py-2.5 relative rounded group font-medium text-white font-medium inline-block">
                        <span class="absolute top-0 left-0 w-full h-full rounded opacity-50 filter blur-sm bg-gradient-to-br from-purple-600 to-blue-500"></span>
                        <span class="h-full w-full inset-0 absolute mt-0.5 ml-0.5 bg-gradient-to-br filter group-active:opacity-0 rounded opacity-50 from-purple-600 to-blue-500"></span>
                        <span class="absolute inset-0 w-full h-full transition-all duration-200 ease-out rounded shadow-xl bg-gradient-to-br filter group-active:opacity-0 group-hover:blur-sm from-purple-600 to-blue-500"></span>
                        <span class="absolute inset-0 w-full h-full transition duration-200 ease-out rounded bg-gradient-to-br to-purple-600 from-blue-500"></span>
                        <span class="relative">Cancel</span>
                    </a>

                </div>

            </div>

        </>
    )
}

export default AddNote