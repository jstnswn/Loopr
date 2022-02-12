import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createAlbumWithImages } from '../../store/dashboard';
import FileUploader from './FileUploader';

import './UploadAlbum.css';

export default function UploadAlbumForm({ closeModal }) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [files, setFiles] = useState(null)
  const [errors, setErrors] = useState([]);
  const [showErrors, setShowErrors] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      title,
      description,
      images: files
    };

    if (!errors.length) {

      return dispatch(createAlbumWithImages(payload))
        .then(() => closeModal(true));
    }

    setShowErrors(true);
  };

  useEffect(() => {
    setErrors([]);

    const errors = [];

    if (title.length > 30 || !title.length) {
      errors.push('Image title must be between 1 and 30 characters');
    }
    if (!files) {
      errors.push('Please select and image to upload');
    } else {
      const fileValues = Object.values(files);
      if (!fileValues.find(file => file.type === 'image/jpeg' || file.type === 'image/png')) {
        errors.push('Must select either .jpeg or .png file types')
      }
    }
    if (description.length > 300) {
      errors.push('Description must be less than 300 characters');
    }

    setErrors(errors);
  }, [title, description, files]);

  return (
    <form onSubmit={handleSubmit} className='upload-album-form'>
      <h2>Create New Album</h2>
      <ul>
        {showErrors && errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>
      <label>Title</label>
      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <label>Description (optional)</label>
      <textarea
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <label>Images(s)</label>
      <FileUploader setFiles={setFiles}/>
      {/* {files && files.map((index, file) =>(
        <input type='text' placeholder='song name'/>
      ))} */}
      <button>Create</button>
    </form>
  )
}
