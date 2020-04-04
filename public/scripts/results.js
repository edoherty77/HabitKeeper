results()

function results(){
	var selected = document.getElementById("selected")
	var items = selected.getElementsByTagName("LI")
	var selectedArr = []
	
	var habitMap = {}
	
	for(var i = 0; i < items.length; i++){
		selectedArr.push(items[i].innerText)
	}
	
	
	for(let habit of selectedArr){
		if(habitMap[habit]){
			habitMap[habit]++
		} else {
			habitMap[habit] = 1
		}
	}
	
	for(let text in habitMap){
		var text1 = text
		var amount = habitMap[text]
		
		var result = document.createTextNode("You have " + text + " " + habitMap[text] + " times this month")
		var resultText = document.createElement("p")
		resultText.appendChild(result)
		
		document.getElementById("results").appendChild(resultText)
	}
	
	
	
	
}


