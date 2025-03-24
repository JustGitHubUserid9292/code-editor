import React, { useState, useEffect } from "react";
import { editorThemesDark, editorThemesLight } from "../assets/constants";

const EditorThemeSwitcher = ({ editorTheme, setEditorTheme, isLight }) => {
    const [isShow, setShow] = useState(false)

    const toggleMenu = () => {
        setShow((prev) => !prev);
    }

    const handleClickOutside = (e) => {
         if (isShow && e.target.closest(".editor-switcher-menu") === null) setShow(false)
    };
        
    useEffect(() => {
        if (isShow) document.addEventListener("mousedown", handleClickOutside);
    
        else document.removeEventListener("mousedown", handleClickOutside);
    
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isShow]);
    

    return (<>
        <div className='editor-switcher-menu'>
            <div className="editor-switcher-button"><span className="theme-title">{editorTheme}</span><button className='editor-switcher' onClick={toggleMenu}><i className="ri-arrow-down-s-line"></i></button></div>
               <div className={isShow ? "editor-menu show" : "editor-menu"}>   
                    {isLight ? editorThemesLight.map(theme => {
                        return <a key={theme} className="menu-item" onClick={() => { setEditorTheme(theme); setShow(false); }}>{theme}</a>
                    }) : editorThemesDark.map(theme => {
                        return <a key={theme} className="menu-item" onClick={() => { setEditorTheme(theme); setShow(false); }}>{theme}</a>
                    })}
               </div>
        </div>
    </>)
}

export default EditorThemeSwitcher