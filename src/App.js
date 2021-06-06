import { useContext } from 'react'
import Header from './components/Header/Header'
import Addtask from './components/Addtask/Addtask'
import Tasklist from './components/Tasklist/Tasklist'
import { TaskContext } from './context/Taskcontext'
import Edittask from './components/Edittask/Edittask'

const App = () => {

  const { editModeEnabled } = useContext(TaskContext);
  return (
    <div className="App">

     {
       editModeEnabled ? <Edittask/> :  <span><Header/><Addtask/><Tasklist/></span>
     }
    

    </div>
  );
}

export default App;
