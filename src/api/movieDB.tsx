import axios from "axios";

const movieDB=  axios.create({
    baseURL: "https://api.themoviedb.org/3/movie",
    headers:{
        "Accept": "application/json",
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1M2MzMTg2ZWJiNDg0ODNiMGQ1MzRlYjM0YWRlZGRkZSIsInN1YiI6IjY1MDljNmI5ODI2MWVlMDBjNWZlODhlYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DY53wsHXRypGCx0Zj_quuJGP870C0gIrUIs17FPaclg"
    },
    params: {
        language: "es-Es",
    },

});

export default movieDB;