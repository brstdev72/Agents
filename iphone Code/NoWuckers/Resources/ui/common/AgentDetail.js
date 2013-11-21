var Agent = Ti.UI.currentWindow;
Agent.orientationModes = [Ti.UI.PORTRAIT];

var calling = false;

var wdh = Titanium.Platform.displayCaps.platformWidth;

var animateLeft = Ti.UI.createAnimation({
	left : wdh,
	duration : 400,
	height : '100%',
	width : Ti.Platform.displayCaps.platformWidth,
});
Agent.addEventListener('swipe', function(e) {
	if (e.direction == 'left') {
	} else if (e.direction == 'right') {
		Agent.animate(animateLeft);
		setTimeout(function() {
			Agent.close();
		}, 500);
	}
});

var busy = Ti.App.Properties.getBool('busy', false);

var Labelfont = Math.round(Ti.Platform.displayCaps.platformWidth * 0.035);
var detailfont = Math.round(Ti.Platform.displayCaps.platformWidth * 0.035);
var buttonfont = Math.round(Ti.Platform.displayCaps.platformWidth * 0.055);
var radius = Math.round(Ti.Platform.displayCaps.platformWidth * 0.002);

var Allview = Ti.UI.createView({
	backgroundColor : '#A00002',
	height : '100%',
	width : '100%'
});

Agent.add(Allview);

var indicators = Ti.UI.createActivityIndicator({
	height : '50%',
	width : '60%',
	color : 'white',
	message : '  Loading...'

});
Allview.add(indicators);
indicators.show();

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
	Agent.animate(animateLeft);
	setTimeout(function() {
		Agent.close();
	}, 500);
});

// Add to the parent view.
TopBar.add(Back);

var Aids = Ti.App.Properties.getString('busy');
var json;
var name, company, quality, area, phone_number, pic_url, pic_url1, pic_url2, pic_url3, pic_url4, voice_card, status, phone_no;

