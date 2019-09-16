$(document).ready(function () {
    let content = $(".content");
    let newsCards = $(".newsCards")



    $.get("/articles").done(function (data) {
        for (let i = 0; i < data.length; i++) {
            //<div class="newsArticle shadow-lg p-3 mb-5 bg-white rounded">
            newsCards.append(`
                <div class="newsArticle card text-center">
                <div class="card-body">
                <h5 class="card-title"><a href="${data[i].link}"><strong>${data[i].title}</strong></a></h5>
                <p class="card-text">click to view comment activity</p>
                <p class="card-text"><small class="text-muted">Last comment 3 mins ago</small></p>
                </div>
            `);
        }
    })



});
