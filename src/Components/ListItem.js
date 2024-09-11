import React, { useState } from 'react';
import axios from 'axios';
import { Reorder } from 'framer-motion';

const ListItem = ({ prop}) => {
    const [isCompleted, setIsCompleted] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [editInput, setEditInput] = useState(prop.task); 

    const handleCheckboxChange = () => {
        if (isCompleted) {
            setIsCompleted(false);
        } else {
            setIsCompleted(true);
        }
    };

    const handleDeleteItem = async () => {
        try {
            const response = await axios.delete(`https://todo-elitetech-backend.onrender.com/api/deleteTask/${prop._id}`);
            if (response.status === 200) {
                window.location.reload();
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    const handleEditItem = () => {
        setEditMode(!editMode);
    };

    const handleKeyPress = async (e) => {
        if (e.key === 'Enter') {
            try {
                const response = await axios.put(`https://todo-elitetech-backend.onrender.com/api/updateTask/${prop._id}`, { task: editInput });
                if (response.status === 200) {
                    setEditMode(false);
                    window.location.reload();
                }
            } catch (error) {
                console.log(error.message);
            }
        }
    };
    // console.log(completed);

    return (
        <Reorder.Item 
            value={prop} 
            className={`flex items-start justify-between p-3 rounded-lg shadow mb-2 ${isCompleted ?  'bg-green-200' : 'hover:bg-green-50'}`}
        >
            <div className="flex items-center gap-3 w-full">
                <div className="cursor-pointer select-none text-start flex-1 flex items-start gap-2">
                    <input 
                        type="checkbox"
                        onChange={handleCheckboxChange}
                        checked={isCompleted}
                        color='green'
                        className='mt-[5px] cursor-pointer'
                    />
                    {!editMode && (
                        <p 
                            style={{ textDecoration: isCompleted ? 'line-through' : 'none' }}
                            onClick={handleCheckboxChange}
                            className='w-fit mr-2 break-words text-justify'
                        >
                            {editInput}
                        </p>
                    )}
                    
                    {editMode && (
                        <input 
                            value={editInput} 
                            onChange={(e) => setEditInput(e.target.value)} 
                            onKeyPress={handleKeyPress}
                            type="text" 
                            className='w-[90%] border rounded border-black p-1'
                        />
                    )}
                    
                </div>
            </div>
            <div className="flex gap-4">
                <button onClick={handleEditItem} className="hover:text-yellow-500">
                    <i className="fa-solid fa-pen-to-square"></i>
                </button>
                <button onClick={handleDeleteItem} className="hover:text-red-500">
                    <i className="fa-solid fa-trash-can"></i>
                </button>
            </div>
        </Reorder.Item>
    );
};

export default ListItem;
