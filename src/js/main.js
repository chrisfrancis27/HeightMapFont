/*jslint browser: true, vars: true, white: true, forin: true, plusplus: true */
/*global define,require */

(function () {
    'use strict';
	
    require(
    [
        '../lib/jquery.min'
    ], function (jQuery) {
        $(function () {
			// Constants
			var CONST = {
				width: 600,
				height: 400,
				fontfile: 'lib/fonts/optimer_regular.typeface.js',
				coefficient: 700
			};
			
			// Inputs
			var inputText,
				dataSource;
			
			// Three.js vars
			var camera,
				scene,
				renderer,
				geometry,
				material,
				pointLight,
				mesh,
				mouseX = CONST.width / 2,
				mouseY = CONST.height / 2;
				
			require([
				CONST.fontfile
			], function () {
				// Form submit handler
				var $form = $('#dataForm').on('submit', function(e) {
					e.preventDefault();
					
					inputText = $(e.target[1]).val();
					dataSource = $(e.target[3]).val();
					
					console.log('Text:',inputText);
					console.log('Data source:',dataSource);

					init();
					animate();
				});
				
				// Mousemove handler
				$('body').on('mousemove', 'canvas', function(e) {
					mouseX = e.clientX;
					mouseY = e.clientY;
				});

				function init() {
					camera = new THREE.PerspectiveCamera( 50, CONST.width / CONST.height, 1, 10000 );
					camera.position.z = 1000;

					scene = new THREE.Scene();

					geometry = new THREE.TextGeometry( inputText, {
						size: 150,
						height: 20,
						curveSegments: 2,
						font: 'optimer'
					});
					geometry.computeBoundingBox();
					var centerOffset = -0.5 * ( geometry.boundingBox.max.x - geometry.boundingBox.min.x );
					
					material = new THREE.MeshLambertMaterial( { color: 0x556688, wireframe: false } );
					
					scene.add(pointLight);

					mesh = new THREE.Mesh( geometry, material );
					
					mesh.position.x = centerOffset;
					mesh.position.y = 100;
					mesh.position.z = 0;
					
					scene.add( mesh );

					renderer = new THREE.CanvasRenderer();
					renderer.setSize( CONST.width, CONST.height );

					document.body.appendChild( renderer.domElement );
				}

				function animate() {
					// note: three.js includes requestAnimationFrame shim
					requestAnimationFrame( animate );

					mesh.rotation.x = (CONST.height - mouseY) / CONST.coefficient;
					mesh.rotation.y = (CONST.width / 2 - mouseX) / CONST.coefficient;

					renderer.render( scene, camera );
				}
			});
        });
    });
} ());

