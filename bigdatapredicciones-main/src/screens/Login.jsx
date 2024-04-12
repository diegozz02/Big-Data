import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import login from '../components/Login';

function Login(props) {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        login(username, password)
            .then(response => {
                if (response.code === 200) {
                    sessionStorage.setItem('usuario', 'true');
                    navigate("/home");
                } else {
                    setErrorMessage("Usuario y/o contraseña incorrectos");
                }
            })
            .catch(error => {
                console.error("Error:", error);
                setErrorMessage("Hubo un error al iniciar sesión. Por favor, inténtalo de nuevo.");
            });
    };

    return (
        <>
            <div className="containerLogin">
                <div>

                
                <h2>Iniciar sesión</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="username">Nombre de usuario:</label>
                        <input type="text" id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    </div>
                    <div>
                        <label htmlFor="password">Contraseña:</label>
                        <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <button className="boton" type="submit">Iniciar sesión</button>
                </form>
                <p className="error-message">{errorMessage}</p>
                </div>
            </div>
        </>
    );
}

export default Login;
