import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './UploadPhotos.css'
import FileUploader from './FileUploader';
import { csrfFetch } from '../../store/csrf';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAlbumsArray, postImages } from '../../store/dashboard';

export default function UploadForm() {
  const dispatch = useDispatch();
  const [imageTitle, setImageTitle] = useState('');
  const [albumTitle, setAlbumTitle] = useState('');
  const [newAlbumOption, setNewAlbumOption] = useState(false);
  const [description, setDescription] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [albumId, setAlbumId] = useState('--Select an Album--')

  // const dashboard = useSelector(({ dashboard }) => dashboard);
  // const userAlbums = dashboard.userAlbums;
  // const userAlbumsArray = Object.values(userAlbums);
  const userAlbums = useSelector(getUserAlbumsArray);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const formData = new FormData();
    // formData.append('title', imageTitle);
    // formData.append('description', description);
    // formData.append('image', selectedFile);
    // if (newAlbumOption) formData.append('albumTitle', albumTitle);
    // else formData.append('albumId', albumId);

    const payload = {
      title: imageTitle,
      description,
      imageFile: selectedFile,
    };
    if (newAlbumOption) payload.albumTitle = albumTitle;
    else payload.albumId = albumId;
    
    dispatch(postImages(payload));
  };

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
        {/* <select
          value={albumId}
          onChange={e => setAlbumId(e.target.value)}
        >
          <option>-Select an Album-</option>
          <option>-Create New Album-</option>

        </select> */}
        <FileUploader
          selectFile={file => setSelectedFile(file)}
        />
        <button>Submit</button>
      </form>
    </div>
  );
}
