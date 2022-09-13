import './AddTask.scss';

import React from 'react';
import axios from 'axios';

function AddTask(props){

    let inputRef = React.useRef();

    //добавить новый таск
    let onAddClick = () => {
        if(inputRef.current.value == ''){
            alert('Задание пустое');
        }
        else if (props.isFather){
            console.log('father code');
            addTaskMain(props.urlMain, props.isFather)
        }
            else{
                console.log('son code');
                addTaskMain(props.urlSecond, props.isFather)
            }
        
        inputRef.current.value = '';
    }

    //добавить таск через сервер
    let addTaskMain = async (url, isFather) => {
        if (isFather){
            await axios.post(url, {check: false, content: inputRef.current.value})
        }
        else{
            await axios.post(url, {check: false, content: inputRef.current.value, fatherId: props.fatherId})    
        }
        
        props.allUpdate()
    }

    //спец ивент для нажатия на энтер в поле ввода
    let onEnterUp = (event) => {
        if (event.keyCode == 13){
            onAddClick()
        }
    }

    return(
        <div className="AddTask">
            <input type="text" ref={inputRef} onKeyUp = {(event) => {onEnterUp(event)}} className= "input_text"/>
            <button className="add_btn" onClick={onAddClick}>+</button>
            <button className="add_btn" onClick={()=>{inputRef.current.value = '';}}>X</button>
        </div>
    )
}

export default AddTask;