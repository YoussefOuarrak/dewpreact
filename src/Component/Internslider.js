import React, { Component } from 'react';
import '../style/Slider.css'
import axios from 'axios';
import clientConfig from '../client-config';


class Slider extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            pics: [],
        };
    }

    componentDidMount() {
        const website = clientConfig.siteUrl;
        this.setState({ loading: true }, () => {
            axios.get(website + '/wp-json/wp/v2/sliderintern')
                .then(res => {
                    this.setState({ loading: false, pics: res.data })
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
        const slide = this.state.pics.map((slide) => {
            return (
                <li key={slide.id}>
                    <img className="img-slider"  src={slide.featured_image_src} alt="" data-uk-cove />
                    <div className="uk-position-center uk-position-small uk-text-center">
                        <h2 uk-slideshow-parallax="x: 100,-100">{this.removeTags(slide.title.rendered)}</h2>
                        <div uk-slideshow-parallax="x: 200,-200" dangerouslySetInnerHTML={{__html: slide.content.rendered}}></div>
                    </div>
                </li>
            );
        });
        return (
            <div className="uk-position-relative uk-visible-toggle uk-light" data-uk-slideshow="min-height: 150; max-height: 180;  animation: fade">
                <ul className="uk-slideshow-items" >
                    {slide}
                </ul>
                <a className="uk-position-center-left uk-position-small" data-uk-uk-slidenav-previous uk-slideshow-item="previous"></a>
                <a className="uk-position-center-right uk-position-small" data-uk-uk-slidenav-next uk-slideshow-item="next"></a>
            </div>
        )
    }
}
export default Slider;