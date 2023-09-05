'use client'

interface Task {
  title: string
}

import { useState } from 'react';
import './TaskInput.css'
import axios from 'axios'

const TaskInput: React.FC = () => {
  const [ task, setTask ] = useState<Task>( { title: '' } );
  const [ isButtonDisabled, setIsButtonDisabled ] = useState( true )
  const handleSubmit = async ( e: React.FormEvent ) => {
    e.preventDefault();
    try {
      const response = await axios.post( 'http://localhost:3333/', task, {
        headers: {
          'Content-Type': 'application/json',
        },
      } );


      if ( response.status === 201 ) {
        console.log( 'Task created!' );
        window.location.reload()
      } else {
        console.error( 'Error creating task.' );
      }
    } catch ( error ) {
      console.error( 'Erro creating task:', error );
    }
  };

  const handleInputChange = ( e: React.ChangeEvent<HTMLInputElement> ) => {
    const inputValue = e.target.value;
    setTask( { title: e.target.value } );
    setIsButtonDisabled( inputValue.trim() === '' ); // Desabilitar o botão se o input estiver vazio ou apenas com espaços em branco
  };

  return (
    <form>
      <input className="rounded-md p-2 placeholder:italic"
        type="text"
        placeholder="Write a task"
        value={task.title}
        onChange={handleInputChange}
      />
      <button onClick={handleSubmit} type="submit" id='button-add-task' className={`bg-blue-300 mx-6 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded ${isButtonDisabled ? 'bg-gray-400 cursor-not-allowed' : ''
        }`} disabled={isButtonDisabled} >
        Add
      </button>
    </form >
  );
};

export default TaskInput;
