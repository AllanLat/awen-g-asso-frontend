import './index.css';
import { Link } from 'react-router-dom'

const Error = () => {
    return (
        <div className='error-page'>
            <h1>La page demandée n'existe pas</h1>
            <p>Retour à l'accueil :</p>
            <Link to='/home'>Ici</Link>
        </div>
    )
}

export default Error