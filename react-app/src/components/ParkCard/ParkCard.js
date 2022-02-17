import { Link } from 'react-router-dom';
import './ParkCard.css'

const ParkCard = ({ park }) => {
    return (
        <>
            <div className='park-card'>
                <Link></Link>
                <img className='park-card-img' src={park.imageURL} alt={`${park.name}`}/>
                <div className='park-info'>
                    <h2>{park.name}</h2>
                    <h4>{park.city}</h4>
                </div>
            </div>

        </>
    )
}

export default ParkCard;
