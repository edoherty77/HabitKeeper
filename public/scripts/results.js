var selected = document.getElementById("selected")
var items = selected.getElementsByTagName("LI")
var selectedArr = [];
var newArr = [];
	
var habitObject = {}



for(var value of items){
	selectedArr.push(value.innerText)
}
	


for(let i = 0; i < selectedArr.length; i++){
	const arr = selectedArr[i].replace(/\s+/g,'').trim()
	newArr.push(arr)
}

for(var j = 0; j < newArr.length; j++){
	for(var obj in newArr[j]){
		var test = Object.entries(obj)
		console.log(test)
	}
}

for(let habit1 of newArr){
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


	
	





