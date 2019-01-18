function searchPokemon()
{
	document.getElementById("catch").onclick = function() {catchPokemon()};

	var id = Math.floor(Math.random() * 150) + 1; //random pokemon search

    var delay = ( function() {
        var timer = 0;
        return function(callback, ms) {
            clearTimeout (timer);
            timer = setTimeout(callback, ms);
        };
    })();

    var seconds = Math.floor((Math.random() * 5) + 3);
    var miliseconds = seconds * 1000; //seconds to mili

    document.getElementById("content").style.backgroundSize = "60% 80%";
    document.getElementById("content").style.backgroundImage = "url('./images/pokeball.gif?p"+new Date().getTime()+"')";
    delay(function(){
        document.getElementById("content").style.backgroundSize = "100% 100%";
        document.getElementById("content").style.backgroundImage = "url('./images/background.jpg')";
        $('#findModal').modal('show');
    }, miliseconds ); // end delay


	var request2 = new XMLHttpRequest();
	request2.open('GET', "https://pokedex-back.herokuapp.com/public/getinfo.php?id="+id, true);

	document.getElementById("findPokemonImage").src="./images/pokemon/"+id+".png";

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

function searchViewPokemon(id)
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
            for (var k = numOfMoves + 1; k < 16; k++) {
                var divmove = document.createElement('div');
                divmove.id = 'move'+k;
                divmove.className = 'moveItem';
                divmove.innerHTML = '';
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

    $("#contentDiv").animate({ scrollTop: 0 }, "fast");

    if(document.getElementById("edit").innerHTML == 'Edit Pokemons')
        $('#viewModal').modal('show');
}