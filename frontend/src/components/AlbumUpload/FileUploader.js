import React from 'react';

export default function FileUploader({ setFiles }) {
  return (
    <>
      <input
        type='file'
        multiple
        onChange={e => setFiles(e.target.files)}
      />
    </>
  )
}
