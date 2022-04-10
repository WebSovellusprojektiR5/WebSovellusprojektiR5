import React from 'react'

export default function SignIn(props) {
    return (
        <div className="container">
        <ul className="nav justify-content-center">
            <li className="nav-item">
                <a className="nav-link" href="#" onClick={() => props.onItemClicked(-1)}>All</a>
            </li>
            { props.types.map((t) =>                
            <li key={t.id} className="nav-item">
                <a className="nav-link" href="#" onClick={() => props.onItemClicked(t.id)}>{t.name}</a>
            </li> )}

            <li className="nav-item">
                <a className="nav-link" href="#" onClick={() => props.onItemClicked(1001)}>€</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="#" onClick={() => props.onItemClicked(1002)}>€€</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="#" onClick={() => props.onItemClicked(1003)}>€€€</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="#" onClick={() => props.onItemClicked(1004)}>€€€€</a>
            </li>
        </ul>
     </div>
  )
}