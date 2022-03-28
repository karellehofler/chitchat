import React, { useEffect, useState } from 'react';
import useWindowSize from '../../hooks/useWindowSize';
import { Branding } from '../displays';

function Menu () {
    
    const [ slider, setSlider ] = useState(false);
    const size = useWindowSize();

    return (
        <>
            <div className="valign-wrapper menu-btn-wrapper">
                <button onClick={() => setSlider(prev => !prev)}
                href="#" data-target="slide-out" 
                className="sidenav-trigger show-on-large light-blue-text text-darken-1 trans-btn">
                    <i className="material-icons">menu</i>
                </button>
            </div>
            <div className="side-nav-overlay side-nav-bg"
            style={{ display: slider && size.width < 980 ? "block" : "none",
            opacity: "1" }}>
                <ul id="slide-out" className="sidenav" style={{
                    transform: slider || size.width > 980 ? "translateX(0%)" : "",
                    transitionProperty: "transform",
                    transitionDuration: ".25s"
                }}>
                    <li>
                        <div className="side-nav-branding">
                            <Branding />
                            <a onClick={() => setSlider(prev => !prev)}>
                                <i className="material-icons">close</i>
                            </a>
                        </div>
                    </li>
                    <li>
                        <div className="user-view">
                            <div className="background">
                                <img src="https://images.pexels.com/photos/9934462/pexels-photo-9934462.jpeg?cs=srgb&dl=pexels-mo-9934462.jpg&fm=jpg" />
                            </div>
                            <a href="#user">
                                <img className="circle" src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" />
                            </a>
                            <a href="#name"><span className="white-text name">John Doe</span></a>
                            <a href="#email"><span className="white-text email">jdandturk@gmail.com</span></a>
                        </div>
                    </li>
                    <li><div className="divider"></div></li>
                    <li><a href="#">Sign Out</a></li>
                </ul>
            </div>
        </>
    )
}

export default Menu;