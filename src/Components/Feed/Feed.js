import React, { useEffect, useState } from 'react'
import FeedPost from '../FeedPost/FeedPost'
import './style.css'
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { db } from '../../firebase'


function Feed() {
    const [feeds, setFeeds] = useState([])
    useEffect(()=>{
        db.collection('feeds').onSnapshot(snapshot=>{
            console.log(snapshot.docs)
            setFeeds(snapshot.docs.map(doc=>({
                id: doc.id,
                feed: doc.data()
            })))
        })
    }, [])
    return (
        <div className='feed'>
            <AddCircleIcon color="secondary" className='addicon'style={{fontSize:50}}/>
            {feeds.map(({id, feed})=>{
                return(
                    <FeedPost key={id} username={feed.username} text={feed.text} url={feed.url} likes={feed.likes}/>
                );
            })}
        </div>
    )
}

export default Feed
