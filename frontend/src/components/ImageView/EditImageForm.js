import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { a } from 'react-spring';
import { getUserAlbumsArray, updateImage } from '../../store/dashboard';
import './EditImageForm.css';

export default function EditImageForm({ image, setShowEdit }) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState(image.title);
  const [albumTitle, setAlbumTitle] = useState('');
  const [newAlbumOption, setNewAlbumOption] = useState(false);
  const [albumId, setAlbumId] = useState(image.Album.id);
  const [description, setDescription] = useState(image.description || '');
  const [errors, setErrors] = useState([]);
  const [showErrors, setShowErrors] = useState(false);

  const userAlbums = useSelector(getUserAlbumsArray);
  const darkModeOn = useSelector(({ session }) => session.darkMode);

  useEffect(() => {
    const errors = [];

    if (title.length > 30 || !title.length) {
      errors.push('Image title must be between 1 and 30 characters');
    }
    if (description.length > 300) {
      errors.push('Description must be less than 300 characters');
    }
    if (newAlbumOption && !albumTitle.length) {
      errors.push('Album title must be between 1 and 30 characters');
    }
    if (albumId === '--Select an Album--') {
      errors.push('Please select an album for your image');
    }

    setErrors(errors);
  }, [title, albumTitle, albumId, description, newAlbumOption])

  useEffect(() => {
    if (newAlbumOption) return;
    if (albumId === '-Create New Album-') setNewAlbumOption(true);
  }, [albumId, newAlbumOption])

  let albumOption;
  if (newAlbumOption) {
    albumOption = (
      <>
        <label>New Album</label>
        <input
          value={albumTitle}
          onChange={e => setAlbumTitle(e.target.value)}
        />
      </>
    )
  } else {
    albumOption = (
      <>
        <label>Select an Album</label>
        <select
          value={albumId}
          onChange={e => setAlbumId(e.target.value)}
        >
          <option>-Select an Album-</option>
          {userAlbums?.map(album => (
            <option value={album.id} key={album.id}>{album.title}</option>
          ))}
          <option>-Create New Album-</option>

        </select>
      </>
    )
  }

  const handleCancle = (e) => {
    setShowEdit(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      imageId: image.id,
      title,
      description,
      originalImage: image
    };

    if (newAlbumOption) payload.albumTitle = albumTitle;
    else payload.albumId = albumId;

    if (!errors.length) {
      return dispatch(updateImage(payload))
      .then(() => setShowEdit(false))
    }
    setShowErrors(true);
      // .catch(async (res) => {
      //   // const data = await res.json();
      //   // if (data && data.errors) setErrors(data.errors);
      //   setShowErrors(true);
      // });
  };

  return (
    <>
    <form
      className='edit-image-form'
      id={darkModeOn ? 'dark-background' : ''}
      onSubmit={handleSubmit}
      >
      <h2>Edit Image</h2>
      <ul>
        {showErrors && errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>
      <label>Title</label>
      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      {albumOption}
      <label>Description</label>
      <textarea
        value={description}
        onChange={e => setDescription(e.target.value)}
        onFocus={e => e.target.style.height = '50px'}
        onBlur={e => e.target.style.height = '30px'}
      />
      <div className='edit-form-buttons'>
        <button className='submit' type='submit'>Submit</button>
        <div></div>
        <button className='cancel' onClick={handleCancle}>Cancel</button>
      </div>
    </form>

        </>
  )
}
