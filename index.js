
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



var temp2 = 0;
var p = document.getElementById("p");

//Array Length 113
var toX = [7,293,493,669,789,954,1160,1235,1364,1473,1596,1707,1750,1802,1901,2029,2140,2250,2348,2483,2595,2673,2791,2855,2932,3159,3252,3340,3409,3469,3503,3533,3606,3660,3705,3788,3970,4058,4133,4218,4272,4325,4414,4473,4510,4545,4583,4612,4630,4675,4735,4784,4846,4901,4979,5075,5104,5126,5150,5163,5177,5188,5199,5217,5229,5241,5271,5323,5375,5419,5447,5475,5495,5551,5591,5622,5672,5712,5758,5800,5829,5848,5884,5909,5931,5948,5967,5993,6023,6043,6058,6079,6090,6098,6106,6125,6130,6138,6146,6157,6168,6176,6179,6188,6193,6197,6204,6207,6213,6216,6221,6225,6230];







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
//var vc = sessionStorage.getItem("chapter");












for(var i = verse1;i < verse2-verse1+2;i++){
  var xhr = new XMLHttpRequest();   
  var g = i; 
  if(chapterNum != 1){
     g = parseInt(toX[chapterNum-2]) + parseInt(i);
     //console.log(chapterNum-2);

  }
xhr.open('GET','https://api.alquran.cloud/v1/ayah/' + g.toString()  + '/ar.alafasy',true)
xhr.onreadystatechange = function(){
  if(this.readyState == 4 && this.status == 200){
   
    var result = JSON.parse(this.response);
    
    sessionStorage.setItem(result.data.number, result.data.audio);
    temp++;
  }

}





xhr.send();




}

}



document.getElementById("Play").addEventListener('click',function(){

  var y = 0;
  document.body.appendChild(document.createElement('audio'));
  var audio = document.getElementsByTagName('audio')[0];
  var t  = parseInt(toX[chapterNum-2]) + parseInt(verse1);
  audio.src = sessionStorage.getItem(t.toString());
  console.log("this is the og");
  audio.play();

  audio.onended = function() {
     
  if(t <= parseInt(toX[chapterNum-2]) + parseInt(verse2) && y < repeat){
       t = t + 1;
        audio.src = sessionStorage.getItem(t.toString());
        console.log("this is t1" + t);
        audio.play();
  }
   else if(y<repeat){
  y=y+1;
   t = parseInt(toX[chapterNum-2]) + parseInt(verse1);
   audio.src = sessionStorage.getItem(t.toString());
   console.log("this is t2" + t + "-" + y);
   audio.play();

  }

  };

});