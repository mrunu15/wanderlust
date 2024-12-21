const Listing = require("./models/listing");
const Review = require("./models/review");
const {listingSchema , reviewSchema}= require("./schema.js");
const ExpressError = require("./utils/ExpressError.js");


module.exports.isLoggedIn = (req,res,next) =>{
    if(!req.isAuthenticated()){

        // redirectUrl save
        req.session.redirectUrl = req.originalUrl;
        req.flash("error","you must login to create listing");
        return res.redirect("/login");
    }
    next();
}

// here passport changes the redirectUrl to default back to code written therefore making middleware to store in locals so that passport can access

module.exports.saveRedirectUrl = (req,res,next) =>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;

    }
    next();
}

// isOwner helps to check the owner of the listing for update,edit,delete middleware
module.exports.isOwner =async (req,res,next) =>{
    let {id} = req.params;
    let listing = await Listing.findById(id);
    if(!listing.owner.equals(res.locals.currUser._id)){
        req.flash("error","You are not the owner of this listing");
        return res.redirect(`/listings/${id}`)
    }
    // await Listing.findByIdAndUpdate(id,{...req.body.listing});
    // req.flash("success","Listing Updated!");
    // res.redirect(`/listings/${id}`);
    next();
}
module.exports.validateListing = (req,res,next) =>{
    let {error} =listingSchema.validate(req.body);
    
    if(error){
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    }else{
        next();
    }
}

module.exports.validateReview = (req,res,next) =>{
    let {error} =reviewSchema.validate(req.body);
    
    if(error){
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    }else{
        next();
    }
}

module.exports.isReviewAuthor =async (req,res,next) =>{
    let {id, reviewId} = req.params;
    let review = await Review.findById(reviewId);
    if(!review.author.equals(res.locals.currUser._id)){
        req.flash("error","You are not the author of this review");
        return res.redirect(`/listings/${id}`)
    }

    next();
};