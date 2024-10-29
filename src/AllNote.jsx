import React, { useEffect, useState } from 'react';
import { MdDelete } from "react-icons/md";
import { FaEdit, FaEye } from "react-icons/fa";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

function AllNote() {
    const [apiData, setApiData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [status, setStatus] = useState(false);
    const [title, setTitle] = useState('');
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [selectedNote, setSelectedNote] = useState(null);
    const [editedContent, setEditedContent] = useState('');

    // Fetch notes from API on component mount and when status changes
    useEffect(() => {
        axios.get('https://67209095cf285f60d77a49f6.mockapi.io/My_note')
            .then(response => {
                setApiData(response.data);
                setFilteredData(response.data); // Initialize filtered data
            })
            .catch(error => {
                console.log(error);
            });
    }, [status]);

    // Filter notes by title
    useEffect(() => {
        const filterResults = apiData.filter(item =>
            item.title.toLowerCase().includes(title.toLowerCase())
        );
        setFilteredData(filterResults);
    }, [title, apiData]);

    // Delete a note by ID
    const handleDelete = (id) => {
        axios.delete(`https://67209095cf285f60d77a49f6.mockapi.io/My_note/${id}`)
            .then(response => {
                toast.success("Note Deleted.");
                setStatus(!status); // Trigger data refresh
            })
            .catch(error => {
                toast.error("Failed. Try Again.");
            });
    };

    // View note by ID
    const handleView = (id) => {
        const note = apiData.find(note => note.id === id);
        setSelectedNote(note);
        setIsViewModalOpen(true);
    };

    // Open edit modal and load selected note
    const handleEdit = (id) => {
        const note = apiData.find(note => note.id === id);
        setSelectedNote(note);
        setEditedContent(note.note);
        setIsEditModalOpen(true);
    };

    // Save edited note
    const handleSaveEditedNote = () => {
        axios.put(`https://67209095cf285f60d77a49f6.mockapi.io/My_note/${selectedNote.id}`, {
            ...selectedNote,
            note: editedContent
        })
            .then(response => {
                toast.success("Note Updated.");
                setIsEditModalOpen(false);
                setStatus(!status); // Trigger data refresh
            })
            .catch(error => {
                toast.error("Failed to update note.");
            });
    };

    // Close all modals
    const closeModals = () => {
        setIsEditModalOpen(false);
        setIsViewModalOpen(false);
        setSelectedNote(null);
        setEditedContent('');
    };

    return (
        <div className='mx-auto w-[95%] p-4'>
            <h1 className='text-md md:text-3xl py-4 font-bold'>All Notes</h1>
            <div className='flex justify-center items-center w-full mb-2'>
                <input
                    type="search"
                    onChange={(e) => setTitle(e.target.value)}
                    className='border rounded-md w-1/2 bg-[#BBF7D0] p-2'
                    placeholder='Search by title'
                />
            </div>
            {filteredData.length > 0 ? (
                filteredData.map((ele) => (
                    <div key={ele.id} className='p-4 mb-4 border rounded-md shadow-md bg-[#A5B4FC]'>
                        <div className='flex justify-between items-center'>
                            <div>
                                <p className='text-xs mb-2'>{ele.date}</p>
                                <p className='font-bold'>{ele.title}</p>
                                <p className='text-md'>{ele.note?.slice(0, 20) || ""}...</p>
                            </div>
                            <div className='space-x-4'>
                                <button onClick={() => handleDelete(ele.id)} className='text-red-500 text-[20px]'>
                                    <MdDelete />
                                </button>
                                <button onClick={() => handleEdit(ele.id)} className='text-blue-500 text-[20px]'>
                                    <FaEdit />
                                </button>
                                <button onClick={() => handleView(ele.id)} className='text-blue-500 text-[20px]'>
                                    <FaEye />
                                </button>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <p className='text-gray-500'>No notes found.</p>
            )}

            {/* Modal for editing note */}
            {isEditModalOpen && selectedNote && (
                <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
                    <div className='bg-white p-4 rounded shadow-md max-w-md w-full'>
                        <h2 className='text-lg font-bold'>Edit Note</h2>
                        <textarea
                            className='w-full h-[150px] mt-4 p-2 border rounded'
                            value={editedContent}
                            onChange={(e) => setEditedContent(e.target.value)}
                        />
                        <div className='flex justify-end mt-4'>
                            <button onClick={handleSaveEditedNote} className='bg-blue-500 text-white px-4 py-2 rounded'>
                                Update
                            </button>
                            <button onClick={closeModals} className='ml-2 bg-gray-500 text-white px-4 py-2 rounded'>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal for viewing note */}
            {isViewModalOpen && selectedNote && (
                <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
                    <div className='bg-white p-4 rounded shadow-md max-w-md w-full'>
                        <h2 className='text-lg font-bold'>View Note</h2>
                        <p className='text-xs mb-2'>{selectedNote.date}</p>
                        <p className='font-bold'>{selectedNote.title}</p>
                        <p>{selectedNote.note}</p>
                        <button onClick={closeModals} className='mt-4 bg-blue-500 text-white px-4 py-2 rounded'>
                            Close
                        </button>
                    </div>
                </div>
            )}

            <Link to='/addnote' className='fixed bottom-10 right-10 '>
                <img src="https://cdn-icons-png.flaticon.com/128/10337/10337579.png" alt="Add Note" className='h-14' />
            </Link>
        </div>
    );
}

export default AllNote;
