import React from 'react';

import './Selector.css'

export default function Selector({ setKey }) {
  return (
    <div className='splash-selector-container'>
      {new Array(3).fill('x').map((val, idx) => (
        <div
          key={idx}
          className='splash-album-selector'
          onClick={() => setKey(idx + 1)}
        >
          dfadfa
        </div>
      ))}

    </div>
  )
}
