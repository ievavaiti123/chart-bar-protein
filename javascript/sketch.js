
let protein;

function setup() {
createCanvas(windowWidth, windowHeight);
 
  angleMode(DEGREES);
  //no animation / interaction chart
  noLoop();

  fetch("./json/protein.json").then(function(response) {
    return response.json();
  }).then(function(data) {

    console.log(data);
    
    protein = data.protein;

    drawChart();
  
  }).catch(function(err) {
    console.log(`Something went wrong: ${err}`);
  });

}

function draw() {
  background(200);

}

function drawChart(){

  // Compute maximum amount (for normalization)
  let maxval = 0; 
  for (let i=0; i<protein.length; i++) {
    if ( protein[i].amount > maxval) {
      maxval = protein[i].amount;
    }
  }

  let spacing = 1;//spacing between the bars
  // Display chart
  for (let i=0; i<protein.length; i++) {

    let item = protein[i];
    
    let rWidth = width/(protein.length+2); //add 2 so there is space either side of the chart
    let rX = map(i, 0, protein.length, rWidth, width-rWidth); //map range includes the space on either side
    let rY = height-(rWidth*8); 
    let rHeight = 0-map(item.amount, 0, maxval, 0, height-(rWidth*10)); // map height so spacing on top + bottom match side spacing 
    
    noStroke(); 
    fill(item.color);
    rect(rX+spacing/2, rY, rWidth-spacing, rHeight); 

    
    let txtLen = [];
    // txtLen[i] = item.ingredient.length;

    let txtSz = rWidth-5;
    textSize(txtSz);
    fill(0); 
    textAlign(LEFT, TOP); 
    push();
    translate(rX+txtSz, rY+5);
    rotate(90);
    text(item.ingredient, 0, 0);
    pop();
    

    
  }  

  let tPos = width/(protein.length+2);
  
  textSize(tPos);
  fill(0);
  text('Protein Quantities per 100g', tPos, tPos)
  textSize(tPos/2);
  fill(20, 200, 50);
  text('(meat is not the only source!)', tPos, tPos*2)
  // as according to https://www.nutritionadvance.com/protein-content-of-common-foods/
  // and https://fdc.nal.usda.gov/fdc-app.html#/

}