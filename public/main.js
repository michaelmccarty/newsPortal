$(document).ready(function () {
    let content = $(".content");



    $.get("/articles").done(function (data) {
        for (let i = 0; i < data.length; i++) {
            content.append(`<div class="newsArticle shadow-lg p-3 mb-5 bg-white rounded"><a href="${data[i].link}"><strong>${data[i].title}</strong></a></div>`);
        }
    })



});
