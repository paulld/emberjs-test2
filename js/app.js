//////////////////////////////////////////////////////
// 
//////////////////////////////////////////////////////

var App = Ember.Application.create({
  LOG_TRANSITIONS: true
  // LOG_TRANSITIONS can be used for debugging
});

//////////////////////////////////////////////////////
// ROUTER
//////////////////////////////////////////////////////

// The ROUTER + all ROUTES + RESOURCES comes here,
// each referring to a TEMPLATE (index, about...) and a CONTROLLER
// NB: for the 'about' Route we have change the PATH to /aboutus

// NB: Works is not a direct Route but a Resource containing other Routes

App.Router.map(function() {
  this.route('about', { path: '/aboutus' });
  this.route('credits');
  this.resource('works');
  this.resource('work', { path: '/works/:workId' });
  // this.resource('artists', function() {
  //   this.resource('artist', { path: ':artistId' });
  // });
});


//////////////////////////////////////////////////////
// ROUTES
//////////////////////////////////////////////////////

App.WorksRoute = Ember.Route.extend({
  model: function() {
    return App.WORKS;
  }
});
App.WorkRoute = Ember.Route.extend({
  model: function(params) {
    // console.log(params);
    return App.WORKS.findBy('workId', params.workId);
    // console.log(out.title);
    // return out;
  }
});

//////////////////////////////////////////////////////
// CONTROLLERS
//////////////////////////////////////////////////////

// A CONTROLLER is required for each TEMPLATE! (SCRIPT TYPE TEXT/X-HANDLEBARS)
// Name matches for the ROUTE, CONTROLLER and the TEMPLATE
// TEMPLATES use PROPERTIES from the CONTROLLER

// NB: Each template has a default controller that is created 
// 'behind the scenes'. We only need to create it if we have 
// to declare some properties for it

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

// NB: be careful: ArrayController vs. ObjectController vs. Controller
App.WorksController = Ember.ArrayController.extend({

});

App.WorkController = Ember.ObjectController.extend({

});


//////////////////////////////////////////////////////
// DUMMY DATA
//////////////////////////////////////////////////////

App.WORKS = [
  {
    workId: '1',
    title: 'Fabienne Verdier',
    price: 200000,
    type: 'Painting',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sed massa pellentesque ante tempus feugiat vel vel metus. Cras mi velit, interdum eu viverra cursus, molestie et elit. Pellentesque nec pellentesque turpis. Pellentesque vel nibh tempus, volutpat nisi ac, dictum tellus. Praesent tincidunt purus nec tellus varius, sit amet fermentum nisi sollicitudin. Proin rhoncus pretium nibh, fermentum ultrices augue rhoncus in. Donec id velit ac libero semper tincidunt. Maecenas placerat eget orci at dictum. Mauris in rhoncus mauris, auctor auctor purus. Nunc vitae tincidunt odio, dignissim consectetur nibh. Suspendisse sollicitudin luctus dui in lacinia. Pellentesque mattis arcu mauris, vitae eleifend turpis varius ut. Sed eget augue odio. Donec ac tortor eget nulla rutrum ullamcorper. Curabitur vestibulum tortor elit, vitae pretium eros mollis sed.',
    isOnSale: false,
    image: 'images/work1.png'
  },
  {
    workId: '2',
    title: 'Banksy',
    price: 300000,
    type: 'Wall painting',
    description: 'Cras eget molestie lorem. Etiam vehicula viverra tortor quis sodales. Mauris in faucibus augue. Suspendisse potenti. Mauris vitae massa ac nunc convallis dignissim. Donec et lacus at sapien tristique condimentum mattis vitae quam. Aenean arcu ipsum, dapibus ut suscipit eu, ultrices eget sapien. Vestibulum sollicitudin tellus nisl, eu vulputate erat laoreet non. Proin euismod et ipsum id molestie.',
    isOnSale: false,
    image: 'images/work2.png'
  },
  {
    workId: '3',
    title: 'Yue Minjun',
    price: 1000000,
    type: 'Painting',
    description: 'Nulla luctus, ipsum id elementum luctus, ipsum massa consequat nulla, vel venenatis sapien nisl id arcu. Etiam consectetur pretium felis et mattis. Aliquam consectetur mi sit amet adipiscing dictum. Proin enim libero, adipiscing non malesuada a, dictum ac dolor. Vivamus posuere, ligula eget condimentum convallis, leo lacus sodales ligula, sed euismod est ligula sit amet mi. Phasellus tristique porta fringilla. Mauris ullamcorper rhoncus ante, ac varius orci aliquam sed. Vivamus eu turpis vitae quam iaculis feugiat. Suspendisse varius vehicula enim vitae vulputate. Vivamus leo metus, elementum vel dui non, feugiat suscipit lacus. Vivamus varius, enim et viverra accumsan, nunc risus vestibulum nisi, vitae vulputate mauris metus nec massa. Praesent ac volutpat sapien. Donec pretium, justo et pharetra faucibus, augue mauris tincidunt enim, quis condimentum nisi nulla nec tortor. Mauris vehicula consequat nisi, aliquet placerat enim porta non. Proin ante augue, luctus ac auctor eu, vestibulum eget augue.',
    isOnSale: true,
    image: 'images/work3.png'
  },
  {
    workId: '4',
    title: 'Nathan Sawaya',
    price: 20000,
    type: 'Sculpture',
    description: 'Proin in consequat sem. Nulla vitae quam et leo volutpat commodo. Maecenas vel nisi purus. Nunc laoreet dolor nec eros imperdiet eleifend. Aliquam sollicitudin nec mauris non tristique. Sed et hendrerit dui. Cras non condimentum purus. Nam volutpat venenatis tortor. Donec a sapien non lectus sagittis iaculis. Morbi ut elit scelerisque, lacinia urna quis, pulvinar libero.',
    isOnSale: true,
    image: 'images/work4.png'
  },
];
