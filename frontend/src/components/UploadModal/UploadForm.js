import React, { useState, useEffect } from 'react';

import './UploadPhotos.css'
import FileUploader from './FileUploader';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAlbumsArray, postImage } from '../../store/dashboard';


export default function UploadForm({ closeModal }) {
  const dispatch = useDispatch();
  const [imageTitle, setImageTitle] = useState('');
  const [albumTitle, setAlbumTitle] = useState('');
  const [newAlbumOption, setNewAlbumOption] = useState(false);
  const [description, setDescription] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [albumId, setAlbumId] = useState('--Select an Album--');
  const [errors, setErrors] = useState([]);
  const [showErrors, setShowErrors] = useState(false);

  const userAlbums = useSelector(getUserAlbumsArray);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      title: imageTitle,
      description,
      imageFile: selectedFile,
    };
    if (newAlbumOption) payload.albumTitle = albumTitle;
    else payload.albumId = albumId;


    return dispatch(postImage(payload))
    .then(() => closeModal())
    .catch(() => setShowErrors(true))
  };

  useEffect(() => {
    const errors = [];

    if (imageTitle.length > 30 || !imageTitle.length) {
      errors.push('Image title must be between 1 and 30 characters');
    }
    if (!selectedFile) {
      errors.push('Please select and image to upload');
    }
    if (newAlbumOption && !albumTitle.length) {
      errors.push('Album title must be between 1 and 30 characters');
    }
    if (albumId === '--Select an Album--') {
      errors.push('Please select an album for your image');
    }

    setErrors(errors);

  }, [imageTitle, albumTitle, selectedFile, newAlbumOption, albumId])

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

  return (
    <div>
      <form className='upload-photos-form' onSubmit={handleSubmit}>
        <ul>
          {showErrors && errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
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
        {albumOption}
        <FileUploader
          selectFile={file => setSelectedFile(file)}
        />
        <button>Submit</button>
      </form>
    </div>
  );
}
