import React from 'react';

export default function FileUploader({ setFiles }) {
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
