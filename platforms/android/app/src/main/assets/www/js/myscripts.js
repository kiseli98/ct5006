  // Wait for Cordova to load
//
document.addEventListener("deviceready", onDeviceReady, false);

// Cordova is ready
//
function onDeviceReady() {
    // Empty
}

// Show a custom alert
//
function showAlert() {
    navigator.notification.alert(
    );
}

// Beep three times
//
function playBeep() {
    navigator.notification.beep(3);
}

// Vibrate for 2 seconds
//
function vibrate() {
    navigator.notification.vibrate(3000);
}



window.addEventListener("batterylow", onBatteryLow, false);

function onBatteryLow(status) {
	navigator.notification.beep(1);
	navigator.notification.vibrate(2000);
    alert("Battery Level Low " + status.level + "%");
}


window.addEventListener("batterycritical", onBatteryCritical, false);

function onBatteryCritical(status) {
	navigator.notification.beep(1);
    alert("Battery Level Critical " + status.level + "%\nRecharge Soon!");
}








google.maps.event.addDomListener(window, 'load', initMap);




function js_Load() {
	document.body.style.visibility='visible';
} 
/***********************************************************/
/***********************REMOVE URL BAR**********************/
/***********************************************************/
(function( win ){
	var doc = win.document;
	
	// If there's a hash, or addEventListener is undefined, stop here
	if( !location.hash && win.addEventListener ){
		
		//scroll to 1
		win.scrollTo( 0, 1 );
		var scrollTop = 1,
			getScrollTop = function(){
				return win.pageYOffset || doc.compatMode === "CSS1Compat" && doc.documentElement.scrollTop || doc.body.scrollTop || 0;
			},
		
			//reset to 0 on bodyready, if needed
			bodycheck = setInterval(function(){
				if( doc.body ){
					clearInterval( bodycheck );
					scrollTop = getScrollTop();
					win.scrollTo( 0, scrollTop === 1 ? 0 : 1 );
				}	
			}, 15 );
		
		win.addEventListener( "load", function(){
			setTimeout(function(){
				//at load, if user hasn't scrolled more than 20 or so...
				if( getScrollTop() < 20 ){
					//reset to hide addr bar at onload
					win.scrollTo( 0, scrollTop === 1 ? 0 : 1 );
				}
			}, 0);
		}, false );
	}
})( this );






/***********************************************************/
/**********************SOUND MANAGEMENT*********************/
/***********************************************************/
function playMusic(marker){
	var sound = new Howl({
		src: [marker.audioSrc],
		id: 0,
	});
	stopMusic();
	sound.id = sound.play();
	//push current sound
	sounds.push(sound);

	sound.fade(1, 0.99, 15000, sound.id);

	sound.on('fade', function(){
	  fadeMusic(sound);
	});
}


function fadeMusic(sound){
	sound.fade(0.99, 0, 5000, sound.id);
	sound.on('fade', function(){
	  sound.stop();
	});
}

function stopMusic(){
	for(var i =0; i < sounds.length; i++){

		
		sounds[i].stop();

	}
	sounds = [];
}





/***********************************************************/
/************************MAP*******************************/
/***********************************************************/

var rectangle;

var map;

//NEED FOR AUTO PLAY
var currentPosition;

var markersOnMap = [];

var sounds = [];

var allInfoWindowsAreOpen = false;

var centered = false;

var userMarker;

CustomOverlay.prototype = new google.maps.OverlayView();

var directionsDisplay;

var directionsService;






