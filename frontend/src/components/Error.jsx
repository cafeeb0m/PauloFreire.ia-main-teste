import { useRouteError } from 'react-router-dom';

export default function Error() {
    const error = useRouteError();
    console.error(error);

    return (
        <div className="error">
            <h1>Ops!</h1>
            <p className="message">Desculpe, ocorreu um erro inesperado.</p>
            <p className="details">{error.statusText || error.message}</p>
        </div>
    );
}
