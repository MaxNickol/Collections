import React, {useState} from 'react';
import {NavLink} from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import axios from 'axios'

export const EditForm = ({onClose, collection}) => {


    const [collectionForm, setCollectionForm] = useState({
        title: '',
        description: '',
        topic: ''
    })

    const [msg, setMsg] = useState('')

    const formHanlder = (event) => {
        setCollectionForm({...collectionForm, [event.target.id]: event.target.value});
    }

    const updateHandler = async () => {
        const response = await axios.post('/api/editCollection', {
            id:collection._id,
            title: collectionForm.title,
            description: collectionForm.description,
            topic: collectionForm.topic
        });

        if(response.data.message) {
            console.log(response.data.message)
            setMsg(response.data.message)
        }
    }


    return(
        <div className="overlay" onClick={(e) => onClose(e)}>
        <div className="profile w-50 d-flex flex-column justify-content-between align-items-center text-center">
            <h1 className="mt-5">Change your collection!</h1>
            <h5 className="m-0 p-0">Previous title: {collection.title}</h5>
            <input type="title" id="title" className="input-group" placeholder="Title" onChange={(e) => formHanlder(e)}/>

            <h5 className="pl-5 pr-5 mr-5 ml-5">Previous Description: {collection.description}</h5>

            <div className="d-flex flex-column text-break markdown-wrapper">
                <textarea id="description" className="input-group markdown" placeholder="Description" onChange={(e) => formHanlder(e)}/>
                <ReactMarkdown source={collectionForm.description} className="preview mt-2"/>
            </div>

            <h5 className="pl-5 pr-5 mr-5 ml-5">Previous topic: {collection.topic}</h5>
            <select id="topic" className="input-group height" onChange={(e) => formHanlder(e)}>
                <option defaultValue="Default topic">Default topic</option>
                <option value="Cartoons">Cartoons</option>
                <option value="Movies">Movies</option>
                <option value="Books">Books</option>
                <option value="Video Games">Video Games</option>
                <option value="Board Games">Board Games</option>
                <option value="Spirits">Spirits</option>
                <option value="Clothes">Clothes</option>
                <option value="Cars">Cars</option>
                <option value="Food">Food</option>
            </select>
            <h3>{msg}</h3>
            <div className="accept-form-wrapper d-flex flex-row justify-content-between w-50">
                <NavLink to='/profile'><button className="create-btn mb-5">Back to profile</button></NavLink>
                <button className="create-btn mb-5" onClick={() => updateHandler()}>Save</button>
            </div>
            
        </div>
    </div>
    )
}