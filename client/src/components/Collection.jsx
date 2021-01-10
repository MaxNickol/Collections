import React, {useEffect, useState} from 'react';
import queryString from 'query-string';
import ReactMarkdown from 'react-markdown';
import {NavLink} from 'react-router-dom';
import {ReactComponent as NoImage} from '../layout/picture.svg';
import DataTable from 'react-data-table-component';
import axios from 'axios';

export const Collection = ({onClose}) => {

    const [collection, setCollection] = useState([]);

    const columns = [
        {
            name: 'Title',
            selector: 'title',
            sortable: true
        },
        {
            name: 'Tags',
            selector: 'tags',
            sortable: true
        },
        {
            name: 'Likes',
            selector: 'likes',
            sortable: true
        },
    ]

    const data = [
        {
            title: "Item1",
            tags: "Item1, item1, i1",
            likes: 15
        },
        {
            title: "Item2",
            tags: "Item2, item2, i2",
            likes: 12
        },
        {
            title: "Item3",
            tags: "Item3, item3, i3",
            likes: 13
        },
        {
            title: "Item4",
            tags: "Item4, item4, i4",
            likes: 22
        }
    ]

    useEffect(() => {

        const {id} = queryString.parse(window.location.search);
        
        const fetchCollection = async () => {
            const response = await axios.post('/api/getParticularCollection', {id});
            if(response.data.collection) {
                setCollection(response.data.collection);
            }
        }
        fetchCollection();

    }, [])

    return(
        <div className="overlay" onClick={(e) => onClose(e)}>
            <div className="profile grid-page">
            <div className="card mt-5 ml-5" style={{maxWidth: "fit-content", maxHeight:"fit-content"}}>
                {collection.image_url ? <img src={collection.image_url} className="card-img-top" alt="..." /> : <NoImage style={{width: '600px', height: '300px'}}/>}
                <div className="card-body">
                    <h5 className="card-title">{collection.title}</h5>
                    <ReactMarkdown source={collection.description} className="card-text" />
                    <p className="card-text"><small className="text-muted">{collection.topic}</small></p>
                </div>
            </div>
            <div className="button-grid ml-5">
                <NavLink to='/addItem'><button className="create-btn mr-3 mt-5">Add item</button></NavLink>
                <NavLink to='/profile'><button className="create-btn mt-5">Back to profile</button></NavLink>
            </div>
            
            <DataTable noHeader={true} columns={columns} data={data} theme='dark' className="table-auto mt-5 ml-5"/>
            
            </div>
        </div>
    )
}