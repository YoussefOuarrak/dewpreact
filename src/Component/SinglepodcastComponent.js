import React, { Component ,useEffect, useState } from 'react';
import axios from "axios";
import { useParams } from 'react-router-dom';
import clientConfig from '../client-config';

function Podcast() {
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState("muchkilaaaa");
  const [post,setPost] = useState({});
  const [id,setId] = useState('');
  const { podcastid } = useParams();

  let currentid = podcastid;
  console.log('iddd' +currentid );


  const Navigation = () => {
    let { podcastid } = useParams();
    setId(podcastid);
}

  useEffect(()=>{
    setLoading(true);
    const website = clientConfig.siteUrl;
      axios.get(website + '/wp-json/wp/v2/podcast/'+currentid )
        .then(res => {
          setLoading(false);
          setError('machiiiiiiii muskil');
          setPost(res.data);
        }).catch(error => {
          console.log(error);
        });
      console.log('loading changed!')
  },[]) 




  const removeTags = (str) => {
    if ((str === null) || (str === ''))
      return false;
    else
      str = str.toString();
    return str.replace(/(<([^>]+)>)/ig, '');
  }

  


    return (
      <div className='content'>
        {
          post.title  &&  (<div >{removeTags(post.content.rendered)}</div>)
        }
      </div>
    )
}

export default Podcast;
