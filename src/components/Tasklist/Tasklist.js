import React, {useContext}  from 'react';
import { TaskContext } from '../../context/Taskcontext';
import './Tasklist.css'

const Tasklist = () => {
    const { tasks, editTask, setEditModeEnabled } = useContext(TaskContext);

    var today = new Date(),
    date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

    return (
        <div className='tasklist-container'>
          <div className='edit-btn-container'>
          <button className='edit-btn' onClick={() => setEditModeEnabled(true)} >Edit List</button>
              </div> 
            
            {
                tasks.map((task, index) => {
                    return (
                        <div key={index} className='task-list'>
                            <input type='checkbox' className='check-box' checked={task.enabled}
                            onChange={() => editTask({
                                title: task.title,
                                deadline: task.deadline,
                                enabled: !task.enabled,
                                date: date
                            })}></input>
                            <div className='tasklist-content'>
                               <h2>{task.title} </h2> 
                               <h4> The deadline for this task is {task.deadline}</h4>
                                
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
} 

export default Tasklist