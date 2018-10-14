//liens testés : http://rss.cnn.com/services/podcasting/studentnews/rss.xml
//http://radiofrance-podcast.net/podcast09/rss_17974.xml

function play(idPlayer, control) {
    var player = document.querySelector('#' + idPlayer);
    var getBtn = document.getElementById('playpause');
    var getIcon = document.getElementById('icon');

    if (player.paused) {
        player.play();
        getIcon.classList.remove('fa-play');
        getIcon.classList.add('fa-pause');
    } else {
        player.pause();
        getIcon.classList.remove('fa-pause');
        getIcon.classList.add('fa-play');
    }
  }

function stoped(idPlayer) {
    var player = document.querySelector('#' + idPlayer);
    var progress = document.querySelector('#progress');
    var getBtn = document.getElementById('playpause');
    var getIcon = document.getElementById('icon');
    if (player.play){
      getIcon.classList.remove('fa-pause');
      getIcon.classList.add('fa-play');
    }
    player.currentTime = 0;
    player.pause();
    progress.value = 0;

}

var videoCount = 0;
//pas très propre à notre avis car demande de refaire une requete
function next(idPlayer) {
  var player = document.querySelector('#' + idPlayer);
  var getBtn = document.getElementById('playpause');
  var getIcon = document.getElementById('icon');
  //Clear title
  document.getElementById('title').innerHTML = "";
  //icon
  if (player.play){
    getIcon.classList.remove('fa-play');
    getIcon.classList.add('fa-pause');
  }
  player.pause();
  //clear video
  player.innerHTML = " ";
  //start
  //array de lien
  var links = [];
  //array de titre
  var titles = [];
  var requete_ajax = new XMLHttpRequest();
  var clean_url = document.querySelector('#rsslink').value;
  var url = "https://cors-anywhere.herokuapp.com/"+clean_url;
  requete_ajax.open('GET', url, true);
  requete_ajax.send();
  requete_ajax.onload = function(){
  if (requete_ajax.status === 200){
    fetch(url).then((res) => {
      res.text().then((xmlTxt) => {
      var domParser = new DOMParser()
      let doc = domParser.parseFromString(xmlTxt, 'text/xml')
      doc.querySelectorAll('item').forEach((item) => {
        //récupération des liens
        var enclosure = item.getElementsByTagName("enclosure")[0];
        var link = enclosure.attributes[0].value;
        //récupération des titres
        var current_title = item.getElementsByTagName("title")[0].childNodes[0].nodeValue;
        //stockage dans les arrays
        titles.unshift(current_title);
        links.unshift(link);
      });
      //incrémentation
      videoCount ++;
      link = links[videoCount];
      title = titles[videoCount];
      //affichage titre et vidéo suivante
      document.getElementById('title').innerHTML = title;
      player.innerHTML = "<source src=" + link + "type=video/mp4>";
      player.load();
      });
    });
  }
};
}

//bouton mute / unmute
function muted(idPlayer) {
    var player = document.querySelector('#' + idPlayer);
    player.muted = !player.muted ;
}

//ajout d'un lien RSS
function addRss(idPlayer){
  var player = document.querySelector('#' + idPlayer);
  var getBtn = document.getElementById('playpause');
  var getIcon = document.getElementById('icon');
  //clear video
  player.innerHTML = " ";
  //icon
  if (player.play){
    getIcon.classList.remove('fa-play');
    getIcon.classList.add('fa-pause');
  }
  //vide la file d'attente
  document.getElementById('queue').innerHTML = "";
  //clear title
  document.getElementById('title').innerHTML = "";
  //affichage message d'attente
  document.getElementById('wait').innerHTML = "Please wait...";
  //requete_ajax
  var requete_ajax = new XMLHttpRequest();
  var clean_url = document.querySelector('#rsslink').value;
  var url = "https://cors-anywhere.herokuapp.com/"+clean_url;
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
      var titles = [];
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
          //suppression message d'attente
          document.getElementById('wait').innerHTML = "";
          //ajout des titres dans une liste
          titles.unshift(current_title);
          //affichage titre
          document.getElementById('title').innerHTML = current_title;
          player.load();
        });
        titles.forEach(function(element) {
          document.getElementById('queue').innerHTML += '<li>' + element + '</li>';
        });
      });
    });
  }
};
//progress bar
var player = document.querySelector('#videoPlayer');
var progress = document.querySelector('#progress');
var progressBar = document.querySelector('#progress-bar');

player.addEventListener('load', function() {
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
}
