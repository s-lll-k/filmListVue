const API_KEY = "2436e460f8eac2bd6b2102c48351941b",
    CATEGORY = "top_rated";

export const fetchDataFilms = (page = 1) => {
    const url = `https://api.themoviedb.org/3/movie/${CATEGORY}?api_key=${API_KEY}&language=ru&page=${page}`;
    return fetch(url)
        .then(response => response.json())
        .catch(err => {
            console.log(err);
        });
};
export const fetchFilmDetails = movieId => {
    const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=ru`;
    return fetch(url)
        .then(response => response.json())
        .then(responseData => responseData)
        .catch(err => {
            console.log(err);
        });
};
