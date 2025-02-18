import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'

export default class News extends Component {
    static defaultProps = {
        country: 'us',
        pageSize: 8,
        category: 'general'
    }
    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }
    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);}
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: false,
            page: 1
        }
        document.title=`${this.capitalizeFirstLetter(this.props.category)} - DailyNews`
    }

    async updateNews() {
        try {
            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=59b14556faa747e6ae4c34a1a23a3102&page=${this.state.page}&pageSize=${this.props.pageSize}`;
            this.setState({ loading: true })
            let data = await fetch(url);
            if (!data.ok) {
                throw new Error(`HTTP error! Status: ${data.status}`);
            }
            let parsedData = await data.json();
            this.setState({
                articles: parsedData.articles,
                totalResults: parsedData.totalResults,
                loading: false
            });
        } catch (error) {
            console.error("Error fetching data: ", error);
            this.setState({ articles: [] });
        }
    }

    async componentDidMount() {
       this.updateNews();
    }

    handlePreviousClick = async () => {
        this.setState({page: this.state.page - 1})
        this.updateNews();

    }
    handleNextClick = async () => {
        this.setState({page: this.state.page + 1})
        this.updateNews();
    }

    render() {
        return (
            <>
                <div className="container my-3">
                    <h2 className='text-center mt-5 mb-3'>DailyNews - Top Headlines</h2>
                    {this.state.loading && <Spinner />}
                    <div className="row">
                        {!this.state.loading && this.state.articles.map((element) => {
                            return <div className="col-md-4" key={element.url}>
                                <NewsItem title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source}/>
                            </div>
                        })}
                    </div>
                    <div className="container my-3 d-flex justify-content-between">
                        <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePreviousClick}> &larr; previous</button>
                        <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}> next &rarr;</button>
                    </div>
                </div>
            </>

        )
    }
}
