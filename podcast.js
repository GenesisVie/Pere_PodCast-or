function play(idPlayer, control) {
    var player = document.querySelector('#' + idPlayer);

    if (player.paused) {
        player.play();
        control.textContent = 'Pause';
    } else {
        player.pause();
        control.textContent = 'Play';
    }
}

function resume(idPlayer) {
    var player = document.querySelector('#' + idPlayer);

    player.currentTime = 0;
    player.pause();
}
<<<<<<< HEAD
}
=======

function addRss(){
  var requete_ajax = new XMLHttpRequest();
 
  requete_ajax.open('GET', 'https://crossorigin.me/http://radiofrance-podcast.net/podcast09/rss_16877.xml', true);
  requete_ajax.send(null);
   
  var req = requete_ajax.responseXML;
  var titre = req.getElementsByTagName("titre");
  var source = req.getElementsByTagName("source");
   
  document.getElementById("p_titre").innerHTML = titre[0].firstChild.nodeValue;
  document.getElementById("p_source").innerHTML = source[0].firstChild.nodeValue;
}
//Access-Control-Allow-Origin: *;
>>>>>>> some adv
