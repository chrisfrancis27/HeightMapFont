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
				width: 1200,
				height: 800,
				fontfile: '../lib/fonts/terminal',
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
				
			var pixelCount = 0;
				
			require([
				CONST.fontfile,
				'lib/tween.js'
			], function (font, tween) {
				// Form submit handler
				var $form = $('#dataForm').on('submit', function(e) {
					e.preventDefault();
					
					inputText = $(e.target[1]).val();
					dataSource = $(e.target[3]).val();
					
					if (dataSource) {
						var xhr = $.ajax({
							type: 'GET',
							url: dataSource
						}).done(function(res) {
							var i;
							
							// Get total pixel width of text
							var pxWidth = inputText.length * CONST.charWidth;
							// Get number of data points
							var dataPoints = res.data.length;
							// Get highest and lowest data points
							var highest = 0, 
								lowest = false,
								range;
							for (i = 0; i < dataPoints; i++) {
								if (lowest === false) {
									lowest = res.data[i].value;
								}
								highest = Math.max(highest, res.data[i].value);
								lowest = Math.min(lowest, res.data[i].value);
							}
							range = highest - lowest;
							// Create linear heightmap array
							var heightMap = interpolate(pxWidth, res.data, lowest, range, TWEEN.Easing.Quadratic.InOut);
						
							init(heightMap);
							animate();
						}).fail(function(jqXHR, status) {
							console.error(status);
							console.error(jqXHR.responseText);
							init();
							animate();
						});
					}
					else {
						init();
						animate();
					}
				});
				
				// Mousemove handler
				$('body').on('mousemove', 'canvas', function(e) {
					mouseX = e.clientX;
					mouseY = e.clientY;
				});
				
				function getTweenedValue(startVal, endVal, currentTime, totalTime, tweener) {
					var delta = endVal - startVal;
					var percentComplete = currentTime/totalTime;
					tweener = tweener ? tweener : TWEEN.Easing.Linear.None;
					
					return tweener(percentComplete) * delta + startVal
				}
				
				function mapRange(val, oldMin, oldMax, newMin, newMax) {
					var valRatio = (val - oldMin) / (oldMax - oldMin);
					return newMax * valRatio;
				}

				function interpolate(length, values, floor, range, tweener) {
					var arr = [],
						i,
						ii,
						iii,
						j,
						val,
						left,
						right,
						delta,
						n,
						diff,
						diffTotal,
						newRange = CONST.extrudeMax - CONST.extrudeMin;
						
						
					// Make array of x-positions corresponding to input dates	
					var xArr = [],
						xMax = values[values.length - 1].date,
						xMin = values[0].date,
						xDelta = xMax - xMin,
						xRatio,
						xPos;
					for (i = 0; i < values.length; i++) {
						xRatio = (values[i].date - xMin) / xDelta;
						xPos = Math.ceil(xRatio * length);
						xArr.push(xPos);
					}
					
					// Tween each x-position
					for (i = 0; i < xArr.length; i++) {
						var prev = xArr[i],
							next = xArr[i+1];
						for (ii = prev; ii < next; ii++) {
							// Get the spacing between non-interpolated values
							delta = next - prev;
							
							for (iii = 0; iii < length; iii++) {
								j = Math.floor(iii / (length / (xArr.length - 1)));
							
								// No interpolation
								if (iii === 0 || iii / delta === j || iii === length - 1) {
									//console.log(values[j]);
									val = values[j].value;
								}
								// Yes interpolation :)
								else {
									n = iii % delta;
									left = values[j];
									right = values[j+1];
									
									val = getTweenedValue(
										left.value,
										right.value,
										(right.date - left.date) * (n / delta),
										right.date - left.date,
										tweener
									);
								}
								
								// Map val into new range and push to array
								arr.push(Math.round(mapRange(val, floor, range + floor, CONST.extrudeMin, CONST.extrudeMax)));
							}
						}
					}
					return arr;
				}
				
				function init(heightMap) {
					var glyph,
						ch;
				
					camera = new THREE.PerspectiveCamera( 10, CONST.width / CONST.height, 1, 10000 );
					camera.position.z = 500;

					scene = new THREE.Scene();
					obj = new THREE.Object3D();
					geometry = new THREE.SphereGeometry(0.5, 8, 8);
					material = new THREE.MeshLambertMaterial({
						color: 0xccccff,
						wireframe: false
					});
					
					// Split input text into array of chars
					var charArray = inputText.toUpperCase().split('');
					
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
							continue;
						}
						
						// Plot a single point for every pixel
						for (var k = 0, px = glyph.pixels, kk = px.length; k < kk; k++) {
							// Update position
							this_x = base_x + (k % 14);
							this_y = -Math.floor(k / 14);
							
							// If we need to draw a pixel here...
							if (px[k]) {
								mesh = new THREE.Mesh(geometry, material);
								mesh.position.x = this_x;
								mesh.position.y = this_y;
								mesh.position.z = 0;
								
								// Add the 'pixel' sphere to our main object
								obj.add(mesh);
								pixelCount++;
								
								// If we need to extrude upwards
								if (heightMap) {
									// Create higher z-indexed pixels
									var z = 0;
									for (var l = 0, ll = heightMap[this_x]; l < ll; l++) {
										mesh = new THREE.Mesh(geometry, material);
										mesh.position.x = this_x;
										mesh.position.y = this_y;
										mesh.position.z = ++z;
										obj.add(mesh);
										pixelCount++;
									}
								}
							}
						}
					}
					
					// create a point light
					pointLight = new THREE.PointLight(0xFFFFFF);

					// set its position
					pointLight.position.x = this_x / 2;
					pointLight.position.y = this_y / 2;
					pointLight.position.z = 50;

					// add to the scene
					scene.add(pointLight);
					
					// Add the pixel container object to the scene
					scene.add(obj);

					renderer = new THREE.WebGLRenderer({
						antialias: true
					});
					renderer.setSize( CONST.width, CONST.height );

					document.body.appendChild( renderer.domElement );
					
					console.log('Total pixels:',pixelCount);
				}

				function animate() {
					// note: three.js includes requestAnimationFrame shim
					requestAnimationFrame( animate );

					camera.position.x = (this_x / 2) - (CONST.width / 2 - mouseX) / 20;
					camera.position.y = 0;
					camera.position.z = this_x * CONST.coefficient * 5;
					camera.lookAt(new THREE.Vector3(this_x/2,this_y/2,0));
					
					obj.rotation.x = (-mouseY * CONST.coefficient) / CONST.height;
					
					renderer.render( scene, camera );
				}
			});
        });
    });
} ());

