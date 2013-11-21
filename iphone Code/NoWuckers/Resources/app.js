var app = Ti.UI.createWindow({
	backgroundColor : '#A00002',
	url : 'ui/common/FirstView.js',
	navBarHidden : true,
	fullscreen:true
});

var json;
var jsoncategory;
var ownership;

var Category_id = [];
var Category_name = [];

var AgentImagesData = [];
var AgentStatusData = [];
var AgentidData = [];
var url = "http://dnspalette.com/api/categoryList.php";
var client = Ti.Network.createHTTPClient({
	// function called when the response data is available
	onload : function(e) {
		Ti.API.info("Received text: " + this.responseText);
		jsoncategory = JSON.parse(this.responseText);
		for ( i = 0; i < jsoncategory.length; i++) {
			Category_id.push(jsoncategory[i].category_id);
			Category_name.push(jsoncategory[i].name);
		}

		Ti.App.Properties.setList('Category_id', Category_id);
		Ti.App.Properties.setList('Category_name', Category_name);

		var cat = Ti.App.Properties.getString('Category', Category_id[2]);

		var url = "http://dnspalette.com/api/agentlistApi.php?category_id=%20" + cat + "&show_next=0";
		var client = Ti.Network.createHTTPClient({
			// function called when the response data is available
			onload : function(e) {
				Ti.API.info("Received text: " + this.responseText);
				json = JSON.parse(this.responseText);
				for ( i = 0; i < json.length; i++) {
					AgentImagesData.push(json[i].photo_url);
					AgentStatusData.push(json[i].status);
					AgentidData.push(json[i].agent_id);
				}
				Ti.App.Properties.setList('images', AgentImagesData);
				Ti.App.Properties.setList('status', AgentStatusData);
				Ti.App.Properties.setList('id', AgentidData);
				Ti.App.Properties.setString('selectCategory', cat);

				var url = "http://dnspalette.com/api/termsAndHelp.php?terms=ownership";
				var client = Ti.Network.createHTTPClient({
					// function called when the response data is available
					onload : function(e) {
						Ti.API.info("Received text: " + this.responseText);
						json = JSON.parse(this.responseText);
						for (var i = 0; i < json.length; i++) {
							ownership = json[i].ownership;
						}
						Ti.App.Properties.setString('ownership', ownership);
						app.open();
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

