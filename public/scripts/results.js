var selected = document.getElementById("selected")
var items = selected.getElementsByTagName("LI")
var selectedArr = [];
var newArr = [];

var habitsArr = []
var datesArr = []

var habits = []
var dates = []

var habitObject = {}


for(var i = 0; i < items.length; i++){
	selectedArr.push(items[i].innerText)
	
}


for(var j = 0; j < selectedArr.length; j++){
	var arr = selectedArr[j].split(",")
	newArr.push(arr)
}

for(var k = 0; k < newArr.length; k++){
	habitsArr.push(newArr[k])
	
	datesArr.push(newArr[k+1])
	
	k+=1
	
	
}
for(var f = 0; f < habitsArr.length; f++){
	habitsArr[f].forEach(function(habit){
		var trim1 = habit.trim()
		habits.push(trim1)
	})
}
	
for(var q = 0; q < datesArr.length; q++){
	datesArr[q].forEach(function(date){
		var trim2 = date.trim()
		dates.push(trim2)
	})
}

console.log(habits)
console.log(dates)



for(let habit1 of habits){
	if(habitObject[habit1]){
		habitObject[habit1]++
	} else {
		habitObject[habit1] = 1
	}
}
	
for(let habit in habitObject){
	var text = habit
	var amount = habitObject[habit];
	$(window).on("load",showTable(habitObject, text, amount))
}
	





function showTable(habitObj, text, amount){
	var habitMap = habitObj
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


	
	





