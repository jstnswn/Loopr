import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createAlbumWithImages, postAlbum } from '../../store/dashboard';
import FileUploader from './FileUploader';

import './UploadAlbum.css';

export default function UploadAlbumForm({ closeModal }) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [files, setFiles] = useState(null)
  const [errors, setErrors] = useState([]);
  const [showErrors, setShowErrors] = useState(false);

  const darkModeOn = useSelector(({ session }) => session.darkMode);

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      albumTitle: title,
      description,
      // images: files
    };

    if (!errors.length) {

      if (files) {
        payload.images = files;
        return dispatch(createAlbumWithImages(payload))
        .then(() => closeModal(true));
      }

      return dispatch(postAlbum(payload))
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

    if(files) {
      const fileValues = Object.values(files);
      if (fileValues.find(file => file.type !== 'image/jpeg' && file.type !== 'image/png')) {
        errors.push('Must select either .jpeg or .png file types')
      }
    }

    if (description.length > 300) {
      errors.push('Description must be less than 300 characters');
    }

    setErrors(errors);
  }, [title, description, files]);

  return (
    <form onSubmit={handleSubmit} className='upload-album-form form' id={darkModeOn ? 'dark-background' : ''}>
      <h2>Create New Album</h2>
      {showErrors && (
        <ul>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
      )}
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