var url = "http://dnspalette.com/api/agentprofileApi.php?agent_id=" + Aids;
var detail = Ti.Network.createHTTPClient({
	// function called when the response data is available
	onload : function(e) {
		Ti.API.info("Received text: " + this.responseText);
		json = JSON.parse(this.responseText);
		for ( i = 0; i < json.length; i++) {

			name = json[0].agent_name;
			company = json[0].company;
			quality = json[0].quality;
			area = json[0].area;
			phone_number = json[0].agent_phone_number;
			pic_url = json[0].photo_url;
			pic_url1 = json[0].photo_url1;
			pic_url2 = json[0].photo_url2;
			pic_url3 = json[0].photo_url3;
			pic_url4 = json[0].photo_url4;
			voice_card = json[0].voicefile_url;
			status = json[0].status;
			phone_no = json[0].agent_phone_number;
			agent_no_rate = json[0].agent_phone_number_rate;
		}
		// player = Ti.Media.createSound({
			// url : "http://dnspalette.com/api/sound/" + voice_card
		// });
		//Ti.API.error("http://dnspalette.com/api/sound/" + voice_card);
		//player.audioSessionMode = Ti.Media.AUDIO_SESSION_MODE_PLAYBACK;
		indicators.hide();

		// Create a Button.
		var Tap = Ti.UI.createButton({
			backgroundImage : 'none',
			title : 'TAP to Call',
			color : '#622C07',
			backgroundColor : '#FFAE14',
			height : '70%',
			font : {
				fontWeight : 'bold',
				fontSize : buttonfont
			},
			width : '40%',
			right : '3%',
			borderRadius : 3
		});

		// Listen for click events.
		Tap.addEventListener('click', function() {
			play = false;
			if (status == '0') {
				Ti.Platform.openURL('telprompt://' + phone_no);
			} else {
				alert('Please come back later!');
			}

		});

		// Add to the parent view.
		TopBar.add(Tap);

		var body = Ti.UI.createView({
			width : '100%',
			height : '90%',
			top : '10%'
		});
		Allview.add(body);

		var BigImageView = Ti.UI.createImageView({
			backgroundImage : '/images/noImage.png',
			image : 'http://dnspalette.com/api/images/' + pic_url,
			backgroundColor : '#38313F',
			width : '100%',
			height : '45%',
			top : '0%'
		});

		BigImageView.addEventListener('click', function() {
			play = false;
			if (status == '0') {
				Ti.Platform.openURL('telprompt://' + phone_no);
			} else {
				alert('Please come back later!');
			}
		});
		body.add(BigImageView);

		var qImageView = Ti.UI.createImageView({
			image : '/images/q-mark.png',
			width : '15%',
			height : '10%',
			left : '2%',
			top : '1%'
		});
		qImageView.addEventListener('click', function() {
			play = false;
			var help = Ti.UI.createWindow({
				backgroundColor : '#A00002',
				url : 'Help.js',
				navBarHidden : true,
				fullscreen : true
			});
			help.open();
		});

		body.add(qImageView);

		var play = false;
		// var profileImageView = Ti.UI.createImageView({
			// image : '/images/profile.png',
			// width : '15%',
			// height : '10%',
			// left : '2%',
			// top : '11.5%'
		// });
		// profileImageView.addEventListener('click', function() {
			// if (!play) {
				// Allview.add(indicators);
				// indicators.show();
				// indicators.color = 'black';
				// indicators.style = Ti.UI.iPhone.ActivityIndicatorStyle.DARK;
				// player.play();
				// setTimeout(function() {
					// indicators.hide();
					// Allview.remove(indicators);
				// }, 500);
				// play = true;
			// } else {
				// play = false;
			// }
		// });
		// body.add(profileImageView);

		var centerLebelview = Ti.UI.createScrollView({
			backgroundColor : '#430000',
			width : '100%',
			height : '15%',
			top : '45%',
			layout : 'vertical'
		});
		body.add(centerLebelview);

		// Create a Label.
		var text = Ti.UI.createLabel({
			text : name + ", " + company + ", " + quality + ", " + area,
			color : 'white',
			font : {
				fontSize : detailfont,
				fontWeight : 'bold'
			},
			top : 1,
			left : 1
		});

		if (status == '0') {

		} else {
			var busyView = Ti.UI.createButton({
				backgroundImage : 'none',
				title : 'In a Call, Sorry',
				color : '#622C07',
				backgroundColor : '#FFAE14',
				height : '50%',
				font : {
					fontWeight : 'bold',
					fontSize : buttonfont
				},
				width : '60%',
				bottom : 0,
				left : 0
			});
			centerLebelview.add(busyView);
		}

		// Add to the parent view.
		centerLebelview.add(text);

		// Create a Label.
		var textlabel = Ti.UI.createLabel({
			top : '60%',
			text : "Tap on the button in the right upper corner to get connected, or simply tap on the picture.",
			color : 'white',
			font : {
				fontSize : Labelfont,
				fontWeight : 'bold'
			},
			left : 1
		});

		// Add to the parent view.
		body.add(textlabel);

		var textlabel2 = Ti.UI.createLabel({
			top : '67%',
			text : "Call costs are $" + agent_no_rate + " per minute, GST included. Higher from Pay/Mob.",
			color : 'white',
			font : {
				fontSize : Labelfont,
				fontWeight : 'bold'
			},
			left : 1
		});
		// Add to the parent view.
		body.add(textlabel2);

		var agentImageView1 = Ti.UI.createImageView({
			backgroundImage : '/images/noImage.png',
			backgroundColor : '#38313F',
			image : 'http://dnspalette.com/api/thumb/' + pic_url1,
			width : '20%',
			height : '15%',
			left : '2%',
			top : '74%'
		});
		agentImageView1.addEventListener('click', function() {
			play = false;
			BigImageView.image = 'http://dnspalette.com/api/images/' + pic_url1;
		});
		body.add(agentImageView1);

		var agentImageView2 = Ti.UI.createImageView({
			backgroundImage : '/images/noImage.png',
			backgroundColor : '#38313F',
			image : 'http://dnspalette.com/api/thumb/' + pic_url2,
			width : '20%',
			height : '15%',
			left : '27%',
			top : '74%'
		});
		agentImageView2.addEventListener('click', function() {
			play = false;
			BigImageView.image = 'http://dnspalette.com/api/images/' + pic_url2;
		});
		body.add(agentImageView2);

		var agentImageView3 = Ti.UI.createImageView({
			backgroundImage : '/images/noImage.png',
			backgroundColor : '#38313F',
			image : 'http://dnspalette.com/api/thumb/' + pic_url3,
			width : '20%',
			height : '15%',
			left : '52%',
			top : '74%'
		});
		agentImageView3.addEventListener('click', function() {
			play = false;
			BigImageView.image = 'http://dnspalette.com/api/images/' + pic_url3;
		});
		body.add(agentImageView3);
		var agentImageView4 = Ti.UI.createImageView({
			backgroundImage : '/images/noImage.png',
			backgroundColor : '#38313F',
			image : 'http://dnspalette.com/api/thumb/' + pic_url4,
			width : '20%',
			height : '15%',
			left : '77%',
			top : '74%'
		});
		agentImageView4.addEventListener('click', function() {
			play = false;
			BigImageView.image = 'http://dnspalette.com/api/images/' + pic_url4;
		});
		body.add(agentImageView4);

	},
	// function called when an error occurs, including a timeout
	onerror : function(e) {
		Ti.API.debug(e.error);
		indicators.hide();
		alert(e.error);
	},
	timeout : 5000 // in milliseconds
});
// Prepare the connection.
detail.open("GET", url);
// Send the request.
detail.send();

