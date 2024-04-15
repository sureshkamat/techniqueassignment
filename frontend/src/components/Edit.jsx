import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from 'react-router-dom';
import { Input } from '@chakra-ui/react'
import {useNavigate} from 'react-router-dom'
export const Edit = () => {
    const { id } = useParams();
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
            axios.get(`http://localhost:8080/users/${id}`)
                .then((res) => setUser(res.data))
                .catch((err) => console.log(err));
        }
    }, [id]);

    const handleEdit = (e) => {
        e.preventDefault();
        if (!user.firstName || !user.lastName || !user.age || !user.gender|| !user.email || !user.department || !user.phone) {
            alert('Please fill in all required fields');
            return;
        }
        try {
            axios.patch(`http://localhost:8080/users/${id}`,user)
                .then((res) => {alert(`UserId : ${id} is Updated Successfully`);navigate('/') })
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
                <Input type="text" value={user.gender} placeholder='Enter Gender' onChange={(e) => { setUser({ ...user, gender: e.target.value }) }} />
                <Input type="text" value={user.age} placeholder='Enter Age' onChange={(e) => { setUser({ ...user, age: e.target.value }) }} />
                <Input type="text" value={user.email} placeholder='Enter Email' onChange={(e) => { setUser({ ...user, email: e.target.value }) }} />
                <Input type="text" value={user.phone} placeholder='Enter Phone' onChange={(e) => { setUser({ ...user, phone: e.target.value }) }} />
                <Input type="text" value={user.department} placeholder='Enter Department' onChange={(e) => { setUser({ ...user, department: e.target.value }) }} />
                <input type='submit' value="Update User" className="edit"/>
            </form>
        </div>
    )
}