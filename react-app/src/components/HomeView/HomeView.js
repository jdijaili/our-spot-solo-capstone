import { useSelector } from "react-redux";
import './HomeView.css'

const HomeView = () => {
    const user = useSelector(state => state.session.user)

    const logged_in = (
        <div className='home'>
            <div className='home-content'>
                <h1>Welcome to Our Spot</h1>
                <p>caught a vibe</p>
                <p>baby are you coming for the ride</p>
            </div>
        </div>
    )

    const splash = (
        <>
            <div className='home'>
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
