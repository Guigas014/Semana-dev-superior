import React from 'react'; 

import Logo from '../../assets/img/logo.svg'

import './styles.css'; 
 


export function Header() { 

  return ( 
     <header>
       <div className="dsmeta-logo-container">
         <img src={Logo} alt="DSMeta" />
         <h1>DSMeta</h1>
         <p>
          <a href="https://www.instagram.com/devsuperior.ig">@devsuperior</a>
         </p>
       </div>
     </header>
	); 

}
