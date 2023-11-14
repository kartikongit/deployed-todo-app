import { useState } from 'react'

import { useCookies } from 'react-cookie'

const Modal = ({ Mode, setModal, task, getData}) => {

  const [ cookies, setCookie, removeCookie ]= useCookies(null);

  const editMode= Mode ==="edit" ? true: false


  const [data, setData]= useState({
    user_email: editMode ? task.user_email :cookies.Email,
    title: editMode ? task.title: "",
    progress: editMode ? task.progress : 50,
    date: editMode ?task.date: new Date()
  })


  const postData= async (event)=> {

    event.preventDefault()

    try{
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos`, {
        method:"POST",
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(data)
      }) 

      if(response.status === 200){
        console.log('WORKED')
        setModal(false)
        getData()
      }

    }
    catch(error){
      console.log(error)
    }
  }



  const editData= async (event)=>{
    event.preventDefault()

    try{
      const response= await fetch(`${process.env.REACT_APP_SERVERURL}/todos/${task.id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body:JSON.stringify(data)
      })

      if(response.status===200){
        setModal(false);
        getData()
      }
    }
    catch(error){
      console.error(error);
      getData
    }
  }

  function handleChange(event){
    console.log("changing");
    console.log(event)

    const {name, value}= event.target;

    setData(
      (data)=>{
        return {
          ...data,
          [name]:value
        }
      }
    )
  }

  

 
  return (
    <div className="overlay">
      <div className="modal">
        <div className="form-title-container">
          <h3>you can add your task</h3>
          <button onClick={()=>{setModal(false)}}>X</button>
        </div>

        <form action="">
          <input 
          required 
          maxLength={30}
          placeholder=" your task goes here"
          name="title"
          value={data.title}
          onChange={handleChange}
          />
          <br/>
          <label htmlFor="range">
            Drag to select your current progress
          </label>
          <input 
          id="range"
          required
          type="range"
          min="10"
          max="100"
          name="progress"
          value={data.progress}
          onChange={handleChange}
          />
          <input
           type="submit"
           className="edit"
           onClick={ editMode ? editData:postData}

          />
        </form>
        

      </div>
    </div>
  )
}

export default Modal