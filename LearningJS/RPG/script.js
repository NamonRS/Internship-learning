let xp=0;
let health=100;
let gold=50;
let currentWeapon=0;
let fighting;
let monsterHealth;
let inventory=["stick"];
const button1= document.querySelector("#button1");
const button2=document.querySelector("#button2");
const button3=document.querySelector("#button3");
const text=document.querySelector("#text");
const xpText=document.querySelector("#xpText");
const healthText=document.querySelector("#healthText");
const goldText=document.querySelector("#goldText");
const monsterStats=document.querySelector("#monsterStats");
const monsterNameText=document.querySelector("#monsterName");
const monsterHealthText=document.querySelector("#monsterHealth");

// comment
/* multi lineded comment */
// initialize buttons
button1.onclick = goStore;
button2.onclick=goCave;
button3.onclick=fightDragon;

const weapons =[{
   name: "stick", power:5,},
  { name: "dagger", power:30,},
   {name: "claw hammer", power:50,},
   {name: "sword", power: 100,}
];
const monsters=[{
     name: "slime", 
     level: 2, 
     health: 25},
   { 
      name: "fanged Beast", 
      level: 8, 
      health: 60 },
   { 
      name: "Dragon", 
      level: 20, 
      health: 300}
]
const locations =[
      {
      name: "town square",
      "button text": ["Go to store", "Go to cave", "Fight Dragon"],
      "button functions": [goStore, goCave, fightDragon],
      text: "You are in the town square. You seea sign that says \"Store\"."
   },
   {
      name: "store",
      "button text": ["Buy 10 health (10 gold)", "Buy weapon (30 gold)", "Go to town square"],
      "button functions": [buyHealth, buyWeapon, goTown],
      text: "You enter the store."
   },
   {
      name: "cave",
      "button text": ["Fight slime", "Fight fanged Beast", "Go to town square"],
      "button functions": [fightSlime, fightBeast, goTown],
      text:  "You enter the cave. Some Monsters appear in front of you"

   },
   {
      name: "fight", 
      "button text": ["attack", "Dodge", "Run"],
      "button functions": [attack, dodge, goTown],
      text: "You are fighting a monster",
   },
   {
      name: "kill Monster",
      "button text": ["Go to town square","Go to town square","Go to town square"],
      "button functions": [goTown,goTown,easterEgg],
      text:"The monster screams \"ARG!!\" as it dies. You find gold and gain experince points of its existence."
   },
   {
      name: "lose",
      "button text": ["REPLAY?","REPLAY?","REPLAY?"],
      "button functions": [restart, restart, restart],
      text:" You have Died. T_T"

   },
   {
      name: "win",
      "button text": ["REPLAY?","REPLAY?","REPLAY?"],
      "button functions": [restart, restart, restart],
      text:" YOU HAVE DEFEATED THE DRAGON!! YOU WIN !!!"

   },
   {
      name: "Easter Egg",
      "button text": ["2", "8", "Go to town square"],
      "button functions": [pickTwo, pickEight, goTown],
      text: "You find a secret game. Pick a number above. Ten numbers will be randomly choosen between 0 and 10. if number you choose matches you win"
   }
]

function update(location){
    monsterStats.style.display="none";
    button1.innerText=location["button text"][0];
    button2.innerText=location["button text"][1];
    button3.innerText=location["button text"][2];
    button1.onclick = location["button functions"][0];
    button2.onclick=location["button functions"][1];
    button3.onclick=location["button functions"][2];
    text.innerText=location.text; //only works if its is single line as 'text' for button functions we need brakcets

}

 function goTown(){
   update(locations[0]);
  
 }
function goStore(){
   update(locations[1]);
 }
 
function goCave(){
    update(locations[2]);
 }
function fightSlime(){
   fighting=0;
   goFight();
}
function fightBeast(){
   fighting=1;
   goFight();
}
function fightDragon(){
    fighting=2;
    goFight();
 }
