import React, { useState } from 'react';
import axios from 'axios';

import './UploadPhotos.css'
import FileUploader from './FileUploader';
import { csrfFetch } from '../../store/csrf';

export default function UploadPhotos() {
  const [name, setName] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('image', selectedFile);
    // console.log('formData: ', formData)
    console.log('selectedFile: ', selectedFile)

    for (let pair of formData.entries()) {
      console.log('PAIRS: ', pair[0] + ', ' + pair[1]);
    }
    // console.log('selected file', selectedFile)

    // const post = await axios.post('/api/hey', formData, {
    //   headers: {
    //     'Content-Type': 'multipart/form-data'
    //   }
    // });

    // const axiosPost = await axios.post('/api/hey', {hey: 'there'})

    // const fetchPost = await fetch('/api/hey', {
    //   method: 'POST',
    //   body: JSON.stringify({hey: 'there'}),
    //   headers: {'Content-Type': 'application/json'}
    // });

    const csrfPost = await csrfFetch('/api/photo-upload-test', {
      method: 'POST',
      body: formData,
      headers: { 'Content-Type': 'multipart/form-data' }
    })

    // console.log('post: ', post)

  };

  return (
    <div>
      <form className='upload-photos-form' onSubmit={handleSubmit}>
        <input
          type='text'
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <FileUploader
          selectFile={file => setSelectedFile(file)}
        />
        <button>Submit</button>
      </form>
    </div>
  );
}
