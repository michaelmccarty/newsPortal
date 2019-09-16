$(document).ready(function () {
    let content = $(".content");
    let newsCards = $(".newsCards")

    $.get("/articles").done(function (data) {
        for (let i = 0; i < data.length; i++) {
            //<div class="newsArticle shadow-lg p-3 mb-5 bg-white rounded">
            let lastComment = data[i].lastComment;

            if (typeof lastComment === 'undefined') {
                lastComment = "";
            }

            newsCards.append(`
                <div class="newsArticle card text-center">
                <div class="card-body">
                <h5 class="card-title"><a href="${data[i].link}"><strong>${data[i].title}</strong></a></h5>
                <p class="card-text"><small class="text-muted">${lastComment}</small></p>
                <p class="card-text"><button type="button" class="btn btn-link" data-toggle="modal" data-target="#exampleModalCenter">comment</button></p>
                </div>
            `);
        }
    })



});