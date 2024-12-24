import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import images from '../constants/images';
import { useSpring, animated } from '@react-spring/web'
import { useState } from 'react';
import axios from 'axios';

function Detector() {
    const slideIn = useSpring({
        config: {
            tension: 170,
            friction: 60
        },
        from: { y: -50, opacity: 0 },
        to: { y: 0, opacity: 1 },
    })

    const fadeIn= useSpring({ 
        config: {
          duration: 1200,
        },
        from: { opacity: 0 },
        to: { opacity: 1 },
    })

  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [previewURL, setPreviewURL] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [openedModels, setOpenedModels] = useState([]);

  const [aiGeneratedProbability, setAiGeneratedProbability] = useState(null);
  const [realGeneratedProbability, setRealGeneratedProbability] = useState(null);
  const [classification, setClassification] = useState('');

  const [fileUrl, setFileUrl] = useState(null);
  const [uid, setUid] = useState(null);
  const [saveMessage, setSaveMessage] = useState('');
  const [allModelResults, setAllModelResults] = useState(null);

  const hiddenFileInput = useRef(null);
  const navigate = useNavigate();

  const diffusionData = {
    "vgg16 (recommended)": { dalle: 0.06, flux: 0.01, midjourney: 0.01, real: 0.01, stablediffusion: 0.91 },
    vgg9: { dalle: 0.95, flux: 0.0, midjourney: 0.0, real: 0.0, stablediffusion: 0.05 },
    efficientnet: { dalle: 0.76, flux: 0.0, midjourney: 0.01, real: 0.0, stablediffusion: 0.23 },
    resnet50: { dalle: 0.75, flux: 0.0, midjourney: 0.12, real: 0.0, stablediffusion: 0.12 },
    mobilenet: { dalle: 0.1, flux: 0.0, midjourney: 0.0, real: 0.0, stablediffusion: 0.89 },
  };

  const handleClick = () => {
    console.log('hiddenFileInput:', hiddenFileInput.current); // Check if the reference is set
    if (hiddenFileInput.current) {
      hiddenFileInput.current.click();
    } else {
      console.error("File input reference is not available.");
    }
  };
  
  
  const handleChange = async (event) => {
    const fileUploaded = event.target.files[0];
    if (fileUploaded) {
      setPreviewURL(URL.createObjectURL(fileUploaded));
      setUploadedFile(fileUploaded);
      setLoading(true);

      try {
        const formData = new FormData();
        formData.append('file', fileUploaded);

        const response = await axios.post('http://10.25.150.130:8000/images/', formData, { // HERE2
          headers: { 'Content-Type': 'multipart/form-data' },
        });

        // Extract probabilities and classification
        const realProbStr = response.data.real_image_probability;  // e.g. "82.40%"
        const aiProbStr = response.data.ai_generated_probability;  // e.g. "17.60%"
        const realProb = parseFloat(realProbStr);
        const realProbs = 100 - realProb
        const realProbss = realProbs.toFixed(2) + '%'
        const aiProb = parseFloat(aiProbStr);

        setAiGeneratedProbability(aiProbStr);
        setRealGeneratedProbability(realProbss);
        setFileUrl(response.data.file_url);
        setUid(response.data.uid);
        setAllModelResults(response.data.all_model_results);

        const classificationResult = realProb > 50 ? 'Likely Human-Created' : 'Likely AI-Generated';
        setClassification(classificationResult);
      } catch (error) {
        console.error('Error uploading image:', error.response || error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSave = async () => {
    if (!uploadedFile) {
      setSaveMessage('No image available to save.');
      return;
    }
  
    try {
      const formData = new FormData();
      formData.append('file', uploadedFile);
      // Set save_to_db to true to trigger the save in the backend
      formData.append('save_to_db', 'true');
  
      const response = await axios.post('http://10.25.150.130:8000/images/', formData, { //heree
        headers: { 'Content-Type': 'multipart/form-data' },
      });
  
      if (response.data.saved_to_database) {
        setUid(response.data.uid); // Update the UID with the response from the backend
        setSaveMessage(`Image saved successfully with UID: ${response.data.uid}`);
      } else {
        setSaveMessage('Failed to save image.');
      }
    } catch (error) {
      console.error('Error saving image:', error.response || error.message);
      setSaveMessage('Error saving image.');
    }
  };
  

  const handleModelToggle = (model) => {
    if (openedModels.includes(model)) {
      setOpenedModels(openedModels.filter((m) => m !== model)); 
    } else {
      setOpenedModels([...openedModels, model]); 
    }
  };

  const getDisplayedClassification = () => {
    if (!classification) return "Likely AI-generated";
    return classification;
  };

  const getDisplayedPercentage = () => {
    if (!classification) return "100%";
    return classification === 'Likely Human-Created' ? realGeneratedProbability : aiGeneratedProbability;
  };

  // Determine which data to show in the dropdown: default diffusionData if no image, else backend data
  const dropdownData = !previewURL ? diffusionData : (allModelResults || diffusionData);

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
            onClick={(e) => e.stopPropagation()} 
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

        <div className='flex flex-col mt-10 mx-12 980px:flex-row'>
            <div className='flex flex-col w-full 980px:mx-12'>
                <animated.p
                    className="flex-wrap text-6xl font-inter font-extrabold text-blue-100"
                    style={{ ...slideIn }}
                    >
                    AI-generated artwork detector
                </animated.p>

                <animated.div
                    className="mt-20 mb-12 flex rounded-[1.5rem] bg-blue-300 w-full p-8 shadow-md"
                    style={{ ...fadeIn }}
                    >
                  <input
                    type="file"
                    id="button-upload"
                    onChange={handleChange}
                    ref={hiddenFileInput}
                    style={{ display: 'none' }}
                  />
                    {previewURL ? (
                      <div className="flex">
                        <button
                          onClick={handleClick}
                          className="w-full h-full focus:outline-none"
                          style={{ border: 'none', background: 'none', padding: 0 }}
                        >
                          <img
                            src={previewURL}
                            alt="Uploaded Preview"
                            className="rounded-md cursor-pointer"
                            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                          />
                          <p className="mt-2 text-sm text-center text-gray-500">
                            Click on the image to upload another one
                          </p>
                        </button>
                      </div>
                    ) : (
                      <>
                        <animated.div
                          className="flex flex-col items-center justify-center w-full bg-white rounded-xl shadow-sm border-dotted border-4 border-blue-300"
                          style={{ ...fadeIn }}
                        >
                          <img
                            className="opacity-20 w-full justify-center"
                            src={images.monalisa}
                            alt="monalisa"
                            style={{ objectFit: 'contain' }}
                          />
                          <div className="absolute flex flex-col items-center text-center">
                            <label htmlFor="button-upload" className="cursor-pointer">
                              <button
                                className="h-20 w-20 flex items-center justify-center rounded-full shadow-mdfocus:outline-none"
                                style={{ objectFit: "contain" }}
                                onClick={handleClick}
                              >
                                <img
                                  className="h-15 w-15"
                                  src={images.upload}
                                  alt="upload"
                                  style={{ objectFit: "contain" }}
                                />
                              </button>
                            </label>
                            {/* <input
                              type="file"
                              id="button-upload"
                              onChange={handleChange}
                              ref={hiddenFileInput}
                              style={{ display: 'none' }}
                            /> */}
                            <p className="text-lg font-medium text-gray-700 mt-4">
                              Drag & drop files or{' '}
                              <span className="text-purple cursor-pointer hover:underline">
                                Browse
                              </span>
                            </p>
                            <p className="text-sm text-gray-500 mt-2">
                              Supported formats: JPEG, PNG, JPG
                            </p>
                          </div>
                        </animated.div>
                      </>
                    )}
                    </animated.div>
                                </div>


            <div className='flex flex-col items-center w-full'>
                <animated.div
                    className="min-h-[6rem] w-full bg-blue-200 rounded-xl shadow-sm flex flex-col items-center justify-center"
                    style={{ ...fadeIn }}
                    >

                    <div className="w-full bg-blue-200 rounded-t-xl p-2">
                        <animated.p
                        className="pl-3 mr-auto text-xl font-inter font-semibold text-gray-800"
                        style={{ ...fadeIn }}
                        >
                        Result (VGG16)
                        </animated.p>
                    </div>

                    <div className="relative flex flex-row items-center justify-between w-full bg-blue-300 px-6 py-4 rounded-b-xl shadow-inner">
                      {loading ? (
                        <div className="mx-auto w-10 h-10 border-4 border-gray-300 border-t-purple rounded-full animate-spin"></div>
                      ) : (
                        <>
                          {previewURL ? (
                            <>
                              <p className="text-lg font-bold text-black">
                                The image is:{' '}
                                <span
                                  className={`font-semibold ${
                                    classification === 'Likely Human-Created' ? 'text-green-600' : 'text-blue-400'
                                  }`}
                                >
                                  {getDisplayedClassification()}
                                </span>
                              </p>

                              <div
                                className={`flex flex-col items-center justify-center w-20 h-20 rounded-[1.5rem] ${
                                  classification === 'Likely Human-Created'
                                    ? 'bg-green-100 text-white'
                                    : 'bg-blue-400 text-white'
                                }`}
                              >
                                <p className='font-bold text-lg'>{getDisplayedPercentage()}</p>
                                <p className='font-normal text-sm'>AI Chance</p>
                              </div>
                            </>
                          ) : (
                            <>
                              <p className="text-lg font-bold text-black">
                                The image is: <span className="text-blue-400">Likely AI-generated</span>
                              </p>
                              <div className="flex flex-col items-center justify-center w-20 h-20 bg-blue-400 rounded-[1.5rem]">
                                <p className='text-white font-bold text-lg'>100%</p>
                                <p className='font-normal text-sm text-white'>AI Chance</p>
                              </div>
                            </>
                          )}
                        </>
                      )}
                    </div>

                </animated.div>

                {/** If real > 50%, show save button and saved message */}
                {!loading && previewURL && classification === 'Likely Human-Created' && (
                  <div className='mt-4'>
                    <button
                      onClick={handleSave}
                      className='ml-[60px] mr-10 mt-10 mb-[-25px] px-3 py-2 bg-green-100 text-white rounded-lg font-bold hover:bg-blue-500 transition-colors'
                    >
                      Save to Database
                    </button>
                    {saveMessage && (
                      <p className='mt-3 text-green-600 font-semibold'>
                         {saveMessage}
                      </p>
                    )}
                  </div>
                )}

                <animated.div
                  className="h-full mt-[3.0rem] w-full bg-blue-200 rounded-xl shadow-sm flex flex-col items-center justify-center"
                  style={{ ...fadeIn }}
                >
                  <div className="w-full bg-blue-200 rounded-t-xl p-2">
                    <animated.p
                      className="pl-3 mr-auto text-xl font-inter font-semibold text-gray-800"
                      style={{ ...fadeIn }}
                    >
                      Diffusion
                    </animated.p>
                  </div>

                  <div className="h-full relative flex flex-col items-center justify-center w-full bg-blue-300 px-6 py-4 rounded-b-xl shadow-inner">
                    {loading ? (
                      <div className="w-10 h-10 border-4 border-gray-300 border-t-purple rounded-full animate-spin"></div>
                    ) : (
                      <div className="flex flex-col space-y-6 w-full max-w-md">
                        {Object.keys(dropdownData).map((model) => (
                          <div key={model} className="w-full mb-4">
                            <button
                              className="w-full text-left p-4 bg-blue-400 text-white rounded-lg font-bold"
                              onClick={() => handleModelToggle(model)}
                            >
                              {model}
                            </button>
                            {openedModels.includes(model) && (
                              <div className="mt-2 bg-white rounded-lg p-4 shadow">
                                {Object.entries(dropdownData[model]).map(([label, value]) => {
                                  // Value could be a percentage string (from backend) or a number (from default diffusionData)
                                  let percentage = 0;
                                  let displayValue = '';
                                  if (typeof value === 'string' && value.endsWith('%')) {
                                    // Backend data format
                                    percentage = parseFloat(value);
                                    displayValue = value;
                                  } else {
                                    // Default diffusionData format (number)
                                    percentage = value * 100;
                                    displayValue = percentage.toFixed(1) + '%';
                                  }

                                  return (
                                    <div key={label} className="flex items-center space-x-4 mb-4">
                                      <span className="text-gray-800 w-2/5 text-left truncate">{label}</span>
                                      <div className="w-2/5 h-3 bg-gray-200 rounded-full relative">
                                        <div
                                          className="absolute top-0 left-0 h-full rounded-full"
                                          style={{
                                            width: `${percentage}%`,
                                            background: 'linear-gradient(to left, #fbbd1c, #ed4a8f)',
                                          }}
                                        ></div>
                                      </div>
                                      <span className="text-blue-600 font-semibold w-1/5 text-right">{displayValue}</span>
                                    </div>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </animated.div>
            </div>
        </div>
        
    </div>
  )
}

export default Detector