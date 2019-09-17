$(document).ready(function () {
    let content = $(".content");
    let newsCards = $(".newsCards")


    $("#post").on("click", function (event) {
        event.preventDefault();

        console.log(event.target);



        // Grab the id associated with the article from the submit button
        //let thisId = event;


        // $.ajax({
        //     method: "POST",
        //     url: "/articles/" + thisId,
        //     data: {
        //         // Value taken from title input
        //         title: $("#titleinput").val(),
        //         // Value taken from note textarea
        //         body: $("#bodyinput").val()
        //     }
        // })
        //     // With that done
        //     .then(function (data) {
        //         // Log the response
        //         console.log(data);
        //         // Empty the notes section
        //         $("#notes").empty();
        //     });

        // // Also, remove the values entered in the input and textarea for note entry
        // $("#titleinput").val("");
        // $("#bodyinput").val("");
    });



    $.get("/articles").done(function (data) {
        for (let i = 0; i < data.length; i++) {
            //<div class="newsArticle shadow-lg p-3 mb-5 bg-white rounded">
            let lastComment = data[i].lastComment;

            if (typeof lastComment === 'undefined') {
                lastComment = "";
            }

            newsCards.append(`
                <div class="newsArticle card text-center" id="${data[i]._id}">
                <div class="card-body">
                <h5 class="card-title"><a href="${data[i].link}"><strong>${data[i].title}</strong></a></h5>
                <p class="card-text"><small class="text-muted">${lastComment}</small></p>
                <p class="card-text"><button type="button" class="btn btn-link" data-toggle="modal" data-target="#exampleModalCenter">comment</button></p>
                </div>
            `);
        }
    })

});