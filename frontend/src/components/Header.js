import React from 'react'
import { useNavigate } from "react-router-dom";

export default function Header() {

    let navigate = useNavigate();

    function handleClick() {
        navigate("/");
    }

    return (
        <header>
            <h1 onClick={handleClick}>Home</h1>
        </header>
    );
}