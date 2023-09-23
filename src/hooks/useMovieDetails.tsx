
import {useState,useEffect } from 'react'
import { Cast, CreditsResponse, MovieFull } from '../interfaces/movieInterface'
import movieDB from '../api/movieDB'

interface MovieDetails {
    isloading : boolean
    movieFull?: MovieFull
    cast: Cast[]
}

const useMovieDetails = (movieId : number) => {
    const [state , setState] = useState<MovieDetails>({
        isloading:true,
        movieFull:undefined,
        cast:[]
    });

    const getMovieDetails = async () => {
        const resp =  movieDB.get<MovieFull>(`/${movieId}`)
        const cast =  movieDB.get<CreditsResponse>(`${movieId}/credits`)
       
        const [movieDetailsResponse , castPromiseResponse] = await Promise.all(([resp,cast]));

        setState({
            isloading:false,
            movieFull:movieDetailsResponse.data,
            cast:castPromiseResponse.data.cast
        })


    }

    useEffect(() => {
        getMovieDetails();
    }, []);

    return {
        ...state
    }
}

export default useMovieDetails