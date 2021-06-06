import { useContext } from 'react'
import { TaskContext } from '../../context/Taskcontext'
import './Edittask.css'
const Edittask = () => {
  
    const {tasks,setEditModeEnabled, editTask, deletetask} = useContext(TaskContext);
    return (
        <div className='edittask-container'>
            <div className='edittask-inside-container'>
           <div className='done-btn-container'>
           <button className='edit-mode-btn' onClick={() => setEditModeEnabled(false)} >
                Done
            </button>
           </div>
            
            {
                tasks.map((task,index) => {
                    return (
                        <div key={index} className='edit-task'>
                         <div className='edit-task-content'>
                             <div className='edit-task-title'>{task.title}</div>
                             <input className='edit-task-deadline-input' type='date'
                             onChange={(e) =>{
                                 task.deadline = e.target.value;
                               
                             } }></input>
                             <div className='btns-div'>
                             <button onClick = {async(e) => {
                                 console.log(`deadline =`,task.deadline)
                                 if(task._id !== undefined){
                                     try{
                                        let response = await fetch(`https://todo-app--server.herokuapp.com/update-task/${task._id}`, {
                                            corsDomain: true,
                                            method: 'PUT',
                                            headers: {
                                                'Content-Type': 'application/json;charset=utf-8'
                                            },
                                            body: JSON.stringify({
                                                title: task.title,
                                                deadline: task.deadline,
                                                enabled: task.enabled,
                                            })
                                        });
                                        
                                        let result = await response.json();
                                        alert(result.message);
                                        editTask({
                                            _id: task._id,
                                            title: task.title,
                                            deadline: task.deadline,
                                            enabled: task.enabled,
                                        
                                        }) 
                                     }
                                     catch (err) {
                                         alert(err);
                                     }
                                 }
                             }} className='update-btn'>UPDATE</button>
                             <button onClick = {async()=>{
                        try{
                            let response = await fetch(`https://todo-app--server.herokuapp.com/delete-task/${task._id}`, {
                            corsDomain: true,
                            method: 'DELETE',
                            headers: {
                                'Content-Type': 'application/json;charset=utf-8'
                            }
                            
                        });
                        
                        let result = await response.json();
                        alert(result.message);
                        
                        deletetask(task);
                    }
                    catch(err){
                        alert(err);
                    }
                }} className='delete-btn'>DELETE</button>
                             </div>

                         </div>
                        </div>
                    )
                })
            }
            </div>
           
        </div>
    )
}

export default Edittask
