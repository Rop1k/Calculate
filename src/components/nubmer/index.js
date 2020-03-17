import React from "react";
import './style.css';

function Number(props){

    return(
        <button onClick={props.buttonClick} className={props.className} value={props.value}>{props.value}</button>
    )

};

export default Number;
