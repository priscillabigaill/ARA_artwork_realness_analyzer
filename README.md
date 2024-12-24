# Artwork Realness Analyzer (ARA) - README

### Overview

[![Demo Video](https://img.shields.io/badge/Demonstration-Watch-red?logo=youtube)](https://drive.google.com/file/d/1om_wak-1qNQLcwWmGwwj_UemR5U6fOZd/view?usp=sharing)
[![Research Paper](https://img.shields.io/badge/Paper-Read-blue?logo=microsoft-word)](https://drive.google.com/file/d/1pZi8pOsQIxEG_IsNPTFlsLk030lvZheV/view?usp=sharing)
[![PPT](https://img.shields.io/badge/PowerPoint-Read-yellow?logo=microsoft-powerpoint)](https://drive.google.com/file/d/1gu5BqYQ-8EJfXmNrTo7DhvDoUzlPzq39/view?usp=sharing)

The **Artwork Realness Analyzer (ARA)** is a web application designed to detect whether an artwork is AI-generated or human-created. With the rapid rise of AI-generated content, particularly in the field of digital art, it has become increasingly difficult to distinguish between artwork created by humans and those generated by AI models. ARA provides a solution to this problem using deep learning models, which classify images into five categories: **Real**, **DALL-E**, **Flux**, **MidJourney**, and **Stable Diffusion**.

ARA is built using a combination of Convolutional Neural Networks (CNNs), specifically the models ResNet-50, MobileNetV3-Small, EfficientNetV2-B0, VGG-9, and VGG-16, trained on a dataset that includes AI-generated art from popular tools like DALL-E, Flux, MidJourney, and Stable Diffusion. ARA is a React-based web application that allows users to upload and verify artworks. Verified human-created artworks can also be stored in a database, which others can search by its Unique Identifier (UID) to authenticate the artwork’s originality.

### Features

- **Classification**: The application classifies images into five categories—**Real**, **DALL-E**, **Flux**, **MidJourney**, and **Stable Diffusion**—using a variety of CNN models.
- **Authentication**: Upload and store verified human-created artworks in the system, allowing others to verify their authenticity using a UID search.
- **Data Insights**: Detailed reports on image classification results, including diffusion classes and model performance.

### Architecture

The web application follows a modern architecture:

- **Frontend**: Built with ReactJS and Vite. It uses Axios to communicate with the backend.
- **Backend**: Developed using FastAPI on Uvicorn to handle image processing and database interactions.
- **Database**: Supabase is used to store the metadata of verified artworks, including UID and authentication dates, while images are stored in Supabase Buckets.
- **Deployment**: The application is containerized using Docker and deployed for internal access through Docker Compose.

### Models Used

ARA employs five CNN models for image classification:

1. **ResNet-50**: A deep residual network that utilizes residual blocks for improved training and performance.
2. **MobileNetV3-Small**: An efficient model designed for mobile devices, optimized for speed and low resource usage.
3. **EfficientNetV2-B0**: A model that adapts image size and regularization during training to achieve faster training and better parameter efficiency.
4. **VGG-9**: A simplified version of the VGG network with 9 layers.
5. **VGG-16**: A deeper VGG network with 16 layers, known for its high accuracy and ability to extract complex features from images.

Among these, **VGG-16** has shown the best performance, with a validation and test accuracy of 97%.

### Dataset

The dataset used for training consists of 69,687 images across five categories:

- **Real**: Human-created artworks sourced from WikiArt and Kaggle datasets.
- **DALL-E**: AI-generated images from a community dataset on Hugging Face.
- **Flux**: AI-generated images from the Civitai dataset.
- **MidJourney**: AI-generated images from a Kaggle dataset.
- **Stable Diffusion**: AI-generated images from a Kaggle dataset.

The images have been preprocessed with normalization, data augmentation (rotation, zooming, flipping), and split into training, validation, and test datasets.

### Methodology

The training of the models was carried out on a remote Linux host with an Nvidia RTX 3090 GPU. Each model was fine-tuned for 100 epochs, and early stopping and learning rate reduction were applied to prevent overfitting. The models were evaluated based on training accuracy, test accuracy, validation accuracy, loss values, and confusion matrices.

### Evaluation Metrics

- **Training Accuracy**: Measures the accuracy of the model on the training dataset.
- **Test Accuracy**: Measures the accuracy of the model on unseen test data.
- **Validation Accuracy**: Measures the model’s performance on a validation dataset during training.
- **Confusion Matrix**: Summarizes the classification results, displaying true positives, false positives, true negatives, and false negatives.

## Human Detection Evaluation

A survey was conducted to evaluate the ability of human participants to distinguish between AI-generated and human-created artworks. The results indicated that human detection of AI-generated artworks is challenging, with an average score of 58.64 out of 100, just above random guessing. This highlights the need for an automated solution like ARA.

## Installation

To run the ARA web application locally, follow these steps:

1. **Clone the repository**:
   ```
   git clone https://github.com/priscillabigaill/ARA.git
   ```

2. **Install the dependencies**:
   - Navigate to the frontend directory:
     ```
     cd frontend
     npm install
     ```
   - Install backend dependencies:
     ```
     cd backend
     pip install -r requirements.txt
     ```

3. **Run the frontend**:
   ```
   npm run dev
   ```

4. **Run the backend**:
   ```
   uvicorn app.main:app --reload
   ```

5. **Access the application**:
   - Open your browser and go to `http://localhost:5173` for the frontend.
   - Backend APIs can be accessed at `http://localhost:8000`.

