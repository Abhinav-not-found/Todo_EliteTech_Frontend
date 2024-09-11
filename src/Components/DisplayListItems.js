import React, { useEffect, useState } from 'react';
import ListItem from './ListItem';
import axios from 'axios';
import { Reorder } from 'framer-motion';

const DisplayListItems = () => {
    const [allTasks, setAllTasks] = useState([]);

    useEffect(() => {
        const handleGetTasks = async () => {
            try {
                const response = await axios.get('https://todo-elitetech-backend.onrender.com/api/getTasks');
                if (response.status === 200) {
                    setAllTasks(response.data);
                }
            } catch (error) {
                console.log(error.message);
            }
        };
        handleGetTasks();
    }, []);

    const handleReorder =  (newOrder) => {
        setAllTasks(newOrder);
    };

    return (
        <Reorder.Group axis="y" values={allTasks} onReorder={handleReorder}
        >
            {allTasks.map((item) => (
                <ListItem key={item._id} prop={item} />
            ))}
        </Reorder.Group>
    );
};

export default DisplayListItems;
