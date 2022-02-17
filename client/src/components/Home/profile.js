import React, { useEffect, useState } from 'react';
import { getUserDetails, getUserPosts } from '../services/api';
import { useNavigate } from 'react-router-dom';

function Profile(){


    const [data, setData] = useState('')
    const [postData, setPostData] = useState('');
    const username = localStorage.getItem('username');

    // console.log(username);

    const navigate = useNavigate()

    const handleChange = (e) => {
        navigate('/createnewpost')
    }

    useEffect(() => {
        const fetchData = async() => {
            // console.log(username);
            const data = await getUserDetails(username);
            // console.log(data);
            // const postData = await getUserPosts(username);
            setData(data)
        }
        const fetchPost = async () => {
            // console.log(username);
            const postData = await getUserPosts(username);
            // console.log(postData);
            setPostData(postData);
        }
        fetchData();
        fetchPost();
    }, [])

    console.log(postData);
    const newData = Object.values(data)
    // console.log(newData);
    
    return(

        <>
            {
                newData && newData.map((item, ind) => (
                    <p key = {ind}>{item}</p>
                ))
            }

            <button onClick={(e) => handleChange(e)}>
                Create New Post
            </button>

            {
                postData && postData.map((item, ind) => (
                    <ul key = {ind}>
                        <li>{item.caption}</li>
                        <li>{item.postImage}</li>
                        <li>{item.postedBy}</li>
                    </ul>
                ))
            }
            
            
        </>
    )
}

export default Profile;