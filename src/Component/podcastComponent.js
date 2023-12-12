import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import clientConfig from '../client-config';

class Podcasts extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            podcasts: [],
        };
    }
    componentDidMount() {
        const website = clientConfig.siteUrl;

        this.setState({ loading: true }, () => {
            axios.get(website + '/wp-json/wp/v2/podcast')
                .then(res => {
                    this.setState({ loading: false, podcasts: res.data })
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
        const podcast = this.state.podcasts.map((podcast) => {
            return (
                <div key={podcast.id} >
                    <div className="uk-card uk-card-default">
                        <div className="uk-card-media-top">
                            <iframe src={podcast.acf.youtube_link} width="100%" height="250"  data-uk-responsive></iframe>
                        </div>
                        <div className="uk-card-body podcast">
                            <h5>{this.removeTags(podcast.title.rendered)}</h5>
                            {/* <p />{this.removeTags(podcast.excerpt.rendered)}<p /> */}
                        </div>
                        <div className="uk-card-footer podcast">
                            <Link id={podcast.id} to={{ pathname: "/podcast/" + podcast.id }} className="uk-button uk-button-text" >Read more</Link>
                        </div>
                    </div>
                </div>
            );
        });
        return (
            <div className='content'>
                <div className='uk-grid-match uk-child-width-1-3@s uk-text-center' data-uk-grid>
                    {podcast}
                </div>
            </div>
        );
    }
}

export default Podcasts;