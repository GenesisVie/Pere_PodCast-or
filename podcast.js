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
      fetch(url).then((res) => {
        res.text().then((xmlTxt) => {
        var domParser = new DOMParser()
        let doc = domParser.parseFromString(xmlTxt, 'text/xml')
        doc.querySelectorAll('item').forEach((item) => {
          var link = item.childNodes[28].attributes[0].value;
          document.getElementById("videoPlayer").innerHTML = "<source src=" + link + "type=video/mp4>";
          //affiche la dernière vidéo de la liste de vidéo
          //à faire : afficher la première vidéo
          //          stocker la liste des vidéos dans le tableau
          console.log(link);
       })
     })
})
    }
  }
}
