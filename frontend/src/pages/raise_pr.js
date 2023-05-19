import React, { useState, useEffect } from "react";
import Select from 'react-select'
import styled from "styled-components";
import ReactMarkdown from 'react-markdown';
import Collapsible from 'react-collapsible';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { FaEraser } from 'react-icons/fa';

const Raise_Pr = () => {
    const options = [
        { value: 'chocolate1111111111', label: 'Chocolate11111111111111111111' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
    ]
    const [additional, setAddtional] = React.useState('');
    const handleChange = (event) => {
        setAddtional(event.target.value)
    }
    const resetRadioState = () => {
        setAddtional('');
    }
    return (
        <div className="div-tags-cls">
            <div className='rowC'>
                <div style={{ "width": "50%", "fontSize": "25px", "padding": "10px", "color": "#659dbd" }}><fieldset style={{ "fontSize": "20px", "textAlign": "left", "border": "none" }}><legend ><b><i><u>Source Bucket</u></i></b></legend>
                    <Select options={options} placeholder="From" /></fieldset>
                </div>
                <div style={{ "width": "50%", "fontSize": "25px", "padding": "10px", "color": "#659dbd" }}><fieldset style={{ "fontSize": "20px", "textAlign": "left", "border": "none" }}><legend ><b><i><u>Destination Bucket</u></i></b></legend>
                    <Select options={options} placeholder="To" /></fieldset>
                </div>
            </div>
            <div className='rowC'>
                <div style={{ "width": "100%", "fontSize": "25px", "padding": "10px", "color": "#659dbd" }}><fieldset style={{ "fontSize": "20px", "textAlign": "left", "border": "none" }}><legend ><b><i><u>Additional </u></i></b> <FaEraser style={{ "paddingLeft": "10px" }} onClick={resetRadioState} /> </legend>
                    <div style={{ "padding": "10px" }}>
                        <input type="radio" value="add_beta" name="gender" checked={additional === 'add_beta'}
                            onChange={handleChange} /> Add Beta</div>
                    <div style={{ "padding": "10px" }}>
                        <input type="radio" value="remove_beta" name="gender" checked={additional === 'remove_beta'}
                            onChange={handleChange} /> Remove Beta
                    </div>
                </fieldset>
                </div>
            </div>
            <div className='rowC'>
                <div style={{ "width": "100%", "fontSize": "25px", "padding": "10px", "color": "#659dbd" }}><fieldset style={{ "fontSize": "20px", "textAlign": "left", "border": "none" }}><legend ><b><i><u>Commit</u></i></b></legend>
                    <input style={{ "width": "50%", "fontSize": "18px" }} type="text" placeholder="Commit Message" /></fieldset>
                </div>
            </div>
            <div className='rowC'>
                <button className='button1' style={{ "width": "50%", "padding": "10px", "color": "#659dbd" }}><span><b><i>Submit</i></b></span></button>
                <button className='button1' style={{ "width": "50%", "padding": "10px", "color": "#659dbd" }}><span><b><i>Clear</i></b></span></button>
            </div>
        </div>
    )
};
export default Raise_Pr;