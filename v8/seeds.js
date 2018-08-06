var mongoose = require('mongoose');
var Campground = require('./models/campground');
var Comment = require("./models/comment");

var data = [
    {
        name: "Mourning Lake",
        image: "https://images.pexels.com/photos/1061640/pexels-photo-1061640.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        description: "Lorem ipsum fermentum diam inceptos placerat conubia curabitur amet, eget etiam per at convallis vivamus phasellus lectus, himenaeos curabitur mattis ullamcorper praesent class eu. potenti proin sed nisl suspendisse orci odio ornare in, proin donec in senectus fusce feugiat faucibus vel sociosqu, lectus nec mi malesuada interdum ut donec. litora eros ut ultrices vitae porttitor pharetra at per, vehicula aptent a adipiscing arcu erat sodales lectus aliquet, dui et volutpat dui ac suscipit etiam. vitae nam convallis ornare porttitor sem ornare sit elementum at odio venenatis, torquent class lacus nullam risus sollicitudin maecenas eget urna ultricies. "
        
    },
    {
        name: "Krishna's Mouth",
        image: "https://images.pexels.com/photos/45241/tent-camp-night-star-45241.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        description: "Lorem ipsum fermentum diam inceptos placerat conubia curabitur amet, eget etiam per at convallis vivamus phasellus lectus, himenaeos curabitur mattis ullamcorper praesent class eu. potenti proin sed nisl suspendisse orci odio ornare in, proin donec in senectus fusce feugiat faucibus vel sociosqu, lectus nec mi malesuada interdum ut donec. litora eros ut ultrices vitae porttitor pharetra at per, vehicula aptent a adipiscing arcu erat sodales lectus aliquet, dui et volutpat dui ac suscipit etiam. vitae nam convallis ornare porttitor sem ornare sit elementum at odio venenatis, torquent class lacus nullam risus sollicitudin maecenas eget urna ultricies. "
        
    },
    {
        name: "Greeny Maze",
        image: "https://images.pexels.com/photos/6714/light-forest-trees-morning.jpg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        description: "Lorem ipsum fermentum diam inceptos placerat conubia curabitur amet, eget etiam per at convallis vivamus phasellus lectus, himenaeos curabitur mattis ullamcorper praesent class eu. potenti proin sed nisl suspendisse orci odio ornare in, proin donec in senectus fusce feugiat faucibus vel sociosqu, lectus nec mi malesuada interdum ut donec. litora eros ut ultrices vitae porttitor pharetra at per, vehicula aptent a adipiscing arcu erat sodales lectus aliquet, dui et volutpat dui ac suscipit etiam. vitae nam convallis ornare porttitor sem ornare sit elementum at odio venenatis, torquent class lacus nullam risus sollicitudin maecenas eget urna ultricies. "
        
    } 
];

function seedDB(){
    //Remove all campgrounds
    Campground.remove({}, function(err){
        // if(err){
        //     console.log(err);
        // }
        // console.log("Removed campgrounds!!!");
        //  //Add campgrounds
        // data.forEach(function(seed){
        //     Campground.create(seed,function(err,campground){
        //         if(err){
        //             console.log(err);
        //         } else{
        //             console.log("added a campground to the database!");
        //             //create a comment
        //             Comment.create(
        //                 {
        //                     text: "This place is great",
        //                     author: "Incognito"
        //                 }, function(err, comment){
        //                     if(err){
        //                         console.log(err);
        //                     } else {
        //                         campground.comments.push(comment);
        //                         campground.save();
        //                         console.log("Created new comment");
        //                     }
                            
        //                 });
        //         }
        //     });
        // });
    });
    
}

module.exports = seedDB;