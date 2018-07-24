/* Load options to target */

function initialSetUp(){
  var noOfSections = document.getElementById("myPage").getElementsByTagName("section");

  for( let i = 0 ; i < noOfSections.length ; i++){
  document.getElementsByTagName("section")[i].setAttribute("style","display : none");
  }
  document.getElementById("home").style.display = "block";
  document.getElementById("homePage").style.display = "block";

  document.getElementById("menuDropDown").style.display = "none";

  typeSlowely();
}

function menuOption(){
  var noOfSections = document.getElementById("myPage").getElementsByTagName("section");

  for( let i = 0 ; i < noOfSections.length ; i++){
  document.getElementsByTagName("section")[i].setAttribute("style","display : none");
  }
  document.getElementById("homePage").style.display = "none";
  document.getElementById("menuDropDown").parentElement.style.display = "block";
  document.getElementById("menuDropDown").style.display = "block";
  document.getElementById("homePageButton").style.display = "block";
  
}

/* home page text animation*/
var i = 0;
var txt = "something about you which u want to display ...........";
var speed = 50 ; /* speed/duration in millisecond */
function typeSlowely(){
  if(i< txt.length){
      document.getElementById("msg").innerHTML += txt.charAt(i);
      i++;
      setTimeout(typeSlowely,speed);
  }


}


function loadEducation(){
  document.getElementById("Edu").style.display = "block";
  document.getElementById("skil").style.display = "none";
  document.getElementById("work").style.display = "none";
 // document.getElementById("infoBar").style.position = "relative";
}

function loadSkill(){
  document.getElementById("Edu").style.display = "none";
  document.getElementById("skil").style.display = "block";
  document.getElementById("work").style.display = "none";

  //load all skills and display
  let skillSet =localStorage.getItem("SKILL");
    if(skillSet !== null && skillSet !== undefined){
        let skillArray = skillSet.split(',');
        let sizeEle=skillArray.length;
        if(sizeEle>0){
           for(let i=0 ;i< sizeEle;i++ ){
               displaySkill(skillArray[i]);
           }
        }
    }
 // document.getElementById("infoBar").style.position = "relative";
}

function displaySkill(uSkill){ 
                let uSkillDec = localStorage.getItem(uSkill);
                let presentedData = uSkill + "   " + uSkillDec;
                let listNode= document.getElementById("skillList");
                let liNodeSelect =document.createElement("li");
                liNodeSelect.setAttribute("value",uSkill);
                let txtNodeSelect = document.createTextNode(presentedData);  
                liNodeSelect.appendChild(txtNodeSelect);
                listNode.appendChild(liNodeSelect); 

}

function loadWork(){
  document.getElementById("Edu").style.display = "none";
  document.getElementById("skil").style.display = "none";
  document.getElementById("work").style.display = "block";
 // document.getElementById("infoBar").style.position = "relative";

}

function loadAll(){
  document.getElementById("Edu").style.display = "block";
  document.getElementById("skil").style.display = "block";
  document.getElementById("work").style.display = "block";
  //document.getElementById("infoBar").style.position = "absolute";
}