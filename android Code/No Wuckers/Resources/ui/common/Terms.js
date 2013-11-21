var terms = Ti.UI.currentWindow;

var indicators = Ti.UI.createActivityIndicator({
	height : '50%',
	width : '60%',
	color : 'white',
	message : '  Loading...'
});
terms.add(indicators);
indicators.show();

var termstext;
var wdh = Titanium.Platform.displayCaps.platformWidth;
var animateLeft = Ti.UI.createAnimation({
	left : wdh,
	duration : 400,
	height : '100%',
	width : Ti.Platform.displayCaps.platformWidth,
});

terms.addEventListener('swipe', function(e) {
	if (e.direction == 'left') {
	} else if (e.direction == 'right') {
		terms.animate(animateLeft);
			terms.close();
	}
});

var titlefont = Math.round(Ti.Platform.displayCaps.platformWidth * 0.060);
var textfont = Math.round(Ti.Platform.displayCaps.platformWidth * 0.04);

var url = "http://dnspalette.com/api/termsAndHelp.php?terms=terms";
var client = Ti.Network.createHTTPClient({
	// function called when the response data is available
	onload : function(e) {
		Ti.API.info("Received text: " + this.responseText);
		json = JSON.parse(this.responseText);
		for (var i = 0; i < json.length; i++) {
			termstext = json[i].terms;
		}
		
		indicators.hide();
		var Allview = Ti.UI.createView({
			backgroundColor : '#4F0000',
			height : '100%',
			width : '100%'
		});

		terms.add(Allview);

		var TopBar = Ti.UI.createView({
			backgroundColor : '#B80000',
			width : '100%',
			height : '10%',
			top : 0
		});
		Allview.add(TopBar);

		// Create an ImageView.
		var Back = Ti.UI.createImageView({
			image : '/images/arrow.png',
			width : '15%',
			height : '70%',
			left : '2%'
		});
		Back.addEventListener('click', function() {
			terms.animate(animateLeft);
				terms.close();
		});

		// Add to the parent view.
		TopBar.add(Back);

		// Create a Label.
		var Wuckers = Ti.UI.createLabel({
			text : 'No Wuckers',
			color : 'white',
			font : {
				fontSize : titlefont,
				fontFamily : 'ChalkDust'
			},
			textAlign : 'center'
		});

		// Add to the parent view.
		TopBar.add(Wuckers);

		var body = Ti.UI.createScrollView({
			height : 'auto',
			width : '100%',
			top : '10%'
		});

		Allview.add(body);

		// Create a Label.
		var Textlabel = Ti.UI.createLabel({
			text : termstext,
			color : 'white',
			font : {
				fontSize : textfont,
			},
			left : '2%',
		});

		// Add to the parent view.
		body.add(Textlabel);

		var Textlabel2 = Ti.UI.createLabel({
			text : '\n\n',
			font : {
				fontSize : textfont,
			},
			left : '2%',
		});

		// Add to the parent view.
		body.add(Textlabel2);

	},
	// function called when an error occurs, including a timeout
	onerror : function(e) {
		Ti.API.debug(e.error);
		alert(e.error);
	},
	timeout : 5000 // in milliseconds
});
// Prepare the connection.
client.open("GET", url);
// Send the request.
client.send(); 