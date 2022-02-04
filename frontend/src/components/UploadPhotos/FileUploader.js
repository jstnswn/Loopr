import React, { useRef } from 'react';

export default function FileUploader({ selectFile }) {
  // const fileInput = useRef(null);

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    // console.log('e.target.files[0]: ', e.target.files[0]);
    console.log('file: ', file);
    selectFile(file);
  };

  return (
    <div>
      <input type='file' onChange={handleFileInput} />
      {/* <button onClick={e => fileInput.current && fileInput.current.click()}></button> */}
    </div>
  )
}
