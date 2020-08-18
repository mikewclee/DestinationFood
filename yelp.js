
const axios = require("axios");

let API_KEY = "User-apikey"

// REST
let yelpREST = axios.create({
    baseURL: "https://api.yelp.com/v3/",
    headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-type": "application/json",
    },
})

// search by terms(i.e bars, food, sightseeing) and location. 
yelpREST("/businesses/search", {
    params: {
        term: "sightseeing",
        location: "brooklyn",
        //optional sort_by- default is best_match, rating, review_count or distance
        sort_by: "review_count",
        limit: 5,
    },
}).then(({ data }) => {
    let { businesses } = data
    businesses.forEach((b) => {
        // console.log("Name: ", b.name, ", phone:", b.display_phone, ", locations: ", b.location.display_address, " Review counts: ", b.review_count, ", Ratings: ", b.rating);
        // var yelpImgsURL= b.image_url;
        // console.log(yelpImgsURL);
        var bizName = b.name;
        console.log(bizName);
        // var yelpPic = $('<img>').attr("src", yelpImgsURL).width('400px').height('400px');
        // $('#yelpPics').append(yelpPic);
        // $('#yelpPics').html(bizName);
        // yelpREST(`/businesses/${bizId}/review`).then(({ data }) => { console.log(data)});
        //call to retreive reviews, returns 3 review per business ID
        yelpREST(`/businesses/${b.id}/reviews`).then(({ data }) => {
            console.log(data)
        })
    })
})