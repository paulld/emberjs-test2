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
  this.resource('works', function() {
    this.route('onsale');
  });
  this.resource('work', { path: '/works/:work_id' });
  this.resource('artists', function() {
    this.resource('artist', { path: '/:artist_id' });
  });
});


//////////////////////////////////////////////////////
// ROUTES
//////////////////////////////////////////////////////

App.IndexRoute = Ember.Route.extend({
  model: function() {
    return this.store.findAll('work');
    // var list1 = this.store.findAll('work');
    // var count1 = list1.get('length');
    // var count1 = this.store.findAll('work').get('length');
  }
});

App.WorksRoute = Ember.Route.extend({
  model: function() {
    // return App.WORKS;
    return this.store.findAll('work');
  }
});
// App.WorkRoute = Ember.Route.extend({   //NB NOT NECESSARY WITH FIXTURES!!
//   model: function(params) {
//     // console.log(params);
//     return this.store.find('work', params.work_id)
//     // console.log(out.title);
//     // return out;
//   }
// });

App.WorksOnsaleRoute = Ember.Route.extend({
  model: function () {
    return this.modelFor('works').filterBy('isOnSale');
    // return this.store.findAll('work').filterBy('isOnSale');
  }
});

App.ArtistsRoute = Ember.Route.extend({
  model: function() {
    // return App.ARTISTS;
    return this.store.findAll('artist');
  }
});
// App.ArtistRoute = Ember.Route.extend({   //NB NOT NECESSARY WITH FIXTURES!!
//   model: function(params) {
//     return this.store.find('artist', params.artist_id)
//   }
// });



//////////////////////////////////////////////////////
// EMBER DATA ADAPTER 
//////////////////////////////////////////////////////

// App.ApplicationAdapter = DS.RESTAdapter.extend();

// or

App.ApplicationAdapter = DS.FixtureAdapter.extend();


//////////////////////////////////////////////////////
// CONTROLLERS
//////////////////////////////////////////////////////

// A CONTROLLER is required for each TEMPLATE (SCRIPT TYPE TEXT/X-HANDLEBARS)
// Name matches for the ROUTE, CONTROLLER and the TEMPLATE
// TEMPLATES use PROPERTIES from the CONTROLLER

// NB: Each template has a default controller that is created 
// 'behind the scenes'. We only need to create it if we have 
// to declare some properties for it

App.ApplicationController = Ember.ArrayController.extend({
  time: function() {
    return (new Date()).toDateString()
  }.property()
});

App.IndexController = Ember.ArrayController.extend({
  // totalWorks: function() {
    // return this.get('length');
    // return this.count1;
  // }.property('length'),
  totalWorks: Ember.computed.alias('length'),
  totalArtists: 3,
  logo: 'images/ga-logo.png',
  
  workViewCount: function() {
    // return this.sortBy('workViewCount').slice(0,3);
    // return sorting
    // sortAscending: false;
    var workTotal = this.get('length');
    return this.sortBy('workViewCount').slice(workTotal-3,workTotal);  
    // return this.filter(function(work) {
    //   return work.get('workViewCount');
    // });
    // return this.filter(function(work) {
    //   sortAscending: false;
    //   return this.sortBy('workViewCount').slice(0,3);
    // });
  }.property('@each.workViewCount'),

  artistViewCount: function() {
    // return this.filterBy('artistViewCount', true).slice(0,3);
    return this.filter(function(artist) {
      return artist.get('artistViewCount');
    });
  }.property('@each.artistViewCount')
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
  // sortProperties: ['title']
  sortProperties: ['price'],
  sortAscending: false
});

// App.WorksOnsaleController = Ember.ObjectController.extend({ });
App.WorkController = Ember.ObjectController.extend({ });

App.ArtistsController = Ember.ArrayController.extend({
  sortProperties: ['lastName'],
});

App.ArtistController = Ember.ObjectController.extend({ });

//////////////////////////////////////////////////////
// MODELS
//////////////////////////////////////////////////////


App.Work = DS.Model.extend({
  title: DS.attr('string'),
  price: DS.attr('number'),
  type: DS.attr('string'),
  description: DS.attr('string'),
  isOnSale: DS.attr('boolean'),
  workViewCount: DS.attr('number'),
  image: DS.attr('string'),
  drawer: DS.belongsTo('artist', {async: true}) 
});

App.Artist = DS.Model.extend({
  firstName: DS.attr('string'),
  lastName: DS.attr('string'),
  nationality: DS.attr('string'),
  bornOn: DS.attr('string'),
  isDead: DS.attr('boolean'),
  diedOn: DS.attr('string'),
  description: DS.attr('string'),
  image: DS.attr('string'),
  artistViewCount: DS.attr('boolean'),
  works: DS.hasMany('work', {async: true}),
  comments: DS.hasMany('comment', {async: true})    //ASYNC: LOADS IN ADVANCE??
});

