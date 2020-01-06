var scene, camera, controls, renderer;
var WIDTH, HEIGHT;
var objects = [];
var noRotation = true;

function initRenderer() {
	//const canvas = document.querySelector('#canvas-frame');
	//renderer = new THREE.WebGLRenderer({canvas});
	renderer = new THREE.WebGLRenderer({
		antialias:true,
	});
	document.getElementById('canvas-frame').appendChild(renderer.domElement); //在div之下加入canvas
}

function initScene(){
	scene = new THREE.Scene();
	scene.background = new THREE.Color(0x000000);
}

//相机坐标系与空间坐标系不同
function initCamera(){
	const aspect = 2;
	camera = new THREE.PerspectiveCamera(50,2,1,10000);
	camera.position.set(300,300,300);
	camera.up.set(0,0,1)
	camera.lookAt(scene.position);
}

function initLight(){
	var directionalLight = new THREE.DirectionalLight(0xffffff,1);
	scene.add(directionalLight);
	scene.add(new THREE.AmbientLight(0x333333));
}

function initObject(){
	var geometry = new THREE.BoxBufferGeometry(40,40,40);
	var object = new THREE.Mesh(geometry,new THREE.MeshLambertMaterial({color:Math.random()*0xffffff}));

	object.castShadow = true;
	object.receiveShadow = true;

	//default rotaion 
	object.rotation.x = 3.5;
	object.rotation.y = 3.5;

	//scene.add(object);
	//objects.push(object);
}

function initAxis(){
	//CylinderBufferGeometry
	var Cylinder_radiusTop = 3;
	var Cylinder_radiusBottom = 3;
	var Cylinder_height = 100;
	var Cylinder_radialSegments = 12;
	var Cylinder_Geometry = new THREE.CylinderBufferGeometry(Cylinder_radiusTop,Cylinder_radiusBottom,Cylinder_height,Cylinder_radialSegments);
	
	var Cylinder_x = new THREE.Mesh(Cylinder_Geometry, new THREE.MeshLambertMaterial({color:0xff0000}));
	var Cylinder_y = new THREE.Mesh(Cylinder_Geometry, new THREE.MeshLambertMaterial({color:0x00ff00}));
	var Cylinder_z = new THREE.Mesh(Cylinder_Geometry, new THREE.MeshLambertMaterial({color:0x0000ff}));

	//Set X Axis position
	Cylinder_x.position.set(50,0,0);
	Cylinder_x.rotateZ(Math.PI / 2);
	scene.add(Cylinder_x);
	objects.push(Cylinder_x);

	Cylinder_y.position.set(0,50,0);
	scene.add(Cylinder_y);
	objects.push(Cylinder_y);

	Cylinder_z.position.set(0,0,50);
	Cylinder_z.rotateX(Math.PI / 2);
	scene.add(Cylinder_z);
	objects.push(Cylinder_z);

	//ConeBufferGeometry
	var Cone_radius = 7;
	var Cone_height = 25;
	var Cone_segments = 16;
	var Cone_Geometry = new THREE.ConeBufferGeometry(Cone_radius, Cone_height, Cone_segments);

	var Cone_x = new THREE.Mesh(Cone_Geometry, new THREE.MeshLambertMaterial({color:0xff0000}));
	var Cone_y = new THREE.Mesh(Cone_Geometry, new THREE.MeshLambertMaterial({color:0x00ff00}));
	var Cone_z = new THREE.Mesh(Cone_Geometry, new THREE.MeshLambertMaterial({color:0x0000ff}));

	//Set Cones postion;
	Cone_x.position.set(100,0,0);
	Cone_x.rotateZ(-Math.PI / 2);
	scene.add(Cone_x);

	Cone_y.position.set(0,100,0);
	scene.add(Cone_y);

	Cone_z.position.set(0,0,100);
	Cone_z.rotateX(Math.PI / 2);
	scene.add(Cone_z);


	//canvas text xyz
	function TagAxis(axistext,Vec3){
		var canvas = document.createElement('canvas');
		var C_width = 256;
		var C_height = 256;
		canvas.width = C_width;
		canvas.height = C_height;
		context = canvas.getContext('2d');
		context.beginPath();
		//get context area
		LW = 20;
		context.lineWidth = 20;
		R = C_width/4-LW/2;
		context.moveTo(C_width / 4,LW/2);
		context.lineTo(C_width / 4 * 3,LW/2);
		context.arc(C_width/4*3,C_width/4,R,Math.PI*1.5,Math.PI*2,false);
		context.lineTo(C_width-LW/2,C_height-R);
		context.arc(C_width/4*3,C_height-C_width/4,R,0,Math.PI/2,false);
		context.lineTo(C_width/4,C_height-LW/2);
		context.arc(C_width/4,C_height-C_width/4,R,0.5*Math.PI,Math.PI,false);
		context.lineTo(LW/2,C_width/4);
		context.arc(C_width/4,C_width/4,R,Math.PI,Math.PI*1.5,false);
		//context.lineTo(0,C_height);
		//context.lineTo(0,0);
		context.strokeStyle = "#ffffff";
		context.stroke();
		context.fillStyle = "#003399";
		context.fill();

		context.fillStyle = "white";
		context.textAlign = 'center';
		context.font = '200px Arial';
		context.fillText(axistext, C_width/2, C_height/20*15);


		var amap = new THREE.Texture(canvas);
		amap.needsUpdate = true;
		var mat = new THREE.SpriteMaterial({
			map: amap,
			transparent: true,
		//	useScreenCoordinates: false,
			color: 0xffffff,
		});

		var sp = new THREE.Sprite(mat);
		sp.scale.set(20,20,1);
		sp.position.copy(Vec3);
		scene.add(sp);
	}

	var xtext_Vector = new THREE.Vector3(130,0,0);
	TagAxis('X',xtext_Vector);
	var ytext_Vector = new THREE.Vector3(0,130,0);
	TagAxis('Y',ytext_Vector);
	var ztext_Vector = new THREE.Vector3(0,0,130);
	TagAxis('Z',ztext_Vector);
}

