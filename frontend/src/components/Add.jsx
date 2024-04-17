import React, { useState } from 'react'
import axios from 'axios'
import { Input,Select } from '@chakra-ui/react'
import { useToast } from "./Toast";
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
const triggerToast = useToast();
const handleData = (e) => {
  e.preventDefault();
  
  // Age validation
  if (user.age <= 0) {
      triggerToast({
          title: "Error",
          description: "Age must be a positive number",
          status: "error"
      });
      return;
  }

  // Phone validation
  const phoneRegex = /^[0-9]{10}$/;
  if (!phoneRegex.test(user.phone)) {
      triggerToast({
          title: "Error",
          description: "Phone number must be 10 digits",
          status: "error"
      });
      return;
  }

  // Other required field validation
  if (!user.firstName || !user.lastName || !user.age || !user.gender || !user.email || !user.department || !user.phone) {
      triggerToast({
          title: "Error",
          description: "Please fill in all required fields",
          status: "error"
      });
      return;
  }

  axios.post(`https://dbjsonlive.onrender.com/users`, user)
      .then((res) => {
          triggerToast({
              title: "Added",
              description: `${res.data.id}: ${res.data.firstName} User Added Successfully`,
              status: "success"
          });
      })
      .catch((err) => {
          triggerToast({
              title: "Error",
              description: "Failed to add user",
              status: "error"
          });
          console.log(err);
      });
}
return (
    <div className='addForm'>
      <form onSubmit={handleData}>
                <Input type="text"  placeholder='Enter First Name' onChange={(e) => { setUser({ ...user, firstName: e.target.value }) }} />
                <Input type="text"  placeholder='Enter Last Name' onChange={(e) => { setUser({ ...user, lastName: e.target.value }) }} />
                <Select onChange={(e) => { setUser({ ...user, gender: e.target.value }) }}>
                    <option > Select Gender</option>
                    <option value='Male'>Male</option>
                    <option value='Female'>Female</option>
                    <option value='Others'>Others</option>
                </Select>
                <Input type="text"  placeholder='Enter Age' onChange={(e) => { setUser({ ...user, age: e.target.value }) }} />
                <Input type="email"  placeholder='Enter Email' onChange={(e) => { setUser({ ...user, email: e.target.value }) }} />
                <Input type="number"  placeholder='Enter Phone' onChange={(e) => { setUser({ ...user, phone: e.target.value  }) }} />
                <Select onChange={(e) => { setUser({ ...user, department: e.target.value }) }}>
                    <option value=''>Department</option>
                    <option value='Services'>Services</option>
                    <option value='Marketing'>Marketing</option>
                    <option value='Business Development'>Business Development</option>
                    <option value='Support'>Support</option>
                    <option value='Accounting'>Accounting</option>
                    <option value='Product Management'>Product Management</option>
                    <option value='Human Resources'>Human Resources</option>
                </Select>
                <input type='submit' value="Add User" className="Add"/>
            </form>
        
    </div>
  )
}
