var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;

//create feed and lastFed variable here
var feed, lastFed;


function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here

  addFood=createButton("Add Food");
  addFood.position(800,105);
  addFood.mousePressed(addFoods);

  feed=createButton("Feed Dog");
  feed.position(700,105);
  feed.mousePressed(feedDog);


  lastFedRef = database.ref("FeedTime");
  lastFedRef.on("value",data =>{
    lastFed = data.val();
  })
  


}

function draw() {
  background(46,139,87);
  foodObj.display();

  //write code to read fedtime value from the database 
  fill("red");
  if(lastFed>=12){
    text("Last feed time :"+lastFed,350,30)

  }
else if(lastFed===0){
  text("lastFed time is 12 am",350,30)

}
else{
  text("lastfed time is :"+lastFed,350,30)
}
  
 
  //write code to display text lastFed time here
  text()

 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);

  //write code here to update food stock and last fed time
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour(),
    gameState:"Hungry"
  })

}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
