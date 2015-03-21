var albumPicasso = {
  name: 'The Colors',
  artist: 'Pablo Picasso',
  label: 'Cubism',
  year: '1881',
  albumArtUrl: '/images/album-placeholder.png',
  songs: [
    { name: 'Blue', length: '4:26' },
    { name: 'Green', length: '3:14' },
    { name: 'Red', length: '5:01' },
    { name: 'Pink', length: '3:21'},
    { name: 'Magenta', length: '2:15'}
  ]
};

blocJams = angular.module('BlocJams', ['ui.router']);

blocJams.config(['$stateProvider', '$locationProvider', function($stateProvider, $locationProvider){
  $locationProvider.html5Mode(true);

  $stateProvider.state('landing', {
    url: '/',
    controller: 'Landing.controller',
    templateUrl: '/templates/landing.html'
  });

  $stateProvider.state('collection', {
    url: '/collection',
    controller: 'Collection.controller',
    templateUrl: '/templates/collection.html'
  });

  $stateProvider.state('album', {
    url: '/album',
    controller: 'Album.controller',
    templateUrl: '/templates/album.html'
  });

  $stateProvider.state('song', {
    url: '/song',
    controller: 'Song.controller',
    templateUrl: '/templates/song.html'
  });
}]);

blocJams.controller('Landing.controller', ['$scope', 'ConsoleLogger', function($scope, ConsoleLogger) {
  ConsoleLogger.log();
  function shuffle(o) {
    for (var i = o.length; i > 0; i--) {
      var j = Math.floor(Math.random() * i);
      var x = o[i-1];
      o[i-1] = o[j];
      o[j] = x;
    } 
    return o;
  };
  $scope.subText = "Turn the music up!";
  $scope.appName = "Bloc Jams"
  $scope.subTextClicked = function() {
    $scope.subText += '!';
  };
  $scope.albumURLs = [
    '/images/album-placeholders/album-1.jpg',
    '/images/album-placeholders/album-2.jpg',
    '/images/album-placeholders/album-3.jpg',
    '/images/album-placeholders/album-4.jpg',
    '/images/album-placeholders/album-5.jpg',
    '/images/album-placeholders/album-6.jpg',
    '/images/album-placeholders/album-7.jpg',
    '/images/album-placeholders/album-8.jpg',
    '/images/album-placeholders/album-9.jpg',
  ];
  $scope.shuffleImages = function() {
    shuffle($scope.albumURLs);
  };
}]);

blocJams.controller('Collection.controller', ['$scope', 'ConsoleLogger', function($scope, ConsoleLogger) {
  ConsoleLogger.log();
  $scope.hideOverlay = true;
  $scope.albums = [];
  for (var i = 0; i < 33; i++) {
    $scope.albums.push(angular.copy(albumPicasso));
  }
}]);

blocJams.controller('Album.controller', ['$scope', 'SongPlayer', 'ConsoleLogger', function($scope, SongPlayer, ConsoleLogger) {
  $scope.string = consoleLogger.string;

  ConsoleLogger.log();
  $scope.album = angular.copy(albumPicasso);
  var hoveredSong = null;

  $scope.onHoverSong = function(song) {
    hoveredSong = song;
  };

  $scope.offHoverSong = function(song) {
    hoveredSong = null;
  };

  $scope.getSongState = function(song) {
    if (song === SongPlayer.currentSong && SongPlayer.playing) {
      return 'playing';
    }
    else if (song === hoveredSong) {
      return 'hovered';
    }
    return 'default';
  };

  $scope.playSong = function(song) {
    SongPlayer.setSong($scope.album, song);
    SongPlayer.play();
  };

  $scope.pauseSong = function(song) {
    SongPlayer.pause();
  };
}]);

blocJams.controller('Song.controller', ['$scope', 'ConsoleLogger', function($scope, ConsoleLogger) {
  ConsoleLogger.log();
  console.log("Song Template");
}]);

blocJams.controller('PlayerBar.controller', ['$scope', 'SongPlayer', 'ConsoleLogger', function($scope, SongPlayer, ConsoleLogger) {
  ConsoleLogger.log();
  $scope.songPlayer = SongPlayer;
}]);

blocJams.service('SongPlayer', function() {
  return {
    currentSong: null,
    currentAlbum: null,
    playing: false,

    play: function() {
      this.playing = true;
    },

    pause: function() {
      this.playing = false;
    },

    setSong: function(album, song) {
      this.currentAlbum = album;
      this.currentSong = song;
    }
  };
});

blocJams.service('ConsoleLogger', function() {
  return {
    string: "",

    log: function() {
      // this.string = inputString;
      console.log(this.string);
    }
  };
});
