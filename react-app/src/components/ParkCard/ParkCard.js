import { Link } from 'react-router-dom';
import './ParkCard.css'

const ParkCard = ({ park }) => {
    return (
        <div>
            <div className='park-card'>
                <Link to={`/parks/${park.id}`}>
                    <img className='park-card-img' src={park.imageURL} alt={`${park.name}`} />
                </Link>
                <Link to={`/parks/${park.id}`}>
                    <div className='park-info'>
                        <h2>{park.name}</h2>
                        <h4>{park.city}</h4>
                    </div>
                </Link>
            </div>

        </div>
    )
}

export default ParkCard;
