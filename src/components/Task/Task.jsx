import './Task.scss'
import axios from 'axios';
import React from 'react';

import TaskAdditional from '../TaskAdditional/TaskAdditional';
import AddTask from '../AddTask/AddTask';

function Task(props){
    let [ifChecked, setIfChecked] = React.useState(props.check)
    
   let array = [];

    for(let i = 0; i < props.secondTasks.length; i++){
        if (String(props.id) === String(props.secondTasks[i].fatherId)){
            array.push(props.secondTasks[i]);
        }
    }


    //сохранение чека в бд
    let inputCheck = (event) => {
        axios.put(props.urlMain + '/' + props.id, {"check": event.target.checked})
        setIfChecked(!ifChecked);
    }

    //удаление задания
    let onClickDel = async () => {
        console.log("deleting father");
        await axios.delete(props.urlMain + '/' + props.id);

        //удаление дочерних элементов
        for(let i = 0; i < array.length; i++){
            await axios.delete(props.urlSecond + '/' + array[i].id);
        }

        props.allUpdate();   
    }



    return(
        <div className="Task">

            <div className="main_task">

                <div className="Task_content">
                    <input type="checkbox" onChange={(event) => inputCheck(event)} checked={ifChecked}  />
                    <div className="tasktext" style={ifChecked ? {textDecoration: "line-through"} : {textDecoration:"none"}}>{props.content}</div>
                </div>

                <div className="changebtns" style={props.active? {display: "block"} : {display: "none"}}>
                    <button className="change_btn">C</button>
                    <button className="change_btn" onClick={onClickDel}>X</button>
                </div>

            </div>
            
            <div className="secTasks">
                {array.map((obj) => (<TaskAdditional 
                    key={obj.id} 
                    id = {obj.id}
                    content = {obj.content} 
                    check = {obj.check}
                    urlSecond = {props.urlSecond}
                    active = {props.active}
                    allUpdate = {props.allUpdate}
                />))}
                <div className="add_task" style={props.active? {display: "block"} : {display: "none"}}>
                    <AddTask allUpdate = {props.allUpdate} isFather = {false} urlSecond = {props.urlSecond} urlMain = {props.urlMain} fatherId= {props.id}/>
                </div>
            </div>

        </div>
    )
}

export default Task;