
/* initial checks and setup for login*/
function updateSetup(){
    if(localStorage.getItem("USERINFO") !== null && localStorage.getItem("USERINFO") !== undefined){
        document.getElementById("registerUser").style.display = "none";
    }
}

/* if user not registered the direct to registration page */
function openRegForm(){
    if(localStorage.getItem("USERINFO") !== null && localStorage.getItem("USERINFO") !== undefined){
        alert("User Already registered");
    }
    else{
       window.location.href="./update/register.html"

    }

}

/*login user to add or update details */
function loginUser(){
    let gotData= JSON.parse(localStorage.getItem('USERINFO'));
    let gotUser = gotData.username ;
    let gotPass = gotData.password; 
    if(document.getElementById("userId").value == gotUser &&  document.getElementById("password").value == gotPass){
        window.location.href="./update/update.html"
    }
    else{
        alert("Invalid user");
        window.location.href="./login.html"
    }
    
}


/* on loading update page */
function updateSetupChange(){
    selectSkill();
    document.getElementById("addWork").style.display="none";
    document.getElementById("addSkill").style.display="none";
}

/* onclick skill section */
function updateSkills(){
   document.getElementById("addWork").style.display="none";
    document.getElementById("addSkill").style.display="block";
}

/* on click work section */
function updateWork(){
   
    document.getElementById("addSkill").style.display="none";
    document.getElementById("addWork").style.display="block";
}

/* loading skills in select of skill section*/
function selectSkill(){
    let skillSet =localStorage.getItem("SKILL");
    if(skillSet !== null && skillSet !== undefined){
        let skillArray = skillSet.split(',');
        let sizeEle=skillArray.length;//or else count , and get the no of element
        if(sizeEle>0){
           for(let i=0 ;i< sizeEle;i++ ){
               loadSelectSkill(skillArray[i]);
           }
        }
    }

}


/* logic of adding in select option */
function loadSelectSkill( newSkill){   
                let delNode = document.getElementById("deleteSkill");  
                let listNode= document.getElementById("viewSkillselect");
                let optionNodeSelect =document.createElement("option");
                optionNodeSelect.setAttribute("value",newSkill);
                let optionNodeDelete =document.createElement("option");
                optionNodeDelete.setAttribute("value",newSkill);
                let txtNodeSelect = document.createTextNode(newSkill);  
                let txtNodeDelect = document.createTextNode(newSkill);
                optionNodeSelect.appendChild(txtNodeSelect);
                optionNodeDelete.appendChild(txtNodeDelect);
                listNode.appendChild(optionNodeSelect); 
                delNode.appendChild(optionNodeDelete);
}

/*clear space to add details*/
function EmptyArea(){
    document.getElementById("displaySkill").style.display="none";
    document.getElementById("deleteSkillConfirmation").style.display="none";
    document.getElementById("modificationArea").style.display="block";
    document.getElementById("keyInput").value="";
    document.getElementById("keyinputDec").value="";
}

/*display selectes skill description */
function viewSkill(){
    document.getElementById("deleteSkillConfirmation").style.display="none";
    document.getElementById("modificationArea").style.display="none";
    document.getElementById("displaySkill").style.display="block";

    let selectVal =document.getElementById("viewSkillselect");
    let selectedItem = selectVal.options[selectVal.selectedIndex].text;
    let itemDecs = localStorage.getItem(selectedItem);
    document.getElementById("skillNameDis").innerHTML = selectedItem;
    document.getElementById("skillDecDis").innerHTML = itemDecs;

}

/* displaying the skill set to be deleted */
function delSkill(){
    document.getElementById("modificationArea").style.display="none";
    document.getElementById("displaySkill").style.display="none";
    document.getElementById("deleteSkillConfirmation").style.display="block";
    document.getElementById("deleteElement").style.display="block";
    let selectedItem = document.getElementById("deleteSkill").value;
    let itemDecs = localStorage.getItem(selectedItem);
    document.getElementById("skillNameDel").innerHTML = selectedItem;
    document.getElementById("skillDecDel").innerHTML = itemDecs;
    
}

