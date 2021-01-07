import React, {useState, useEffect} from 'react';
import ReactMarkdown from 'react-markdown';
import axios from 'axios';

export const CollectionsTable = ({username, catcher}) => {

    const [allCollections, setAllCollections] = useState([]);


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
    }, [username])

    return(
        <div className="d-flex flex-row flex-wrap align-items-center" onClick={(e) => catcher(e)}>
        {allCollections.map((collection, index) => (
            <div className="card mb-3 ml-4 mt-4" style={{maxWidth:"540px", minWidth:"540px"}} key={index} id={collection._id}>
            <div className="row g-0" id={collection._id}>
                <div className="col-md-4" id={collection._id}>
                {collection.image_url ? <img src={collection.image_url} style={{width:"200px", height:"200px"}} id={collection._id} alt="pic"/> : null}
                </div>
                <div className="col-md-8" id={collection._id}>
                <div className="card-body" id={collection._id}>
                    <h5 className="card-title" id={collection._id}>{collection.title}</h5>
                    <ReactMarkdown source={collection.description} className="card-text" id={collection.id} />
                    <p className="card-text" id={collection._id}><small className="text-muted" id={collection._id}>{collection.topic}</small></p>
                </div>
                </div>
            </div>
            </div>
        ))}
        </div>
    )
}