function goFight(){
   update (locations[3]);
   monsterHealth=monsters[fighting].health;
   monsterStats.style.display="block";
   monsterNameText.innerText=monsters[fighting].name;
   monsterHealthText.innerText=monsterHealth;
}
function attack(){ 
   text.innerText ="The " + monsters[fighting].name + " attacks. ";
   text.innerText+= " You attack it with your " +weapons[currentWeapon].name + ".";
   if (isMonsterHit()){
   health -= getMonsterAttackValue(monsters[fighting].level);
   } else {
      text.innerText += " You missed.";
   }
   monsterHealth -=weapons[currentWeapon].power + Math.floor(Math.random() *xp) +1;; //Math floor round down
   healthText.innerText= health;
   monsterHealthText.innerText=monsterHealth;
   if (health <=0 ){
      lose();
   }else if (monsterHealth <=0){
      fighting === 2 ? winGame() : defeatMonster();
         
   }
   if (Math.random() <= .1 && inventory.length !== 1){
      text.innerText += " Your " + inventory.pop() + " breaks";
      currentWeapon --;
   }
}
function getMonsterAttackValue(level){
   let hit =(level *5)- (Math.floor(Math.random()*xp));
   console.log(hit);
   return hit;
}
function isMonsterHit(){
   return Math.random() > .2 || health <20; // as the random function gives us a random between  0 and 1 so 0.1 0.2
}


function dodge(){
   text.innerText= " You dodge the attack from the" + monsters[fighting].name+ ".";
}
function defeatMonster(){
   gold+=Math.floor(monsters[fighting].level*6.7);
   xp+=monsters[fighting].level;
   goldText.innerText=gold;
   xpText.innerText=xp;
   update(locations[4]);
}

 

 function buyHealth(){
   if(gold>=10){
   gold -= 10;
   health += 10;
   goldText.innerText=gold;
   healthText.innerText=health;
   }
   else{
      text.innerText="not enough gold";
      }

 }

 function buyWeapon(){
   if(currentWeapon < weapons.length -1){
      if(gold>=30){
         gold -= 30;
         currentWeapon++;
         goldText.innerText= gold;
         let newWeapon= weapons[currentWeapon].name;
         text.innerText="You brought a "+ newWeapon + ".";
         inventory.push(newWeapon);
         text.innerText+= " In your inverntory you have: " + inventory;

      }else {
         text.innerText="not enough gold";
      }

   }else{
      text.innerText="You already have the most powerul weapon";
      button2.innerText="Sell weapon for 15 gold";
      button2.onclick=sellWeapon;
   }
}
function sellWeapon(){
   if(inventory.length >1){
      gold+=15;
      goldText.innerText=gold;
      let currentWeapon = inventory.shift();
      text.innerText="You sold a " +currentWeapon +".";
      text.innerText+= " In you inventory you have: " + inventory;
   }
}
function lose(){
   update(locations[5]);
}
function winGame(){
   update (locations[6]);
}
function restart(){
   xp=0;
   health=100;
   gold=50;
   currentWeapon=0;
   inventory=["stick"];
   goldText.innerText=gold;
   healthText.innerText=health;
   xpText.innerText=xp;
   goTown();
   
}
function easterEgg(){
   update(locations[7]);
}
function pickTwo(){
   pick(2);
}
function pickEight(){
   pick(8);
}
function pick(guess){
   let numbers=[];
   while (numbers.length<10){
      numbers.push(Math.floor(Math.random()*11))
   }
   text.innerText=" You picked " +guess + " . Here are the random numbers: \n";
   for(let i=0; i<10; i++){
      text.innerText += numbers[i] + "\n";
   }
   if (numbers.indexOf(guess) !== -1){
      text.innerText += "Right! You Win 30 Gold";
      gold += 30;
      goldText.innerText=gold;
   } else {
      text.innerText += "Wrong! Minus 10 health";
      health -= 10;
      healthText.innerText =health;
      if (health <= 0){
         lose();
      }
   }
}


