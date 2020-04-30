import React from "react"
import {render, fireEvent, cleanup} from "@testing-library/react"
import MoviePoster from "../MoviePoster.js"
import MovieVisualisation from "../findSentimentPageComponents/MovieVisualisation.js"
import CompareMovieVisualisation from "../comparePageComponents/CompareMovieVisualisation.js"
import HomePageMovies from "../homePageComponents/HomePageMovies.js"
import CompareMovieSelector from "../comparePageComponents/CompareMovieSelector.js"

afterEach(cleanup)

describe("Movie Poster Test", () => {
    test("movie poster renders correctly", () => {
        const movieName = "Spider-Man"
        const posterSize = "w185"
    
        render(
            <MoviePoster 
                movie_title={movieName}
                image_size={posterSize}
            />
        )
    })
})

describe("Movie Visualisation Test", () => {
    test("visualisation renders correctly", () => {
        const twitterSentiment = [100, 200, 300]
        const youtubeSentiment = [300, 200, 100]
    
        render(
            <MovieVisualisation
                twitter_sentiment={twitterSentiment}
                youtube_sentiment={youtubeSentiment}
            />
        )
    })
})

describe("Compare Movie Visualisation Test", () => {
    test("Compare visualisation renders correctly", () => {
        const firstMovieSentiment = [100, 200, 300]
        const secondMovieSentiment = [300, 200, 100]
    
        render(
            <CompareMovieVisualisation 
                firstMovieSentiment={firstMovieSentiment}
                secondMovieSentiment={secondMovieSentiment}
            />
        )
    })
})

describe("Home Page Movies Test", () => {   
    test("Home page table renders correctly", () => {
        render(
            <HomePageMovies/>
        )
    })
})

describe("Compare Movie Selector Test", () => {
    test("Movie Selector renders correctly", () => {
        render(
            <CompareMovieSelector/>
        )
    })
})