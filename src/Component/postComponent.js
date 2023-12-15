import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import clientConfig from '../client-config';
import Slider from './Slider';
import loaderGif from '../loader.gif'; // Adjust the path as necessary


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
                    this.setState({ loading: false, posts: res.data }, () => {
                        // Scroll to stored position after the posts have been loaded and state is updated
                        const storedScrollPosition = localStorage.getItem('scrollPosition');
                        if (storedScrollPosition !== null) {
                            window.scrollTo(0, parseInt(storedScrollPosition, 10));
                        }
                    });
                }).catch(error => {
                    console.log(error);
                    this.setState({ loading: false });
                });
        });
        // Add scroll event listener
        window.addEventListener('scroll', this.handleScroll);

    }

    componentWillUnmount() {
        // Remove scroll event listener when the component is about to be unmounted
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll = () => {
        // Update scroll position in local storage
        localStorage.setItem('scrollPosition', window.scrollY.toString());
    };


    removeTags = (str) => {
        if ((str === null) || (str === ''))
            return false;
        else
            str = str.toString();
        return str.replace(/(<([^>]+)>)/ig, '');
    }


    render() {
        const { loading } = this.state;

        console.warn('state', this.state);
        console.log('positio', localStorage.getItem('scrollPosition'));

        if (loading) {
            return <div style={{ textAlign: 'center', marginTop: '50px' }}>
                <img src={loaderGif} alt="Loading..." />
            </div>;
        }

        const post = this.state.posts.map((post) => {
            return (
                <div class="col-item col s12 ">
                    {/* <div key={post.id} >
                        <div className="uk-card uk-card-default">
                            <div className="card-top-container  uk-card-media-top">
                                <img className='cardimg' alt="" src={post.featured_image_src} />
                            </div>
                            <p className="post-title uk-card-title">{this.removeTags(post.title.rendered)}</p>
                            {/* <div className="uk-card-body"> */}
                    {/* <p className="post-title uk-card-title">{this.removeTags(post.title.rendered)}</p> */}
                    {/* <p />{this.removeTags(post.excerpt.rendered)}<p /> */}
                    {/* </div> }
                            <div className="uk-card-footer">
                                <Link id={post.id} to={{ pathname: "/post/" + post.id }} className="uk-button uk-button-text" >Weiter Lesen</Link>
                            </div>
                        </div>
                    </div> */}
                    <div class="blog-img-wrap">
                        {/* <img className='img-wrap' alt="" src={post.featured_image_src} /> */}
                        <Link className="img-wrap" to={{ pathname: "assets/images/blog-106.jpg" }} data-fancybox="images"
                            data-caption="Making the best of your time today"
                            // style="background-image: url(assets/images/blog-106.jpg);"
                            style={{ backgroundImage: `url(${post.featured_image_src})` }}
                        ></Link>

                    </div>
                    <div class="blog-info  boxed ">

                        <Link id={post.id} to={{ pathname: "/post/" + post.id }}>
                            <h5 class="title ">{this.removeTags(post.title.rendered)}</h5>
                        </Link>
                        <div class="user-avatar mini">
                            <div class="maillink status available">
                                <img  alt="" src="./logo512.png" /*src={post.featured_image_src}*/ />
                                <span class="title">Ewan Belchem</span>
                                <span class="time">23 Feb 2020, Sun</span>
                            </div>
                        </div>

                        <p class="bot-0 text">{this.removeTags(post.excerpt.rendered)}</p>

                        <div class="user-actions">
                            <a href="#!"><i class="mdi mdi-thumb-up-outline"></i><span>739</span></a><a href="#!"><i
                                class="mdi mdi-heart-outline"></i><span>897</span></a>
                        </div>
                    </div>

                </div>
            );
        });
        return (
            <>
                <Slider />
                {/* <div className='content'> */}
                <div class="container over">
                    <div class="section">
                        <div class="spacer"></div>

                        <div class="row ui-mediabox blogs blogs-boxed   small-alternate aligned  ">
                            {post}
                        </div>
                    </div>
                </div>

            </>
        );
    }
}

export default Posts;