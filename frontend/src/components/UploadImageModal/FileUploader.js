import React, { useRef } from 'react';

export default function FileUploader({ setFile }) {
  const handleFileInput = (e) => {
    const file = e.target.files[0];
    setFile(file);
  };

  return (
    <div>
      <input
        type='file'
        onChange={handleFileInput} />
    </div>
  )
}
