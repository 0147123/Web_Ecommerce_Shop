import { useState, useRef, useEffect } from 'react'
import Header from '../../components/header'
import './index.css'


const Login = () => {
  const userRef = useRef()
  const errRef= useRef()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [err, setErr] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    userRef.current.focus()
  }, [])

  useEffect(() => {
    setErr('')
  }, [email, password])

  const handleSubmit = async (e) => {
    e.preventDefault()

  }

  return (
    <>
      <Header/>
      <div id='login-input-layout-container'>
        <form id='login-box' onSubmit={(e) => handleSubmit(e)}>
          <h1>Login</h1>
          <input 
            className='login-display-column' 
            type='text' 
            value={email} 
            name='email'
            ref={userRef} 
            pattern='^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$'
            placeholder='Email'
            onChange={(e) => setEmail(e.target.value)} 
            required
          />
          <input 
            className='login-display-column' 
            type='password' 
            name='password'
            value={password} 
            placeholder='Password' 
            onChange={(e) => setPassword(e.target.value)} 
            required
          />
          {/* <input className='login-display-column' type='password' placeholder='Password'></input> */}
          <p ref={errRef} className={err ? "err-msg" : "offscreen"}>{err}</p>

          <button id='login-page-login-button'>Login</button>
        </form>
      </div>
    </>
  )
}

export default Login