function initMap() {

	map = new google.maps.Map( document.getElementById( 'map' ), { 
		zoom: 15, 
		center: { lat: 51.8993855, lng: -2.0782533000000285 }
	} );


	directionsService = new google.maps.DirectionsService;
    directionsDisplay = new google.maps.DirectionsRenderer({suppressMarkers: true, preserveViewport: true});

    directionsDisplay.isSet = false;
    directionsDisplay.interval = null;
    directionsDisplay.destination = null;
	
	/*****************************************************/
	/*HELPER FUNCTIONS TO GET COORDINATES*/
	/*****************************************************/
		
	// var rectangleBounds = {
	// 	north: 51.88745273804998,
	// 	south: 51.88730595331784,
	// 	east: -2.0885914920654614,
	// 	west: -2.0888426441803176
	// };
		
	// //define the rectangle and set its editable property to true.
	// rectangle = new google.maps.Rectangle( { bounds: rectangleBounds, editable: true, draggable: true } );
	
	// //assign the rectangle to the map
	// rectangle.setMap( map );

	// //add an event listener on the rectangle.
	// rectangle.addListener( 'bounds_changed', showNewBounds );
	

	//assign a click event to google maps
	google.maps.event.addListener( map, 'click', function( e ) {
		
		console.log(e.latLng.toString() );	
	});


	/***********************************************************/
	/***************************MARKERS************************/
	/***********************************************************/
	var markers = [

		//WATERWORTH VENUE
		{
			coords:{lat:51.888232316954806, lng:-2.0885481838890882},
			iconImage:'img/mapIcons/performance.png',
			title: 'Venue',
			content:'Waterworth Venue',
			popupId: 'waterworthPopup',
			audioSrc:'audio/Advent_Chamber_Orchestra_-_04_-_Mozart_-_Eine_Kleine_Nachtmusik_allegro.mp3',
			overlay:[{
						image:'https://zayddawood.studentsites.glos.ac.uk/images/waterworth-lower.png',
						bounds: new google.maps.LatLngBounds(
					        new google.maps.LatLng(51.88813906932014, -2.0887990582838256),
					        new google.maps.LatLng(51.88836034655085, -2.088323271163972)),
						zones:[{ 
									name:'Classrooms',
									bounds: [
											{lat: 51.888221525791735, lng: -2.088760836558322},
											{lat: 51.88823779182255, lng: -2.0885881068059007},
											{lat: 51.88816811163341, lng: -2.0885649574361196},
											{lat: 51.888150351419554, lng: -2.0887394577575833},
											{lat: 51.888221525791735, lng: -2.088760836558322}],
								},//next zone
								{ 
									name:'Library',
									bounds: [
											{lat: 51.88817498223461, lng: -2.0885310949677205},
											{lat: 51.88829016326547, lng: -2.088555312753897},
											{lat: 51.8883007141722, lng: -2.0883616485645007},
											{lat: 51.888189929420584, lng: -2.088333505668288},
											{lat: 51.88817498223461, lng: -2.0885310949677205}],
								}//next zone
								],
					},//next floor
					{
						image:'https://videohive.img.customer.envatousercontent.com/files/242367096/preview.jpg?auto=compress%2Cformat&fit=crop&crop=top&max-h=8000&max-w=590&s=8371656cb8fc43606a419b281c4a1f28',
						bounds: new google.maps.LatLngBounds(
					        new google.maps.LatLng(51.888343048409865, -2.0887901028437454),
					        new google.maps.LatLng(51.88842657634278, -2.0884026182649222)),
						zones:[{ 
									name:'Road',
									bounds: [
											{lat: 51.888343048409865, lng: -2.0887901028437454},
											{lat: 51.88838701048055, lng: -2.088804348641247},
											{lat: 51.88842657634278, lng: -2.0884026182649222},
											{lat: 51.888386131276945, lng: -2.088384098924621},
											{lat: 51.888343048409865, lng: -2.0887901028437454}],
								},//next zone
								],
					},//next floor
					],
		},

		//Sound Music Venue
		{
			coords:{lat:51.90044196701055, lng:-2.0793591558668822},
			iconImage:'img/mapIcons/performance.png',
			title: 'Venue',
			content:'Sound Music Venue',
			popupId: 'soundMusicPopup',
			audioSrc:'audio/cheap_thrills.mp3',
			overlay:[{
						image:'img/venues/1 - Sound Music Venue/1 Sound music venue 1st.png',
						bounds: new google.maps.LatLngBounds(
					        new google.maps.LatLng(51.90036616884511, -2.0794752285708),
					        new google.maps.LatLng(51.90054297979504, -2.0792274898088863)),
						zones:[{ 
									name:'Stage 1',
									bounds: [
											{lat: 51.90053203905779, lng: -2.079364037795358},
											{lat: 51.900459327284274, lng: -2.0792411681551357},
											{lat: 51.900437804572654, lng: -2.0792741638157395},
											{lat: 51.9005013885087, lng: -2.0793875935665938},
											{lat: 51.90053203905779, lng: -2.079364037795358}],
								},//next zone
								{ 
									name:'Zone A',
									bounds: [
											{lat: 51.90049707677929, lng: -2.0793917804701323},
											{lat: 51.90043522325081, lng: -2.07927990938947},
											{lat: 51.90040982257158, lng: -2.079328303062539},
											{lat: 51.900459460526285, lng: -2.079416134434041},
											{lat: 51.90049707677929, lng: -2.0793917804701323}],
								},//next zone

								{ 
									name:'Zone B',
									bounds: [
											{lat: 51.90045374707226, lng: -2.0794214140835265},
											{lat: 51.900405362558686, lng: -2.0793359708311527},
											{lat: 51.900382773383896, lng: -2.0793785509760028},
											{lat: 51.900426497489114, lng: -2.0794434424844894},
											{lat: 51.90045374707226, lng: -2.0794214140835265}],
								}//next zone
								],
					},//next floor
					{
						image:'img/venues/1 - Sound Music Venue/2 sound music venue 2nd.png',
						bounds: new google.maps.LatLngBounds(
					        new google.maps.LatLng(51.90036616884511, -2.0794752285708),
					        new google.maps.LatLng(51.90054297979504, -2.0792274898088863)),
						zones:[{ 
									name:'Stage 2',
									bounds: [
											{lat: 51.900508521757885, lng: -2.079323724298888},
											{lat: 51.9004565695349, lng: -2.079239095969797},
											{lat: 51.900431828576096, lng: -2.0792833676232476},
											{lat: 51.900482359260884, lng: -2.079366305513531},
											{lat: 51.900508521757885, lng: -2.079323724298888}],
								},//next zone
								{ 
									name:'backstage',
									bounds: [
											{lat: 51.900535372663235, lng: -2.07936379993032},
											{lat: 51.90051165414307, lng: -2.0793294121368717},
											{lat: 51.90044474416186, lng: -2.079438301940627},
											{lat: 51.900535372663235, lng: -2.07936379993032}],
								},//next zone
								{ 
									name:'Zone C',
									bounds: [
											{lat: 51.90047797603456, lng: -2.079371675119205},
											{lat: 51.90042828835249, lng: -2.079286326613783},
											{lat: 51.900377191918864, lng: -2.0793675611001845},
											{lat: 51.90042724954017, lng: -2.07945141035259},
											{lat: 51.90047797603456, lng: -2.079371675119205}],
								},//next zone
								],
					},//next floor
					],
		},





		//Cheltenham Festivals Venue
		{
			coords:{lat:51.891194385930326, lng:-2.0778118124151206},
			iconImage:'img/mapIcons/performance.png',
			title: 'Venue',
			content:'Cheltenham Festivals Venue',
			popupId: 'cheltenhamFestivalsPopup',
			audioSrc:'audio/fair_music.mp3',
			overlay:[{
						image:'img/venues/3 -Cheltenham Festivals/1 Cheltenham Festivals 1st floor.png',
						bounds: new google.maps.LatLngBounds(
					        new google.maps.LatLng(51.89102112597523, -2.078099726523419),
					        new google.maps.LatLng(51.891360331964094, -2.077599128970178)),
						zones:[{ 
									name:'Stage 1',
									bounds: [
											{lat: 51.89120685069501, lng: -2.07794954491078},
											{lat: 51.89115054561761, lng: -2.077798299412734},
											{lat: 51.891044572005214, lng: -2.0778999391563957},
											{lat: 51.89110066313619, lng: -2.078054306736817},
											{lat: 51.89120685069501, lng: -2.07794954491078}],
								},//next zone
								{ 
									name:'Zone A',
									bounds: [
											{lat: 51.89125538296077, lng: -2.077904599666226},
											{lat: 51.89120216089235, lng: -2.07774393785553},
											{lat: 51.89115698838148, lng: -2.077791635703761},
											{lat: 51.89121231582031, lng: -2.077943483234094},
											{lat: 51.89125538296077, lng: -2.0779045996662263}],
								},//next zone

								{ 
									name:'Cafe',
									bounds: [
											{lat: 51.89134433086151, lng: -2.07782896113838},
											{lat: 51.89128621147139, lng: -2.0776645675855434},
											{lat: 51.89125741673066, lng: -2.077691972203638},
											{lat: 51.891234830508644, lng: -2.0776335206458043},
											{lat: 51.891190835520675, lng: -2.0776777495300394},
											{lat: 51.89126022185738, lng: -2.0778981314458633},
											{lat: 51.89134433086151, lng: -2.07782896113838}],
								}//next zone
								],
					},//next floor
					{
						image:'img/venues/3 -Cheltenham Festivals/2 Cheltenham Festivals 2nd floor.png',
						bounds: new google.maps.LatLngBounds(
					        new google.maps.LatLng(51.89102112597523, -2.078099726523419),
					        new google.maps.LatLng(51.891360331964094, -2.077599128970178)),
						zones:[{ 
									name:'Stage 2',
									bounds: [
											{lat: 51.8913409379006, lng: -2.0778373553449683},
											{lat: 51.89128506116675, lng: -2.0776684182093277},
											{lat: 51.891212271464546, lng: -2.0777482037366326},
											{lat: 51.89126386652519, lng: -2.077909509181154},
											{lat: 51.8913409379006, lng: -2.0778373553449683}],
								},//next zone
								{ 
									name:'backstage',
									bounds: [
											{lat: 51.89124888040255, lng: -2.077680212607106},
											{lat: 51.891231325243844, lng: -2.077633728896785},
											{lat: 51.891197071258624, lng: -2.0776736216604377},
											{lat: 51.891212125659706, lng: -2.0777218869549188},
											{lat: 51.89124888040255, lng: -2.077680212607106}],
								},//next zone
								{ 
									name:'Zone B',
									bounds: [
											{lat: 51.89125645075082, lng: -2.0779157899823986},
											{lat: 51.891202368209704, lng: -2.077752282216238},
											{lat: 51.89104356733575, lng: -2.07789780402652},
											{lat: 51.89110102839847, lng: -2.0780664063465792},
											{lat: 51.89125645075082, lng: -2.0779157899823986}],
								},//next zone
								],
					},//next floor
					],
		},



		//Cheltenham Stage Venue
		{
			coords:{lat:51.8839704373038, lng:-2.0739932079139862},
			iconImage:'img/mapIcons/performance.png',
			title: 'Venue',
			content:'Cheltenham Stage Venue',
			popupId: 'cheltenhamStagePopup',
			audioSrc:'audio/i_went_too_far.mp3',
			overlay:[{
						image:'img/venues/2 - Cheltenham Stage Services/1 cheltenham stage services crop 1st floor.png',
						bounds: new google.maps.LatLngBounds(
					        new google.maps.LatLng(51.88391249118807, -2.074079095210095),
					        new google.maps.LatLng(51.8840216219417, -2.0738963394251186)),
						zones:[{ 
									name:'Stage 1',
									bounds: [
											{lat: 51.8839983770365, lng: -2.0740620399693626},
											{lat: 51.884014476473276, lng: -2.073981907597613},
											{lat: 51.88398615698054, lng: -2.0739064888556413},
											{lat: 51.88397420654471, lng: -2.073981657404943},
											{lat: 51.8839983770365, lng: -2.0740620399693626}],
								},//next zone
								{ 
									name:'Zone A',
									bounds: [
											{lat: 51.88398321734662, lng: -2.0740576124139807},
											{lat: 51.88396632260675, lng: -2.073987796475876},
											{lat: 51.88397854268703, lng: -2.0739141061101236},
											{lat: 51.88392187634575, lng: -2.0739195991302495},
											{lat: 51.88392905321708, lng: -2.0740632089263045},
											{lat: 51.88398321734662, lng: -2.0740576124139807}],
								},//next zone
								],
					},//next floor
					{
						image:'img/venues/2 - Cheltenham Stage Services/2 cheltenham stage services 2nd floor.png',
						bounds: new google.maps.LatLngBounds(
					        new google.maps.LatLng(51.88391249118807, -2.074079095210095),
					        new google.maps.LatLng(51.8840216219417, -2.0738963394251186)),
						zones:[{ 
									name:'Stage 2',
									bounds: [
											{lat: 51.88401465909472, lng: -2.074053806985944},
											{lat: 51.88400903397823, lng: -2.0739098829503746},
											{lat: 51.88396267533275, lng: -2.0739158535625393},
											{lat: 51.88396888234113, lng: -2.074059777621187},
											{lat: 51.88401465909472, lng: -2.074053806985944}],
								},//next zone
								{ 
									name:'Zone B',
									bounds: [
											{lat: 51.88396542114356, lng: -2.074059070939825},
											{lat: 51.88396309350429, lng: -2.073999364472911},
											{lat: 51.88392507547584, lng: -2.0740043923818803},
											{lat: 51.88392808201851, lng: -2.074063470379997},
											{lat: 51.88396542114356, lng: -2.074059070939825}],
								},//next zone
								{ 
									name:'Zone C',
									bounds: [
											{lat: 51.883962121696236, lng: -2.0739942721787656},
											{lat: 51.88395863024648, lng: -2.0739158681435583},
											{lat: 51.88392109713672, lng: -2.0739190105898615},
											{lat: 51.883926264750315, lng: -2.0739977601317605},
											{lat: 51.883962121696236, lng: -2.0739942721787656}],
								},//next zone
								],
					},//next floor

					{
						image:'img/venues/2 - Cheltenham Stage Services/3 Cheltenham Stage Services 3rd floor.png',
						bounds: new google.maps.LatLngBounds(
					        new google.maps.LatLng(51.88391249118807, -2.074079095210095),
					        new google.maps.LatLng(51.8840216219417, -2.0738963394251186)),
						zones:[{ 
									name:'Stage 3',
									bounds: [
											{lat: 51.88401264492007, lng: -2.074037410253368},
											{lat: 51.88400721377569, lng: -2.0739227109888816},
											{lat: 51.88395426014203, lng: -2.0739311955887842},
											{lat: 51.88401303286479, lng: -2.0740377245338095},
											{lat: 51.88401264492007, lng: -2.074037410253368}],
								},//next zone
								{ 
									name:'VIP Zone',
									bounds: [
											{lat: 51.88401255006051, lng: -2.074043306846079},
											{lat: 51.88395193465724, lng: -2.073989099652522},
											{lat: 51.88395144972883, lng: -2.073929864528168},
											{lat: 51.88395106178989, lng: -2.073929864528168},
											{lat: 51.88400764746467, lng: -2.073919337340726},
											{lat: 51.88400735651554, lng: -2.073908181658908},
											{lat: 51.883923270784635, lng: -2.07391902309098},
											{lat: 51.883925210474175, lng: -2.073982186252806},
											{lat: 51.88401336956752, lng: -2.074052419927625},
											{lat: 51.88401255006051, lng: -2.074043306846079}],
								},//next zone
								{ 
									name:'Zone D',
									bounds: [
											{lat: 51.8840130497541, lng: -2.07405519674478},
											{lat: 51.883925666544776, lng: -2.0739879484003723},
											{lat: 51.883928188158706, lng: -2.074064781198331},
											{lat: 51.8840130497541, lng: -2.07405519674478}],
								},//next zone
								],
					},//next floor
					],
		},



		//Royal Alber Hall
		{
			coords:{lat:51.501033973513834, lng:-0.1774554079393056},
			iconImage:'img/mapIcons/performance.png',
			title: 'Venue',
			content:'Royal Albert Hall',
			popupId: 'royalAlbertPopup',
			audioSrc:'audio/someone_like_you.mp3',
			overlay:[{
						image:'img/venues/4 - Royal Albert Hall (London)/1 Royal Albert Hall 1st floor.png',
						bounds: new google.maps.LatLngBounds(
					        new google.maps.LatLng(51.500526672511256, -0.1782149432983715),
					        new google.maps.LatLng(51.50149452727626, -0.17672802397157739)),
						zones:[{ 
									name:'Stage',
									bounds: [
											{lat: 51.50116908680959, lng: -0.17796113945450998},
											{lat: 51.5013598002249, lng: -0.1776266098022461},
											{lat: 51.501359454120546, lng: -0.17733344850500998},
											{lat: 51.501256666693855, lng: -0.17706772813642147},
											{lat: 51.5011199496904, lng: -0.17722560876904936},
											{lat: 51.50117825367491, lng: -0.17734632761516878},
											{lat: 51.50119596075674, lng: -0.17748022847740685},
											{lat: 51.50116141026228, lng: -0.17764812489417636},
											{lat: 51.50108151218172, lng: -0.17775011156800247},
											{lat: 51.50116908680959, lng: -0.17796113945450998}],
								},//next zone
								{ 
									name:'Sitting places',
									bounds: [
											{lat: 51.50108021708713, lng: -0.1771865114673119},
											{lat: 51.50121928293091, lng: -0.17702416533973064},
											{lat: 51.5010969610956, lng: -0.1769316336258271},
											{lat: 51.50097301079058, lng: -0.1769205329246688},
											{lat: 51.50085812971288, lng: -0.17697048567060847},
											{lat: 51.50077477593409, lng: -0.17706622828700347},
											{lat: 51.500661190063326, lng: -0.1773645566736377},
											{lat: 51.50068796693157, lng: -0.17765386585824672},
											{lat: 51.500818396306684, lng: -0.1779244426556943},
											{lat: 51.500952712238195, lng: -0.1780139411634991},
											{lat: 51.50110948565018, lng: -0.1779979841153363},
											{lat: 51.501026132369304, lng: -0.17776001529500718},
											{lat: 51.50086719919903, lng: -0.17766010992590964},
											{lat: 51.50081969191968, lng: -0.17743185402468953},
											{lat: 51.500901317974126, lng: -0.17722233038784907},
											{lat: 51.50108021708713, lng: -0.1771865114673119}],
								},//next zone
								{ 
									name:'Arena',
									bounds: [
											{lat: 51.50115045039702, lng: 0.17746312653287077},
											{lat: 51.50110276668218, lng: -0.1772929079319283},
											{lat: 51.50100472933827, lng: -0.17723809879805685},
											{lat: 51.50091165848969, lng: -0.17730088655832787},
											{lat: 51.500870450400264, lng: -0.17744484272691352},
											{lat: 51.50091091045041, lng: -0.17761787742836077},
											{lat: 51.50100120760406, lng: -0.17768374056026914},
											{lat: 51.50110442752191, lng: -0.17762685007051005},
											{lat: 51.50115045039702, lng: 0.17746312653287077}],
								},//next zone
								],
					},//next floor
					],
		},


		//POI MARKERS
		{
			coords:{lat: 51.8999604, lng:-2.076333},
			iconImage:'img/mapIcons/musical-notes.png',
			title: 'POI',
			content:'The Hare and the Minotaur',
			popupId: 'hareAndMinotaurPopup',
			audioSrc:'audio/tocatta.mp3',
		},
		{
			coords:{lat: 51.897000, lng:-2.078981},
			iconImage:'img/mapIcons/musical-notes.png',
			title: 'POI',
			content:'Gustav Holst',
			popupId: 'gustavHolstPopup',
			audioSrc:'audio/jupiter.mp3',
		},
		{
			coords:{lat: 51.898325, lng:-2.078414},
			iconImage:'img/mapIcons/musical-notes.png',
			title: 'POI',
			content:'The Neptune',
			popupId: 'neptunePopup',
			audioSrc:'audio/lanotte.mp3',
		},
		{
			coords:{lat: 51.969174, lng:-1.927943},
			iconImage:'img/mapIcons/musical-notes.png',
			title: 'POI',
			content:'Hailes Abbey',
			popupId: 'hailesAbbeyPopup',
			audioSrc:'audio/avemaria.mp3',
		},
		{
			coords:{lat: 51.899883, lng:-2.073981},
			iconImage:'img/mapIcons/musical-notes.png',
			title: 'POI',
			content:'Fish Clock',
			popupId: 'fishClockPopup',
			audioSrc:'audio/waltzinaflat.mp3',
		},
		{
			coords:{lat: 51.913874, lng:-2.043255},
			iconImage:'img/mapIcons/musical-notes.png',
			title: 'POI',
			content:'War Memorial',
			popupId: 'warMemorialPopup',
			audioSrc:'audio/adagietto.mp3',
		},
		//USER MARKERs
		{
			coords:{lat:51.89509997830726, lng:-2.081424746800394},
			iconImage:'img/mapIcons/user-location-alt.png',
			title: 'User',
			content:'Ethel Chancy',
			popupId: 'EthelChancyPopup',
		},
		{
			coords:{lat:51.89035850328748, lng:-2.06723300631495},
			iconImage:'img/mapIcons/user-location-alt.png',
			title: 'User',
			content:'Lorean Gainer',
			popupId: 'LoreanGainerPopup',
		},
		{
			coords:{lat:51.877618413376695, lng:-2.0750342143973057},
			iconImage:'img/mapIcons/user-location-alt.png',
			title: 'User',
			content:'Juliet Gieseke',
			popupId: 'JulietGiesekePopup',
		},
		{
			coords:{lat: 51.88847346925822, lng:-2.080084800655186},
			iconImage:'img/mapIcons/musical-notes.png',
			title: 'POI',
			content:'Home',
			popupId: 'homePopup',
			audioSrc:'audio/jupiter.mp3',
		},

	];

	// Loop through markers
	for(var i =0; i < markers.length; i++){

		addMarker(markers[i]);

	}

	setInterval(getCurrentPosition, 100);
}


