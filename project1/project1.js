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
	scene.background = new THREE.Color(0xf0f0f0);
}

function initCamera(){
	const aspect = 2;
	camera = new THREE.PerspectiveCamera(50,2,1,10000);
	camera.position.set(0,0,300);
	camera.lookAt(0,0,0);
}

function initLight(){
	var directionalLight = new THREE.DirectionalLight(0xffffff,0.5);
	scene.add(directionalLight);
	scene.add(new THREE.AmbientLight(0x505050));
}

function initObject(){
	var geometry = new THREE.BoxBufferGeometry(40,40,40);
	var object = new THREE.Mesh(geometry,new THREE.MeshLambertMaterial({color:Math.random()*0xffffff}));

	object.castShadow = true;
	object.receiveShadow = true;

	//default rotaion 
	object.rotation.x = 3.5;
	object.rotation.y = 3.5;

	scene.add(object);
	objects.push(object);
}

function initControls() {
	controls = new THREE.TrackballControls(camera,renderer.domElement);  //need renderer.domElement
	controls.rotatespeed = 10;
	controls.zoomSpeed = 2.4;
	controls.panSpeed = 0.1;
	controls.noZoom = false;
	controls.noPan = false;
	controls.staticMoving = true;
	controls.dynamicDampingFactor = 0.1;
	controls.maxDistance = 350;
	controls.minDistance = 50;

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
	initControls();
	treeview();
	animation();
}











