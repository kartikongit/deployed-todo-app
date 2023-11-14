import { useState } from 'react'

import { useCookies } from 'react-cookie'

const Auth = () => {

  const [ cookies, setCookie]= useCookies(null)

  const [error , setError]= useState(null);
  const [ isLogIn, setLogin]= useState(false);


  const [ email , setEmail] = useState(null);
  const [ password, setPassword]= useState(null);
  const [ confirmPassword, setConfirmPassword]= useState(null);

  console.log(cookies)

  console.log(email, password, confirmPassword)

  function modify(boolean){
    setLogin(boolean)
  }

  async function handleSubmit(event, endPoint){
    event.preventDefault()

    if(!isLogIn && password !== confirmPassword){
      setError('your passwords do not match')
      return
    }

    const response = await fetch(`${process.env.REACT_APP_SERVERURL}/${endPoint}`,{
      method: 'POST',
      headers:{ 'Content-Type':'application/json'},
      body: JSON.stringify({email, password})
    })

    const parsedData = await response.json()
    console.log(parsedData)

    if(parsedData.detail){
      setError(parsedData.detail)
    }
    else{
      setCookie('Email',parsedData.email);
      setCookie('AuthToken', parsedData.token)
      
      window.location.reload()
    }
  }





  return (
    <div className="auth-container">
      <div className="auth-container-box">

        <form action="">
          <h2>{isLogIn ? 'Please log in !':'Sign up here !'}</h2>
          <input 
            type="email" 
            placeholder="enter email"
            onChange={(event)=>{ setEmail(event.target.value) }}
            />
          <input 
            type="password" 
            placeholder="password"
            onChange={(event)=>{ setPassword(event.target.value)}}
          />

          {!isLogIn && <input type="password" placeholder="confirm password" onChange={(event)=>{ setConfirmPassword(event.target.value)}}/>}
          
          <input 
            type="submit"
            className="addTask"
            onClick={(event)=>{handleSubmit(event,isLogIn?'login':'signup')}} 
          />
          {error && <p className="red">{error}</p>}
        </form>

        <div className="auth-options">
          <button 
          onClick={()=>{modify(false)}}
          style={{backgroundColor: !isLogIn? 'rgb(10,10,10)' : 'rgb(188,188,188)'}}
          >Sign Up</button>
          <button 
          onClick={()=>{modify(true)}}
          style={{backgroundColor: isLogIn? 'rgb(10,10,10)' : 'rgb(188,188,188)'}}
          >Log In</button>
        </div>
      </div>

      
    </div>
  )
}

export default Auth