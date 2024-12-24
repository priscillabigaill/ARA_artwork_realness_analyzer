# Use official Python image as base
FROM python:3.11-slim

# Set the working directory
WORKDIR /app

# Copy requirements.txt (make sure to create it if not already there)
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application files
COPY . .

# Expose the port FastAPI will run on (default is 8000)
EXPOSE 8000

# Run FastAPI using Uvicorn
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
