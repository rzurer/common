/*global  describe, beforeEach, afterEach, it*/
"use strict";
var assert = require('assert'),
	sinon = require('sinon'),
	sut,
	sum,
	difference,
	target = {
		getSum : function (num1, num2) {
			sum = num1 + num2;
		},
		getDifference : function (num1, num2) {
			difference = num1 - num2;
		}	
	},
	setup = function () {
		sum = 0;
		difference = 0;
		sut = require('../modules/eventListener').eventListener();
	};
describe('eventListener_module', function () {
	beforeEach(setup);
	describe('addListener', function () {
		it("should add listeners", function () {
			assert.strictEqual(sum, 0);
			assert.strictEqual(difference, 0);
			sut.addListener("test", target.getSum);
			sut.addListener("test", target.getDifference);
			sut.fire("test", [20, 22]);
			assert.strictEqual(sum, 42);
			assert.strictEqual(difference, -2);
		});		
	});
	describe('removeListener', function () {
		it("should remove listener", function () {
			assert.strictEqual(sum, 0);
			assert.strictEqual(difference, 0);
			sut.addListener("test", target.getSum);
			sut.addListener("test", target.getDifference);
			sut.fire("test", [20, 22]);			
			assert.strictEqual(sum, 42);
			assert.strictEqual(difference, -2);
			sut.removeListener("test", target.getDifference);
			sum = 0;
			difference = 0;
			sut.fire("test", [20, 22]);			
			assert.strictEqual(sum, 42);
			assert.strictEqual(difference, 0);
		});		
	});
	describe('fire', function () {
		it("should fire event", function () {
			var getSumSpy = sinon.spy(target, 'getSum'),
				getDifferenceSpy = sinon.spy(target, 'getDifference');
			sut.addListener("test", target.getSum);
			sut.addListener("test", target.getDifference);
			sut.fire("test", [20, 22]);
			target.getSum.restore();
			target.getDifference.restore();
			sinon.assert.calledWith(getSumSpy, 20, 22);
			sinon.assert.calledWith(getDifferenceSpy, 20, 22);
		});		
	});
});