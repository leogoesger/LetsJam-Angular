(function() {
     function SongPlayer() {
        var SongPlayer = {};

        var currentSong = null;
     	var currentBuzzObject = null;
        SongPlayer.play = function(song) {
        	if (currentSong !== song) {
             	if (currentBuzzObject) {
                 	currentBuzzObject.stop();
             	}

            	currentBuzzObject = new buzz.sound(song.audioUrl, {
               		formats: ['mp3'],
               		preload: true
           		});

 		   		currentSong = song;
           		currentBuzzObject.play();   
           	} else if (currentSong === song) {
         		if (currentBuzzObject.isPaused()) {
             	currentBuzzObject.play();
         		}
     		}
        };

        return SongPlayer;
     }
 
     angular
         .module('blocJams')
         .factory('SongPlayer', SongPlayer);
 })();