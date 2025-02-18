import React, { Component } from 'react'
import { Link } from 'react-router-dom'
export default class NewsItem extends Component {
    render() {
        let {imageUrl, title, description, newsUrl, author, date, source} = this.props;
        return (
            <div className="my-3">
                <div className="card">
                    <img src={!imageUrl?"https://img.freepik.com/premium-photo/creative-glowing-blue-breaking-news-pattern-background-with-globe-headline-communication-global-world-concept-3d-rendering_670147-21161.jpg?semt=ais_hybrid":imageUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                    <span className="z-1 badge rounded-pill text-bg-primary" style={{position:"absolute", color:"white", backgroundColor:"red", top:"-2px", right:"-2px"}}>{source.name}</span>
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p>
                        <p className="card-text"><small className="text-body-secondary">By {author?author:"Unknown"} on {new Date(date).toGMTString()}</small></p>
                        <Link to={newsUrl} target="_blank" className="btn  btn-sm btn-primary">Read more</Link>
                    </div>
                </div>
            </div>
        )
    }
}
