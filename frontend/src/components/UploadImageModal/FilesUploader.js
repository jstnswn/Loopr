import React from 'react';

export default function FilesUploader({ setFiles }) {
  return (
    <>
      <input
        className='upload'
        type='file'
        multiple
        onChange={e => setFiles(e.target.files)}
      />
    </>
  )
}
