import React from "react";
import { languageVersions, languageLogo } from "../assets/languageList";

const getLogo = (logoName) => {
    return new URL(`../assets/${logoName}.png`, import.meta.url).href;
};

const LanguageSwitcher = ({ language }) => {
    const lngs = Object.entries(languageVersions)
    return (<>
        <div className='language-switch-menu'>
            <button className='language-switcher'><img className='lngLogo' src={getLogo(languageLogo[language])} alt="jsLogo"></img></button>
              <div className="language-menu">   
                {lngs.map(([lang, ver]) => {
                    return <a key={lang} href="">{lang}<span className="version">{ver}</span></a>
                })}
              </div>
          </div>
    </>)
}

export default LanguageSwitcher;