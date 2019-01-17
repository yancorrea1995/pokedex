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

function SubmitFormData() {
    var name = $("#name").val();
    var day = $("#day").val();

    $('#alertname').hide();
	$('#alertday').hide();

    if(name == '')
    {
    	document.getElementById('alertname').style.display='block';
    }
    else if(day == '')
    {
    	document.getElementById('alertday').style.display='block';
    }
    else
    {
	    $.post("http://pokedex-back.herokuapp.com/public/insert.php", 
	    	{
		    	name: name,
		    	day: day,
		    	move0: $('#move0').html(),
		    	move1: document.getElementById('move1').innerHTML,
		    	move2: document.getElementById('move2').innerHTML,
				move3: document.getElementById('move3').innerHTML,
				move4: document.getElementById('move4').innerHTML,
				move5: document.getElementById('move5').innerHTML,
				move6: document.getElementById('move6').innerHTML,
				move7: document.getElementById('move7').innerHTML,
				move8: document.getElementById('move8').innerHTML,
				move9: document.getElementById('move9').innerHTML,
				move10: document.getElementById('move10').innerHTML,
				move11: document.getElementById('move11').innerHTML,
				move12: document.getElementById('move12').innerHTML,
				move13: document.getElementById('move13').innerHTML,
				move14: document.getElementById('move14').innerHTML,
				move15: document.getElementById('move15').innerHTML
			},
	    function(data) {
	     $('#insert_form')[0].reset();
	     $('#add_data_Modal').modal('hide');
	     $('#alertname').hide();
	     $('#alertday').hide();
	     clearMyPokedex();
	    });
	}
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
		$('#add').show();
		$('#find').show();
	}
	else
	{
		document.getElementById('edit').innerHTML = 'Stop Edit';
		$('#add').hide();
		$('#find').hide();
	}
}

function resetModal(){
	$('#insert_form')[0].reset();
    $('#alertname').hide();
    $('#alertday').hide();
}

function deletePokemon(id)
{
	document.getElementById("deleteButton").onclick = function() {doDelete(id)};
	$('#deletePokemonName').html('You are deleting the Pokemon from your list!');
	$('#deleteModal').modal('show');
}

function doDelete(id)
{
	$.post("http://pokedex-back.herokuapp.com/public/remove.php", { id: id},function(data) {
	    $('#deleteModal').modal('hide');
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
        	for (var i = 1; i <= numOfMoves; i++) {
		        var divmove = document.createElement('div');
		        divmove.id = 'move'+i;
		        divmove.className = 'moveItem';
		        divmove.innerHTML = object.move[i].name;
		        divviewmoves.appendChild(divmove);
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



	if(document.getElementById("edit").innerHTML == 'Edit Pokemons')
		$('#viewModal').modal('show');
}

function openInsertModal()
{
	if(document.getElementById("edit").innerHTML == 'Edit Pokemons')
		$('#add_data_Modal').modal('show');

}

function openFindModal()
{
	document.getElementById("catch").onclick = function() {catchPokemon()};

	var id = Math.floor(Math.random() * 150) + 1; //random pokemon search

	if(document.getElementById("edit").innerHTML == 'Edit Pokemons')
		$('#findModal').modal('show');

	var request2 = new XMLHttpRequest();
	request2.open('GET', "https://pokedex-back.herokuapp.com/public/getinfo.php?id="+id, true);

	document.getElementById("findPokemonImage").src="/images/pokemon/"+id+".png";

	request2.onload = function () {
		var data = JSON.parse(request2.response);

		var div = document.getElementById('findtypes');
		div.innerHTML ='';
		var div2 = document.getElementById('findMoves');
		div2.innerHTML ='';
		data.forEach(function(object2) {
        	
        	var n = object2.name.charAt(0).toUpperCase() + object2.name.slice(1);
        	document.getElementById('findTitle').innerHTML = n + ' Found';
        	document.getElementById('findPokemonName').innerHTML = n;
        	document.getElementById('findPokemonID').innerHTML = id;

        	var divfindmoves = document.getElementById('findMoves');
        	divfindmoves.innerHTML='';

        	for (var i = 1; i <= object2.types[0].count; i++) {
        		var divtype = document.createElement('div');
		        divtype.className = 'viewType';
		        divtype.innerHTML = object2.types[i].name;
		        divtype.style.backgroundColor = typeColors[object2.types[i].name];
		        div.appendChild(divtype);	
        	}

        	var movesNumber = Math.floor(Math.random() * object2.moves[0].count) + 1; //random pokemon moves number
        	var totalMoves = movesNumber;
        	while(movesNumber > 16)
        	{
        		movesNumber--;
        	}

        	var allnumbers = [];
        	for(var i=0;i<totalMoves;i++)
        	{
        		allnumbers.push(i);
        	}

        	while(allnumbers.length > 16)
        	{
        		var index = Math.floor(Math.random() * allnumbers.length);
		        allnumbers.splice(index, 1);
        	}

        	for (var i = 0; i < movesNumber; i++) {
        		var index = Math.floor(Math.random() * allnumbers.length);

		        var divtype = document.createElement('div');
		        divtype.id = 'move'+i;
		        divtype.className = 'moveItem';
		        divtype.innerHTML = object2.moves[allnumbers[index]+1].name;
		        divfindmoves.appendChild(divtype);

		        allnumbers.splice(index, 1);
        	}

        	document.getElementById('findDescription').innerHTML = object2.description;
        	document.getElementById('findHeight').innerHTML = (object2.height)/10 + ' m';
		    document.getElementById('findWeight').innerHTML = (object2.weight)/10 + ' kg';
        	$("#fpokemonHP").css("width", object2.hp + "%").text(object2.hp);
        	$("#fpokemonAttack").css("width", object2.attack + "%").text(object2.attack);
        	$("#fpokemonDefense").css("width", object2.defense + "%").text(object2.defense);
        	$("#fpokemonSpeed").css("width", object2.speed + "%").text(object2.speed);
        	$("#fpokemonSpAttack").css("width", object2.spattack + "%").text(object2.spattack);
        	$("#fpokemonSpDefense").css("width", object2.spdefense + "%").text(object2.spdefense);

    	});
	}
	request2.send();

}