function initControls() {
	controls = new THREE.TrackballControls(camera,renderer.domElement);  //need renderer.domElement
	controls.rotatespeed = 10;
	controls.zoomSpeed = 2.4;
	controls.panSpeed = 0.1;
	controls.noZoom = false;
	controls.noPan = true;
	controls.staticMoving = true;
	controls.dynamicDampingFactor = 0.1;
	//controls.maxDistance = 350;
	//controls.minDistance = 50;

}

function resizeRendererToDisplaySize(renderer) {
	const canvas = renderer.domElement;
	//For HD-DPI
	const pixelRatio = window.devicePixelRatio;
	const width = canvas.clientWidth * pixelRatio | 0;
	const height = canvas.clientHeight * pixelRatio | 0;
	//const width = canvas.clientWidth;
	//const height = canvas.clientHeight;
	const needResize = canvas.width!=width || canvas.height !=height;
	if(needResize){
		renderer.setSize(width,height,false);
	}
	return needResize;
}

function animation(){
	if(resizeRendererToDisplaySize(renderer)){
		const canvas = renderer.domElement;
		camera.aspect = canvas.clientWidth / canvas.clientHeight;
		camera.updateProjectionMatrix();
	}

	if(noRotation === false){
		objects.forEach((object,ndx)=>{
			const speed = 0.01;
			object.rotation.x += speed;
			object.rotation.y += speed;
		});
	}

	//Get_Range_Slider_Value(camera);

	renderer.render(scene,camera);

	requestAnimationFrame(animation);

	controls.update();
}


function Get_Range_Slider_Value(camera){
	var slider = document.getElementById("MyRangeSlider1");
	var changevalue = slider.value;
	var zValue = 200 - Number(changevalue);
	camera.position.set(0,0,zValue);
}


function treeview(){
	var main = document.querySelector('main');
	tree = new VanillaTree(main, {
		contextmenu: [{
			label: 'Menu 1',
			action:function(id){
				alert('Menu 1' + id);
			}
		}, {
			label:'Menu 2',
			action:function(id){
			alert('Menu 2' + id);
			}
		}]

	});

	tree.add({
  		label: 'Label A',
  		id: 'a',
	  	opened: true
	});
	tree.add({
		label: 'Label B',
		id: 'b'
	});
	tree.add({
	    label: 'Label A.A',
	    parent: 'a',
	    id: 'a.a',
	    opened: true,
	    selected: true
	});

	tree.add({
	    label: 'Label A.A.A',
	    parent: 'a.a'
	});
	tree.add({
	    label: 'Label A.A.B',
	    parent: 'a.a'
	});
	 
	tree.add({
	    label: 'Label B.A',
	    parent: 'b'
	});

	//tree.add(options);
	//tree.move(id,parendId);
	//tree.remove(id);
	//tree.open(id);
	//tree.close(id);
	//tree.toggle(id);
	//tree.select(id);

	main.addEventListener('vtree-add', function(evt) {
	});

	main.addEventListener('vtree-remove',function(evt) {
	});

	main.addEventListener('vtree-move', function(evt) {
	});

	main.addEventListener('vtree-open', function(evt){
	});

	main.addEventListener('vtree-close', function(evt){
	});

	main.addEventListener('vtree-select', function(evt){
	});

}

function initThree(){
	initRenderer();
	initScene();
	initCamera();
	initLight();
	initObject();
	initAxis();
	initControls();
	treeview();
	animation();
}











