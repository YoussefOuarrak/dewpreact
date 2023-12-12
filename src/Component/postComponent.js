import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import clientConfig from '../client-config';
import Slider from './Slider';

class Posts extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            posts: [],
        };
    }
    componentDidMount() {
        //    const website = 'http://localhost/wpprojekte/ebike';
        const website = clientConfig.siteUrl;
        this.setState({ loading: true }, () => {
            axios.get(website + '/wp-json/wp/v2/posts')
                .then(res => {
                    this.setState({ loading: false, posts: res.data })
                }).catch(error => {
                    console.log(error);
                });
        });
    }

    removeTags = (str) => {
        if ((str === null) || (str === ''))
            return false;
        else
            str = str.toString();
        return str.replace(/(<([^>]+)>)/ig, '');
    }

    render() {
        console.warn('state', this.state);
        const post = this.state.posts.map((post) => {
            return (
                <div key={post.id} >
                    <div className="uk-card uk-card-default">
                        <div className="card-top-container  uk-card-media-top">
                            <img className='cardimg' alt="" src={post.featured_image_src} />
                        </div>
                        <p className="post-title uk-card-title">{this.removeTags(post.title.rendered)}</p>
                        {/* <div className="uk-card-body"> */}
                        {/* <p className="post-title uk-card-title">{this.removeTags(post.title.rendered)}</p> */}
                        {/* <p />{this.removeTags(post.excerpt.rendered)}<p /> */}
                        {/* </div> */}
                        <div className="uk-card-footer">
                            <Link id={post.id} to={{ pathname: "/post/" + post.id }} className="uk-button uk-button-text" >Weiter Lesen</Link>
                        </div>
                    </div>
                </div>
            );
        });
        return (
            <>
                <Slider />
                <div className='content'>
                    <div className='uk-grid-match uk-child-width-1-2 uk-text-center' data-uk-grid>
                        {post}
                    </div>
                </div>
            </>
        );
    }
}

export default Posts;