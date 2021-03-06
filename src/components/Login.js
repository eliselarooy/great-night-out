import React from 'react';
import { useNavigate } from 'react-router-dom';

const initialLoginData = {
  email: '',
  password: '',
};

function Login() {
  const [loginData, setLoginData] = React.useState(initialLoginData);
  const navigate = useNavigate();

  function handleChange(e) {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const storedLoginDetails = localStorage.getItem('loginDetails');
    const loginDetails = JSON.parse(storedLoginDetails);
    if (
      loginData.email === loginDetails.email &&
      loginData.password === loginDetails.password &&
      loginDetails.email !== '' &&
      loginDetails.password !== ''
    ) {
      navigate('/welcome');
    } else {
      window.alert('Email or Password do not match. Try again!');
    }
  }
  return (
    <section className='section login'>
      <div className='container'>
        <div className='columns'>
          <form className='box column is-half is-offset-one-quarter'>
            <div className='field'>
              <label className='label'>Email</label>
              <div className='control'>
                <input
                  className='input'
                  placeholder='Email'
                  name='email'
                  onChange={handleChange}
                  value={loginData.email}
                />
              </div>
            </div>
            <div className='field'>
              <label className='label'>Password</label>
              <div className='control'>
                <input
                  type='password'
                  className='input'
                  placeholder='Password'
                  name='password'
                  onChange={handleChange}
                  value={loginData.password}
                />
              </div>
            </div>
            <div className='field'>
              <button
                type='submit'
                className='button is-fullwidth is-primary'
                onClick={handleSubmit}
              >
                Log Me In!
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Login;
