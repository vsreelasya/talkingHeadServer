// Player code
var xhttp;
function gup( name, url ) {
    if (!url) url = location.href;
    name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
    var regexS = "[\\?&]"+name+"=([^&#]*)";
    var regex = new RegExp( regexS );
    var results = regex.exec( url );
    return results == null ? null : results[1];
}

function onLoad() {
    // On startup, the player load's it's content - this would normally be dynamically generated
    xhttp = new XMLHttpRequest();
    xhttp.open("GET", "Sample.xml", false);	// Must be on the same domain
    xhttp.send();
    xmlDoc = xhttp.responseXML;
    onContentLoaded(xmlDoc)
}

var responses = [];

function onContentLoaded(xmlDoc) {
//     var s = '';
//     s += '<table border="0" padding="0" width="100%" height="100%"><tr>';
//     s += '<td width="200" align="center">';
//     s += '<div id="Movie1" style="width:200px; height:250px"></div>';
//     //s += '<br/><textarea id="talking1" name="talking1">This is a test</textarea>';
//     //s += '<br/><button type="button" onclick="Speak1()">Speak</button>';
//     //	s += '<br/><button type="button" onclick="response1()">Ask</button>';
//     //	s += '<br/><button type="button" onclick="Play1()">Play</button>';
//     s += '</td>';
//     s += '</tr></table>';
//     document.getElementById('TopDiv').innerHTML = s;

            var s = '';
            // s += '<table border="0" padding="0" width="100%"><tr>';
            // s += '<td width="200" align="center">';
            // s += '<div id="Movie1" style="width:200px; height:250px"></div>';
            // s += '<br/><textarea id="talking1" name="talking1">This is a test</textarea>';
            // s += '<br/><button type="button" onclick="Speak1()">Speak</button>';
            // s += '<br/><button type="button" onclick="response1()">Ask</button>';
            // s += '<br/><button type="button" onclick="Play1()">Play</button>';
            // s += '</td>';
            // s += '<td width="100%">';
            // s += '</td>';
            // s += '<td width="200" align="center">';
            // s += '<div id="Movie2" style="width:200px; height:250px"></div>';
            // s += '<br/><textarea id="talking2" name="talking2">This is a test</textarea>';
            // s += '<br/><button type="button" onclick="Speak2()">Speak</button>';
            // s += '<br/><button type="button" onclick="response2()">Ask</button>';
            // s += '<br/><button type="button" onclick="Play2()">Play</button>';
            // s += '</td>';
            // s += '</tr></table>';

            s += '<table border="0" padding="0" width="100%"><tr>';
            s += '<td width="200" align="center">';
            s += '<div id="Movie1" style="width:200px; height:250px"></div>';
            s += '</td>';
            s += '<td width="100px">';
            s += '</td>';
            s += '<td width="200" align="center">';
            s += '<div id="Movie2" style="width:200px; height:200px"></div>';
            s += '</td>';
            s += '</tr></table>';

            document.getElementById('TopDiv').innerHTML = s;



    msAttach('Movie1', 'BenAS3HTML', 'http://www.x-in-y.com/THAddon/player/Output/BenAS3HTML_Files', 200, 250);
    msAttach('Movie2', 'Angela', 'http://www.x-in-y.com/THAddon/player/Output/Angela_FILES', 200, 250);
}

function Speak1(text) {
    Speak("Movie1", text);
}
function Speak2(text) {
    Speak("Movie2", text);
}

function Play1() {
    Play("Movie1", talking1.value);
}
function Play2() {
    Play("Movie2", talking2.value);
}

function response1() {
    response("Movie1", talking1.value);
}

function response2() {
    response("Movie2", talking2.value);
}


function Play(movieID, Text) {
    alert("Playing " + " " + movieID + "   " + Text + " Not implemented yet ");
    //	msPlay(movieID, Text);
}

function Speak(movieID, Text) {

    msSpeak(movieID, Text);
}
function response(movieID, Text) {
    alert("Response " + " " + movieID + "   " + Text + " Not implemented yet ");
    //	msResponse(movieID, Text);
}

function onSceneLoaded(id) {
    // CB content loaded and ready to accept commands - will get N of these where N is # of characters
}
function onPresentingChange(id, p) {
    // Presenting state changed, e.g. as a result of going idle
    //if (p == false) alert("Character idle");
}
function onFocusChange(id, f) {
    // Focus changed, e.g. as a result of navigation
}
function onExternalCommand(id, cmd, args) {
    // External Command encountered in script
    //alert("External Command cmd=" + cmd + ", args=" + args);
}
function onQueueLengthChange(id, n) {
    // msSpeakQueued queue length change
}
function onVariableChange(id, n) {
    // One or more variables changed
}
// Others
$(document).ready(function(){
  onLoad();

    function splitmessages(msgJSON){
        return JSON.parse(unescape( msgJSON ));
    }

  function explode(){
    var messages = splitmessages(gup('text', window.location.href));
    // function doSpeak(messages, i) {
    //   var timer = 1000 * 2 * (i+1);
    //   setTimeout(function() {
    //     Speak1(messages[i]['t']);
    //   }, timer);
    // }
    function doSpeak1(messages, i, timer) {
      // var timer = 1000 * (i+1);
      setTimeout(function() {
        Speak1(messages[i]['t']);
      }, timer);
    };

    function doSpeak2(messages, i, timer) {
      // var timer = 1000 (i+1);
      setTimeout(function() {
        Speak2(messages[i]['t']);
      }, timer);
    };

    var timer = 1000;
    function setT(timer){
        return timer + 3000;
    }
    for (var i=0; i<messages.length;i++){
          console.log("MESSAFES" + messages[i]['g']);
          if(messages[i]['g'] == "0"){
            doSpeak1(messages, i, timer);
            timer = setT(timer)
            console.log("GEN:" + "1");
          } else{
            doSpeak2(messages, i, timer);
            timer = setT(timer)
            console.log("GEN:" + "2");
          }
    };
  };
  explode();
});