App.Comment = DS.Model.extend({
  text: DS.attr('string'),
  commentedAt: DS.attr('date'),
  artist: DS.belongsTo('artist')
});


//////////////////////////////////////////////////////
// DUMMY DATA
//////////////////////////////////////////////////////

App.Work.FIXTURES = [    //SPECIFIC TO FIXTURES
  {
    id: 1,
    title: 'Guernica',
    price: 2000000,
    type: 'Painting',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sed massa pellentesque ante tempus feugiat vel vel metus. Cras mi velit, interdum eu viverra cursus, molestie et elit. Pellentesque nec pellentesque turpis. Pellentesque vel nibh tempus, volutpat nisi ac, dictum tellus. Praesent tincidunt purus nec tellus varius, sit amet fermentum nisi sollicitudin. Proin rhoncus pretium nibh, fermentum ultrices augue rhoncus in. Donec id velit ac libero semper tincidunt. Maecenas placerat eget orci at dictum. Mauris in rhoncus mauris, auctor auctor purus. Nunc vitae tincidunt odio, dignissim consectetur nibh. Suspendisse sollicitudin luctus dui in lacinia. Pellentesque mattis arcu mauris, vitae eleifend turpis varius ut. Sed eget augue odio. Donec ac tortor eget nulla rutrum ullamcorper. Curabitur vestibulum tortor elit, vitae pretium eros mollis sed.',
    isOnSale: false,
    workViewCount: 10,
    image: 'images/picasso-guernica.jpg',
    drawer: 100
  },
  {
    id: 2,
    title: 'Les Demoiselles d\'Avignon',
    price: 300000000,
    type: 'Painting',
    description: 'Cras eget molestie lorem. Etiam vehicula viverra tortor quis sodales. Mauris in faucibus augue. Suspendisse potenti. Mauris vitae massa ac nunc convallis dignissim. Donec et lacus at sapien tristique condimentum mattis vitae quam. Aenean arcu ipsum, dapibus ut suscipit eu, ultrices eget sapien. Vestibulum sollicitudin tellus nisl, eu vulputate erat laoreet non. Proin euismod et ipsum id molestie.',
    isOnSale: false,
    workViewCount: 100,
    image: 'images/picasso-avignon.jpg',
    drawer: 100
  },
  {
    id: 3,
    title: 'Blue Nude',
    price: 1000000,
    type: 'Painting',
    description: 'Nulla luctus, ipsum id elementum luctus, ipsum massa consequat nulla, vel venenatis sapien nisl id arcu. Etiam consectetur pretium felis et mattis. Aliquam consectetur mi sit amet adipiscing dictum. Proin enim libero, adipiscing non malesuada a, dictum ac dolor. Vivamus posuere, ligula eget condimentum convallis, leo lacus sodales ligula, sed euismod est ligula sit amet mi. Phasellus tristique porta fringilla. Mauris ullamcorper rhoncus ante, ac varius orci aliquam sed. Vivamus eu turpis vitae quam iaculis feugiat. Suspendisse varius vehicula enim vitae vulputate. Vivamus leo metus, elementum vel dui non, feugiat suscipit lacus. Vivamus varius, enim et viverra accumsan, nunc risus vestibulum nisi, vitae vulputate mauris metus nec massa. Praesent ac volutpat sapien. Donec pretium, justo et pharetra faucibus, augue mauris tincidunt enim, quis condimentum nisi nulla nec tortor. Mauris vehicula consequat nisi, aliquet placerat enim porta non. Proin ante augue, luctus ac auctor eu, vestibulum eget augue.',
    isOnSale: false,
    workViewCount: 1,
    image: 'images/picasso-blue-nude.jpg',
    drawer: 100
  },
  {
    id: 4,
    title: 'Le Grand Masturbateur',
    price: 20000000,
    type: 'Painting',
    description: 'Proin in consequat sem. Nulla vitae quam et leo volutpat commodo. Maecenas vel nisi purus. Nunc laoreet dolor nec eros imperdiet eleifend. Aliquam sollicitudin nec mauris non tristique. Sed et hendrerit dui. Cras non condimentum purus. Nam volutpat venenatis tortor. Donec a sapien non lectus sagittis iaculis. Morbi ut elit scelerisque, lacinia urna quis, pulvinar libero.',
    isOnSale: true,
    workViewCount: 5,
    image: 'images/dali-grand-masturbateur.png',
    drawer: 101
  },
  {
    id: 5,
    title: 'Profile of Time',
    price: 20000000,
    type: 'Sculpture',
    description: 'Proin in consequat sem. Nulla vitae quam et leo volutpat commodo. Maecenas vel nisi purus. Nunc laoreet dolor nec eros imperdiet eleifend. Aliquam sollicitudin nec mauris non tristique. Sed et hendrerit dui. Cras non condimentum purus. Nam volutpat venenatis tortor. Donec a sapien non lectus sagittis iaculis. Morbi ut elit scelerisque, lacinia urna quis, pulvinar libero.',
    isOnSale: false,
    workViewCount: 8,
    image: 'images/dali-profile-of-time.jpg',
    drawer: 101
  }
]

