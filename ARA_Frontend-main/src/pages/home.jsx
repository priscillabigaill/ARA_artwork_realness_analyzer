import React from 'react'
import { useNavigate } from 'react-router-dom';
import images from '../constants/images';
import { useSpring, animated } from '@react-spring/web'
import { useState } from 'react';

function Home() {
    
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

  return (
    <div className='min-h-screen w-full bg-cream pb-12'>
      <div classname='fixed'>
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

        <div className='flex w-full h-[35rem]'>
            <div className='flex flex-col w-full mt-32 mx-20'>
                <animated.p className='text-6xl font-inter font-extrabold text-blue-100'
                style={{...slideIn}}>
                    Hi, welcome to ARA.
                </animated.p>
                <animated.p className='text-xl font-inter mt-6'
                style={{...slideIn2}}>
                    An AI detection website that can help you determine if your uploaded artwork is authentic or AI generated. 
                </animated.p>

                <animated.button className='mt-12 min-h-12 w-36 bg-green rounded-xl shadow-sm' 
                style={{...fadeIn}}
                onClick={() => {
                  navigate('/detector');
                }}>
                    <p className='text-lg font-inter font-roman text-blue-100'>
                        Try Now!
                    </p>
                </animated.button>
            </div>
        </div>

        <div className='mb-12 flex flex-col items-center rounded-t-[5rem] bg-blue h-fit py-12 px-12'>
            <p className='font-inter font-bold text-4xl text-cream'>
            How does our Artwork Realness Analyzer work?
            </p>

            <p className='font-inter text-xl text-cream mt-8'>
            We help identify artworks generated from the most popular image generators such as:
            </p>

            <div className='flex flex-wrap justify-center mt-16'>
                <img 
                className='h-40 w-40 mx-8 my-4'
                src={images.gptlogo} alt='gpt'
                style={{ objectFit: 'cover'}} 
                />

                <img 
                className='h-40 w-40 mx-8 my-4'
                src={images.stablediffusionlogo} alt='stablediffusion'
                style={{ objectFit: 'cover'}} 
                />

                <img 
                className='h-40 w-40 mx-8 my-4'
                src={images.midjourneylogo} alt='midjourney'
                style={{ objectFit: 'cover'}} 
                />

            </div>
        </div>

        <div className='mb-12 flex flex-col items-center rounded-[5rem] h-fit mx-9 py-12 px-12'>
          <p className='font-inter font-bold text-4xl text-blue-100 mb-8'>
            How to Use?
          </p>
          <ol className='font-inter text-lg text-blue-100 list-decimal space-y-4'>
            <li>
              <strong>AI Image Detector:</strong>
              <ul className='list-disc list-inside mt-2'>
                <li>Upload an image to the AI Image Detector.</li>
   
                <img className='w-[18rem] h-[17rem]' src={images.detector} alt='humanpercentage' />

                <li>If the image is detected as less than 50% likely to be AI-generated:</li>
                <img className='w-[50rem] h-25' src={images.humanpercentage} alt='detector' />
                <ul className='list-disc list-inside pl-6'>
                    
                  <li>Click the "Save to Database" button to save the image.</li>
                  <img className='w-[15rem] h-25' src={images.save} alt='save' />

                  <li>The UID of the image will be shown.</li>
                  <img className='w-[20rem] h-25' src={images.savedUID} alt='savedUID' />

              
                </ul>
              </ul>
            </li>
            <li>
              <strong>Check Database:</strong>
              <ul className='list-disc list-inside mt-2'>
                <li>Use the "Check Database" feature.</li>
                <img className='w-[30rem] h-25' src={images.checkUID} alt='checkUID' />
                <li>Input the BID (unique identifier) of the saved picture.</li>
                <img className='w-[30rem] h-25' src={images.searchUID} alt='savedUID' />
                <li>Retrieve and display the image associated with the provided BID.</li>
                <img className='w-[30rem] h-[19rem]' src={images.checkeddb} alt='checkeddb' />
              </ul>
            </li>
          </ol>
        </div>



    </div>
  )
}

export default Home