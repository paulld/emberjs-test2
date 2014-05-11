var App = Ember.Application.create({
  LOG_TRANSITIONS: true
  // LOG_TRANSITIONS can be used for debugging
});

// THE ROUTER + ALL ROUTES COMES HERE
App.Router.map(function() {
  this.route('about', { path: '/aboutus' });
  this.route('credits');
});