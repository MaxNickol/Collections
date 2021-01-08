import React, {useState, useEffect} from 'react';
import {ReactComponent as EditSVG} from '../layout/edit.svg';
import {ReactComponent as CloseSVG} from '../layout/close.svg';
import ReactMarkdown from 'react-markdown';
import axios from 'axios';

export const CollectionsTable = ({username, catcher}) => {

    const [allCollections, setAllCollections] = useState([]);

    const actionHandler = async (id) => {

        const response = await axios.post('/api/deleteCollection', {id: id});

        console.log(id);
        console.log(response.data.message);

    }


    useEffect(() => {
        const fetchAllCollections = async () => {
            const response = await axios.post('/api/getAllCollections', {
                owner_username: username
            });

            if(response.data.collections) {
                setAllCollections(response.data.collections);
            }
        }
        fetchAllCollections();
    }, [username, actionHandler])

    return(
        <div className="d-flex flex-row flex-wrap align-items-center" onClick={(e) => catcher(e)}>
        {allCollections.map((collection, index) => (
            <div className="card mb-3 ml-4 mt-4 text-break hover" style={{maxWidth:"540px", minWidth:"540px", maxHeight:"230px"}} key={index} id={collection._id}>
            <div className="row g-0" id={collection._id}>
                <div className="col-md-5 pr-0" id={collection._id}>
                {collection.image_url ? <img src={collection.image_url} style={{width:"200px", height:"225px"}} id={collection._id} alt="pic"/> : null}
                </div>
                <div className="col-md-7 pl-0" id={collection._id}>
                    <div className="card-body" id={collection._id}>
                        <h5 className="card-title" id={collection._id}>{collection.title}</h5>
                        <ReactMarkdown source={collection.description} className="card-text" id={collection.id} />
                        <p className="card-text" id={collection._id}><small className="text-muted" id={collection._id}>{collection.topic}</small></p>
                    </div>
                    <EditSVG className="edit" id="Edit"/>
                    <CloseSVG className="edit close-red" id="Delete" onClick={() => actionHandler(collection._id)}/>
                </div>
            </div>
            </div>
        ))}
        </div>
    )
}