import React from 'react';
import axios from 'axios';

import './App.scss'
import Task from './components/Task/Task';
import AddTask from './components/AddTask/AddTask';

function App() {
  let urlMain = 'https://631f519b22cefb1edc48f3ff.mockapi.io/MainTasks';  //юрл задач-отцов
  let urlSecond = 'https://631f519b22cefb1edc48f3ff.mockapi.io/SecTasks'; //юрл дочерних задач

  let [changeActive, setChangeActive] = React.useState(false)

  let [mainTasks, setMainTasks] = React.useState([]);
  let [secondTasks, setSecondTasks] = React.useState([])

  // получение массивов
  React.useEffect(() => {
    allUpdate()
  },[])

  let getMainTasks = async() => {
    await axios.get(urlMain).then(res =>{
      setMainTasks(res.data);
    })
  }

  let getSecTasks = async() => {
    await axios.get(urlSecond).then(res =>{
      setSecondTasks(res.data);
    })
  }

  //колбэк функция обновления всех массивов
  let allUpdate = () => {
    getMainTasks();
    getSecTasks();
  }

  return (
    <div className="App">

      <header>
        <div className="header_inner">
          <div className="heading">your tasks</div>
          <button onClick={()=>{setChangeActive(!changeActive)}}>Change Tasks</button>
        </div>
      </header>

      {mainTasks.map((obj) => (<Task 
        active = {changeActive}
        key = {obj.id} 
        content = {obj.content} 
        id = {obj.id} 
        secondTasks = {secondTasks} 
        check = {obj.check} 
        urlMain = {urlMain}
        urlSecond = {urlSecond}
        allUpdate = {allUpdate}
      />))}

      <div className="addTask" style={changeActive? {display: "block"} : {display: "none"}}>
        <AddTask 
          isFather = {true}
          allUpdate = {allUpdate} 
          urlMain = {urlMain} 
          urlSecond = {urlSecond} 
          ctive = {changeActive}
        />
      </div>
    </div>
  );
}

export default App;
