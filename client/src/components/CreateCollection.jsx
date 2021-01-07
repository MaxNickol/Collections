import React, {useState} from 'react';
import {useStorage} from '../hooks/useStorage';
import {NavLink} from 'react-router-dom';
import {useDropzone} from 'react-dropzone';
import {ReactComponent as Cloud} from '../layout/cloud-computing.svg';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

export const CreateCollection = ({onClose}) => {

    const [collectionForm, setCollectionForm] = useState({
        title: '',
        description: '',
        topic: ''
    })
    
    const [message, setMessage] = useState('');

    
    const formHanlder = (event) => {
        setCollectionForm({...collectionForm, [event.target.id]: event.target.value});
    }

      const {getRootProps, getInputProps, isDragActive, acceptedFiles} = useDropzone({
          maxFiles: 1,
      })

      const acceptedItem = acceptedFiles.map((file, index) => (
          <h3 key={index}>{file.path}</h3>
      ))

    const user = useStorage();

    
    const onCreateCollection = async () => {

        const data = {
            title: collectionForm.title,
            description: collectionForm.description,
            topic: collectionForm.topic,
            owner_username: user.username,
        }

        const formData = new FormData();
        formData.append('image', acceptedFiles[0]);
        formData.append('data', JSON.stringify(data));

        const response = await axios.post('/api/createCollection', formData, {
            headers:{
                "Content-type":"multipart/form-data"
            }
        });

        if(response.data.message) {
            setMessage(response.data.message);
        }
      }

      

    return(
        <div className="overlay" onClick={(e) => onClose(e)}>
            <div className="profile w-50 d-flex flex-column justify-content-between align-items-center">
                <h1 className="mt-5">Create your collection!</h1>
                <input type="title" id="title" className="input-group" placeholder="Title" onChange={(e) => formHanlder(e)}/>
                
                <div className="d-flex flex-column text-break markdown-wrapper">
                    <textarea id="description" className="input-group markdown" placeholder="Description" onChange={(e) => formHanlder(e)}/>
                    <ReactMarkdown source={collectionForm.description} className="preview mt-2"/>
                </div>

                <select id="topic" className="input-group height" onChange={(e) => formHanlder(e)}>
                    <option defaultValue="Choose the topic">Choose the topic</option>
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
                
                <div {...getRootProps()} className="dragndrop d-flex flex-column justify-content-center align-items-center">
                    <input {...getInputProps()} />
                    {
                        isDragActive ?
                        <Cloud className="cloud active-cloud"/>:
                        <Cloud className="cloud"/>
                    }
                    <div className="text-break">
                        {acceptedItem}
                    </div>
                    
                </div>
                <h3>{message}</h3>
                <div className="accept-form-wrapper d-flex flex-row justify-content-between w-50">
                    <NavLink to='/profile'><button className="create-btn mb-5">Back to profile</button></NavLink>
                    <button className="create-btn mb-5" onClick={() => onCreateCollection()}>Create</button>
                </div>
                
            </div>
        </div>
    )
}