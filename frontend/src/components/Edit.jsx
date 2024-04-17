import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from 'react-router-dom';
import { Input ,Select} from '@chakra-ui/react'
import {useNavigate} from 'react-router-dom'
import { useToast } from "./Toast";
export const Edit = () => {
    const { id } = useParams();
    const triggerToast = useToast();
  const navigate=useNavigate();
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        age: "",
        gender:"",
        email: "",
        phone:"",
        department:""

    })

    useEffect(() => {
        if (id) {
            // Fetch user details by id and set them in the state
            axios.get(`https://dbjsonlive.onrender.com/users/${id}`)
                .then((res) => setUser(res.data))
                .catch((err) => console.log(err));
        }
    }, [id]);

    const handleEdit = (e) => {
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
        try {
            axios.patch(`https://dbjsonlive.onrender.com/users/${id}`,user)
                .then((res) => {triggerToast({ 
                    id,
                    title: "Updated",
                    description: `Id: ${id} Updated Successfully`,
                    status: "success"
                });
                navigate('/') })
                .catch((err) => console.log(err));
        }
        catch (err) {
            console.log('error while updating data');
        }
    }
    console.log(user);
    return (
        <div className='addForm'>
            <h3>Update Details of UserId : {id}  Here or <Link to="/"><button>Go Back</button></Link></h3>
            <form onSubmit={handleEdit}>
                <Input type="text" value={user.firstName} placeholder='Enter First Name' onChange={(e) => { setUser({ ...user, firstName: e.target.value }) }} />
                <Input type="text" value={user.lastName} placeholder='Enter Last Name' onChange={(e) => { setUser({ ...user, lastName: e.target.value }) }} />
                <Select onChange={(e) => { setUser({ ...user, gender: e.target.value }) }}>
                    <option > {user.gender}</option>
                    <option value='Male'>Male</option>
                    <option value='Female'>Female</option>
                    <option value='Others'>Others</option>
                </Select><Input type="text" value={user.age} placeholder='Enter Age' onChange={(e) => { setUser({ ...user, age: e.target.value }) }} />
                <Input type="email" value={user.email} placeholder='Enter Email' onChange={(e) => { setUser({ ...user, email: e.target.value }) }} />
                <Input type="number" value={user.phone} placeholder='Enter Phone' onChange={(e) => { setUser({ ...user, phone: e.target.value }) }} />
                <Select onChange={(e) => { setUser({ ...user, department: e.target.value }) }}>
                    <option >{user.department}</option>
                    <option value='Services'>Services</option>
                    <option value='Marketing'>Marketing</option>
                    <option value='Business Development'>Business Development</option>
                    <option value='Support'>Support</option>
                    <option value='Accounting'>Accounting</option>
                    <option value='Product Management'>Product Management</option>
                    <option value='Human Resources'>Human Resources</option>
                </Select>
                <input type='submit' value="Update User" className="edit"/>
            </form>
        </div>
    )
}
