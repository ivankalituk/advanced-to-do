import axios from 'axios';
import './TaskAdditional.scss'
import React from 'react';

function TaskAdditional(props){

    let [ifChecked, setIfChecked] = React.useState(props.check)

    //сохранение чека в бд
    let inputCheck = (event) => {
        axios.put(props.urlSecond + '/' + props.id, {"check": event.target.checked})
        setIfChecked(!ifChecked);
    }

    //удаление дочернего задания
    let onClickDel = async () => {
        console.log("deleting son");
        await axios.delete(props.urlSecond + '/' + props.id);

        props.allUpdate();
    }

    return(
        <div className="secondary_task">

            <div className="Task_content">
                <input type="checkbox" className='CheckBox' onChange={(event) => inputCheck(event)} defaultChecked={props.check}/>
                <div className="tasktext" style={ifChecked ? {textDecoration: "line-through"} : {textDecoration:"none"}}>{props.content}</div>
            </div>

            <div className="changebtns" style={props.active? {display: "block"} : {display: "none"}}>
                <button className="change_btn">C</button>
                <button className="change_btn" onClick={onClickDel}>X</button>
            </div>

        </div>
    )
}

export default TaskAdditional;