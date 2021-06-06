import React from 'react'
import './Header.css'

const Header = () => {

    var today = new Date(),
    date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    return (
        <div className='header'>
            <h3>{date}</h3>
            <h1 className='heading'>Task Logger</h1>
        </div>
    )
}

export default Header
