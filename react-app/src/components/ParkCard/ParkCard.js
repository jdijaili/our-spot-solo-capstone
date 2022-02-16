import './ParkCard.css'

const ParkCard = ({ park }) => {
    return (
        <>
            <div>
                <h2>{park.name}</h2>
            </div>
            <div>
                <img src={park.imageURL} />
            </div>

        </>
    )
}

export default ParkCard;
