import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import clientConfig from '../client-config';
class Interns extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            interns: [],
        };
    }
    componentDidMount() {
        const website = clientConfig.siteUrl;
        // const website = 'http://localhost/wpprojekte/ebike';
        // const website = 'https://ebike-paradies.eu/';
        this.setState({ loading: true }, () => {
            axios.get(website + '/wp-json/wp/v2/intern')
                .then(res => {
                    this.setState({ loading: false, interns: res.data })
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
        const intern = this.state.interns.map((intern) => {
            return (
                <div key={intern.id} >
                    <div className="uk-card uk-card-default card-intern">
                        <div className="uk-card-media-intern">
                            <img className='intern cardimg' alt="" src={intern.featured_image_src} />
                        </div>
                        <div>
                            <div className="card-body">
                                <h5 className='intern-title'>{this.removeTags(intern.title.rendered)}</h5>
                                <p className='intern-exc' dangerouslySetInnerHTML={{__html: intern.excerpt.rendered}} ></p>
                            </div>
                            <div className="uk-card-footer intern">
                                <Link id={intern.id} to={{ pathname: "/intern/" + intern.id }} className="uk-button uk-button-text" >Read more</Link>
                            </div>
                        </div>
                    </div>
                </div>
            );
        });
        return (
            <div className='content'>
                <div className='uk-grid-match uk-child-width-1-3@s uk-text-center' data-uk-grid>
                    {intern}
                </div>
            </div>
        );
    }
}

export default Interns;