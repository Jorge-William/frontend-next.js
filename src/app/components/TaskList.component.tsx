'use client'
import React, { useEffect, useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import axios from 'axios';
import TaskInput from './TaskInput.component';

interface Task {
    id: number;
    title: string;
    completed: boolean;
}

interface TaskListProps {
    onTaskCreated: ( newTask: Task ) => void;
}

function TaskList() {
    const [ tasks, setTasks ] = useState<Task[]>( [] );

    useEffect( () => {
        axios
            .get<Task[]>( 'http://localhost:3333/' )
            .then( ( response ) => {

                setTasks( response.data );
            } )
            .catch( ( error ) => {
                console.error( 'Erro ao buscar as tarefas:', error );
            } );
    }, [] );

    const handleCheckboxChange = ( taskId: number ) => {
        const taskToUpdate = tasks.find( ( task ) => task.id === taskId );

        if ( taskToUpdate ) {
            const updatedTask = { ...taskToUpdate, completed: !taskToUpdate.completed };
            setTasks( ( prevTasks ) =>
                prevTasks.map( ( task ) => ( task.id === taskId ? updatedTask : task ) )
            );
            console.log( taskId );

            axios
                .patch( `http://localhost:3333/:?id=${taskId}`, { completed: updatedTask.completed } )
                .then( ( response ) => {
                } )
                .catch( ( error ) => {
                    console.error( 'Erro ao atualizar a tarefa:', error );
                    setTasks( ( prevTasks ) =>
                        prevTasks.map( ( task ) => ( task.id === taskId ? taskToUpdate : task ) )
                    );
                } );
        }
    };

    const handleDeleteTask = ( taskId: number ) => {

        axios
            .delete( `http://localhost:3333/:?id=${taskId}` )
            .then( ( response ) => {
                setTasks( ( prevTasks ) => prevTasks.filter( ( task ) => task.id !== taskId ) );
            } )
            .catch( ( error ) => {
                console.error( 'Erro ao excluir a tarefa:', error );
            } );
    };

    const handleTaskCreated = ( newTask: Task ) => {
        setTasks( ( prevTasks ) => [ ...prevTasks, newTask ] );
    };

    return (
        <div className='my-6'>

            <ul>
                {tasks.map( ( task ) => (
                    <li key={task.id} className="flex items-center py-2 border-b border-gray-200">
                        <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => handleCheckboxChange( task.id )}
                        />
                        <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }} className="flex-grow px-2">
                            {task.title}
                        </span>
                        <FaTrash
                            className=" delete-icon text-red-600 cursor-pointer"
                            onClick={() => handleDeleteTask( task.id )}
                        />
                    </li>
                ) )}
            </ul>
        </div>
    );
}

export default TaskList;
