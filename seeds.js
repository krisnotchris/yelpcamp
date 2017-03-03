var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {
       name: "Cloud's Rest",
       image: "http://images.freeimages.com/images/previews/aa4/vase-pattern-1455236.jpg",
       description: "Bacon ipsum dolor amet turkey boudin t-bone, biltong pork chuck pork loin sausage ham hock drumstick shoulder pancetta. Pancetta landjaeger chuck turkey, meatloaf corned beef hamburger picanha capicola pig strip steak biltong. Prosciutto t-bone rump pork chop corned beef ground round sirloin tri-tip short loin meatloaf burgdoggen sausage shankle pork pig. Brisket picanha beef, ball tip capicola porchetta tail kielbasa shank swine. Flank ground round pancetta kielbasa pork loin sirloin shank bacon biltong brisket tri-tip short loin pork. Boudin ham shoulder, shank flank short loin spare ribs turducken filet mignon biltong shankle sausage pancetta ball tip."
    },
    {
       name: "Desert Mesa",
       image: "http://images.freeimages.com/images/previews/7fc/my-fish-1407289.jpg",
       description: "Bacon ipsum dolor amet turkey boudin t-bone, biltong pork chuck pork loin sausage ham hock drumstick shoulder pancetta. Pancetta landjaeger chuck turkey, meatloaf corned beef hamburger picanha capicola pig strip steak biltong. Prosciutto t-bone rump pork chop corned beef ground round sirloin tri-tip short loin meatloaf burgdoggen sausage shankle pork pig. Brisket picanha beef, ball tip capicola porchetta tail kielbasa shank swine. Flank ground round pancetta kielbasa pork loin sirloin shank bacon biltong brisket tri-tip short loin pork. Boudin ham shoulder, shank flank short loin spare ribs turducken filet mignon biltong shankle sausage pancetta ball tip."
    },
    {
       name: "Canyon Floor",
       image: "http://images.freeimages.com/images/previews/538/film-1-1457181.jpg",
       description: "Bacon ipsum dolor amet turkey boudin t-bone, biltong pork chuck pork loin sausage ham hock drumstick shoulder pancetta. Pancetta landjaeger chuck turkey, meatloaf corned beef hamburger picanha capicola pig strip steak biltong. Prosciutto t-bone rump pork chop corned beef ground round sirloin tri-tip short loin meatloaf burgdoggen sausage shankle pork pig. Brisket picanha beef, ball tip capicola porchetta tail kielbasa shank swine. Flank ground round pancetta kielbasa pork loin sirloin shank bacon biltong brisket tri-tip short loin pork. Boudin ham shoulder, shank flank short loin spare ribs turducken filet mignon biltong shankle sausage pancetta ball tip."
    }
]

function seedDB(){
    // Remove all campgrounds
    Campground.remove({}, function(err){
    if(err){
        console.log(err)
    }
    console.log("removed campgrounds");
    data.forEach(function(seed){
            Campground.create(seed, function(err, campground){
                if (err) {
                    console.log(err);
                } else {
                    console.log("added a campground")
                    // create a comment
                    Comment.create({
                        text: "This place is great, but I wish there was internet",
                        author: "Homer"
                    }, function(err, comment){
                        if(err){
                            console.log(err);
                        } else {
                            campground.comments.push(comment);
                            campground.save();
                            console.log("created new comment");
                        }
                        
                    })
                }
            })
        });
    });
}
module.exports = seedDB;