import React, { useRef } from 'react';

export default function FileUploader({ selectFile }) {
  // const fileInput = useRef(null);

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    selectFile(file);
  };

  return (
    <div>
      <input type='file' onChange={handleFileInput} />
      {/* <button onClick={e => fileInput.current && fileInput.current.click()}></button> */}
    </div>
  )
}
