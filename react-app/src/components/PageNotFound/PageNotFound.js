import './PageNotFound.css'

const PageNotFound = () => {
    return (
        <div className='four-page'>
            <div className='four-content'>
                <h1>Page Not Found</h1>
                <iframe
                    width="400"
                    height="225"
                    src="https://www.youtube.com/embed/2dTMIH5gCHg"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen></iframe>
            </div>
            <div className='four-img'>
                <img className='home-image' src='https://res.cloudinary.com/jenn/image/upload/v1645572949/our-spot/Untitled_Artwork_3_myamif.png' alt='park' />
            </div>
        </div>
    )
};

export default PageNotFound;
