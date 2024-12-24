import React from 'react'
import { useNavigate } from 'react-router-dom';
import images from '../constants/images';
import { useSpring, animated } from '@react-spring/web'
import { useState } from 'react';
import axios from 'axios';

function Database() {
    
    const slideIn = useSpring({
        config: {
            tension: 170,
            friction: 60
        },
        from: { y: -50, opacity: 0 },
        to: { y: 0, opacity: 1 },
    })

    const slideIn2 = useSpring({
        config: {
            tension: 170,
            friction: 60
        },
        from: { y: -50, opacity: 0 },
        delay: 250,
        to: { y: 0, opacity: 1 },
    })

    const fadeIn= useSpring({ 
        config: {
          duration: 1200,
        },
        from: { opacity: 0 },
        to: { opacity: 1 },
    })

    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [UID, setUID] = useState('109301930');
    const [AuthenticationDate, setAuthenticationDate] = useState('18 Nov 2024');
    const [inputUID, setInputUID] = useState('');
    const [loading, setLoading] = useState(false);
    const [isSearched, setIsSearched] = useState(false);
    const [isMatch, setIsMatch] = useState(false);
    const [fetchedImageData, setFetchedImageData] = useState(null); // Store returned data from backend

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleUIDMatch();
        }
    };

    // const handleUIDMatch = () => {
    //   setLoading(true);
    //   setTimeout(() => {
    //       setLoading(false);
    //       setIsSearched(true);
    //       setIsMatch(inputUID === UID);
    //   }, 2000);
    // };


    const handleUIDMatch = async () => {
      setLoading(true);
      setIsSearched(false);
      setIsMatch(false);

      try {
        // Make a GET request to FastAPI endpoint
        const response = await axios.get(`http://10.25.150.130:8000/images/${inputUID}`); //HERE1

        // If the image is found:
        const data = response.data;
        setFetchedImageData(data); // Store received data
        setAuthenticationDate(data.authenticationDate);
        setIsSearched(true);
        setIsMatch(true);
      } catch (error) {
        // If the image is not found or theres an error:
        console.error("Error fetching image:", error);
        setIsSearched(true);
        setIsMatch(false);
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className='min-h-screen w-full bg-cream pb-12'>
      <div classme='fixed'>
        <div className='flex items-center h-20 bg-pink'>
          <div className='hidden md:flex'>
            <button className='w-fit px-8 ml-12 h-full bg-pink hover:bg-pink-100'
              onClick={() => navigate('/')}>
              <p className='font-inter text-xl'>
                      Home
              </p>    
            </button>
                
            <button className='w-fit px-8 h-full bg-pink hover:bg-pink-100'
            onClick={() => navigate('/detector')}>
                <p className='font-inter text-xl'>
                    AI Art Detector
                </p>
            </button>

            <button className='w-fit px-8 h-full bg-pink hover:bg-pink-100'
            onClick={() => navigate('/database')}>
                <p className='font-inter text-xl'>
                    Image Database
                </p>
            </button>
          </div>
                
                <div className='ml-20 md:hidden'>
                    <button onClick={() => setIsOpen(!isOpen)}>
                        {/* hamburger icon */}
                        <svg
                        className='w-6 h-6'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                        >
                        <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M4 6h16M4 12h16M4 18h16'
                        />
                        </svg>
                    </button>
                </div>

                <img 
                className='ml-auto mr-8 h-20 w-20'
                src={images.aralogo} alt='aralogo'
                style={{ objectFit: 'contain'}} 
                />
            </div>

            {/* Modal */}
      {isOpen && (
        <div
          className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'
          onClick={() => setIsOpen(false)}
        >
          <div
            className='bg-white rounded-lg w-3/4 max-w-sm'
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
          >
            {/* Close Button */}
            <div className='flex justify-end p-2'>
              <button onClick={() => setIsOpen(false)}>
                <svg
                  className='w-6 h-6 text-gray-700'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className='flex flex-col items-center p-4'>

                <button
                    className='w-full py-2 text-center text-xl font-inter hover:bg-gray-200'
                    onClick={() => {
                    navigate('/');
                    setIsOpen(false);
                    }}
                >
                    Home
                </button>

              <button
                className='w-full py-2 text-center text-xl font-inter hover:bg-gray-200'
                onClick={() => {
                  navigate('/detector');
                  setIsOpen(false);
                }}
              >
                AI Art Detector
              </button>

              <button
                className='w-full py-2 text-center text-xl font-inter hover:bg-gray-200'
                onClick={() => {
                  navigate('/database');
                  setIsOpen(false);
                }}
              >
                Image Database
              </button>
            </div>
          </div>
        </div>
      )}

        </div>

        <div className='flex w-full h-fit'>
            <div className='flex flex-col 860px:flex-row w-full mt-32 mx-20 items-center'>
                <animated.p
                className="flex-wrap text-6xl font-inter font-extrabold text-blue-100"
                style={{ ...slideIn }}
                >
                Check our database!
                </animated.p>
                <animated.div
                    className="mt-[35px] min-h-[3rem] w-full bg-blue-200 rounded-xl shadow-sm"
                    style={{ ...fadeIn }}
                    >
                    <div
                        className="relative mt-[3.5rem] min-h-[6rem] w-1029 bg-blue-300 shadow-sm"
                        style={{
                        borderBottomLeftRadius: "0.75rem",
                        borderBottomRightRadius: "0.75rem",
                        ...fadeIn,
                        }}
                    >
                        <div
                        className="absolute inset-0 flex items-center justify-center"
                        >
                            <div
                            className="relative min-h-[3rem] w-full mx-6 bg-white rounded-xl shadow-sm flex items-center"
                            >
                            <input
                                  type="text"
                                  className="w-full h-full px-4 bg-transparent outline-none text-gray-700 rounded-xl"
                                  placeholder="Search UID..."
                                  value={inputUID}
                                  onChange={(e) => setInputUID(e.target.value)}
                                  onKeyDown={handleKeyDown}
                              />
                              <img
                                  className="h-7 w-7 mx-4 cursor-pointer"
                                  src={images.search}
                                  alt="search-icon"
                                  onClick={handleUIDMatch} 
                                  style={{ objectFit: 'cover' }}
                              />
                            </div>

                        </div>
                        
                    </div>
                </animated.div>
            </div>
        </div>
        
        {loading && (
            <div className='flex justify-center items-center'>
                <div className="mt-10 w-10 h-10 border-4 border-gray-300 border-t-purple rounded-full animate-spin"></div>
            </div>
        )}

        {isSearched && (
            <animated.div className="mt-4 mb-12 flex flex-col items-center rounded-[2.5rem] mx-20 bg-blue-300 h-fit p-8 shadow-md"
            style={{ ...fadeIn }}
            >
                {!loading && isSearched && (
                  isMatch ? (
                <animated.div className="flex flex-col justify-evenly items-center w-full bg-white rounded-xl shadow-sm p-6 980px:flex-row "
                style={{ ...fadeIn }}>
                    {/* Left Image Section */}
                    <div className="h-[50%]] w-[50%] flex-shrink-0 bg-gray-200 rounded-lg overflow-hidden">
                    {/* <img
                        src="blank.jpg"
                        alt="blank"
                        className="w-full h-full object-cover"
                    /> */}

                  <img
                    src={`data:image/png;base64,${fetchedImageData.image_data_base64}`}
                    alt="Image database"
                    className="w-full h-full object-cover"
                  />

                    </div>
                    {/* Right Text Section */}
                    <div className="ml-6 p-6 flex flex-col justify-center">
                    <animated.p className="text-xl font-inter text-gray-700" style={{ ...slideIn2 }}>
                        UID: <span className='font-medium'>{fetchedImageData.uid}</span>
                    </animated.p>
                    <animated.p className="text-xl font-inter text-gray-700 mt-2" style={{ ...slideIn2 }}>
                        Status: <span className="font-medium text-green-600">Authentic</span>
                    </animated.p>
                    <animated.p className="text-xl font-inter text-gray-700 mt-2" style={{ ...slideIn2 }}>
                        Date of Authentication: <span className="font-medium">{fetchedImageData.authenticationDate}</span>
                    </animated.p>
                    </div>
                </animated.div>
                ) : (
                    <animated.div className="flex justify-center items-center text-xl font-medium text-red-500"
                        style={{ ...fadeIn }} >
                        Image not found in database.
                    </animated.div>
                ) 
              )}

            </animated.div>
     )}
    </div>
  )
}

export default Database