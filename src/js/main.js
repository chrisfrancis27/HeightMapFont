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
				fontfile: 'font',
				coefficient: 1.2,
				charWidth: 15,
				extrudeMin: 2,
				extrudeMax: 20
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
				obj,
				mouseX = CONST.width / 2,
				mouseY = CONST.height / 2,
				base_x = 0,
				this_x = 0,
				this_y = 0;
				
			require([
				CONST.fontfile
			], function (font) {
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
					var glyph,
						ch;
				
					camera = new THREE.PerspectiveCamera( 45, CONST.width / CONST.height, 1, 10000 );
					camera.position.z = 50;

					scene = new THREE.Scene();
					obj = new THREE.Object3D();
					
					// Split input text into array of chars
					var charArray = inputText.toUpperCase().split('');
					console.log(charArray);
					
					
					// Loop through char array
					for (var i = 0, ii = charArray.length; i < ii; i++) {
						ch = charArray[i];
						
						// Set initial character position
						base_x = i * CONST.charWidth;
						
						// Find matching glyph
						glyph = null;
						for (var j = 0, jj = font.length; j < jj; j++) {
							if (font[j].character === ch) {
								glyph = font[j];
								break;
							}
						}
						if (!glyph) {
							console.warn('Invalid character', ch);
							break;
						}
						
						console.log(glyph);
						
						// Plot a single point for every pixel
						for (var k = 0, px = glyph.pixels, kk = px.length; k < kk; k++) {
							// Update position
							this_x = base_x + (k % 14);
							this_y = -Math.floor(k / 14);
							
							// If we need to draw a pixel here...
							if (px[k]) {
								geometry = new THREE.SphereGeometry(0.5, 16, 16);
								material = new THREE.MeshLambertMaterial({
									color: 0xccccff,
									wireframe: false
								});
								mesh = new THREE.Mesh(geometry, material);
								mesh.position.x = this_x;
								mesh.position.y = this_y;
								mesh.position.z = 0;
								
								// Add the 'pixel' sphere to our main object
								obj.add(mesh);
							}
						}
					}
					
					// create a point light
					pointLight = new THREE.PointLight(0xFFFFFF);

					// set its position
					pointLight.position.x = this_x / 2;
					pointLight.position.y = this_y / 2;
					pointLight.position.z = 100;

					// add to the scene
					scene.add(pointLight);
					
					// Add the pixel container object to the scene
					scene.add(obj);

					renderer = new THREE.WebGLRenderer({
						antialias: true
					});
					renderer.setSize( CONST.width, CONST.height );

					document.body.appendChild( renderer.domElement );
				}

				function animate() {
					// note: three.js includes requestAnimationFrame shim
					requestAnimationFrame( animate );

					camera.position.x = this_x / 2;
					camera.position.y = -this_y / 2;
					camera.position.z = this_x * CONST.coefficient;
					camera.lookAt(new THREE.Vector3(this_x/2,this_y/2,0));
					
					obj.rotation.x = (-mouseY * CONST.coefficient) / CONST.height;
					
					renderer.render( scene, camera );
				}
			});
        });
    });
} ());

