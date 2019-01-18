function loadMyPokedex(){
	var request = new XMLHttpRequest();

	request.open('GET', 'https://pokedex-back.herokuapp.com/public/list.php', true);

	request.onload = function () {
		// begin accessing JSON data here
		var data = JSON.parse(this.response);

		var div = document.getElementById('mypokemonscards');
        data.forEach(function(object) {
        var divcard = document.createElement('div');
        divcard.id = object.id;
        divcard.className ='card';
        divcard.innerHTML = "<button class='btn btn-fix text-left' onclick='viewPokemon("+object.id+")'>" +
        "<img class='card-img-top' src='./images/pokemon/"+object.pokemonid+".png' alt='Card image cap'>" +
        "<div class='card-body'>" +
                    "<h6 class='card-title'>"+object.name+"</h6>" +
                    "<div class='cardtools'>" +
                    "<a href='#' class='btn btn-danger btncard' onclick='deletePokemon("+object.id+")'><i class='fas fa-trash-alt'></i></a>" +
                  	"</div>" +
                  "</div>" +
                  "</button>" +
        "</div>";

        div.appendChild(divcard);
    	});
	}
	request.send();
}

function clearMyPokedex()
{
	var div = document.getElementById('mypokemonscards');
	div.innerHTML = "";
	loadMyPokedex();
}


function toggleTools() {
	var x = document.getElementsByClassName("cardtools");
	var i;
	var state;
	if(x.length > 0)
	{
		if(x[0].style.display=='block')
			state = 'none';
		else
			state = 'block';
	}
	for (i = 0; i < x.length; i++) {
	  	x[i].style.display = state;
	}

	if(state == 'none')
	{
		document.getElementById('edit').innerHTML = 'Edit Pokemons';
		$('#removeAll').hide();
	}
	else
	{
		document.getElementById('edit').innerHTML = 'Stop Edit';
		$('#removeAll').show();
	}
}

function deletePokemon(id)
{
	document.getElementById("deleteButton").onclick = function() {doDelete(id)};
	$('#deletePokemonName').html('You are deleting the Pokemon from your list!');
	$('#deleteModal').modal('show');
}

function doDelete(id)
{
	$.post("https://pokedex-back.herokuapp.com/public/remove.php", { id: id},function(data) {
	    $('#deleteModal').modal('hide');
	    toggleTools();
	    clearMyPokedex();
	});
}

function deleteAll()
{
	document.getElementById("deleteAllButton").onclick = function() {doDeleteAll()};
	$('#deleteAllPokemonName').html('You are deleting ALL Pokemons from your list!');
	$('#deleteAllModal').modal('show');
}
function doDeleteAll()
{
	var id = 0;
	$.post("https://pokedex-back.herokuapp.com/public/deleteall.php", { id: id},function(data) {
	    $('#deleteAllModal').modal('hide');
	    toggleTools();
	    clearMyPokedex();
	});
}

function viewPokemon(id)
{
	var request = new XMLHttpRequest();
	request.open('GET', "https://pokedex-back.herokuapp.com/public/view.php?id="+id, true);

	request.onload = function () {
		var data = JSON.parse(this.response);


		var divviewmoves = document.getElementById('viewMoves');
		divviewmoves.innerHTML ='';
		data.forEach(function(object) {
        	document.getElementById('viewTitle').innerHTML = object.name;
        	document.getElementById("viewPokemonImage").src="./images/pokemon/"+object.pokemonid+".png";

        	dArr = object.day.split("-");
  			var day = dArr[2]+ "/" +dArr[1]+ "/" +dArr[0].substring(2);
        	document.getElementById("viewDay").innerHTML = day;

        	document.getElementById("viewNationalID").innerHTML ='#'+object.pokemonid;


        	var numOfMoves = object.move[0].count;
        	for (var i = 1; i <= 16; i++) {
		        var divmove = document.createElement('div');
		        divmove.id = 'move'+i;
		        divmove.className = 'moveItem';
		        
		        if(i<=numOfMoves)
		        {
			        divmove.innerHTML = object.move[i].name;
			        divmove.style.cssText='display:block;';
		        }
			    else
			    {
			    	divmove.innerHTML = 'NULL';
			    	divmove.style.cssText='display:none;';
			    }

		        divviewmoves.appendChild(divmove);
		        console.log('i '+i);

		    }
        	


        	var request2 = new XMLHttpRequest();
			request2.open('GET', "https://pokedex-back.herokuapp.com/public/getinfo.php?id="+object.pokemonid, true);

        	request2.onload = function () {
				var data = JSON.parse(request2.response);

				var div = document.getElementById('viewtypes');
				div.innerHTML ='';

				data.forEach(function(object2) {
		        	document.getElementById('viewDescription').innerHTML = object2.description;
		        	document.getElementById('viewHeight').innerHTML = (object2.height)/10 + ' m';
		        	document.getElementById('viewWeight').innerHTML = (object2.weight)/10 + ' kg';

		        	for (var i = 1; i <= object2.types[0].count; i++) {
		        		var divtype = document.createElement('div');
				        divtype.className = 'viewType';
				        divtype.innerHTML = object2.types[i].name;
				        divtype.style.backgroundColor = typeColors[object2.types[i].name];
				        div.appendChild(divtype);	
		        	}

		        	$("#pokemonHP").css("width", object2.hp + "%").text(object2.hp);
		        	$("#pokemonAttack").css("width", object2.attack + "%").text(object2.attack);
		        	$("#pokemonDefense").css("width", object2.defense + "%").text(object2.defense);
		        	$("#pokemonSpeed").css("width", object2.speed + "%").text(object2.speed);
		        	$("#pokemonSpAttack").css("width", object2.spattack + "%").text(object2.spattack);
		        	$("#pokemonSpDefense").css("width", object2.spdefense + "%").text(object2.spdefense);


		    	});
			}
			request2.send();

    	});
	}
	request.send();

	$("#contentDiv").animate({ scrollTop: 0 }, "fast");

	if(document.getElementById("edit").innerHTML == 'Edit Pokemons')
		$('#viewModal').modal('show');
}