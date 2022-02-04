import React, { useState } from 'react';
import axios from 'axios';

import './UploadPhotos.css'
import FileUploader from './FileUploader';

export default function UploadPhotos() {
  const [name, setName] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('file', selectedFile);
    console.log('formData: ', {formData})

    // for (let pair of formData.entries()) {
    //   console.log(pair[0] + ', ' + pair[1]);
    // }
    // console.log('selected file', selectedFile)
    const post = await axios.post('/api/hey', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    console.log('post: ', post)

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
