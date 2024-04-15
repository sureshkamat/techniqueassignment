import React, { useState } from 'react'
import axios from 'axios'
import { Input } from '@chakra-ui/react'
export const Add = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    age: "",
    gender:"",
    email: "",
    phone:"",
    department:""

})

const handleData=(e)=>{
    e.preventDefault();
    if (!user.firstName || !user.lastName || !user.age || !user.gender|| !user.email || !user.department || !user.phone) {
      alert('Please fill in all required fields');
      return;
  }
    console.log(user);
    axios.post(`http://localhost:8080/users`,user)
    .then((res)=>{
      console.log(res);
      alert("User Added Successfully");
      
    })
    .catch((err)=>console.log(err))
}
  return (
    <div className='addForm'>
      <form onSubmit={handleData}>
                <Input type="text"  placeholder='Enter First Name' onChange={(e) => { setUser({ ...user, firstName: e.target.value }) }} />
                <Input type="text"  placeholder='Enter Last Name' onChange={(e) => { setUser({ ...user, lastName: e.target.value }) }} />
                <Input type="text"  placeholder='Enter Gender' onChange={(e) => { setUser({ ...user, gender: e.target.value }) }} />
                <Input type="text"  placeholder='Enter Age' onChange={(e) => { setUser({ ...user, age: e.target.value }) }} />
                <Input type="text"  placeholder='Enter Email' onChange={(e) => { setUser({ ...user, email: e.target.value }) }} />
                <Input type="text"  placeholder='Enter Phone' onChange={(e) => { setUser({ ...user, phone: e.target.value  }) }} />
                <Input type="text"  placeholder='Enter Department' onChange={(e) => { setUser({ ...user, department: e.target.value }) }} />
                <input type='submit' value="Add User" className="Add"/>
            </form>
        
    </div>
  )
}
