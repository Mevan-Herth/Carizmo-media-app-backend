const userRoutes = require('./userRoutes');
const privPostRoutes = require('./privatePostRoutes');
const pubPostRoutes = require('./publicPostRoutes');
const userProfileRoutes = require('./userProfileRoutes');
const commentRoutes = require('./commentRoutes');
const searchRoute = require('./searchRoute');
const chatbotRoutes = require('./chatbotRoutes');


module.exports = {
    userRoutes,
    privPostRoutes,
    pubPostRoutes,
    userProfileRoutes,
    commentRoutes,
    searchRoute,
    chatbotRoutes
  };