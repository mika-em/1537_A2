$(document).ready(function () {
    $.ajax({
        url: "https://yts.mx/api/v2/list_movies.json?sort_by=rating",
        success: function (res) {
            // console.log(res);
            // slice to get only the first eight list_movies
            eight_movies = res.data.movies.slice(0, 1)


            eight_movies.forEach(function (movie) {
                // console.log(movie.title);
                $("main").append(
                    `<div class="movie">
            <a href="movie_${movie.id}.html"><img src="${movie.medium_cover_image}" alt="${movie.title}"></a>
            <h3>${movie.title}</h3>
            <p>${movie.year}</p>
            </div>`
                );
            });
        }
    });
});