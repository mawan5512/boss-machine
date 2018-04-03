const checkMillionDollarIdea = ((req, res, next) => {
    const {numWeeks, weeklyRevenue} = req.body;
    if(numWeeks && weeklyRevenue){
        if(Number(numWeeks) * Number(weeklyRevenue) >= 1000000){
            next();
        } else {
            res.status(400).send();
        }
    } else {
        res.status(400).send();
    }
});

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
