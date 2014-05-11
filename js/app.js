var App = Ember.Application.create({
  LOG_TRANSITIONS: true
  // LOG_TRANSITIONS can be used for debugging
});

// THE ROUTER + ALL ROUTES COMES HERE, REFERS TO A TEMPLATE (index, about...)
App.Router.map(function() {
  this.route('about', { path: '/aboutus' });
  this.route('credits');
});


// THE CONTROLLER IS REQUIRED FOR EACH TEMPLATE! (SCRIPT TYPE TEXT/X-HANDLEBARS)
App.IndexController = Ember.Controller.extend({
  productsCount: 6,
  logo: 'images/ga-logo.png',
  time: function() {
    return (new Date()).toDateString()
  }.property()
});

App.AboutController = Ember.Controller.extend({
  today: function() {
    return (new Date()).toDateString()
  }.property(),
  open: function() {
    if ( (new Date()).getDay() === 6) {
      return 'Closed';
    } else {
      return 'Open';
    }
  }.property()
});

// NB: each template has a default controller that is created 
// 'behind the scenes'. We only need to create it if we have 
// to declare some properties for it

