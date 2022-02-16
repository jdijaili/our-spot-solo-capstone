import { useSelector } from "react-redux";
import './HomeView.css'

const HomeView = () => {
    const user = useSelector(state => state.session.user)

    const logged_in = (
        <div className='home'>
            <div className='home-graphic'>
                <img src='https://res.cloudinary.com/jenn/image/upload/v1644994888/our-spot/104-1041921_sticker-bonsai-chic-ambiance-sticker-kc-9364-bonsai_okpwjq.png' alt='bonsai tree'/>
            </div>
            <div className='home-content'>
                <h1>Welcome to Our Spot</h1>
                <p>caught a vibe</p>
                <p>baby are you coming for the ride</p>
            </div>
        </div>
    )

    const splash = (
        <>
            <div>
                <h1>Sign up or Log in to explore parks in your area!</h1>
            </div>
        </>
    )

    return(
        <div>
            {user ? logged_in : splash}
        </div>
    );
};

export default HomeView;
