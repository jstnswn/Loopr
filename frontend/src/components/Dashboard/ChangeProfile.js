import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { updateUserImage } from '../../store/session';
import './ProfilePicForm.css';

export default function ChangeProfile() {
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState([]);
  const [showErrors, setShowErrors] = useState(false);

  useEffect(() => {
    setErrors([]);
    const errors = [];

    if (!image) errors.push('Please select an image to upload');

    setErrors(errors);
  }, [image])

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!errors.length) {
      return dispatch(updateUserImage(image))
    }

    setShowErrors(true);
  };


  return (
    <form onSubmit={handleSubmit} className='profile-pic-form'>
      <ul>
        {showErrors && errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>
      <label>Select a new profile image</label>
      <input
        type='file'
        onChange={e => setImage(e.target.files[0])}
      />
      <button>Submit</button>
    </form>
  )
}
