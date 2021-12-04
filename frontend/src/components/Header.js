import React from 'react'
import { useNavigate } from "react-router-dom";
import logo from '../GeorgiaTech_RGB.png';

export default function Header() {

    let navigate = useNavigate();

    function handleClick() {
        navigate("/");
    }

    return (
        <header>
            <img onClick={handleClick} src={logo} alt='logo' />
            <h1 onClick={handleClick}>FinApp</h1>
        </header>
    );
}