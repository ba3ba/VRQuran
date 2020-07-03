var obj = new Object({
first: 0,
last: 0,
repeat: 0
});
var p = document.getElementById("p");


//Aanyang get the three
if(annyang){
  var cmnd1 = {"chapter :chapter":function(chapter){
    p.innerHTML = "chapter" + chapter;
    sessionStorage.setItem("chapter",chapter);
  }};
  var cmnd2 = {"verse :verse":function(verse){
    p.innerHTML = p.innerHTML + "verse " + verse;
    sessionStorage.setItem("verse1",verse);
  }};
  var cmnd3 = {"on verse :verse2": function(verse2){
    p.innerHTML = p.innerHTML + " to verse " + verse2;
    sessionStorage.setItem("verse2",verse2);
  }};

  var cmnd4 = {"repeat :repeat" : function(repeat){
    p.innerHTML = p.innerHTML + 'repeat ' + repeat + ' times';
    sessionStorage.setItem('repeat',repeat);
  }};

  annyang.addCommands(cmnd1);
  annyang.addCommands(cmnd2);
  annyang.addCommands(cmnd3);
  annyang.addCommands(cmnd4);
  annyang.start();
}

//Get Button and AudioTags
var button = document.getElementById("but"); 

//setting difference
if(sessionStorage.getItem('repeat')){
  console.log("repeat finished");
var verse1 = sessionStorage.getItem("verse1");
var verse2 = sessionStorage.getItem("verse2");
var chapterNum = sessionStorage.getItem('chapter');
var repeat = sessionStorage.getItem('repeat');
var temp =0;
var vc = sessionStorage.getItem("chapter");
if(vc == "one") 
  vc = 1; 







for(var i = verse1;i< verse2-verse1+2;i++){
  var xhr = new XMLHttpRequest();    
xhr.open('GET','http://api.alquran.cloud/v1/ayah/' + i.toString()  + '/ar.alafasy',true)
xhr.onreadystatechange = function(){
  if(this.readyState == 4 && this.status == 200){
    var result = JSON.parse(this.response);
    result = result.data.audio;
    sessionStorage.setItem(temp.toString(), result);
    temp++;
  }

}





xhr.send();




}

}



document.getElementById("Play").addEventListener('click',function(){
  var index = 0;
  document.body.appendChild(document.createElement('audio'));
  var audio = document.getElementsByTagName('audio')[0];
  audio.src = sessionStorage.getItem(index.toString());
  audio.play();

  audio.onended = function() {
        index = index + 1;
        audio.src = sessionStorage.getItem(index.toString());
        audio.play();
  };



});