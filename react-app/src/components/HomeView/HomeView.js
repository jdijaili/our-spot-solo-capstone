import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import './HomeView.css'

const HomeView = () => {
    const user = useSelector(state => state.session.user);

    const logged_in = (
        <div className='home'>
            <div className='home-content'>
                <h1 className='home-welcome-header'>Welcome to Our Spot</h1>
                <p className='home-welcome-text'>we caught a vibe, baby are you coming for the ride</p>
                <Link to='/parks'>
                    <button className='home-explore-button'>Explore Parks</button>
                </Link>
            </div>
            <div>
                <img className='home-image' src='https://res.cloudinary.com/jenn/image/upload/v1645572949/our-spot/Untitled_Artwork_3_myamif.png' alt='park' />
            </div>
        </div>
    )

    const splash = (
        <div className='home'>
            <div className='home-content'>
                <h1>Welcome to Our Spot</h1>
                <p>Sign in or start exploring local parks!</p>
                <Link to='/parks'>
                    <button className='home-explore-button'>Explore Parks</button>
                </Link>
            </div>
            <div>
                <img className='home-image' src='https://res.cloudinary.com/jenn/image/upload/v1645572949/our-spot/Untitled_Artwork_3_myamif.png' alt='park' />
            </div>
        </div>
    )

    return (
        <div>
            {user ? logged_in : splash}
        </div>
    );
};

export default HomeView;
