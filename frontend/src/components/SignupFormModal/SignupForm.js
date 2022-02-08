import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { createUser, signup } from "../../store/session";

import './SignupForm.css';

export default function SignupForm() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [image, setImage] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to='/' />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(createUser({ email, username, image, password }))
        .catch(async (res) => {
          const data = await res.json();
          console.log('data errors: ', data.errors);
          if (data && data.errors) setErrors(data.errors);
        });
    }
    return setErrors(['Password and Confirm Password do not match']);
  };

  const updateFile = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file);
  };

  return (
    <form className='signup-form' onSubmit={handleSubmit}>
      <ul>
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>
      <label>Username</label>
      <input
        type='text'
        value={username}
        onChange={e => setUsername(e.target.value)}
        required
      />
      <label>Email</label>
      <input
        type='text'
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />
      <label>Password</label>
      <input
        type='password'
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />
      <label>Confirm Password</label>
      <input
        type='password'
        value={confirmPassword}
        onChange={e => setConfirmPassword(e.target.value)}
        required
      />
      <label>Profile Image (optional)</label>
      <input type='file' onChange={updateFile}/>
      <button type='submit'>Sign Up</button>
    </form>
  );
};
