var typeColors = {
	  "grass": "rgb(105, 194, 61)",
	  "poison" :"rgb(146, 58, 146)",
	  "fire" : "rgb(237, 109, 18)",
	  "flying" : "rgb(142, 111, 235)",
	  "ghost" : "rgb(100, 78, 136)",
	  "psychic" : "rgb(247, 54, 112)",
	  "normal" : "rgb(156, 156, 99)",
	  "electric" : "rgb(246, 201, 19)",
	  "dragon" : "rgb(94, 29, 247)",
	  "fighting" : "rgb(174, 42, 36)",
	  "fairy" : "rgb(232, 120, 144)",
	  "bug" : "rgb(151, 165, 29)",
	  "ground" : "rgb(219, 181, 77)",
	  "water" :"rgb(69, 120, 237)",
	  "steel" : "rgb(160, 160, 192)",
	  "rock" : "rgb(164, 143, 50)",
	  "dark" : "rgb(100, 78, 64)",
	  "ice" : "rgb(126, 206, 206)"
};

function catchPokemon() {
    var name = document.getElementById('findPokemonName').innerHTML;
    var day = new Date().toISOString().slice(0,10);

    

    $.post("http://pokedex-back.herokuapp.com/public/insert.php", 
	{
    	name: name,
    	day: day,
    	move0: document.getElementById('move0').innerHTML,
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
	     $('#findModal').modal('hide');
	     //clearMyPokedex();
    });
	
}