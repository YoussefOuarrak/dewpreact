import React, { Component ,useEffect, useState } from 'react';
import axios from "axios";
import { useParams } from 'react-router-dom';
import clientConfig from '../client-config';

function Post() {
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState("muchkilaaaa");
  const [post,setPost] = useState({});
  const [id,setId] = useState('');
  const { postid } = useParams();

  let currentid = postid;
  console.log('iddd' +currentid );


  const Navigation = () => {
    let { postid } = useParams();
    setId(postid);
}

  useEffect(()=>{
    const website = clientConfig.siteUrl;

    console.log( 'sir 3laah');
    setLoading(true);
      axios.get( website + '/wp-json/wp/v2/posts/'+currentid )
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

export default Post;
