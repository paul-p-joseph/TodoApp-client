import React, { useContext, useState } from 'react';
import './Addtask.css';
import { TaskContext } from '../../context/Taskcontext'
import './Addtask.css'

const Addtask = () => {

    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [newTaskDeadline, setNewTaskDeadline] = useState('');

    const { updateTasks } = useContext(TaskContext);

    const taskObjectValid = () => {

        const taskValid = newTaskTitle && newTaskTitle.split('').find(char => char !== ' ');

        return taskValid;
    }


    const clearForm = () => {
        setNewTaskTitle('');
        setNewTaskDeadline('');
    }
    return (
        <div className='addtask-container'>
            <div className='child'>
            <input className='task-title' type='text' placeholder='Enter your task'
             value={newTaskTitle} onChange={(e) => setNewTaskTitle(e.target.value)} ></input>
            <input className='task-deadline' type='date' value={newTaskDeadline} 
            onChange={(e) => setNewTaskDeadline(e.target.value)} ></input>
            <button type='submit' className='add-btn' onClick={async() => {
                if(taskObjectValid()) {
                    try{
                        let response = await fetch('https://todo-app--server.herokuapp.com/create-task', {
                            corsDomain: true,
                            method: 'POST',
                            headers: {
                              'Content-Type': 'application/json;charset=utf-8'
                            },
                            body: JSON.stringify({
                                title: newTaskTitle,
                                deadline: newTaskDeadline,
                                enabled: false,
                              
                            })
                          });
                          
                          let result = await response.json();
                          alert(result.message);

                          updateTasks({
                            title: newTaskTitle,
                            deadline: newTaskDeadline,
                            enabled: false,
                            
                        })
                        clearForm();
                    }
                    catch (err) {
                        alert(err);
                    }

                }
            }} >Add Task</button>
            </div>
       
        </div>
    )
}

export default Addtask 