function goToPage(page){
	window.location.replace(page);
}

function centerMap(){
	map.setZoom(17);
	map.panTo(currentPosition);

}


function changeMapType(){
	if(map.getMapTypeId() == "roadmap"){
		map.setMapTypeId("satellite");
	} else {
		if(map.getMapTypeId() == "satellite"){
			map.setMapTypeId("roadmap");
		}
	}
	
}


/***********************************************************/
/*************************GEOLOCATION**********************/
/***********************************************************/

function getCurrentPosition(){
		if ( "geolocation" in navigator ) {
			
	  	/* geolocation is available */
		
		var options = {
			enableHighAccuracy: true,
		  	timeout: 10000,
		  	maximumAge: 0
		};

		function success( position ) {
			
		  	var coordinates = position.coords;

			// console.log( 'Your current position is: ' + currentPosition );
		  	// console.log( 'Latitude : ' + coordinates.latitude );
		 //  	console.log( 'Longitude: ' + coordinates.longitude );
		 //  	console.log( 'More or less ' + coordinates.accuracy + ' meters.' );

	

			var center = new google.maps.LatLng( coordinates.latitude, coordinates.longitude );
			currentPosition = center;
			
			// CENTER MAP TO CURRENT USER POSITION
			if(!centered){
				addMarker({
			  		coords: new google.maps.LatLng( coordinates.latitude, coordinates.longitude ),
			  		title: 'Current Position',
			  		iconImage:'img/mapIcons/user-location.png',

			  	});
				map.panTo(center);
				centered = true;
				for( var i = 0; i<markersOnMap.length; i++){
			  		if(markersOnMap[i].title == "Current Position"){
			  			userMarker = markersOnMap[i];
						
			  		}
			  	}
			}

			var latlng = new google.maps.LatLng( coordinates.latitude, coordinates.longitude);
	        userMarker.setPosition(latlng);
	        getDistanceToMarkers();
			return center;
		}

		function error( error ) {
			
		  console.warn( 'ERROR(' + error.code + '): ' + error.message );
			
		}


		navigator.geolocation.getCurrentPosition( success, error, options );

		
	} else {
		
	  	/* geolocation IS NOT available */
		
	}
}


