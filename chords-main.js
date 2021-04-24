/**
 * Load this script at the end of your HTML file
 * Use the 'chord' class name on a button element to draw the base canvas inside
 * Use next the 'chord-x' class name where 'x' will be the name of the chord to be placed
 * 
 * @example <button class="chord chord-bm"></button>
 * 
 * @author Joel Manas del Barrio
 * @version 1.0
 * 
 * @requires JQuery v1.0
 */

/**
 * Every button element having the 'chord' class name will have a canvas appended inside
 * The chord will then be drawn inside
 * Click on the chord name to display the canvas. Click anywhere outside again to have it hide
 */
$('.chord').append("<canvas width=100 height=140></canvas>");
$('.chord canvas').each(function() { new Chord($(this)[0]); });
$('head').append('<style>button.chord { color: teal; font-weight: bold; margin: 0; padding: .1em; border: 0; background: none; }\n.chord canvas { display: none; position: absolute; border: 2px solid black; }\n.chord:focus-within canvas { display: block; } </style>');

function Chord (canvas) {
	this.margin = 20;
	this.marginH = 70/6;
	this.marginV = 120/6;
	this.canvas = canvas;
	this.ctx = canvas.getContext("2d");
	for(const className of this.canvas.parentNode.classList)
		if(className.match(/^chord-[a-zA-Z0-9]+\+?$/))
			this.chordName = className.replace('chord-','');
	
	/**
	 * Variable chord stores:
	 * @property name Name of the chord
	 * @property positions Array of positions where fingers are layed on (starting on 1st fret, from top to bottom, then 2nd...)
	 * @property FR Fret where the chord is played
	 */
	switch(this.chordName) {
		case 'a': this.chord = { 'name': 'A', 'positions': [9,10,11], 'FR': 1 }; break;
		case 'am': this.chord = { 'name': 'Am', 'positions': [5,9,10], 'FR': 1 }; break;
		case 'a6': this.chord = { 'name': 'A6', 'positions': [9,10,11,12], 'FR': 1 }; break;
		case 'a7': this.chord = { 'name': 'A7', 'positions': [9,10,11,18], 'FR': 1 }; break;
		case 'a9': this.chord = { 'name': 'A9', 'positions': [9,11,18,22], 'FR': 1 }; break;
		case 'am6': this.chord = { 'name': 'Am6', 'positions': [5,9,10,12], 'FR': 1 }; break;
		case 'am7': this.chord = { 'name': 'Am7', 'positions': [5,9,10,18], 'FR': 1 }; break;
		case 'amaj7': this.chord = { 'name': 'Amaj7', 'positions': [4,9,11], 'FR': 1 }; break;
		case 'adim': this.chord = { 'name': 'Adim', 'positions': [3,5,10,12], 'FR': 1 }; break;
		case 'a+': this.chord = { 'name': 'A+', 'positions': [6,10,11,15], 'FR': 1 }; break;
		case 'asus': this.chord = { 'name': 'Asus', 'positions': [9,10,17], 'FR': 1 }; break;
		
		case 'b': this.chord = { 'name': 'B', 'positions': [8,12,21,22,23], 'FR': 1 }; break;
		case 'bm': this.chord = { 'name': 'Bm', 'positions': [8,12,17,21,22], 'FR': 1 }; break;
		case 'b6': this.chord = { 'name': 'B6', 'positions': [7,8,21,22,23,24], 'FR': 1 }; break;
		case 'b7': this.chord = { 'name': 'B7', 'positions': [3,8,10,12], 'FR': 1 }; break;
		case 'b9': this.chord = { 'name': 'B9', 'positions': [3,8,10,11,12], 'FR': 1 }; break;
		case 'bm6': this.chord = { 'name': 'Bm6', 'positions': [17,21,22,24], 'FR': 1 }; break;
		case 'bm7': this.chord = { 'name': 'Bm7', 'positions': [2,4,6,11,15], 'FR': 2 }; break;
		case 'bmaj7': this.chord = { 'name': 'Bmaj7', 'positions': [8,16,21,23], 'FR': 1 }; break;
		case 'bdim': this.chord = { 'name': 'Bdim', 'positions': [4,6], 'FR': 1 }; break;
		case 'b+': this.chord = { 'name': 'B+', 'positions': [6,10,11,15], 'FR': 3 }; break;
		case 'bsus': this.chord = { 'name': 'Bsus', 'positions': [6,15,16,23], 'FR': 2 }; break;

		case 'c': this.chord = { 'name': 'C', 'positions': [5,9,14], 'FR': 1 }; break;
		case 'cm': this.chord = { 'name': 'Cm', 'positions': [2,6,11,15,16], 'FR': 3 }; break;
		case 'c6': this.chord = { 'name': 'C6', 'positions': [5,9,10,18], 'FR': 1 }; break;
		case 'c7': this.chord = { 'name': 'C7', 'positions': [5,9,14,16], 'FR': 1 }; break;
		case 'c9': this.chord = { 'name': 'C9', 'positions': [9,14,16,17,18], 'FR': 1 }; break;
		case 'cm6': this.chord = { 'name': 'Cm6', 'positions': [3,5,10,18], 'FR': 1 }; break;
		case 'cm7': this.chord = { 'name': 'Cm7', 'positions': [3,5,16,18], 'FR': 1 }; break;
		case 'cmaj7': this.chord = { 'name': 'Cmaj7', 'positions': [9,14], 'FR': 1 }; break;
		case 'cdim': this.chord = { 'name': 'Cdim', 'positions': [3,5,10,12], 'FR': 1 }; break;
		case 'c+': this.chord = { 'name': 'C+', 'positions': [4,5,9], 'FR': 1 }; break;
		case 'csus': this.chord = { 'name': 'Csus', 'positions': [5,15,18], 'FR': 1 }; break;

		case 'd': this.chord = { 'name': 'D', 'positions': [10,12,17], 'FR': 1 }; break;
		case 'dm': this.chord = { 'name': 'Dm', 'positions': [6,10,17], 'FR': 1 }; break;
		case 'd6': this.chord = { 'name': 'D6', 'positions': [10,12], 'FR': 1 }; break;
		case 'd7': this.chord = { 'name': 'D7', 'positions': [5,10,12], 'FR': 1 }; break;
		case 'd9': this.chord = { 'name': 'D9', 'positions': [5,7,10], 'FR': 1 }; break;
		case 'dm6': this.chord = { 'name': 'Dm6', 'positions': [6,10], 'FR': 1 }; break;
		case 'dm7': this.chord = { 'name': 'Dm7', 'positions': [5,6,10], 'FR': 1 }; break;
		case 'dmaj7': this.chord = { 'name': 'Dmaj7', 'positions': [10,11,12], 'FR': 1 }; break;
		case 'ddim': this.chord = { 'name': 'Ddim', 'positions': [4,6], 'FR': 1 }; break;
		case 'd+': this.chord = { 'name': 'D+', 'positions': [12,16,17], 'FR': 1 }; break;
		case 'dsus': this.chord = { 'name': 'Dsus', 'positions': [10,17,18], 'FR': 1 }; break;

		case 'e': this.chord = { 'name': 'E', 'positions': [4,8,9], 'FR': 1 }; break;
		case 'em': this.chord = { 'name': 'Em', 'positions': [8,9], 'FR': 1 }; break;
		case 'e6': this.chord = { 'name': 'E6', 'positions': [4,8,9,11], 'FR': 1 }; break;
		case 'e7': this.chord = { 'name': 'E7', 'positions': [4,8,9,17], 'FR': 1 }; break;
		case 'e9': this.chord = { 'name': 'E9', 'positions': [4,8,12], 'FR': 1 }; break;
		case 'em6': this.chord = { 'name': 'Em6', 'positions': [8,9,11], 'FR': 1 }; break;
		case 'em7': this.chord = { 'name': 'Em7', 'positions': [8], 'FR': 1 }; break;
		case 'emaj7': this.chord = { 'name': 'Emaj7', 'positions': [3,4,8], 'FR': 1 }; break;
		case 'edim': this.chord = { 'name': 'Edim', 'positions': [9,11,16,18], 'FR': 1 }; break;
		case 'e+': this.chord = { 'name': 'E+', 'positions': [4,5,9], 'FR': 1 }; break;
		case 'esus': this.chord = { 'name': 'Esus', 'positions': [8,9,10], 'FR': 1 }; break;

		case 'f': this.chord = { 'name': 'F', 'positions': [1,5,6,10,14,15], 'FR': 1 }; break;
		case 'fm': this.chord = { 'name': 'Fm', 'positions': [1,4,5,6,14,15], 'FR': 1 }; break;
		case 'f6': this.chord = { 'name': 'F6', 'positions': [5,6,10], 'FR': 1 }; break;
		case 'f7': this.chord = { 'name': 'F7', 'positions': [1,3,5,6,10,14], 'FR': 1 }; break;
		case 'f9': this.chord = { 'name': 'F9', 'positions': [10,15,18,23], 'FR': 1 }; break;
		case 'fm6': this.chord = { 'name': 'Fm6', 'positions': [4,5,6], 'FR': 1 }; break;
		case 'fm7': this.chord = { 'name': 'Fm7', 'positions': [1,3,4,5,6,14], 'FR': 1 }; break;
		case 'fmaj7': this.chord = { 'name': 'Fmaj7', 'positions': [5,10,15], 'FR': 1 }; break;
		case 'fdim': this.chord = { 'name': 'Fdim', 'positions': [4,6], 'FR': 1 }; break;
		case 'f+': this.chord = { 'name': 'F+', 'positions': [6,10,11,15], 'FR': 1 }; break;
		case 'fsus': this.chord = { 'name': 'Fsus', 'positions': [5,6,15,16], 'FR': 1 }; break;

		case 'g': this.chord = { 'name': 'G', 'positions': [8,13,17,18], 'FR': 1 }; break;
		case 'gm': this.chord = { 'name': 'Gm', 'positions': [1,4,5,6,14,15], 'FR': 1 }; break;
		case 'g6': this.chord = { 'name': 'G6', 'positions': [8,13], 'FR': 1 }; break;
		case 'g7': this.chord = { 'name': 'G7', 'positions': [6,8,13], 'FR': 1 }; break;
		case 'g9': this.chord = { 'name': 'G9', 'positions': [6,10,13], 'FR': 1 }; break;
		case 'gm6': this.chord = { 'name': 'Gm6', 'positions': [9,16,17,18], 'FR': 1 }; break;
		case 'gm7': this.chord = { 'name': 'Gm7', 'positions': [1,3,4,5,6,14], 'FR': 3 }; break;
		case 'gmaj7': this.chord = { 'name': 'Gmaj7', 'positions': [6,11,16,21], 'FR': 2 }; break;
		case 'gdim': this.chord = { 'name': 'Gdim', 'positions': [9,11,16,18], 'FR': 1 }; break;
		case 'g+': this.chord = { 'name': 'G+', 'positions': [3,18], 'FR': 1 }; break;
		case 'gsus': this.chord = { 'name': 'Gsus', 'positions': [5,18], 'FR': 1 }; break;

		default: this.chord = { 'name': 'Invlaid chord name', 'positions': [], 'FR': 0 }; break;
	}

	/**
	 * Draws the basic shape of the canvas (background and strings)
	 */
	this.drawCanvas = function() {
		this.ctx.fillStyle = "white";
		this.ctx.fillRect(0,0,canvas.width,canvas.height);

		for(var i=0; i<6; i++) {
			this.ctx.beginPath();
			this.ctx.moveTo(this.margin+this.marginH*i,20);
			this.ctx.lineTo(this.margin+this.marginH*i, 120);
			this.ctx.stroke();

			this.ctx.beginPath();
			this.ctx.moveTo(19,this.margin+this.marginV*i);
			this.ctx.lineTo(79,this.margin+this.marginV*i);
			this.ctx.stroke();
		}
	}

	/**
	 * Writes the name of the chord on the top-center side of the canvas
	 * Defines the position on canvas of each asigned finger and draws
	 * 	the corresponding circles
	 */
	this.drawChord = function() {
		$(this.canvas.parentNode).prepend(this.chord.name);
		this.ctx.fillStyle = "black";
		this.ctx.font = 'Bold 12px Calibri';
		this.ctx.textAlign = 'center';
		this.ctx.fillText(this.chord.name, 49, 14);
		this.ctx.fillText(this.chord.FR+" fr", 9, 22);

		for(var i=0; i<this.chord.positions.length; i++) {
			var c = this.chord.positions[i];
			var x = 0;
			var y = 0;
			if(c==1 || c==7 || c==13 || c==19 || c==25) x = 20;
			if(c==2 || c==8 || c==14 || c==20 || c==26) x = 31.5;
			if(c==3 || c==9 || c==15 || c==21 || c==27) x = 43.5;
			if(c==4 || c==10 || c==16 || c==22 || c==28) x = 55;
			if(c==5 || c==11 || c==17 || c==23 || c==29) x = 66.5;
			if(c==6 || c==12 || c==18 || c==24 || c==30) x = 78.5;
			
			if(c==1 || c==2 || c==3 || c==4 || c==5 || c==6 ) y = 29;
			if(c==7 || c==8 || c==9 || c==10 || c== 11 || c==12 ) y = 49.5;
			if(c==13 || c==14 || c==15 || c==16 || c== 17 || c==18 ) y = 69.5;
			if(c==19 || c==20 || c==21 || c==22 || c== 23 || c==24 ) y = 90;
			if(c==25 || c==26 || c==27 || c==28 || c== 29 || c==30 ) y = 110;

			this.ctx.beginPath();
			this.ctx.arc(x,y, 2, 0, 2 * Math.PI, false);
			this.ctx.lineWidth = 5;
			this.ctx.strokeStyle = 'black';
			this.ctx.stroke();
		}
	}
	this.drawCanvas();
	this.drawChord();
}