/* on clicking delete in skill section , deleting element from storage 
* refreshing the selects in skill setection*/
function delSelectedElement(){
    let select = confirm("Are you Sure ?");
    let selectedItem = document.getElementById("deleteSkill").value;
    document.getElementById("deleteElement").style.display= "block";
    if(select === true){
        localStorage.removeItem("selectedItem");
        document.getElementById("skillNameDel").innerHTML = selectedItem;
        document.getElementById("skillDecDel").innerHTML = "item Deleted";
        document.getElementById("deleteElement").style.display= "none";
        let skillSet = localStorage.getItem("SKILL");
        let skillArray = skillSet.split(',');
        let indexEle = skillArray.indexOf(selectedItem);
        let newArray = skillArray.splice(indexEle,1);
        let newSkills = skillArray.toString();
        if(newSkills.length>0){
          localStorage.setItem("SKILL",newSkills);
        }
        else {
            localStorage.removeItem("SKILL");
        }
        localStorage.removeItem(selectedItem);
        //delete in select
        let inView = document.getElementById("viewSkillselect");
        let inDel = document.getElementById("deleteSkill");
        let indexDelOpt=indexEle+1;
        inView.remove(indexDelOpt);
        inDel.remove(indexDelOpt);


    }
    
}


/*whenever trying to add new skills */
function addSkillFunction(){
    let skill = document.getElementById("keyInput").value;
    let skllValue = document.getElementById("keyinputDec").value;

    if(skill !== null && skill !== undefined && skill != "" && skllValue != null && skllValue != undefined && skllValue != ""){
        if(localStorage.getItem(skill)==null){
             localStorage.setItem(skill,skllValue);
             if(localStorage.getItem("SKILL")==null){
                 localStorage.setItem("SKILL",skill);
             }
             else{
                 let str1= localStorage.getItem("SKILL");
                 let string = str1 + ','+ skill ;
                 localStorage.removeItem("SKILL");
                 localStorage.setItem("SKILL",string);
             }
             loadSelectSkill(skill);
        }
        else{
            alert("existing entry");
        }
    }
    
}


/*****************
*new Registration 
*check of correct username
* email  -> _@_._ min this format 
*password  -> password is equal to confirm password
****************/
function registrationProcess(){
    var alertans = confirm("Do you want to proceed ?");
    if (alertans ===true){
       var userNamec=document.getElementById("userName").value;
       var userEmailc=document.getElementById("userEmail").value;
       var userPasswordc=document.getElementById("userPassword").value;
       var userConfPasswordc = document.getElementById("confirmPassword").value;
       let checkAttri = 0 ; //to check all condition met
       if(userName!==null && userName!==undefined && userName!==""){
           if(userNamec.length < 5){
               document.getElementById("errorMsg").innerHTML=" Username should have more than 5 char";
           }
           else{
              checkAttri++;
              if(userEmailc!==null && userEmailc!==undefined && userEmailc!==""){
                  if(userEmailc.length > 6){
                       
                        let atTheRateFirst = userEmailc.indexOf('@');
                        let atTheRateLast = userEmailc.lastIndexOf('@');
                        let spaceIndex = userEmailc.indexOf(" ");
                        if(atTheRateFirst === atTheRateLast && atTheRateFirst!==null && atTheRateFirst!==undefined && atTheRateFirst>=1 && spaceIndex === -1 ){
                              let dotLast = userEmailc.lastIndexOf('.');
                              if(dotLast!==(userEmailc.length-1) && dotLast!== -1){
                                   //one more validation to be written to compar ech char and allow _ and > and * symbol
                                   checkAttri++;
                                     if(userPasswordc===userConfPasswordc && userPasswordc.length> 8){
                                              checkAttri++;
                                     }
                                     else{
                                        document.getElementById("errorMsg").innerHTML="password doesnot match";
                                     }

                                }
                                else{
                                    document.getElementById("errorMsg").innerHTML=" invalid Email";
                                }
                            
                        }
                        else{
                            document.getElementById("errorMsg").innerHTML=" invalid Email";
                        }
                    }
                    else{
                        document.getElementById("errorMsg").innerHTML=" invalid Email";
                    }
                    
                }
            }

        } 
        else{
            document.getElementById("errorMsg").innerHTML=" Enter proper details";
        }
        if(checkAttri==3){
            //write in localmemory
            var userinfomation ='{"username" :"'+ userNamec + '", "password" :"' + userPasswordc + '","emailId" :"' +userEmailc +'"}';
            alert (userinfomation);
            localStorage.setItem("USERINFO",userinfomation);

            var retObj = localStorage.getItem('USERINFO');
        }
        else{
          //  document.getElementById("errorMsg").innerHTML +=" Enter proper details";
        }
        

    }
    else{
        //window.location.href="./update/register.html"
        //do nothing
    }
}

