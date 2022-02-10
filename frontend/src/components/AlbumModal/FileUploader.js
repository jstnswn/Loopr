import React from 'react';

export default function FileUploader({ setFiles }) {
  return (
    <div>
      <input
        type='file'
        multiple
        onChange={e => setFiles(e.target.files)}
      />
    </div>
  )
}
