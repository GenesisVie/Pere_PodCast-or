function play(idPlayer, control) {
    var player = document.querySelector('#' + idPlayer);
    if (player.paused) {
        player.play();
        control.className = 'fas fa-pause';
    } else {
        player.pause();
        control.className = "fas fa-play";
    }
  }

function stoped(idPlayer) {
    var player = document.querySelector('#' + idPlayer);
    var progress = document.querySelector('#progress');

    player.currentTime = 0;
    player.pause();
    progress.value = 0;
}

var videoCount = 0;

function next(idPlayer) {
  var items = [];
  var url = "https://cors-anywhere.herokuapp.com/http://rss.cnn.com/services/podcasting/studentnews/rss.xml";
  fetch(url).then((res) => {
    res.text().then((xmlTxt) => {
    var domParser = new DOMParser()
    let doc = domParser.parseFromString(xmlTxt, 'text/xml')
    doc.querySelectorAll('item').forEach((item) => {
      items.push(item);
    });
    });
  });
  videoCount ++;
  console.log(items);
  var item = items[videoCount];
  var enclosure = item.getElementsByTagName("enclosure")[0];
  var link = enclosure.attributes[0].value;
  document.getElementById("videoPlayer").innerHTML = "";
  document.getElementById("videoPlayer").innerHTML = "<source src=" + link + "type=video/mp4>";
}

function muted(idPlayer) {
    var player = document.querySelector('#' + idPlayer);
    player.muted = !player.muted ;
}

function addRss(){
  document.getElementById('queue').innerHTML = "";
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
      var items = [];
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
          items.push(item);
        });
      });
    });
  }
  }


}

var player = document.querySelector('#videoplayer');
var progress = document.querySelector('#progress');
var progressBar = document.querySelector('#progress-bar');

player.addEventListener('loadstart', function() {
   progress.setAttribute('max', player.duration);
});

player.addEventListener('timeupdate', function() {
   progress.value = player.currentTime;
   progressBar.style.width = Math.floor((player.currentTime / player.duration) * 100) + '%';
});

player.addEventListener('timeupdate', function() {
   if (!progress.getAttribute('max')) progress.setAttribute('max', player.duration);
   progress.value = player.currentTime;
   progressBar.style.width = Math.floor((player.currentTime / player.duration) * 100) + '%';
});
