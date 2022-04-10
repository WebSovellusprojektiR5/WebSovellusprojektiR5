import React from 'react'

export default function SignIn(props) {
    return (
        <div className="container">
        <ul className="nav justify-content-center">
            {props.types.map((t) => 
                
                <li key={t.id} className="nav-item">
                    <a className="nav-link" href="#">{t.name}</a>
                </li> )}
                <li className="nav-item">
                    <a className="nav-link" href="#">€</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">€€</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">€€€</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">€€€€</a>
                </li>
        </ul>
     </div>
  )
}