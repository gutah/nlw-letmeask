import { Link, useHistory } from 'react-router-dom';
import { FormEvent, useState } from 'react';

import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';

import '../styles/auth.scss';
import { database, firebase } from '../services/firebase';
import { useAuth } from '../hooks/useAuth';

import { Button } from '../components/Button';


export function NewRoom() {
    const { user } = useAuth();
    const history = useHistory();
    const [newRoom, setNewRom] = useState('');

    async function handleCreateRoom(event: FormEvent) {
        event.preventDefault();

        if (newRoom.trim() === '') {
            return;
        }

        const roomRef = database.ref('rooms');

        const firebaseRoom = await roomRef.push({
            title: newRoom,
            authorId: user?.id,
        })

        history.push(`/rooms/${firebaseRoom.key}`);

    }

    return (
        <div id="page-auth">
            <aside>
                <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
                <strong>Crie sales de Q&amp;A ao vivo</strong>
                <p>Tire as dúvidas da sua audiência em tempo-real</p>
            </aside>
            <main>
                <div className="main-content">
                    <img src={logoImg} alt="Letmeask" />
                    <h2>Crie uma nova sala</h2>
                    <form onSubmit={handleCreateRoom}>
                        <input
                            type="text"
                            placeholder="Nome da sala"
                            onChange={event => setNewRom(event.target.value)}
                        />
                        <Button type="submit">
                            Criar uma nova sala
                        </Button>
                    </form>
                    <p>
                        Quer entrar em umsa sala já existente? <Link to="/">Clique aqui</Link>
                    </p>

                </div>
            </main>
        </div>
    )
}