import React, { useState, useEffect } from "react";
import { languageVersions, languageLogo } from "../assets/constants";

const getLogo = (logoName) => {
    return new URL(`../assets/${logoName}.png`, import.meta.url).href;
};

const LanguageSwitcher = ({ language, setLanguage }) => {
    const lngs = Object.entries(languageVersions)
    const [isShow, setShow] = useState(false)

    const toggleMenu = () => {
        setShow((prev) => !prev);
    }

    const handleClickOutside = (e) => {
        if (isShow && e.target.closest(".language-switcher-menu") === null) setShow(false)
    };
    
    useEffect(() => {
        if (isShow) document.addEventListener("mousedown", handleClickOutside);

        else document.removeEventListener("mousedown", handleClickOutside);

        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isShow]);

    return (<>
        <div className='language-switcher-menu'>
            <button className='language-switcher' onClick={toggleMenu}><img className='lngLogo' src={getLogo(languageLogo[language])} alt="lngLogo"></img></button>
              <div className={isShow ? "language-menu show" : "language-menu"}>   
                {lngs.map(([lang, ver]) => {
                    return <a key={lang} className="menu-item" onClick={() => { setLanguage(lang); setShow(false); }}>{lang}<span className="version">{ver}</span></a>
                })}
              </div>
          </div>
    </>)
}

export default LanguageSwitcher;