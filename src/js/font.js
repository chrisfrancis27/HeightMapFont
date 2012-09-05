/*jslint browser: true, devel: true, vars: true, white: true, forin: true, plusplus: true */
/*global define*/
(function () {
    'use strict';

    define([], function () {
		return [
			{
				character: ' ',
				pixels: [
					0,0,0,0,0,0,0,0,0,0,0,0
				]
			},
			{
				character: 'A',
				pixels: [
					0,0,0,0,1,1,1,1,0,0,0,0,
					0,0,0,0,1,1,1,1,0,0,0,0,
					0,0,1,1,1,1,1,1,1,1,0,0,
					0,0,1,1,1,1,1,1,1,1,0,0,
					1,1,1,1,0,0,0,0,1,1,1,1,
					1,1,1,1,0,0,0,0,1,1,1,1,
					1,1,1,1,0,0,0,0,1,1,1,1,
					1,1,1,1,0,0,0,0,1,1,1,1,
					1,1,1,1,0,0,0,0,1,1,1,1,
					1,1,1,1,0,0,0,0,1,1,1,1,
					1,1,1,1,1,1,1,1,1,1,1,1,
					1,1,1,1,1,1,1,1,1,1,1,1,
					1,1,1,1,0,0,0,0,1,1,1,1,
					1,1,1,1,0,0,0,0,1,1,1,1,
					1,1,1,1,0,0,0,0,1,1,1,1,
					1,1,1,1,0,0,0,0,1,1,1,1,
					1,1,1,1,0,0,0,0,1,1,1,1,
					1,1,1,1,0,0,0,0,1,1,1,1
				]
			},
			{
				character: 'B',
				pixels: [
					1,1,1,1,1,1,1,1,1,1,0,0,
					1,1,1,1,1,1,1,1,1,1,0,0,
					1,1,1,1,0,0,0,0,1,1,1,1,
					1,1,1,1,0,0,0,0,1,1,1,1,
					1,1,1,1,0,0,0,0,1,1,1,1,
					1,1,1,1,0,0,0,0,1,1,1,1,
					1,1,1,1,0,0,0,0,1,1,1,1,
					1,1,1,1,0,0,0,0,1,1,1,1,
					1,1,1,1,1,1,1,1,1,1,0,0,
					1,1,1,1,1,1,1,1,1,1,0,0,
					1,1,1,1,0,0,0,0,1,1,1,1,
					1,1,1,1,0,0,0,0,1,1,1,1,
					1,1,1,1,0,0,0,0,1,1,1,1,
					1,1,1,1,0,0,0,0,1,1,1,1,
					1,1,1,1,0,0,0,0,1,1,1,1,
					1,1,1,1,0,0,0,0,1,1,1,1,
					1,1,1,1,1,1,1,1,1,1,0,0,
					1,1,1,1,1,1,1,1,1,1,0,0
				]
			},
			{
				character: 'C',
				pixels: [
					0,0,1,1,1,1,1,1,1,1,0,0,
					0,0,1,1,1,1,1,1,1,1,0,0,
					1,1,1,1,0,0,0,0,1,1,1,1,
					1,1,1,1,0,0,0,0,1,1,1,1,
					1,1,1,1,0,0,0,0,1,1,1,1,
					1,1,1,1,0,0,0,0,1,1,1,1,
					1,1,1,1,0,0,0,0,0,0,0,0,
					1,1,1,1,0,0,0,0,0,0,0,0,
					1,1,1,1,0,0,0,0,0,0,0,0,
					1,1,1,1,0,0,0,0,0,0,0,0,
					1,1,1,1,0,0,0,0,0,0,0,0,
					1,1,1,1,0,0,0,0,0,0,0,0,
					1,1,1,1,0,0,0,0,1,1,1,1,
					1,1,1,1,0,0,0,0,1,1,1,1,
					1,1,1,1,0,0,0,0,1,1,1,1,
					1,1,1,1,0,0,0,0,1,1,1,1,
					0,0,1,1,1,1,1,1,1,1,0,0,
					0,0,1,1,1,1,1,1,1,1,0,0
				]
			},
			{
				character: 'D',
				pixels: [
					1,1,1,1,1,1,1,1,0,0,0,0,
					1,1,1,1,1,1,1,1,0,0,0,0,
					1,1,1,1,0,0,1,1,1,1,0,0,
					1,1,1,1,0,0,1,1,1,1,0,0,
					1,1,1,1,0,0,0,0,1,1,1,1,
					1,1,1,1,0,0,0,0,1,1,1,1,
					1,1,1,1,0,0,0,0,1,1,1,1,
					1,1,1,1,0,0,0,0,1,1,1,1,
					1,1,1,1,0,0,0,0,1,1,1,1,
					1,1,1,1,0,0,0,0,1,1,1,1,
					1,1,1,1,0,0,0,0,1,1,1,1,
					1,1,1,1,0,0,0,0,1,1,1,1,
					1,1,1,1,0,0,0,0,1,1,1,1,
					1,1,1,1,0,0,0,0,1,1,1,1,
					1,1,1,1,0,0,1,1,1,1,0,0,
					1,1,1,1,0,0,1,1,1,1,0,0,
					1,1,1,1,1,1,1,1,0,0,0,0,
					1,1,1,1,1,1,1,1,0,0,0,0
				]
			},
			{
				character: 'E',
				pixels: [
					1,1,1,1,1,1,1,1,1,1,1,1,
					1,1,1,1,1,1,1,1,1,1,1,1,
					1,1,1,1,0,0,0,0,0,0,0,0,
					1,1,1,1,0,0,0,0,0,0,0,0,
					1,1,1,1,0,0,0,0,0,0,0,0,
					1,1,1,1,0,0,0,0,0,0,0,0,
					1,1,1,1,0,0,0,0,0,0,0,0,
					1,1,1,1,0,0,0,0,0,0,0,0,
					1,1,1,1,1,1,1,1,1,1,0,0,
					1,1,1,1,1,1,1,1,1,1,0,0,
					1,1,1,1,0,0,0,0,0,0,0,0,
					1,1,1,1,0,0,0,0,0,0,0,0,
					1,1,1,1,0,0,0,0,0,0,0,0,
					1,1,1,1,0,0,0,0,0,0,0,0,
					1,1,1,1,0,0,0,0,0,0,0,0,
					1,1,1,1,0,0,0,0,0,0,0,0,
					1,1,1,1,1,1,1,1,1,1,1,1,
					1,1,1,1,1,1,1,1,1,1,1,1
				]
			},
			{
				character: 'F',
				pixels: [
					1,1,1,1,1,1,1,1,1,1,1,1,
					1,1,1,1,1,1,1,1,1,1,1,1,
					1,1,1,1,0,0,0,0,0,0,0,0,
					1,1,1,1,0,0,0,0,0,0,0,0,
					1,1,1,1,0,0,0,0,0,0,0,0,
					1,1,1,1,0,0,0,0,0,0,0,0,
					1,1,1,1,0,0,0,0,0,0,0,0,
					1,1,1,1,0,0,0,0,0,0,0,0,
					1,1,1,1,1,1,1,1,1,1,0,0,
					1,1,1,1,1,1,1,1,1,1,0,0,
					1,1,1,1,0,0,0,0,0,0,0,0,
					1,1,1,1,0,0,0,0,0,0,0,0,
					1,1,1,1,0,0,0,0,0,0,0,0,
					1,1,1,1,0,0,0,0,0,0,0,0,
					1,1,1,1,0,0,0,0,0,0,0,0,
					1,1,1,1,0,0,0,0,0,0,0,0,
					1,1,1,1,0,0,0,0,0,0,0,0,
					1,1,1,1,0,0,0,0,0,0,0,0
				]
			},
			{
				character: 'G',
				pixels: [
					0,0,1,1,1,1,1,1,1,1,0,0,
					0,0,1,1,1,1,1,1,1,1,0,0,
					1,1,1,1,0,0,0,0,1,1,1,1,
					1,1,1,1,0,0,0,0,1,1,1,1,
					1,1,1,1,0,0,0,0,1,1,1,1,
					1,1,1,1,0,0,0,0,1,1,1,1,
					1,1,1,1,0,0,0,0,0,0,0,0,
					1,1,1,1,0,0,0,0,0,0,0,0,
					1,1,1,1,0,0,0,0,0,0,0,0,
					1,1,1,1,0,0,0,0,0,0,0,0,
					1,1,1,1,0,0,1,1,1,1,1,1,
					1,1,1,1,0,0,1,1,1,1,1,1,
					1,1,1,1,0,0,0,0,1,1,1,1,
					1,1,1,1,0,0,0,0,1,1,1,1,
					1,1,1,1,0,0,0,0,1,1,1,1,
					1,1,1,1,0,0,0,0,1,1,1,1,
					0,0,1,1,1,1,1,1,1,1,1,1,
					0,0,1,1,1,1,1,1,1,1,1,1
				]
			}
		];
	});
}());