//1. In this, we are fetching our news from a sampleOutput using state and the sample data here is stored inside a variable 'articles'.
/*
import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {

  //this variable has stored my news objects in an array:
  articles = [
    {
      "source": {
        "id": "espn-cric-info",
        "name": "ESPN Cric Info"
      },
      "author": null,
      "title": "PCB hands Umar Akmal three-year ban from all cricket | ESPNcricinfo.com",
      "description": "Penalty after the batsman pleaded guilty to not reporting corrupt approaches | ESPNcricinfo.com",
      "url": "http://www.espncricinfo.com/story/_/id/29103103/pcb-hands-umar-akmal-three-year-ban-all-cricket",
      "urlToImage": "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1099495_800x450.jpg",
      "publishedAt": "2020-04-27T11:41:47Z",
      "content": "Umar Akmal's troubled cricket career has hit its biggest roadblock yet, with the PCB handing him a ban from all representative cricket for three years after he pleaded guilty of failing to report det… [+1506 chars]"
    },
    {
      "source": {
        "id": "espn-cric-info",
        "name": "ESPN Cric Info"
      },
      "author": null,
      "title": "What we learned from watching the 1992 World Cup final in full again | ESPNcricinfo.com",
      "description": "Wides, lbw calls, swing - plenty of things were different in white-ball cricket back then | ESPNcricinfo.com",
      "url": "http://www.espncricinfo.com/story/_/id/28970907/learned-watching-1992-world-cup-final-full-again",
      "urlToImage": "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1219926_1296x729.jpg",
      "publishedAt": "2020-03-30T15:26:05Z",
      "content": "Last week, we at ESPNcricinfo did something we have been thinking of doing for eight years now: pretend-live ball-by-ball commentary for a classic cricket match. We knew the result, yes, but we tried… [+6823 chars]"
    }
  ]

  constructor() {
    super();
    console.log("I am constructor of news component.")
    this.state = {                 //state consists a defined structure of my all news
      articles: this.articles
    }
  }


  render() {
    return (
      <div className='container my-3'>
        <h2>Top Headlines</h2>
        <div className="row">
          {this.state.articles.map((element) => {

            return <div className="col-md-4"  key={element.url} >
              <NewsItem title={element.title.slice(0,20)} description={element.description.slice(0,60)} imageUrl={element.urlToImage} newsUrl={element.url} />
            </div>

          })}
        </div>
      </div>
    )
  }
}

export default News



//In each NewsItem, we have to pass a unique key, like which property of this object will uniquely identify it.
*/








//All the news will be fetched directly from the 'News API' website using fetch API:
import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
// import PropTypes from 'prop-types'

export class News extends Component {

  static defaultProps={
    pageSize: 5,
    country: "in",
    category: "general"
  }

  capitalizeFirstLetter = (string) => {
      return string.charAt(0).toUpperCase() + string.slice(1);
  }

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      page: 1,
      loading: false
    }
    document.title = `${this.capitalizeFirstLetter(this.props.category)} News - NH`;
  }

  //this method will be executed once the render() method is executed.
  async componentDidMount() {
    let businessNewsUrl = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=68f4e0ced7f8459fad648e0cd4c492e7&page=1&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true })
    let data = await fetch(businessNewsUrl);
    let parsedData = await data.json();
    // console.log(data)
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false
    })
  }

  handlePrevClick = async () => {
    console.log("Previous button clicked!");

    let businessNewsUrl = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=68f4e0ced7f8459fad648e0cd4c492e7&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true })
    let data = await fetch(businessNewsUrl);
    let parsedData = await data.json();
    // console.log(data)
    // console.log(parsedData);
    this.setState(
      {
        articles: parsedData.articles,
        page: this.state.page - 1,
        loading: false
      }
    )
  }

  handleNextClick = async () => {
    console.log("Next button clicked!");

    if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {  //here the condition is, if the next page's number is not greater than total no.of pages needed for all of our results.

      let businessNewsUrl = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=68f4e0ced7f8459fad648e0cd4c492e7&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
      this.setState({ loading: true })
      let data = await fetch(businessNewsUrl);
      let parsedData = await data.json();
      // console.log(data)
      // console.log(parsedData);
      this.setState(
        {
          articles: parsedData.articles,
          page: this.state.page + 1,
          loading: false
        }
      )

    }
  }


  render() {
    return (
      <div className='container my-3'>
        <h1 className='text-center' style={{margin:"35px 0px"}}>{`Top Headlines - ${this.capitalizeFirstLetter(this.props.category)}`}</h1>
        {/* this below line is telling that, if this.state.loading is true, then only show the spinner component, else don't show it. */}
        {this.state.loading && <Spinner />}
        <div className="row">
          {/* In this below line, we wrote this condition because, when we will click on next button, the data should be blank--> then a spinner should run--> then the data should be displayed.  */}
          {!this.state.loading && this.state.articles.map((element) => {

            return <div className="col-md-4" key={element.url} >
              <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} />
            </div>

          })}
        </div>
        <div className="container d-flex justify-content-between">
          <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
      </div>
    )
  }
}

export default News