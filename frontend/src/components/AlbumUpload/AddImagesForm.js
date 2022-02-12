import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import Select from 'react-select';
import { postImages } from '../../store/dashboard';
import './AddImagesForm.css'
import FileUploader from './FileUploader';

export default function AddImagesForm({ album, closeAdd }) {
  const dispatch = useDispatch();
  // const [multiValue, setMultiValue] = useState({ option: [] });
  const [files, setFiles] = useState(null);
  const [errors, setErrors] = useState([]);
  const [showErrors, setShowErrors] = useState(false);

  useEffect(() => {
    setErrors([]);
    const errors = [];



    if (!files) errors.push('Please select image files to upload');
    else {
      const fileValues = Object.values(files);
      if (!fileValues.find(file => file.type === 'image/jpeg' || file.type === 'image/png')) {
        errors.push('Must select either .jpeg or .png file types')
      }
    }
    // if ()

    setErrors(errors);
  }, [files])

  const handleSubmit = (e) => {
    e.preventDefault();



    // console.log('files: ', Object.values(files).find(file => file.type === 'image/jpeg'))

    if (!errors.length) {
      return dispatch(postImages(files, album.id))
        .then(() => closeAdd());
    }

    setShowErrors(true);
  };

  return (
    <form onSubmit={handleSubmit} className='add-images-form'>
      <h2>Select Images to Add</h2>
      {showErrors && errors.map((error, idx) => <li key={idx}>{error}</li>)}
      <FileUploader setFiles={setFiles}/>
      <button>Add Images</button>
    </form>
  )
}
