var selected = document.getElementById("selected")
var items = selected.getElementsByTagName("LI")
//ONE BIG ARRAY OF ALL HABIT/DATE DATA
var selectedArr = [];

//ARRAY OF SUBARRAYS OF HABITS AND DATES
var newArr = [];

//ARRAYS OF HABITS AND DATES
var habitsArr = []
var datesArr = []

//ARRAYS OF HABITS AND DATES WITHOUT EXTRA SPACING
var habits = []
var dates = []

var habitCount = {}


var resultsArr = []

//PUT DATA INTO ONE LARGE ARRAY
for(var i = 0; i < items.length; i++){
	selectedArr.push(items[i].innerText)
	
}


//TAKE LARGE ARRAY AND SPLIT IT TO CREATE SUBARRAYS OF HABITS AND DATES
for(var j = 0; j < selectedArr.length; j++){
	var arr = selectedArr[j].split(",")
	newArr.push(arr)
}


//TAKE [K] AND PUSH INTO ARRAY FOR HABITS AND TAKE [K+1] AND PUSH INTO DIFFERENT ARRAY FOR DATES
for(var k = 0; k < newArr.length; k++){
	habitsArr.push(newArr[k])
	datesArr.push(newArr[k+1])
	k+=1
}


//LOOP THROUGH HABITSARR AND GET RID OF EXTRA SPACING
for(var f = 0; f < habitsArr.length; f++){
	habitsArr[f].forEach(function(habit){
		var trim1 = habit.trim()
		habits.push(trim1)
	})
}


//LOOP THROUGH DATESARR AND GET RID OF EXTRA SPACING
for(var q = 0; q < datesArr.length; q++){
	datesArr[q].forEach(function(date){
		var trim2 = date.trim()
		dates.push(trim2)
	})
}


//LOOP THROUGH HABITS ARRAY AND CREATE OBJECT WITH KEY/VALUE PAIR OF HABIT/DATE...THEN PUSH TO RESULTSARR
for(let h = 0; h < habits.length; h++){
	var resultsObj ={habit : habits[h], date : dates[h]}
	resultsArr.push(resultsObj)
}


//SORT RESULTS ARRAY TO ALPHEBATISE HABITS
resultsArr.sort(function(a, b){
	if(a.habit < b.habit){
		return -1
	} else if(a.habit > b.habit){
		return 1
	}
	return 0
	
})

//COULD BE USED TO COUNT CONSECUTIVE DATES FOR EACH HABIT 
for(var x = 0; x < resultsArr.length - 1; x++){
	if((resultsArr[x].habit === resultsArr[x+1].habit) && ((parseInt(resultsArr[x+1].date) - parseInt(resultsArr[x].date)) === 1)){
		console.log(resultsArr[x])
		console.log(resultsArr[x+1])
	}
}




console.log(resultsArr)
//LOOP THROUGH HABIT ARRAY AND CREATE OBJECT TO KEEP HABIT COUNT
for(let habit1 of habits){
	if(habitCount[habit1]){
		habitCount[habit1]++
	} else {
		habitCount[habit1] = 1
	}
}
	
//LOOP THORUGH HABIT OBJECT TO ASSIGN VARIABLES FOR KEY AND VALUE
for(let habit in habitCount){
	var text = habit
	var amount = habitCount[habit];
	$(window).on("load",showTable(habitCount, text, amount))
}
	




function showTable(habitCount, text, amount){
	var habitMap = habitCount
	var habit = text.trim()
	var amount = amount
	var length = Object.keys(habitMap).length
	var date = new Date();

	
	
	
	var tbl = document.getElementById("table-body")
	
	for(var i = 0; i < length; i++){
		var row = document.createElement("tr")
		
		for(var j = 0; j < 2; j++){
			var cell = document.createElement("td")
			
			var p1 = document.createElement("p")
			p1.style.fontFamily = "Boogaloo"
			p1.style.fontSize = "20px"
			var cellText = document.createTextNode(habit)
			p1.appendChild(cellText)
				
			var p2 = document.createElement("p")
			p2.style.fontFamily = "Boogaloo"
			p2.style.fontSize = "20px"
			var cellAmount = document.createTextNode(amount + " days")
			p2.appendChild(cellAmount)
			
			if(j === 0){
				p2.style.display = "none"
			}
			if(j === 1){
				p1.style.display = "none"
			}
			
			cell.appendChild(p2)
			cell.appendChild(p1)
			row.appendChild(cell)
		}
	}
	tbl.appendChild(row)
}


	
	





