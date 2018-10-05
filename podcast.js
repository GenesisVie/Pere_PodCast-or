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

function addRss(){
  var requete_ajax = new XMLHttpRequest();

  requete_ajax.open('GET', 'https://crossorigin.me/http://radiofrance-podcast.net/podcast09/rss_16877.xml', true);
  requete_ajax.ContentType = "text/xml";
  requete_ajax.overrideMimeType('text/xml');
  requete_ajax.send();

  var req = requete_ajax.responseXML;
  var titre = req.getElementsByTagName("title")[0];
  var source = req.getElementsByTagName("source")[0];

   
  document.getElementById("p_titre").innerHTML = titre.childNodes[0].nodeValue;
  document.getElementById("p_source").innerHTML = source.childNodes[0].nodeValue;
}
//Access-Control-Allow-Origin: *;
