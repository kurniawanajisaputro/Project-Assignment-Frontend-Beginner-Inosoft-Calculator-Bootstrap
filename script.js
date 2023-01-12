var numbers   = document.getElementsByClassName( "numbers"  );
var operators = document.getElementsByClassName( "operator" );

var numberScreen = document.getElementById( "numberscreen" );
var calcScreen   = document.getElementById( "calcscreen"   );

var equals     = document.getElementById( "equals" );
var c 		   = document.getElementById( "c" );
var ce  	   = document.getElementById( "ce" );
var plusMinus  = document.getElementById( "±" );

var total = 0,
    currCalc = "",  
    currNumber = "",
    currDisplayNumber = 0,
    prevOperator,
    prevDecimal,
    addDecimal = true,
    decimalCounter = 0;
    prevAns = 0;

for ( var i = 0; i < numbers.length; i++ ) {
  numbers[i].onclick = numberPressed;  
}

for ( var i = 0; i < operators.length; i++ ) {
  operators[i].onclick = operatorPressed;  
}

equals.onclick = sum;
c.onclick = clearAll;
ce.onclick = clearCurrNumber;
plusMinus.onclick = togglePlusMinus;

function numberPressed() {

  var currVal = this.getAttribute( "func" );
 
  var stringNum = currNumber.toString();
  
  if ( prevDecimal ) {
    
    stringNum += ( "." + currVal )
    currNumber = parseFloat( stringNum );

    prevDecimal = false;
    
  } else {

    if ( currVal == "." && addDecimal == true ) {

      prevDecimal = true;
      addDecimal = false;

    }  else if ( currVal == "." ){
    	return;
    }

    stringNum += currVal.toString();
    currNumber = parseInt( stringNum );    
  }

  numberScreen.value = stringNum;
  
}

function operatorPressed() {
  var operator = "";
  operator += this.getAttribute( "func" );
  
  currCalc += ( currNumber + " " + operator + " " );
  calcScreen.value = currCalc;  
  
  if ( prevOperator ) {
    total = findSum[ prevOperator ]( total, currNumber );
  } else {
    total = currNumber;
  }

  prevOperator = operator;
  
  numberScreen.value = 0;
  currNumber = "";
  
  addDecimal = true;
  
}

function sum() {
  if ( prevOperator ) {
    total = findSum[prevOperator]( total, currNumber );
  }
  resetValues()
  prevAns = total;
}


function clearAll() {
  
  total = 0;

  resetValues();
  
}

function clearCurrNumber() {

  currNumber = "";
  numberScreen.value = currNumber; 
  addDecimal = true;
  
}

function prevAnswer() {

  currNumber = prevAns;
  numberScreen.value = currNumber; 
  addDecimal = true;
  
}

function togglePlusMinus() {

  if ( typeof currNumber == "number" ) {

  var stringNum = currNumber.toString();
  var arrNum = stringNum.split("");
  
  if ( arrNum[0] == "-") {
    arrNum.shift();
  } else {
   arrNum.unshift("-");

  } 
    	
  stringNum = arrNum.join("");
  currNumber = parseFloat(stringNum);
  
  numberScreen.value = stringNum;  

  }
}

var findSum = {
  "+": function(a, b) { return a + b },
  "-": function(a, b) { return a - b },
  "/": function(a, b) { return a / b },
  "*": function(a, b) { return a * b },
  "%": function(a, b) { return (b * a) / 100 }
};

function resetValues() {
  currCalc = "";
  currNumber = "";
  calcScreen.value   =  currCalc;
  numberScreen.value = total; 
  prevOperator = undefined;
  addDecimal = true;
}
