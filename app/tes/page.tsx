'use client'
import React, { useState, ChangeEvent, FormEvent } from 'react';

const UploadForm: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append('image_file', file);

    try {
      const response = await fetch('https://optiscan-backend.onrender.com/classify/file/', {
        method: 'POST',
        body: formData,
      });
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleFileChange} />
      <button type="submit">Upload</button>
    </form>
  );
};

export default UploadForm;