function getDistanceToMarkers(){
	var distance;
	var p1 = userMarker.getPosition();
	var p2;

	for( var i = 0; i<markersOnMap.length; i++){
  		if(markersOnMap[i].title == "POI" || markersOnMap[i].title == "Venue"){
  			
  			p2 = markersOnMap[i].getPosition();
  			distance = getDistance(p1, p2);

  			// console.log('----------');
  			// console.log(markersOnMap[i].infoWindow.content);
  			// console.log(distance);
  			// console.log('----------');

  			if(distance < 100 && markersOnMap[i].visited == false){





  				playBeep();
  				vibrate();

  				playMusic(markersOnMap[i]);
  				alert("You are now approaching " + markersOnMap[i].infoWindow.content);
  				markersOnMap[i].visited = true;

  			}

  			if(distance > 100  && markersOnMap[i].visited == true){
  				markersOnMap[i].visited = false;
  			}
			
  		}
  	}

}


var rad = function(x) {
  return x * Math.PI / 180;
};

function getDistance(p1,p2){
  var R = 6378137; // Earth’s mean radius in meter
  var dLat = rad(p2.lat() - p1.lat());
  var dLong = rad(p2.lng() - p1.lng());
  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(rad(p1.lat())) * Math.cos(rad(p2.lat())) *
    Math.sin(dLong / 2) * Math.sin(dLong / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d; // returns the distance in meter
};




/***********************************************************/
/************************MARKER POPUPS**********************/
/***********************************************************/
function getMarkerByPopupId(popupId){
	for(var i =0; i < markersOnMap.length; i++){
		if(markersOnMap[i].popupId == popupId){
			return markersOnMap[i];
		}
	}
}


function openMarkerPopups(){

	for( var i=0; i < markersOnMap.length; i++){
		if(markersOnMap[i].infoWindow !== null && markersOnMap[i].title != 'User'){
			markersOnMap[i].infoWindow.open(map, markersOnMap[i]);
		}
			
	}
	allInfoWindowsAreOpen = true;
}

function closeMarkerPopups(){

	for( var i=0; i < markersOnMap.length; i++){

		if(markersOnMap[i].infoWindow !== null && markersOnMap[i].title != 'User' && markersOnMap[i].infoWindow.isOpen){
			markersOnMap[i].infoWindow.close();
		}
	}
	allInfoWindowsAreOpen = false;
}


function toggleInfoWindows(){	
	if(allInfoWindowsAreOpen == false){
		openMarkerPopups();

	} else {
		closeMarkerPopups();
	}
}






/***********************************************************/
/*************************ADD MARKER***********************/
/***********************************************************/

function addMarker(props){
	var marker = new google.maps.Marker({
		position: props.coords,
		map:map,
		title: props.title,
		popupId: props.popupId,
		audioSrc: props.audioSrc,
		infoWindow: null,
		overlay:[],
		visited: false,
	}); 

	//check for custom icon
	if(props.iconImage ){

		var imgSize = 35;

		if(props.title == "Current Location"){
			imgSize = 40;
		}

		if(props.title == "Venue" || props.title == "POI" ){
			imgSize = 35;
		}

		if(props.title == "User"){
			imgSize = 25;
		}

		var icon = {
		    url: props.iconImage, // url
		    scaledSize: new google.maps.Size(imgSize, imgSize), // scaled size
		};
		//Set icon image
		marker.setIcon(icon);
	}

	//Check content
	if(props.content){

		//set isOpen property to markers popups
		google.maps.InfoWindow.prototype.isOpen = function(){
		    var map = this.getMap();
		    return (map !== null && typeof map !== "undefined");
		}


		marker.infoWindow = new google.maps.InfoWindow({
			content: props.content,
			disableAutoPan: true,
		});


		marker.addListener('click', function(){

			// closeMarkerPopups();
			// marker.infoWindow.open(map, marker);
			//Add popup
			$( '#'+marker.popupId ).popup( "open" );

		});
	}



	if(props.overlay){
		for(var i =0; i<props.overlay.length; i++){
			if(props.overlay[i]){
				marker.overlay[i] = new CustomOverlay(props.overlay[i].bounds, props.overlay[i].image, props.overlay[i].zones,  map);
			}
		}
	}


	// PUSH MARKER TO GLOBAL ARRAY
	markersOnMap.push(marker);
}






/***********************************************************/
/**********************DIRECTIONS *************************/
/***********************************************************/



function getDirection(destination){

	directionsDisplay.setMap(map);


	var request = {
		origin: currentPosition,
		destination: destination.getPosition(),
		travelMode: 'DRIVING',
	}

	directionsService.route(request, function(result, status){
		if(status == "OK"){
			directionsDisplay.setDirections(result);
		}
	});

	directionsDisplay.isSet = true;
	directionsDisplay.destination = destination;

}



function toogleDirections(destination){

	if(directionsDisplay.isSet){
		//if set destination is equal to new destination then hide path
		if(directionsDisplay.destination == destination){
			directionsDisplay.setMap(null);
			directionsDisplay.isSet = false;
			clearInterval(directionsDisplay.interval);

		} else { //else adjust path to new destination
			clearInterval(directionsDisplay.interval); //stop calculating previous routes
			directionsDisplay.interval = setInterval(function() {
			 getDirection(destination);
			}, 500);
		}
		
	} else {
		directionsDisplay.interval = setInterval(function() {
			 getDirection(destination);
		}, 500);
	}

}









/***********************************************************/
/**********************RECTANGLE HELPER**********************/
/***********************************************************/
//show the latlon of the helper rectangle in an info window
function showNewBounds( event ) {
	//get the NORTH-EAST location and the SOUTH-WEST location of rectangle
	var ne = rectangle.getBounds().getNorthEast();
	var sw = rectangle.getBounds().getSouthWest();
	
	//construct a string to display this information in the info window
	var contentString = 
	'<b>Building bounds</b><br>' + 
	'New north-east corner: ' + ne.lat() + ', ' + ne.lng() + '<br>' + 
	'New south-west corner: ' + sw.lat() + ', ' + sw.lng();

	console.log(contentString);
}








/***********************************************************/
/**********************CUSTOM OVERLAYS**********************/
/***********************************************************/
  function CustomOverlay(bounds, image, zones, map) {
  	this.zones_ = [];
  	this.zonesListener;

  	for(var i=0; i<zones.length; i++){
  		if(zones[i] !== "undefined" && zones[i].bounds && zones[i].name ){
  			this.zones_[i] = new google.maps.Polygon({paths: zones[i].bounds});
  			this.zones_[i].name = zones[i].name;

  		} else {
  			console.log('some of zone attributes are undefined...');
  		}
  		
  	}



    // Initialize all properties.
    this.bounds_ = bounds;
    this.image_ = image;
    this.map_ = map;

    // Define a property to hold the image's div. We'll
    // actually create this div upon receipt of the onAdd()
    // method so we'll leave it null for now.
    this.div_ = null;

    // Explicitly call setMap on this overlay.
    this.setMap(map);
  }

  /**
   * onAdd is called when the map's panes are ready and the overlay has been
   * added to the map.
   */
  CustomOverlay.prototype.onAdd = function() {

    var div = document.createElement('div');
    div.style.borderStyle = 'none';
    div.style.borderWidth = '0px';
    div.style.position = 'absolute';
    div.style.visibility = 'hidden';

    // Create the img element and attach it to the div.
    var img = document.createElement('img');
    img.src = this.image_;
    img.style.width = '100%';
    img.style.height = '100%';
    img.style.position = 'absolute';
    div.appendChild(img);

    this.div_ = div;

    // Add the element to the "overlayLayer" pane.
    var panes = this.getPanes();
    panes.overlayLayer.appendChild(div);


  };

  CustomOverlay.prototype.draw = function() {

    // We use the south-west and north-east
    // coordinates of the overlay to peg it to the correct position and size.
    // To do this, we need to retrieve the projection from the overlay.
    var overlayProjection = this.getProjection();

    // Retrieve the south-west and north-east coordinates of this overlay
    // in LatLngs and convert them to pixel coordinates.
    // We'll use these coordinates to resize the div.
    var sw = overlayProjection.fromLatLngToDivPixel(this.bounds_.getSouthWest());
    var ne = overlayProjection.fromLatLngToDivPixel(this.bounds_.getNorthEast());

    // Resize the image's div to fit the indicated dimensions.
    var div = this.div_;
    div.style.left = sw.x + 'px';
    div.style.top = ne.y + 'px';
    div.style.width = (ne.x - sw.x) + 'px';
    div.style.height = (sw.y - ne.y) + 'px';
  };

  // The onRemove() method will be called automatically from the API if
  // we ever set the overlay's map property to 'null'.
  CustomOverlay.prototype.onRemove = function() {
    this.div_.parentNode.removeChild(this.div_);
    this.div_ = null;
  };

  // Set the visibility to 'hidden' or 'visible'.
  CustomOverlay.prototype.hide = function() {
    if (this.div_) {
      // The visibility property must be a string enclosed in quotes.
      this.div_.style.visibility = 'hidden';
    }

    //make zones unclickable

	google.maps.event.removeListener(this.zonesListener);

  };


  CustomOverlay.prototype.show = function() {

  	hideOverlays();

    if (this.div_) {
      this.div_.style.visibility = 'visible';
    }

    var zones = this.zones_;
    //make zones clickable
    
	this.zonesListener = google.maps.event.addListener(map, 'click', function(e) {
		for(var i=0; i<zones.length; i++){
			if( google.maps.geometry.poly.containsLocation(e.latLng, zones[i])) {
				alert("This is " + zones[i].name + " area");
			}
		}
	 });

  };

  CustomOverlay.prototype.toggle = function() {
    if (this.div_) {
      if (this.div_.style.visibility === 'hidden') {
        this.show();
      } else {
        this.hide();
      }
    }
  };






function hideOverlays(){
	//REMOVE OTHER OVERLAYS
  	for(var i =0; i < markersOnMap.length; i++){
  		for(var j=0; j < markersOnMap[i].overlay.length; j++ ){
  			markersOnMap[i].overlay[j].hide();
  		}
	}
}







