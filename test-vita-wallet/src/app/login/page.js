'use client'
import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { useRouter } from 'next/navigation';

const login = () => {
    const { setUser } = useAppContext();
    const router = useRouter();
    const [email, setEmail] = useState('prospecto@vitawallet.io'); // Email proporcionado
    const [password, setPassword] = useState('Vita.1212'); // Contraseña proporcionada
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setErrorMessage(''); // Reiniciar el mensaje de error

        try {
            const response = await fetch('https://api.qa.vitawallet.io/api/auth/sign_in', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),  // Manteniendo email y password
            });

            const data = await response.json();

            if (response.ok) {
                setUser(data.data); // Guarda la información del usuario en el contexto
                router.push('/'); // Redirigir a la página principal
            } else {
                setErrorMessage(data.message || 'Error al iniciar sesión'); // Mensaje de error
            }
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('Hubo un problema al conectarse al servidor'); // Mensaje de error genérico
        }
    };

    return (
        <div>
            <h1>Iniciar Sesión</h1>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>} {/* Mensaje de error */}
            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor="email">Correo Electrónico:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} // Manejo del cambio en el input de email
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Contraseña:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} // Manejo del cambio en el input de password
                        required
                    />
                </div>
                <button type="submit">Iniciar Sesión</button> {/* Botón para enviar el formulario */}
            </form>
        </div>
    );
};

export default login;
