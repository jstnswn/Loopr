import React, { useState, useEffect } from 'react';

import './UploadPhotos.css'
import FileUploader from './FileUploader';
import { useDispatch, useSelector } from 'react-redux';
import { createAlbumWithImages, getUserAlbumsArray, postImage, postImages } from '../../store/dashboard';
import FilesUploader from './FilesUploader';


export default function UploadImageForm({ closeModal }) {
  const dispatch = useDispatch();
  const [imageTitle, setImageTitle] = useState('');
  const [uploadOption, setUploadOption] = useState('single');
  const [albumTitle, setAlbumTitle] = useState('');
  const [newAlbumOption, setNewAlbumOption] = useState(false);
  const [description, setDescription] = useState('');
  const [files, setFiles] = useState(null);
  const [albumId, setAlbumId] = useState('--Select an Album--');
  const [errors, setErrors] = useState([]);
  const [showErrors, setShowErrors] = useState(false);

  const userAlbums = useSelector(getUserAlbumsArray);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (errors.length) {
      setShowErrors(true)
      return
    }

    const payload = {
      title: imageTitle,
      description,
    };

    if (newAlbumOption) payload.albumTitle = albumTitle;
    else payload.albumId = albumId;

    if (newAlbumOption) {
      payload.albumTitle = albumTitle;

      if (uploadOption === 'single') {
        payload.imageFile = files[0];
        return dispatch(postImage(payload))
          .then(() => closeModal());
      } else {
        payload.images = files
        return dispatch(createAlbumWithImages(payload))
          .then(() => closeModal());
      }

    } else {
      payload.albumId = albumId;
      if (uploadOption === 'single') {
        payload.imageFile = files[0];
        return dispatch(postImage(payload))
          .then(() => closeModal());
      } else {
        payload.images = files
        return dispatch(postImages(files, albumId))
          .then(() => closeModal());
      }
    }
  };

  useEffect(() => {
    console.log('upload option: ', uploadOption)
    setErrors([]);

    const errors = [];

    if (uploadOption === 'single') {
      if (imageTitle.length > 30 || !imageTitle.length) {
        errors.push('Image title must be between 1 and 30 characters');
      }
      if (description.length > 300) {
        errors.push('Description must be less than 300 characters');
      }
    }

    if (!files) {
      errors.push('Please select and image to upload');
    } else {
      const fileValues = Object.values(files);
      console.log("fileValuesL ', ", fileValues);
      if (fileValues.find(file => file.type !== 'image/jpeg' && file.type !== 'image/png')) {
        errors.push('Must select either .jpeg or .png file types')
      }
    }
    if (newAlbumOption && !albumTitle.length) {
      errors.push('Album title must be between 1 and 30 characters');
    }
    if (albumId === '--Select an Album--') {
      errors.push('Please select an album for your image');
    }

    setErrors(errors);

  }, [imageTitle, albumTitle, files, newAlbumOption, albumId, description, uploadOption])

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

  // let formOption;
  // if (uploadOption === 'single') {
  //   formOption = (
  //     <>
  //       <label>Image Title</label>
  //       <input
  //         type='text'
  //         value={imageTitle}
  //         onChange={e => setImageTitle(e.target.value)}
  //       />
  //       <label>Description (optional)</label>
  //       <textarea
  //         value={description}
  //         onChange={e => setDescription(e.target.value)}
  //       />
  //       <FilesUploader setFiles={setFiles} />
  //     </>
  //   )
  // } else if (uploadOption === 'multi') {
  //   formOption = (
  //     <FilesUploader setFiles={setFiles}/>
  //   )
  // }

  return (
    <div>
      <form className='upload-images-form form' onSubmit={handleSubmit}>
        <ul>
          {showErrors && errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
        <div className='radio-container'>
          <label htmlFor='single'>Single Image</label>
          <input
            onChange={e => setUploadOption(e.target.value)}
            type='radio'
            name='single'
            value='single'
            checked={uploadOption === 'single' ? true : false}
          />
          <label htmlFor='multi'>Multiple Images</label>
          <input
            onChange={e => setUploadOption(e.target.value)}
            type='radio'
            name='multi'
            value='multi'
            checked={uploadOption === 'multi' ? true : false}
          />
        </div>
        {uploadOption === 'single' && (
          <>
            <label>Image Title</label>
            <input
              type='text'
              value={imageTitle}
              onChange={e => setImageTitle(e.target.value)}
            />
            <label>Description (optional)</label>
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
            {/* <FilesUploader setFiles={setFiles} /> */}
          </>

        )}
        <FilesUploader setFiles={setFiles} />
        {albumOption}
        <button>Submit</button>
      </form>
    </div>
  );
}
