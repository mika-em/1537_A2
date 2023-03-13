// $(document).ready(function () {
//     $.ajax({
//         url: "https://yts.mx/api/v2/list_movies.json?sort_by=rating",
//         success: function (res) {
//             // console.log(res);
//             // slice to get only the first eight list_movies
//             eight_movies = res.data.movies.slice(0, 1)


// eight_movies.forEach(function (movie) {
// // console.log(movie.title);
//     $("main").append(
//         `<div class="movie">
//         <a href="movie_${movie.id}.html"><img src="${movie.medium_cover_image}" alt="${movie.title}"></a>
//         <h3>${movie.title}</h3>
//         <p>${movie.year}</p>
//             </div>`
//                 );
//             });
//         }
//     });
// });

moviesPerPage = 2;
/**
 * This function is used to call the API
 */
function callAjax() {
    console.log("hello")
    $.ajax({
        limit: 20,
        url: "https://yts.mx/api/v2/list_movies.json?sort_by=rating",
        success: function (res) {
            handleData(res);
        }
    });
}
/**
 * Handles the data and slices the pages. 2 movies per page.
 * @param {*} data 
 */
function handleData(res) {
    console.log(res);
    // console.log("hello")
    eight_movies = res.data.movies.slice(0, 19)


    var totalPages = Math.ceil(eight_movies.length / moviesPerPage);

    displayMovies(eight_movies.slice(0, moviesPerPage));
    pagination(totalPages);
}
/**
 * Creates the pages
 * @param {} totalPages 
 */
function pagination(totalPages) {
    var pagination = $('#pagination');
    pagination.empty();
    // Make all the buttons
    for (var i = 1; i <= totalPages; i++) {
        pagination.append(`<button class="page-item"><a class="page-link" href="#">${i}</a></button>`)
    }
    // Add the active class to the first button
    pagination.find('button').first().addClass('active');

    pagination.find('button').on('click', function () {
        var page = $(this).text(); // get the text of the button
        var start = (page - 1) * moviesPerPage;
        var end = start + moviesPerPage;

        displayMovies(eight_movies.slice(start, end));

        pagination.find('button').removeClass('active');
        $(this).addClass('active');
    })

}

/**
 * 
 * @param {*} moviesList 
 */
function displayMovies(moviesList) {
    $('#movies').empty();
    moviesList.forEach(function (movie) {
        $('#movies').append(
            `<div class="movie">
            <a href="movie_${movie.id}.html">
            <img src="${movie.medium_cover_image}" alt="${movie.title}"></a>
            <h3>${movie.title}</h3>
            <p>${movie.year}</p>
            </div>`)
    })
}

$(document).ready(function () {
    callAjax();
});

function prevButton(){
    $('#movies').empty();

    if ($(this).attr("prev") > 0 || $(this).attr("prev") < 11) {
        page_number == parseInt($(this).attr("prev"));
    } else {
        if ($(this).attr("id") == "next") {
            if (page_number < 10) {
                page_number++;
            }
        } else if ($(this).attr("id") == "prev") {
            if (page_number > 1) {
                page_number--;
            }
        }
    }
    $("button").removeClass("active");
    $("button#" + page_number).addClass("active");

    if (page_number == 1) {
        $("button").attr("disabled", true);
        $("button.prev").addClass("greyed");
    } else if (page_number == 10) {
        $("button").removeClass("greyed");
        $("button.next").addClass("disabled", true);
    } else {
        $("button.prev").removeClass("greyed");
        $("button.next").removeClass("greyed");
    }

    $("button").prop("disabled, false");
    $("button.greyed").prop("disabled", true);

});

$(document).ready(function () {
    prevButton();
});

