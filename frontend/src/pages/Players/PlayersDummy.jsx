import React from 'react'
import './PlayersDummy.css'
import Popup from '../../components/popup'

function PlayersDummy() {
    return (
        <div className='container'>
           
            <div className="card">
                <div className="imgbox">
                    <div className="img">
                        <img className="img" src='https://cdn.pixabay.com/photo/2018/08/28/13/29/avatar-3637561_1280.png' />
                    </div>
                </div>
                <div className="details">
                    <h2 className="title">Akhil P</h2>
                    <span className="caption">Developer</span>
                </div>
            </div>
            <div className="switch-holder">
                <div className="switch-label">
                    <i className="fa fa-bluetooth-b"></i><span>Bluetooth</span>
                </div>
                <div className="switch-toggle">
                    <input type="checkbox" id="bluetooth" />
                    <label htmlFor="bluetooth"></label>
                </div>
            </div>
        </div>
    )
}

export default PlayersDummy