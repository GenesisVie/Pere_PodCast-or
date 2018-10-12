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
  var url = "https://cors-anywhere.herokuapp.com/http://rss.cnn.com/services/podcasting/studentnews/rss.xml";
  requete_ajax.open('GET', url, true);
  requete_ajax.ContentType = "text/xml";
  requete_ajax.overrideMimeType('text/xml');
  requete_ajax.send();
  requete_ajax.onload = function(){
    if (requete_ajax.status === 200){
      var req = requete_ajax.responseXML;
      var titre = req.getElementsByTagName("title")[0];
      var source = req.getElementsByTagName("link")[0];
      document.getElementById("p_titre").innerHTML = titre.childNodes[0].nodeValue;
      document.getElementById("p_source").innerHTML = source.childNodes[0].nodeValue;
      var title = [];
      fetch(url).then((res) => {
        res.text().then((xmlTxt) => {
        var domParser = new DOMParser()
        let doc = domParser.parseFromString(xmlTxt, 'text/xml')
        doc.querySelectorAll('item').forEach((item) => {
          //récupération de l'url du média
          var enclosure = item.getElementsByTagName("enclosure")[0];
          var link = enclosure.attributes[0].value;
          //affichage de la vidéo
          document.getElementById("videoPlayer").innerHTML = "<source src=" + link + "type=video/mp4>";
          //récupération des titres
          var current_title = item.getElementsByTagName("title")[0].childNodes[0].nodeValue;
          //ajout des titres dans une liste
          document.getElementById('queue').innerHTML += '<li>' + current_title + '</li>';
          console.log(item);
          })
        })
      })
      console.log(title);
    }
  }
}