App.Artist.FIXTURES = [    //SPECIFIC TO FIXTURES
// App.ARTISTS = [
  {
    id: 100,
    firstName: 'Pablo',
    lastName: 'Picasso',
    nationality: 'Spanish',
    bornOn: '25 October 1881',
    isDead: true,
    diedOn: '8 April 1973 (aged 91)',
    description: 'Pablo Ruiz y Picasso, also known as Pablo Picasso, was a Spanish painter, sculptor, printmaker, ceramicist, stage designer, poet and playwright who spent most of his adult life in France. As one of the greatest and most influential artists of the 20th century, he is known for co-founding the Cubist movement, the invention of constructed sculpture, the co-invention of collage, and for the wide variety of styles that he helped develop and explore. Among his most famous works are the proto-Cubist Les Demoiselles d\'Avignon (1907), and Guernica (1937), a portrayal of the German bombing of Guernica during the Spanish Civil War.',
    image: 'images/artist1.png',
    artistViewCount: true,
    comments: [200,201],    //SPECIFIC TO FIXTURES
    works: [1,2,3]
  },
  {
    id: 101,
    firstName: 'Salvador',
    lastName: 'Dali',
    nationality: 'Spanish',
    bornOn: 'May 11, 1904',
    isDead: true,
    diedOn: 'January 23, 1989 (aged 84)',
    description: 'Salvador Domingo Felipe Jacinto Dali i Domenech, 1st Marques de Dali de Pubol, known as Salvador Dali, was a prominent Spanish Catalan surrealist painter born in Figueres, Spain. Dali was a skilled draftsman, best known for the striking and bizarre images in his surrealist work. His painterly skills are often attributed to the influence of Renaissance masters. His best-known work, The Persistence of Memory, was completed in August 1931. Dali\'s expansive artistic repertoire included film, sculpture, and photography, in collaboration with a range of artists in a variety of media. Dali attributed his "love of everything that is gilded and excessive, my passion for luxury and my love of oriental clothes" to an "Arab lineage", claiming that his ancestors were descended from the Moors. Dali was highly imaginative, and also enjoyed indulging in unusual and grandiose behavior. His eccentric manner and attention-grabbing public actions sometimes drew more attention than his artwork, to the dismay of those who held his work in high esteem, and to the irritation of his critics.',
    image: 'images/artist2.png',
    artistViewCount: false,
    comments: [202],    //SPECIFIC TO FIXTURES
    works: [4,5]
  },
  {
    id: 102,
    firstName: 'Rene',
    lastName: 'Magritte',
    nationality: 'Belgian',
    bornOn: '21 November 1898',
    isDead: true,
    diedOn: '15 August 1967 (aged 68)',
    description: 'Rene Francois Ghislain Magritte was a Belgian surrealist artist. He became well known for a number of witty and thought-provoking images that fall under the umbrella of surrealism. His work is known for challenging observers\' preconditioned perceptions of reality.',
    image: 'images/artist3.png',
    artistViewCount: true,
  },
  {
    id: 103,
    firstName: 'Andy',
    lastName: 'Warhol',
    nationality: 'American',
    bornOn: 'August 6, 1928',
    isDead: true,
    diedOn: 'February 22, 1987 (aged 58)',
    description: 'Andy Warhol was an American artist who was a leading figure in the visual art movement known as pop art. His works explore the relationship between artistic expression, celebrity culture and advertisement that flourished by the 1960s. After a successful career as a commercial illustrator, Warhol became a renowned and sometimes controversial artist. The Andy Warhol Museum in his native city, Pittsburgh, Pennsylvania, holds an extensive permanent collection of art and archives. It is the largest museum in the United States dedicated to a single artist. Warhol\'s art encompassed many forms of media, including hand drawing, painting, printmaking, photography, silk screening, sculpture, film, and music. He was also a pioneer in computer-generated art using Amiga computers that were introduced in 1984, two years before his death. He founded Interview Magazine and was the author of numerous books, including The Philosophy of Andy Warhol and Popism: The Warhol Sixties. He is also notable as a gay man who lived openly as such before the gay liberation movement.',
    image: 'images/artist4.png',
    artistViewCount: true,
    comments: [203]    //SPECIFIC TO FIXTURES
  }
]

App.Comment.FIXTURES = [    //SPECIFIC TO FIXTURES
  {
    id: 200,
    artist: 1,
    text: 'Great artist!',
  },
  {
    id: 201,
    artist: 1,
    text: 'I love him too!',
  },
  {
    id: 202,
    artist: 2,
    text: 'I\'ve seen everything he did!',
  },
  {
    id: 203,
    artist: 4,
    text: 'I have 2 of his paintings in my bathroom', 
  }
]