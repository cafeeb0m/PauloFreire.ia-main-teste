import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const navigate = useNavigate();

    return (
        <div className="home">
            <h1>Home</h1>
            <p className="link" onClick={() => navigate('admin/')}>
                Painel de Controle
            </p>
        </div>
    );
}
