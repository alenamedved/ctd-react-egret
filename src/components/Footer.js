import React from "react";
import style from "./modules/Footer.module.css"
import { ExternalLink } from 'react-external-link';
import GitHub from "./img/gHLogo.png"
import Facebook from "./img/fbLogo.png"
import LinkedIn from "./img/LinkInLogo.png"


function Footer() {
    return (
        <footer className={style.footer}>
            <p style={{fontSize: 'small'}}>&copy;  made by Alena M 2021 </p>
            <ExternalLink href='https://www.linkedin.com/in/alena-miadzvedskaya-848313137/' target='_blank'><img src={LinkedIn} width='20px' alt="logo"/></ExternalLink>
            <ExternalLink href='https://www.facebook.com/elenaamadeus' target='_blank'><img src={Facebook} width='20px' alt="logo" /></ExternalLink>
            <ExternalLink href='https://github.com/alenamedved?tab=repositories' target='_blank'><img src={GitHub} width='20px' alt="logo" /></ExternalLink>
        </footer>
    )
}
export default Footer