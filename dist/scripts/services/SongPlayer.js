(function() {
     function SongPlayer(Fixtures) {
        var SongPlayer = {};

        var currentAlbum = Fixtures.getAlbum();        
 /**
 * @desc Buzz object audio file
 * @type {Object}
 */
     	var currentBuzzObject = null;
 /**
 * @function setSong
 * @desc Stops currently playing song and loads new audio file as currentBuzzObject
 * @param {Object} song
 */
	 	var setSong = function(song) {
		    if (currentBuzzObject) {
		        currentBuzzObject.stop();
		        SongPlayer.currentSong.playing = null;
		    }
		 
		    currentBuzzObject = new buzz.sound(song.audioUrl, {
		        formats: ['mp3'],
		        preload: true
		    });
		 
		    SongPlayer.currentSong = song;
		};
 /**
 * @function playSong
 * @desc currentBuzzObject to play, and set song.playing to true
 * @param {Object} song
 */
        var playSong = function(song){
            currentBuzzObject.play();
            song.playing = true;
        }
 /**
 * @function stopSong
 * @desc currentBuzzObject to play, and set song.playing to true
 * @param {Object} song
 */
        var stopSong = function(){
            currentBuzzObject.stop();
            song.playing = null;
        }
        
        var getSongIndex = function(song) {
            return currentAlbum.songs.indexOf(song);
        };
        
        SongPlayer.currentSong = null;

        SongPlayer.play = function(song) {
            song = song || SongPlayer.currentSong;
        	if (SongPlayer.currentSong !== song) {
             	setSong(song);
             	playSong(song);
           	} else if (SongPlayer.currentSong === song) {
         		if (currentBuzzObject.isPaused()) {
                 	playSong(song);
         		}
     		}
        };
        SongPlayer.pause = function(song) {
            song = song || SongPlayer.currentSong;
		    currentBuzzObject.pause();
		    song.playing = false;
		};
/**
* @function previous/next
* @desc get currentSongIndex using getSongIndex, and minus/add it by one
* @para na
*/
        SongPlayer.previous = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex--;

            if (currentSongIndex < 0) {
                stopSong();
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        }

        SongPlayer.next = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex++;

            if (currentSongIndex > currentAlbum.songs.length - 1){
                stopSong()
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        }

        return SongPlayer;
     }
 
     angular
         .module('blocJams')
         .factory('SongPlayer', SongPlayer);
 })();