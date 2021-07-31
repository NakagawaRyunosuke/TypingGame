let timer=document.getElementById("timer");
let start=document.getElementById("start");
let reset=document.getElementById("reset");

let wordCount=0;
let misstypecount=0;

const typedField=document.getElementById("typed");
const untypedField=document.getElementById("untyped");

const time=60000;

//出題される文字列たち
const strs=[
    "javascript","googlechrome","apple","twitter","microsoft","mother","father","grandmather","switch","japan","kakigoori"
];


function randomInt(max){
    return Math.floor(Math.random()*Math.floor(max));
}

function nextString(){
    const idx=randomInt(strs.length);
    return strs[idx];
}

function updateTextfield(){
    typedField.textContent=typed;
    untypedField.textContent=untyped;
}

function next(){
    typed="";
    untyped=nextString();
    updateTextfield()
}

function updateTime() {
    
    const s=Math.floor(remaining/1000)%60;
    const m=Math.floor(remaining/(1000*60))%60;
    const h=Math.floor(remaining/(1000*60*60));

    
    const sStr=s.toString().padStart(2,"0");
    const mStr=m.toString().padStart(2,"0");
    const hStr=h.toString().padStart(2,"0");
    
    timer.innerHTML=hStr+":"+mStr+":"+sStr;
    
    
}

function gameStart(){
    let pre= new Date();
    intervalId=setInterval(function(){
        const now=new Date();
        remaining-=now-pre;
        pre=now;
        updateTime();
        
        if(remaining<=0){
           
            alert("終了！あなたは時間内に"+wordCount+"単語打てました。ミスタイプのかずは"+misstypecount+"です");
            clearInterval(intervalId);
            intervalId=null;
            remaining=time;
            updateTime();
        }
        
    },10);

    document.addEventListener("keydown",function(e){
        if(e.key!==untyped.substring(0,1)){
            misstypecount+=1;    
            return;
        }
        typed+=untyped.substring(0,1);
        untyped=untyped.substring(1);
    
        updateTextfield();
    
        if(untyped===""){
            next();
            wordCount+=1;
        }
    });

    next();
}


//残り時間
let remaining=time;
let intervalId=null;

start.addEventListener("click",function(e){
    if(intervalId!==null){return;}
    gameStart();
});



reset.addEventListener("click",function(e){
    clearInterval(intervalId);
    intervalId=null;
    remaining=time;
    updateTime();
});

