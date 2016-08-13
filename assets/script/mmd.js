loadBuffer = function( url, onload ) {
	var xhr = new XMLHttpRequest;
	xhr.onload = function() {
		if ( xhr.status === 200 ) { // OK
			onload( xhr ); // see: xhr.response
		} else {
			console.error( url, xhr.statusText );
		}
		xhr = null;
	};
	xhr.open( 'GET', url, true );
	xhr.responseType = 'arraybuffer'; // set type after opened !
	xhr.send();
};


function load_model( canvas_name , url )
{
	
	var scene = new THREE.Scene();
	var camera = new THREE.PerspectiveCamera( 45 , 1400/800 , 0.1 , 1000 );

	camera.position.x = 0;
	camera.position.y = 0;
	camera.position.z = 60;

	camera.lookAt( scene.position );

	var aColor = "#0c0c0c";
	var alight = new THREE.AmbientLight( aColor );
	scene.add( alight );

	var splight = new THREE.SpotLight( 0xffffff );
	splight.position.set( -40 , 100 , -10 );
	scene.add( splight );

	// var grid = new THREE.GridHelper(100, 10);
	// scene.add( grid );

	
	var rdr = new THREE.WebGLRenderer({ 'antialias':true , 'preserveDrawingBuffer':true ,'canvas':document.getElementById(canvas_name)});
	
	rdr.setSize( 1400 , 800 );
	
	var p = new THREE.MMD.PMX();
	var param = {};
	param.shadowDark = 0.7;
	param.edgeScale = 1;
	param.duration = 0;
	
	p.load( url , function( pmx )
	{
		//console.log( pmx );
		new THREE.MMD.Model( pmx ).create( param, function( model ) {
			
			if ( model.ik ) {
				model.ik.update();
			}
			if ( model.addTrans ) {
				model.addTrans.update();
			}
			
			modo.model = model;

			//console.log( modo.model );
			var mesh = model.mesh;
			var center = getCentroid( mesh );
			mesh.position.set( -center.x , -center.y , -center.z );
			scene.add( mesh );

			var edc = new THREE.EditorControls(camera , document.getElementById('mbox') );

			var clock = new THREE.Clock();

			//console.log(scene);
			function render()
			{
				var delta = clock.getDelta();
				
				requestAnimationFrame(render);
				rdr.render( scene , camera );
			} 
			
			render();
		});
	});
	

}

function load_pose( url )
{
	loadBuffer( url  , function( xhr )
	{
		text = String.fromCharCode.apply( undefined, THREE.MMD.Encoding.SJISToUNICODE( new Uint8Array(xhr.response) ) );

		var reg = /Bone([0-9]+)\{([^\}]+?)}/g;
		var poseInfo = {} ;
		while ((result = reg.exec(text)) !== null) 
		{
		    //
		    var info = result[2];
		    var lines = info.split("\n");
		    var name = lines[0].trim();
		    var trans_array = lines[1].trim().split(";")[0].split(",");
		    var quat_array = lines[2].trim().split(";")[0].split(",");
		    

		    poseInfo[name] = {'name':name , 'trans':trans_array , 'Quaternion':quat_array };
		}

		console.log( poseInfo );
		modo.model.setPose( poseInfo );

	} );
}

function getCentroid( mesh ) 
{

    mesh.geometry.computeBoundingBox();
    boundingBox = mesh.geometry.boundingBox;

    var x0 = boundingBox.min.x;
	var x1 = boundingBox.max.x;
	var y0 = boundingBox.min.y;
	var y1 = boundingBox.max.y;
	var z0 = boundingBox.min.z;
	var z1 = boundingBox.max.z;


    var bWidth = ( x0 > x1 ) ? x0 - x1 : x1 - x0;
    var bHeight = ( y0 > y1 ) ? y0 - y1 : y1 - y0;
    var bDepth = ( z0 > z1 ) ? z0 - z1 : z1 - z0;

    var centroidX = x0 + ( bWidth / 2 ) + mesh.position.x;
    var centroidY = y0 + ( bHeight / 2 )+ mesh.position.y;
    var centroidZ = z0 + ( bDepth / 2 ) + mesh.position.z;

    return mesh.geometry.centroid = { x : centroidX, y : centroidY, z : centroidZ };

}


