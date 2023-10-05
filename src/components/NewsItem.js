//1. code, when using state and fetching news from sampleoutput
/*
import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {

    let {title, description, imageUrl, newsUrl} = this.props;   //props is an object, and from this object, title and description will be fetched.

    return (
      <div className='my-3'>
        <div className="card" style={{width: "18rem"}}>  
          <img src={imageUrl} className="card-img-top" alt="..."/>
            <div className="card-body">
              <h5 className="card-title">{title}...</h5>
              <p className="card-text">{description}...</p>
              <a href={newsUrl} target='_blank' className="btn btn-sm btn-primary">Read More...</a>
            </div>
        </div>
      </div>
    )
  }
}

export default NewsItem



//At line 10: inline style is used and to use it correctly we have put the properties in {} to make it as an object and that {} is putted inside {} to show that it is a JS code.
*/






//All the news will be fetched directly from the 'News API' website using fetch API:
import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {

    let { title, description, imageUrl, newsUrl, author, date } = this.props;

    return (
      <div className='my-3'>
        <div className="card">
          <img src={imageUrl ? imageUrl : "https://akm-img-a-in.tosshub.com/indiatoday/images/story/media_bank/202310/chandrayaan-3-123910431-16x9.jpg?VersionId=tfRv4G1V8OxGO7bxRnk7U_S8jeO1AhBL"} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <p className="card-text"><small className="text-body-secondary">By {author?author:"UNKOWN SOURCE"} on {new Date(date).toGMTString()}</small></p>
            <a href={newsUrl} target='_blank' className="btn btn-sm btn-dark">Read More...</a>
          </div>
        </div>
      </div>
    )
  }
}

export default NewsItem


