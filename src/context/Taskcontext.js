import React, { useState, createContext, useEffect } from 'react';

const TaskContext = createContext();

const TaskProvider = ({children}) => {

    const [tasks, setTasks] = useState([]);

    const [editModeEnabled, setEditModeEnabled] = useState(false);

    useEffect(async() => {
        try{
            let response = await fetch('https://todo-app--server.herokuapp.com')
            let result = await response.json();
            
            setTasks (alphabeticalOrder(result));
            
        }
        catch(err){
            alert(err)
        }
    }, [setTasks]);


    const updateTasks = (task) => {
         const updatedTasks = alphabeticalOrder([
             ...tasks,
             task
         ]);
       
         setTasks(updatedTasks);
        }

    const alphabeticalOrder = (tasks) => {
        return tasks.sort((a,b) => a.title.toUpperCase() < b.title.toUpperCase() ? -1 : 0)
    }

    const editTask = (taskToUpdate) => {
      const tasksFiltered = tasks.filter((task) => task.title !== taskToUpdate.title);
      const updatedTasks = alphabeticalOrder([
          ...tasksFiltered,
          taskToUpdate
      ]);
   
         setTasks(updatedTasks);
    }

     const deletetask = (taskToDelete) => {
         const updatedTasks = tasks.filter((task) => task.title !== taskToDelete.title);

         setTasks(updatedTasks);
     }
    return (
        <TaskContext.Provider value={{
            tasks,
            updateTasks,
            editTask,
            setEditModeEnabled,
            editModeEnabled,
            deletetask

        }}>
            {children}
        </TaskContext.Provider>
    )
}

export {
    TaskContext,
    TaskProvider
}