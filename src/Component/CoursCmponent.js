import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import clientConfig from '../client-config';
import Slider from './Slider';


class Courses extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            courses: [],
        };
    }
    componentDidMount() {
        const website = clientConfig.siteUrl;
        this.setState({ loading: true }, () => {
            axios.get(website + '/wp-json/wp/v2/veranstaltung')
                .then(res => {
                    this.setState({ loading: false, courses: res.data })
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
        const cours = this.state.courses.map((cours) => {
            return (
                <div key={cours.id} >
                    <div className="uk-card uk-card-default">
                        {/* <div className="uk-card-media-top">
                            <iframe src={cours.acf.youtube_link} width="100%" height="250" data-uk-responsive></iframe>
                        </div> */}
                        <div className="uk-card-body">
                            <h3 className="uk-card-title">{this.removeTags(cours.title.rendered)}</h3>
                            <p />{this.removeTags(cours.excerpt.rendered)}<p />
                        </div>
                        <div className="uk-card-footer">
                            <Link id={cours.id} to={{ pathname: "/cours/" + cours.id }} className="uk-button uk-button-text" >Read more</Link>
                        </div>
                    </div>
                </div>
            );
        });
        return (
            <>
            <Slider />
            <div className='content'>
                <div className='uk-grid-match uk-child-width-1-3@s uk-text-center' data-uk-grid>
                    {cours}
                </div>
            </div>
            </>
        );
    }
}

export default Courses;