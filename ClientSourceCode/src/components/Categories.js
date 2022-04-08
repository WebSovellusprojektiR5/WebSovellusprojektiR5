import React from 'react'

export default function SignIn(props) {
    return (
        <div class="container">
        <ul class="nav justify-content-center">
            {props.types.map((t) => 
                
                <li key={t.id} class="nav-item">
                    <a class="nav-link" href="#">{t.name}</a>
                </li> )}
                <li class="nav-item">
                    <a class="nav-link" href="#">€</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">€€</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">€€€</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">€€€€</a>
                </li>
        </ul>
     </div>
  )
}