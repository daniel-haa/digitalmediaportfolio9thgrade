(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"Final_atlas_1", frames: [[0,0,1986,933],[0,935,1000,1000],[1002,935,1000,1000]]},
		{name:"Final_atlas_2", frames: [[0,0,248,513],[250,0,171,421]]}
];


(lib.AnMovieClip = function(){
	this.actionFrames = [];
	this.ignorePause = false;
	this.currentSoundStreamInMovieclip;
	this.soundStreamDuration = new Map();
	this.streamSoundSymbolsList = [];

	this.gotoAndPlayForStreamSoundSync = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.gotoAndPlay = function(positionOrLabel){
		this.clearAllSoundStreams();
		var pos = this.timeline.resolve(positionOrLabel);
		if (pos != null) { this.startStreamSoundsForTargetedFrame(pos); }
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.play = function(){
		this.clearAllSoundStreams();
		this.startStreamSoundsForTargetedFrame(this.currentFrame);
		cjs.MovieClip.prototype.play.call(this);
	}
	this.gotoAndStop = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndStop.call(this,positionOrLabel);
		this.clearAllSoundStreams();
	}
	this.stop = function(){
		cjs.MovieClip.prototype.stop.call(this);
		this.clearAllSoundStreams();
	}
	this.startStreamSoundsForTargetedFrame = function(targetFrame){
		for(var index=0; index<this.streamSoundSymbolsList.length; index++){
			if(index <= targetFrame && this.streamSoundSymbolsList[index] != undefined){
				for(var i=0; i<this.streamSoundSymbolsList[index].length; i++){
					var sound = this.streamSoundSymbolsList[index][i];
					if(sound.endFrame > targetFrame){
						var targetPosition = Math.abs((((targetFrame - sound.startFrame)/lib.properties.fps) * 1000));
						var instance = playSound(sound.id);
						var remainingLoop = 0;
						if(sound.offset){
							targetPosition = targetPosition + sound.offset;
						}
						else if(sound.loop > 1){
							var loop = targetPosition /instance.duration;
							remainingLoop = Math.floor(sound.loop - loop);
							if(targetPosition == 0){ remainingLoop -= 1; }
							targetPosition = targetPosition % instance.duration;
						}
						instance.loop = remainingLoop;
						instance.position = Math.round(targetPosition);
						this.InsertIntoSoundStreamData(instance, sound.startFrame, sound.endFrame, sound.loop , sound.offset);
					}
				}
			}
		}
	}
	this.InsertIntoSoundStreamData = function(soundInstance, startIndex, endIndex, loopValue, offsetValue){ 
 		this.soundStreamDuration.set({instance:soundInstance}, {start: startIndex, end:endIndex, loop:loopValue, offset:offsetValue});
	}
	this.clearAllSoundStreams = function(){
		this.soundStreamDuration.forEach(function(value,key){
			key.instance.stop();
		});
 		this.soundStreamDuration.clear();
		this.currentSoundStreamInMovieclip = undefined;
	}
	this.stopSoundStreams = function(currentFrame){
		if(this.soundStreamDuration.size > 0){
			var _this = this;
			this.soundStreamDuration.forEach(function(value,key,arr){
				if((value.end) == currentFrame){
					key.instance.stop();
					if(_this.currentSoundStreamInMovieclip == key) { _this.currentSoundStreamInMovieclip = undefined; }
					arr.delete(key);
				}
			});
		}
	}

	this.computeCurrentSoundStreamInstance = function(currentFrame){
		if(this.currentSoundStreamInMovieclip == undefined){
			var _this = this;
			if(this.soundStreamDuration.size > 0){
				var maxDuration = 0;
				this.soundStreamDuration.forEach(function(value,key){
					if(value.end > maxDuration){
						maxDuration = value.end;
						_this.currentSoundStreamInMovieclip = key;
					}
				});
			}
		}
	}
	this.getDesiredFrame = function(currentFrame, calculatedDesiredFrame){
		for(var frameIndex in this.actionFrames){
			if((frameIndex > currentFrame) && (frameIndex < calculatedDesiredFrame)){
				return frameIndex;
			}
		}
		return calculatedDesiredFrame;
	}

	this.syncStreamSounds = function(){
		this.stopSoundStreams(this.currentFrame);
		this.computeCurrentSoundStreamInstance(this.currentFrame);
		if(this.currentSoundStreamInMovieclip != undefined){
			var soundInstance = this.currentSoundStreamInMovieclip.instance;
			if(soundInstance.position != 0){
				var soundValue = this.soundStreamDuration.get(this.currentSoundStreamInMovieclip);
				var soundPosition = (soundValue.offset?(soundInstance.position - soundValue.offset): soundInstance.position);
				var calculatedDesiredFrame = (soundValue.start)+((soundPosition/1000) * lib.properties.fps);
				if(soundValue.loop > 1){
					calculatedDesiredFrame +=(((((soundValue.loop - soundInstance.loop -1)*soundInstance.duration)) / 1000) * lib.properties.fps);
				}
				calculatedDesiredFrame = Math.floor(calculatedDesiredFrame);
				var deltaFrame = calculatedDesiredFrame - this.currentFrame;
				if((deltaFrame >= 0) && this.ignorePause){
					cjs.MovieClip.prototype.play.call(this);
					this.ignorePause = false;
				}
				else if(deltaFrame >= 2){
					this.gotoAndPlayForStreamSoundSync(this.getDesiredFrame(this.currentFrame,calculatedDesiredFrame));
				}
				else if(deltaFrame <= -2){
					cjs.MovieClip.prototype.stop.call(this);
					this.ignorePause = true;
				}
			}
		}
	}
}).prototype = p = new cjs.MovieClip();
// symbols:



(lib.CachedBmp_4 = function() {
	this.initialize(ss["Final_atlas_2"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_3 = function() {
	this.initialize(ss["Final_atlas_2"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2 = function() {
	this.initialize(img.CachedBmp_2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2334,2334);


(lib.CachedBmp_5 = function() {
	this.initialize(ss["Final_atlas_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.pexelstrangpham954710 = function() {
	this.initialize(img.pexelstrangpham954710);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,5184,3456);


(lib.sid = function() {
	this.initialize(ss["Final_atlas_1"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.sidwave = function() {
	this.initialize(ss["Final_atlas_1"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();
// helper functions:

function mc_symbol_clone() {
	var clone = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop, this.reversed));
	clone.gotoAndStop(this.currentFrame);
	clone.paused = this.paused;
	clone.framerate = this.framerate;
	return clone;
}

function getMCSymbolPrototype(symbol, nominalBounds, frameBounds) {
	var prototype = cjs.extend(symbol, cjs.MovieClip);
	prototype.clone = mc_symbol_clone;
	prototype.nominalBounds = nominalBounds;
	prototype.frameBounds = frameBounds;
	return prototype;
	}


(lib.tree = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#663300").s().p("EgcrAw2IgFgJQCIhRB0hvQCUiOBkivQAuhRAuhqQAdhEAwh9QBDixAmhqQA3idAliDQAhh3AgiVQAVhgAhiuQBQmZAejhQAxlhgFkeQgFlNhNmJQg5kfh4mnIgHACIheiJQgigzgSgXQgfgogegcQgfgdgxgeIhXg0QiMhUh5hwQh4hwhfiGQEig+FgBsQCKArCkBKQBkAuDABhQgCkiAKiTQARjyA5i5QCMEuDPEDQGhkSDgh/QFujPE/hrIkSHXQgjA9gQAfQgaA0gMAsIA/gVQHaiZHtgtQhWDIioDVQhnCDjeDrIgBAAIAyiyQhhE2g4DbQhLEhgkD4Qg/GqANJtQADCEAOGLQAMFJABDGIADFdQAFDGAZCUQAxEsDDGtQA2B2BuDrQBICcAwB8g");
	this.shape.setTransform(-4.625,-50.975);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#006600").s().p("AxNWoQgzgCgngHQg0gJhAgYQgfgLhRgiQijhDibg5QkahnhcgsQjMhhhziDQhGhQg2hvQgthcgmh5QhakmAbjdQAjkdDhkXQCGilCOhVQBthCB0gUQB0gTCCAZQCCAZBTA+QAwAkAfAwQAhA0AHA4QAUghAYgfQBYh3CChrQCHhwDAhsQCoheCVg7QCthECjgZQBogQCCgDQBSgCCbADQBDABAkAFQA5AHAqAUQAuAXAQAjQAJASAAAZQAAARgEAcQgNBYgZBdQEkilFggnQFVgmFRBWQA/AQApARQA3AWAmAfQA8AxAkBTQAkBSgFBIQgFBNg0BSQghA1hMBVQA0APBSAIICHAPQCoAaBJBXQAZAdATAqQAOAgAPAwQAzCoAJCeQAJCugrCZQguClhpCBQhvCIiVA+QhFAdhiATIisAeQkaAykLBoIgKgcQAkiZBJkHIABAAQDmjoBriGQCsjXBOjNQnoAonSCVIgYAIIAAAAIgyARQAGgYAKgZIABgBIANgeIAQgeQARgdAwhKQCMjVByjsQlCBultDOQjvCHmVEKQjakDiHk5QhCC5gSD0QgLCVAEEmQk9idishAQkYhmjtgGQhGgBg0AIQhBAKgxAbQDMENEeCxIBXA1QAwAgAgAeQAoAmA/BfQA+BeAqAnIAHgCIBpGzIgiAIQhJAOhcAEQg7ADhtAAQg8AAgegBg");
	this.shape_1.setTransform(-25.7095,-308.5614);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#00CC00").s().p("AgIAPIAHgeIAKAcIgJADg");
	this.shape_2.setTransform(110.7125,-199.2);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("EAcHA3eQgsAGg3ACQgkAChAAAQwzAEoZgCQuAgDrNgRMA1gAAHQgxh7hHicQhvjrg1h2QjDmtgyksQgYiUgGjHIgCldQgBjGgMlIQgOmMgDiDQgNptA+mqQAlj5BKkhQA4jaBhk2IgxCyQhJEGglCZIgHAfQhKE5gfECQgmE3ACGrQACDRAPGhQAPGgACDRIADFgQAGDIAbCWQAyEcDEGuICgFbQBZDJAyCaIgehOgEgW/A1RQB9hjBRhjQBMhdBDiEQAuhZBAibQBKizAyiJQA/irAriXQAqiVA3kBQBknYAplMQA3m5gUlzQgOkHg1kEQgRhVgpipIgLgsIhomyQB4GmA4EgQBOGIAFFMQAEEfgwFhQgfDhhPGaQghCugVBgQggCUghB3QglCDg3CdQgmBrhECwQgwB+gdBEQgtBpguBRQhlCwiUCNQh0BwiIBQQglAWgnAUQCfhrBMg7gAveq3QhAgBgkgCQg4gDgsgIQhNgOhjgqQg5gYhxgzQhSgjiSgzQipg6g+gYQkLhoiLiOQiGiIhXjmQh9lIAqkfQAbi0BfitQBZihCLiKQDPjODSgiQB0gUCJAdQB/AbBRA7QAvAiAgAuQAiAwALA2QAMgZARgaQAdgtAqgsQAtgvBVhHQCch+BuhIQEHisE1hSQE0hSE6ATQCCAHBOAhQAvAUAVAcQAlAxgUBWIgTBDQgNAqgDAbQE/isFygfQFxgfFXBzQArAOAZANQAkARAYAXQAbAZAVApQANAaATAyQAVA0AHAeQAMAugDAnQgHBAg4BMQhFBTgdAsQA0AOBaAKQBrAMAkAHQBPAOA7AgQBFAlAjA5QAPAYAMAhQAHAUALAnQAhB+APBlQATB7gDBrQgEB5gfBrQgiB1hABbQhABahyBaQhiBOhTAhQgyAVhGAOIh9AVQk5AykuBmIAJgDQELhoEZgyICtgeQBigUBFgcQCVg+BuiIQBqiCAuikQAriZgKivQgIifgzinQgPgxgOgfQgTgqgZgeQhKhXingZIiIgPQhSgJg0gOQBMhWAhg0QA0hTAFhNQAFhIgjhRQglhTg7gxQgngfg2gXQgqgRg+gQQlRhWlVAmQlhAnkkCmQAZhdANhYQAFgcgBgRQAAgZgIgTQgQgjgvgWQgpgUg5gIQglgEhDgBQibgEhRACQiCADhpAQQiiAaiuBEQiUA6ioBeQjBBtiHBwQiBBqhYB3QgYAggVAgQgHg4ghgzQgegxgxgkQhTg9iCgZQiCgahzATQh0AVhuBCQiOBViFClQjhEXgjEcQgcDfBbElQAlB6AtBcQA3BuBGBQQBzCDDLBiQBcAsEaBnQCcA4CiBEQBSAiAfALQA/AXA0AJQAoAHAyACQAeACA9AAQBtAAA6gDQBcgFBKgOQhCAahXAHQgpADhEAAIgyAAgAtc0ZQg/hegpgnQgfgegxgfIhWg2QkfiwjLkNQAwgcBCgKQAzgIBGACQDuAFEXBnQCtA/E8CdQgEkmALiUQATj2BBi5QCHE6DaEEQGWkLDviHQFtjOFBhuQhyDsiMDVQgwBJgQAdIgRAgIgNAeIAAABQgKAZgGAXIAygQIAAAAIAYgIQHSiWHngpQhODPisDXQhqCFjmDpQDdjrBoiEQCojVBWjHQntAtnaCZIhAAVQANgtAag0QAPgfAjg8IESnXQk+BrluDPQjhB/miESQjOkEiLkuQg5C5gRDyQgKCTACEjQjAhihkgtQilhLiKgqQlfhtkiA+QBeCGB5BwQB5BxCMBUIBWAzQAxAfAgAdQAeAbAeAoQASAXAjAzIBdCJQgpgng+heg");
	this.shape_3.setTransform(-25.6932,-92.6287);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-297.3,-455.4,543.3,725.5999999999999);


(lib.Symbol3 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.pexelstrangpham954710();
	this.instance.setTransform(0,0,0.2159,0.2159);

	this.instance_1 = new lib.CachedBmp_5();
	this.instance_1.setTransform(71.75,171.7,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol3, new cjs.Rectangle(0,0,1119.5,746.3), null);


(lib.Symbol2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.sid();
	this.instance.setTransform(0,0,0.81,0.81);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol2, new cjs.Rectangle(0,0,810,810), null);


(lib.Symbol1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.sid();
	this.instance.setTransform(0,0,0.348,0.348);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol1, new cjs.Rectangle(0,0,348,348), null);


(lib.SidWave = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.sid();
	this.instance.setTransform(-131,-519);

	this.instance_1 = new lib.sidwave();
	this.instance_1.setTransform(-134,-519);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1,p:{x:-134,y:-519}}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance_1,p:{x:-133,y:-518}}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-134,-519,1003,1001);


(lib.Fmouth = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(1,1,1).p("ACkgKQBZgBA8gMQAigHBHgPQAPgDAkgFQAggGAJgCQADgBAfgJQAXgHALgEAiIgBQAIgRAUgLQAMgGAYgIQA+gUAvAAQAZAAAVAFQAMAEAcAJQAZAHAQAcIAAAAAiDADQgDATAUANQAJAGAeAKQAPAGAnAOQAhAMAPAAQAWAAAggMQAegLAKgKQABAAAOgNQALgJAEgFQACgFAEgLQAEgLADgGAjyAHQAAgCgEABQgFABgBAAQAFAAAFAAQAjgBARgCQASgCAlAAApBg4QBeAnAhAJQAWAGArAEQAfAFA6ABQA2ABAAgC");
	this.shape.setTransform(57.775,8.325);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1,-1,117.6,18.7);


(lib.Dmouth = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(1,1,1).p("AEagcQgRAVg6AsQgKAHgbAMQgdANgXAGQgCAAgBABQgRADgHACQgJABgHABQgCABgFAAQgHABgQAAAAnBVQgHAAgNAAQggAAgGAAQgPAAgJgCQgGgCgFAAQgMgBgLgDQgRgEgTgHQgagKg/gfQgPgHgggfQgUgUgMgOAAnBVQgCAAgCAAQAFAAAFAAQAAAAgFAAgAkQhUIIHAA");
	this.shape.setTransform(-0.05,0.25);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000033").s().p("AEaAeIgBAAQAAAAgBgBQAAAAAAgBQAAAAAAgBQAAgBAAAAIABgDIAAgFIAAgPIgBgDIgBgDIgBgFIgGgGIgGgDIgFgBIgFgCIgDAAQgDAAgCgDIgBgCIAAgDQAAAAABgBQAAAAAAAAQABgBAAAAQABgBABAAIAFABIAJACIAIABIAEADIACACIAFAFIAEAHIADAKIAAAUIAAAHQgCAEgDABQgBAAAAAAQgBAAgBgBQAAAAgBAAQAAAAAAgBgAkeAKIgCgDIgCgJQgBgLAGgKIAFgEQADgCACACIADACQAAABAAAAQAAABAAAAQAAABAAAAQAAABAAAAIgDAEQgIAJAEAJIABAFQAAADgDACIAAAAIgCABIgDgCg");
	this.shape_1.setTransform(-0.0317,-5.675);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-29.2,-9.2,58.4,19);


(lib.Cmouth = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(1,1,1).p("AAlgHQgDABgBAAQAIAAAHAAQA1gBAcgGQAHgCA+gWQAHgCAIgIQAKgLAFgEQAGgEAEgOQADgNgBgNAj3hjQgDAjApARQANAGAmAHQAYAFAcAIQAdAKATADQAOADAwgBQAWgBALAAQAKAAABABQAAgCgHAAQgDABgBAAAj3hjQAIACAHABQAdAFAgAHQAYAGAIADIAnAAQApAABWgCQBbgDAHgBQAIgCBWgYQANgDALgDQAAAAAAAAQAOgDAeAAQADAAADAAQAAAAgEACQgCABAAgDQAAgCAWABQALABAYAAQgaAtgmAtQghAmghAdQgBABAAAAQgDADgCACQAAAAgBABIgKAGQgHAEgEABQgGAEgFAEQAAAAAAAAQgTANgYAKQg9AbhHAAIAAAAQAAABAAAAQAAAAAAgBAlVhvIAeAAQAkAHAcAFAAAB1QgjAEgdgJQgagHgVgHQgkgJgSgHQgdgKgpgfQgcgVgSgUQgRgSgRgeQgUghgIgc");
	this.shape.setTransform(-0.15,-0.1667);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-35.5,-13,70.7,25.7);


(lib.Bmouth = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000033").s().p("AhiAKIgPgEQgJgDgIgGQgHgEADgFQACgCAEABIAEgCQAUgHAkgBQBngCBcABIAEABQABAAAAAAQAAAAABAAQAAAAABABQAAAAAAAAQAEAEgHAHQgrAjhEABIgIAAQgoAAhGgPgAhZgLQgTABgJADIgBABQAHAEAQADIAtAIIAdAFQATACAOgBQAjgBAYgHQAcgHATgOIhHAAIABADIgBALQgBAFgDABIgGABIgxAAIgPgCIgGgBQgCgBAAgDIABgJIAAgEIg3ACgAAIgMIAAAKIAdgBIgBgLIgTAAIgJAAIAAACgAgXgNIAAACIgBAHIALABIANABIgBgCIAAgHIABgDIgXABg");
	this.shape.setTransform(0.7722,1.6281);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-12.8,-0.9,27.200000000000003,5.1000000000000005);


(lib.Amouth = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(1,1,1).p("Ak9gkQAlAOAnAWQAoAWARAHQA+AYAdANQABAABKAAQArAAANgCQAUgCAggMQAZgIAZgRQAhgVAKgEQAVgLAggQQAdgNAJgEQASgGAOgJQAJgGADAA");
	this.shape.setTransform(0.075,0.05);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-32.7,-7.5,65.6,15.1);


(lib.Coin = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// drawing
	this.instance = new lib.CachedBmp_2();
	this.instance.setTransform(-587.25,-591.65,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// col
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#C1B14F").s().p("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");
	this.shape.setTransform(-2.7051,-9.7391);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-587.2,-591.6,1167,1167);


(lib.phone = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// aps
	this.instance = new lib.Coin("synched",0);
	this.instance.setTransform(-1.35,-90,0.011,0.011,0,0,180,-4.5,-9.1);

	this.text = new cjs.Text("App store", "4px 'Times'", "#000033");
	this.text.lineHeight = 6;
	this.text.lineWidth = 18;
	this.text.parent = this;
	this.text.setTransform(25.05,-81.3);

	this.text_1 = new cjs.Text("Phase-Tip", "4px 'Times'", "#000033");
	this.text_1.lineHeight = 6;
	this.text_1.lineWidth = 18;
	this.text_1.parent = this;
	this.text_1.setTransform(-9.7,-80.4);

	this.text_2 = new cjs.Text("Settings", "4px 'Times'", "#000033");
	this.text_2.lineHeight = 6;
	this.text_2.lineWidth = 18;
	this.text_2.parent = this;
	this.text_2.setTransform(-41.75,-80.4);

	this.instance_1 = new lib.CachedBmp_3();
	this.instance_1.setTransform(-43.5,-97.05,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.text_2},{t:this.text_1},{t:this.text},{t:this.instance}]}).wait(1));

	// Base
	this.instance_2 = new lib.CachedBmp_4();
	this.instance_2.setTransform(-64.65,-121.7,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-64.6,-121.7,124,256.5);


// stage content:
(lib.Final = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = false; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {Phase:111,Tip:119,A:134,New:137,way:142,To:147,Handle:151,Your:159,Money:172,Check:185,Subscriptions:191,Deposits:214,Payments:229,"And More":247,SFX:272,"Phase-tip":289,is:304,free:308,to:313,use:319,and:326,can:328,be:330,downloaded:332,on:343,google:352,playstore:356,"and":367,the:373,"apple ap store":379,"if":425,uou:428,join:431,now:438,you:451,may:453,ne:459,able:461,"to get":465,ten:472,dollars:477,"for":488,"free":490,thats:502,right:507,"ten":519,"dollars":524};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0,719];
	this.streamSoundSymbolsList[0] = [{id:"_30secradio1",startFrame:0,endFrame:719,loop:1,offset:0}];
	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
		var soundInstance = playSound("_30secradio1",0);
		this.InsertIntoSoundStreamData(soundInstance,0,719,1);
	}
	this.frame_719 = function() {
		stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(719).call(this.frame_719).wait(1));

	// Mouth
	this.instance = new lib.Bmouth("synched",0);
	this.instance.setTransform(445.7,189.9,2.0263,3.0115,0,-8.2474,171.7526,0.5,2);
	this.instance._off = true;

	this.instance_1 = new lib.Fmouth("synched",0);
	this.instance_1.setTransform(426.55,196.55,0.5078,1.0013,0,-9.6914,-6.7321,57.8,8.4);
	this.instance_1._off = true;

	this.instance_2 = new lib.Amouth("synched",0);
	this.instance_2.setTransform(349.9,227,1.4896,1.3065,-8.994,0,0,0.1,0);
	this.instance_2._off = true;

	this.instance_3 = new lib.Dmouth("synched",0);
	this.instance_3.setTransform(323.65,245.25,1,1,0,0,0,-0.1,0.2);
	this.instance_3._off = true;

	this.instance_4 = new lib.Cmouth("synched",0);
	this.instance_4.setTransform(286.45,252.8,1.5138,1.5138,-14.9982,0,0,0.1,0);
	this.instance_4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(111).to({_off:false},0).wait(1).to({x:441.5,y:191.9},0).wait(1).to({regX:0.4,regY:2.1,scaleX:2.2447,scaleY:3.336,skewX:-8.2473,skewY:171.7529,x:437.2,y:194.05},0).wait(1).to({scaleX:2.5337,scaleY:3.7656,skewX:-8.2472,skewY:171.753,x:430.55,y:195.3},0).to({_off:true},1).wait(4).to({_off:false,regX:0.9,regY:1.8,scaleX:2.5773,scaleY:2.5773,rotation:-10.2145,skewX:0,skewY:0,x:404.7,y:205.25},0).wait(1).to({regX:0.8,regY:1.6,scaleX:2.6096,scaleY:2.6096,rotation:-10.2154,x:399.05,y:206.8},0).wait(1).to({scaleX:2.642,scaleY:2.642,x:393.75,y:208.8},0).wait(1).to({scaleX:2.6743,scaleY:2.6743,x:388.4,y:210.8},0).wait(1).to({scaleX:2.7066,scaleY:2.7066,x:383.1,y:212.8},0).wait(1).to({scaleX:2.7389,scaleY:2.7389,x:377.8,y:214.85},0).wait(1).to({scaleX:2.7712,scaleY:2.7712,x:372.5,y:216.85},0).wait(1).to({scaleX:2.8036,scaleY:2.8036,x:367.15,y:218.9},0).wait(1).to({scaleX:2.8359,scaleY:2.8359,x:361.85,y:220.9},0).wait(1).to({scaleX:2.8682,scaleY:2.8682,x:356.5,y:222.95},0).wait(1).to({scaleX:2.9005,scaleY:2.9005,x:351.2,y:224.95},0).to({_off:true},1).wait(7).to({_off:false,regX:1,regY:1.8,scaleX:3.299,scaleY:3.299,rotation:-6.4505,x:310.05,y:244.4},0).to({_off:true},1).wait(9).to({_off:false,regX:0.8,scaleX:3.5956,scaleY:3.5956,rotation:-14.999,x:263.3,y:262.35},0).to({_off:true},1).wait(6).to({_off:false,regX:1.1,scaleX:4.4557,scaleY:4.4557,rotation:-14.9982,x:227.75,y:277.7},0).wait(1).to({regX:0.8,regY:1.6,scaleX:4.4558,scaleY:4.4558,rotation:-14.9989,x:219.8,y:280.2},0).wait(1).to({x:213.45,y:283.2},0).wait(1).to({x:207.1,y:286.2},0).wait(1).to({x:200.7,y:289.25},0).to({_off:true},1).wait(19).to({_off:false,regX:1,regY:2.1,scaleX:5.1887,scaleY:5.1887,rotation:-14.9984,x:101.5,y:316.1},0).wait(1).to({regX:0.8,regY:1.6,scaleX:5.304,scaleY:5.304,rotation:-14.9989,x:94.95,y:317},0).wait(1).to({scaleX:5.4193,scaleY:5.4193,x:90.05,y:320.2},0).wait(1).to({scaleX:5.5345,scaleY:5.5345,x:85.15,y:323.3},0).wait(1).to({scaleX:5.6498,scaleY:5.6498,x:80.2,y:326.5},0).wait(1).to({scaleX:5.765,scaleY:5.765,x:75.3,y:329.65},0).wait(1).to({scaleX:5.8803,scaleY:5.8803,x:70.4,y:332.85},0).to({_off:true},1).wait(535));
	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(115).to({_off:false},0).wait(1).to({regX:57.9,scaleX:0.5715,scaleY:1.127,skewX:-9.6909,skewY:-6.7311,x:422.2,y:196.5},0).wait(1).to({regX:58,regY:8.5,scaleX:0.6444,scaleY:1.2707,skewY:-6.7302,x:415.85,y:198.8},0).wait(1).to({x:409.2,y:202.8},0).to({_off:true},1).wait(19).to({_off:false,regX:57.7,regY:7.7,scaleX:0.8261,scaleY:0.8261,rotation:-7.2412,skewX:0,skewY:0,x:306.45,y:242.25},0).wait(1).to({regX:57.8,regY:8.3,scaleX:0.8391,scaleY:0.901,rotation:-7.242,x:301.2,y:245.15},0).wait(1).to({scaleX:0.8522,scaleY:0.9758,x:295.85,y:247.6},0).wait(1).to({scaleX:0.8652,scaleY:1.0506,x:290.5,y:250.05},0).to({_off:true},1).wait(6).to({_off:false,scaleX:1,scaleY:1,rotation:-14.9992,x:261.7,y:263.1},0).wait(1).to({x:256.05},0).wait(1).to({x:248.85},0).to({_off:true},1).wait(8).to({_off:false,regX:58.1,regY:8.8,scaleX:1.0121,scaleY:1.0121,rotation:-14.9977,x:196,y:286.7},0).wait(1).to({regX:57.8,regY:8.3,scaleX:1.0259,scaleY:1.0549,rotation:-14.9989,x:190.95,y:288.05},0).wait(1).to({scaleX:1.0397,scaleY:1.0977,x:186.35,y:289.9},0).wait(1).to({scaleX:1.0536,scaleY:1.1405,x:181.7,y:291.7},0).wait(1).to({scaleX:1.0674,scaleY:1.1832,x:177.15,y:293.55},0).wait(1).to({scaleX:1.0812,scaleY:1.226,x:172.55,y:295.35},0).wait(1).to({scaleX:1.095,scaleY:1.2688,x:167.95,y:297.1},0).wait(1).to({scaleX:1.1088,scaleY:1.3116,x:163.3,y:298.95},0).wait(1).to({scaleX:1.1227,scaleY:1.3544,x:158.7,y:300.75},0).wait(1).to({scaleX:1.1365,scaleY:1.3972,x:154.1,y:302.6},0).wait(1).to({scaleX:1.1503,scaleY:1.44,x:149.5,y:304.4},0).wait(1).to({scaleX:1.1641,scaleY:1.4828,x:144.9,y:306.25},0).wait(1).to({scaleX:1.178,scaleY:1.5256,x:140.3,y:308.1},0).to({_off:true},1).wait(548));
	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(130).to({_off:false},0).wait(1).to({regX:0,scaleX:1.4966,scaleY:1.3127,rotation:-8.995,x:345.0823,y:229.1502},0).wait(1).to({scaleX:1.5037,scaleY:1.3189,x:340.4146,y:231.3003},0).wait(1).to({scaleX:1.5107,scaleY:1.325,x:335.7469,y:233.4505},0).to({_off:true},1).wait(38).to({_off:false,regX:0.1,regY:0.2,scaleX:2.1625,scaleY:1.6981,rotation:-14.9991,x:137.4,y:305.8},0).wait(1).to({x:128.45},0).to({_off:true},1).wait(546));
	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(134).to({_off:false},0).wait(1).to({regX:0,scaleX:1.2359,scaleY:1.2359,rotation:-3.9723,x:321.1,y:245.2},0).wait(1).to({scaleX:1.4717,scaleY:1.4717,rotation:-7.9447,x:318.55},0).to({_off:true},1).wait(14).to({_off:false,regY:0.3,scaleX:1.8175,scaleY:1.8175,rotation:-14.9982,x:241.55,y:270.7},0).wait(1).to({regY:0.2,scaleX:1.8176,scaleY:1.8176,rotation:-14.9989,x:237.45,y:275.25},0).wait(1).to({x:233.4,y:280.05},0).to({_off:true},1).wait(20).to({_off:false,regX:-0.1,scaleX:2.0154,scaleY:2.0154,rotation:-14.9988,x:130.2,y:313.95},0).wait(1).to({x:115.7},0).wait(1).to({x:112.3},0).wait(1).to({regX:0,scaleX:2.0536,scaleY:2.0536,x:107,y:313.9},0).to({_off:true},1).wait(542));
	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(142).to({_off:false},0).wait(1).to({regX:-0.1,regY:-0.2,scaleX:1.5421,scaleY:1.4918,rotation:-14.9989,x:282.2,y:255.4},0).wait(1).to({scaleX:1.5704,scaleY:1.4698,x:278.4,y:258.2},0).wait(1).to({scaleX:1.5987,scaleY:1.4478,x:274.65,y:261},0).wait(1).to({scaleX:1.627,scaleY:1.4258,x:270.8,y:263.8},0).to({_off:true},1).wait(573));

	// phone
	this.instance_5 = new lib.phone("synched",0);
	this.instance_5.setTransform(632.95,161.1,0.9031,0.9031,0,0,0,-2,6.4);
	this.instance_5._off = true;

	
	var _tweenStr_0 = cjs.Tween.get(this.instance_5).wait(111).to({_off:false},0).wait(1).to({regX:-2.7,regY:6.6,scaleX:0.9249,scaleY:0.9249,x:630.65,y:163.4},0).wait(1).to({scaleX:0.9467,scaleY:0.9467,x:629,y:165.6},0).wait(1).to({scaleX:0.9685,scaleY:0.9685,x:627.35,y:167.8},0).wait(1).to({scaleX:0.9903,scaleY:0.9903,x:625.75,y:170},0).wait(1).to({scaleX:1.0121,scaleY:1.0121,x:624.05,y:172.2},0).wait(1).to({scaleX:1.0339,scaleY:1.0339,x:622.4,y:174.35},0).wait(1).to({scaleX:1.0557,scaleY:1.0557,x:620.75,y:176.5},0).wait(1).to({scaleX:1.0775,scaleY:1.0775,x:619.15,y:178.7},0).wait(1).to({scaleX:1.0993,scaleY:1.0993,x:617.5,y:180.9},0).wait(1).to({scaleX:1.1211,scaleY:1.1211,x:615.8,y:183.1},0).wait(1).to({scaleX:1.1429,scaleY:1.1429,x:614.2,y:185.3},0).wait(1).to({scaleX:1.1647,scaleY:1.1647,x:612.55,y:187.5},0).wait(1).to({scaleX:1.1865,scaleY:1.1865,x:610.9,y:189.7},0).wait(1).to({scaleX:1.2083,scaleY:1.2083,x:609.25,y:191.85},0).wait(1).to({scaleX:1.2301,scaleY:1.2301,x:607.65,y:194},0).wait(1).to({scaleX:1.252,scaleY:1.252,x:605.95,y:196.2},0).wait(1).to({scaleX:1.2738,scaleY:1.2738,x:604.3,y:198.4},0).wait(1).to({scaleX:1.2956,scaleY:1.2956,x:602.7,y:200.6},0).wait(1).to({scaleX:1.3174,scaleY:1.3174,x:601.05,y:202.8},0).wait(1).to({scaleX:1.3392,scaleY:1.3392,x:599.4,y:205},0).wait(1).to({scaleX:1.361,scaleY:1.361,x:597.75,y:207.15},0).wait(1).to({scaleX:1.3828,scaleY:1.3828,x:596.1,y:209.35},0).wait(1).to({scaleX:1.4046,scaleY:1.4046,x:594.45,y:211.5},0).wait(1).to({scaleX:1.4264,scaleY:1.4264,x:592.8,y:213.7},0).wait(1).to({scaleX:1.4482,scaleY:1.4482,x:591.2,y:215.9},0).wait(1).to({scaleX:1.47,scaleY:1.47,x:589.55,y:218.1},0).wait(1).to({scaleX:1.4918,scaleY:1.4918,x:587.85,y:220.3},0).wait(1).to({scaleX:1.5136,scaleY:1.5136,x:586.2,y:222.45},0).wait(1).to({scaleX:1.5354,scaleY:1.5354,x:584.6,y:224.65},0).wait(1).to({scaleX:1.5572,scaleY:1.5572,x:582.95,y:226.85},0).wait(1).to({scaleX:1.579,scaleY:1.579,x:581.3,y:229},0).wait(1).to({scaleX:1.6008,scaleY:1.6008,x:579.7,y:231.2},0).wait(1).to({scaleX:1.6226,scaleY:1.6226,x:578,y:233.4},0).wait(1).to({scaleX:1.6444,scaleY:1.6444,x:576.35,y:235.55},0).wait(1).to({scaleX:1.6662,scaleY:1.6662,x:574.7,y:237.75},0).wait(1).to({scaleX:1.6881,scaleY:1.6881,x:573.1,y:239.95},0).wait(1).to({scaleX:1.7099,scaleY:1.7099,x:571.45,y:242.15},0).wait(1).to({scaleX:1.7317,scaleY:1.7317,x:569.75,y:244.35},0).wait(1).to({scaleX:1.7535,scaleY:1.7535,x:568.15,y:246.5},0).wait(1).to({scaleX:1.7753,scaleY:1.7753,x:566.5,y:248.7},0).wait(1).to({scaleX:1.7971,scaleY:1.7971,x:564.85,y:250.85},0).wait(1).to({scaleX:1.8189,scaleY:1.8189,x:563.2,y:253.05},0).wait(1).to({scaleX:1.8407,scaleY:1.8407,x:561.6,y:255.25},0).wait(1).to({scaleX:1.8625,scaleY:1.8625,x:559.9,y:257.45},0).wait(1).to({scaleX:1.8843,scaleY:1.8843,x:558.25,y:259.65},0).wait(1).to({scaleX:1.9061,scaleY:1.9061,x:556.65,y:261.85},0).wait(1).to({scaleX:1.9279,scaleY:1.9279,x:555,y:264},0).wait(1).to({scaleX:1.9497,scaleY:1.9497,x:553.35,y:266.15},0).wait(1).to({scaleX:1.9715,scaleY:1.9715,x:551.7,y:268.35},0).wait(1).to({scaleX:1.9933,scaleY:1.9933,x:550.05,y:270.55},0).wait(1).to({scaleX:2.0151,scaleY:2.0151,x:548.4,y:272.75},0).wait(1).to({scaleX:2.0369,scaleY:2.0369,x:546.75,y:274.95},0).wait(1).to({scaleX:2.0587,scaleY:2.0587,x:545.15,y:277.15},0).wait(1).to({scaleX:2.0805,scaleY:2.0805,x:543.5,y:279.35},0).wait(1).to({scaleX:2.1023,scaleY:2.1023,x:541.8,y:281.5},0).wait(1).to({scaleX:2.1241,scaleY:2.1241,x:540.15,y:283.65},0).wait(1).to({scaleX:2.146,scaleY:2.146,x:538.55,y:285.85},0).wait(1).to({scaleX:2.1678,scaleY:2.1678,x:536.9,y:288.05},0).wait(1).to({scaleX:2.1896,scaleY:2.1896,x:535.25,y:290.25},0).wait(1).to({scaleX:2.2114,scaleY:2.2114,x:533.6,y:292.45},0).wait(1).to({scaleX:2.2332,scaleY:2.2332,x:531.95,y:294.65},0).wait(1).to({scaleX:2.255,scaleY:2.255,x:530.3,y:296.8},0).wait(1).to({scaleX:2.2768,scaleY:2.2768,x:528.65,y:299},0).wait(1).to({scaleX:2.2986,scaleY:2.2986,x:527.05,y:301.15},0).wait(1).to({scaleX:2.3204,scaleY:2.3204,x:525.4,y:303.35},0).wait(1).to({scaleX:2.3422,scaleY:2.3422,x:523.75,y:305.55},0).wait(1).to({scaleX:2.364,scaleY:2.364,x:522.05,y:307.75},0).wait(1).to({scaleX:2.3858,scaleY:2.3858,x:520.45,y:309.9},0).wait(1).to({scaleX:2.4076,scaleY:2.4076,x:518.8,y:312.1},0).wait(1).to({scaleX:2.4294,scaleY:2.4294,x:517.15,y:314.3},0).wait(1).to({scaleX:2.4512,scaleY:2.4512,x:515.55,y:316.5},0).wait(1).to({scaleX:2.473,scaleY:2.473,x:513.85,y:318.65},0).wait(1).to({scaleX:2.4948,scaleY:2.4948,x:512.2,y:320.85},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1);
	this.timeline.addTween(_tweenStr_0.to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1));

	// foreground
	this.instance_6 = new lib.tree("synched",0);
	this.instance_6.setTransform(690.7,355.95,0.5878,0.5878,0,0,0,-25.6,-92.5);
	this.instance_6._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(70).to({_off:false},0).to({_off:true},22).wait(628));

	// character
	this.instance_7 = new lib.SidWave();
	this.instance_7.setTransform(302.15,465.9,0.52,0.52);
	new cjs.ButtonHelper(this.instance_7, 0, 1, 2, false, new lib.SidWave(), 3);

	this.instance_8 = new lib.Symbol1();
	this.instance_8.setTransform(570,448,1,1,0,0,0,174,174);
	this.instance_8._off = true;

	this.instance_9 = new lib.Symbol2();
	this.instance_9.setTransform(541,405,1,1,0,0,0,405,405);
	this.instance_9._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(3).to({scaleX:0.5278,scaleY:0.5278,x:296,y:473.6},0).wait(2).to({scaleX:0.5481,scaleY:0.5481,x:288.5,y:473.95},0).wait(61).to({scaleX:0.4791,scaleY:0.4791,x:327.15,y:472.7},0).wait(2).to({scaleX:0.4669,scaleY:0.4669,x:352.95,y:472.45},0).wait(1).to({scaleX:0.4223,scaleY:0.4223,x:393.75,y:471.6},0).to({_off:true},1).wait(650));
	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(70).to({_off:false},0).wait(1).to({scaleX:1.0296,scaleY:1.0296,x:603.35,y:446.7},0).wait(1).to({scaleX:1.0593,scaleY:1.0593,x:634.9,y:445.4},0).wait(1).to({scaleX:1.0889,scaleY:1.0889,x:664.6,y:444.1},0).wait(1).to({scaleX:1.1185,scaleY:1.1185,x:692.5,y:442.75},0).wait(1).to({scaleX:1.1482,scaleY:1.1482,x:718.65,y:441.5},0).wait(1).to({scaleX:1.1778,scaleY:1.1778,x:742.9,y:440.2},0).wait(1).to({scaleX:1.2074,scaleY:1.2074,x:765.35,y:438.85},0).wait(1).to({scaleX:1.2371,scaleY:1.2371,x:785.95,y:437.55},0).wait(1).to({scaleX:1.2667,scaleY:1.2667,x:804.8,y:436.2},0).wait(1).to({scaleX:1.2963,scaleY:1.2963,x:821.8,y:434.85},0).wait(1).to({scaleX:1.3259,scaleY:1.3259,x:836.95,y:433.5},0).wait(1).to({scaleX:1.3556,scaleY:1.3556,x:850.35,y:432.15},0).wait(1).to({scaleX:1.3852,scaleY:1.3852,x:861.9,y:430.8},0).wait(1).to({scaleX:1.4148,scaleY:1.4148,x:871.7,y:429.5},0).wait(1).to({scaleX:1.4445,scaleY:1.4445,x:879.6,y:428.15},0).wait(1).to({scaleX:1.4741,scaleY:1.4741,x:885.75,y:426.75},0).wait(1).to({scaleX:1.5037,scaleY:1.5037,x:890.05,y:425.4},0).wait(1).to({scaleX:1.5334,scaleY:1.5334,x:892.55,y:424},0).wait(1).to({scaleX:1.563,scaleY:1.563,x:893.2,y:422.65},0).wait(1).to({scaleX:1.5926,scaleY:1.5926,x:892.1,y:421.25},0).wait(1).to({scaleX:1.6223,scaleY:1.6223,x:889.15,y:419.85},0).wait(1).to({scaleX:1.6519,scaleY:1.6519,x:884.4,y:418.5},0).wait(1).to({scaleX:1.6815,scaleY:1.6815,x:877.85,y:417.1},0).wait(1).to({scaleX:1.7112,scaleY:1.7112,x:869.45,y:415.7},0).wait(1).to({scaleX:1.7408,scaleY:1.7408,x:859.3,y:414.25},0).wait(1).to({scaleX:1.7704,scaleY:1.7704,x:847.25,y:412.85},0).wait(1).to({scaleX:1.8,scaleY:1.8,x:833.45,y:411.4},0).wait(1).to({scaleX:1.8297,scaleY:1.8297,x:817.8,y:410},0).wait(1).to({scaleX:1.8593,scaleY:1.8593,x:800.35,y:408.55},0).wait(1).to({scaleX:1.8889,scaleY:1.8889,x:781.1,y:407.1},0).wait(1).to({scaleX:1.9186,scaleY:1.9186,x:760.05,y:405.7},0).wait(1).to({scaleX:1.9482,scaleY:1.9482,x:737.15,y:404.25},0).wait(1).to({scaleX:1.9778,scaleY:1.9778,x:712.45,y:402.8},0).wait(1).to({scaleX:2.0075,scaleY:2.0075,x:685.9,y:401.35},0).wait(1).to({scaleX:2.0371,scaleY:2.0371,x:657.55,y:399.85},0).wait(1).to({scaleX:2.0667,scaleY:2.0667,x:627.4,y:398.4},0).wait(1).to({scaleX:2.0964,scaleY:2.0964,x:595.4,y:396.9},0).wait(1).to({scaleX:2.126,scaleY:2.126,x:561.6,y:395.45},0).wait(1).to({scaleX:2.1556,scaleY:2.1556,x:526,y:394},0).to({_off:true},1).wait(610));
	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(110).to({_off:false},0).wait(1).to({scaleX:1.0192,scaleY:1.0192,x:537.55,y:411.1},0).wait(1).to({scaleX:1.0383,scaleY:1.0383,x:534.15,y:417.2},0).wait(1).to({scaleX:1.0575,scaleY:1.0575,x:530.7,y:423.3},0).wait(1).to({scaleX:1.0766,scaleY:1.0766,x:527.35,y:429.45},0).wait(1).to({scaleX:1.0958,scaleY:1.0958,x:523.9,y:435.5},0).wait(1).to({scaleX:1.1149,scaleY:1.1149,x:520.5,y:441.6},0).wait(1).to({scaleX:1.1341,scaleY:1.1341,x:517.1,y:447.7},0).wait(1).to({scaleX:1.1533,scaleY:1.1533,x:513.65,y:453.8},0).wait(1).to({scaleX:1.1724,scaleY:1.1724,x:510.3,y:459.9},0).wait(1).to({scaleX:1.1916,scaleY:1.1916,x:506.85,y:466},0).wait(1).to({scaleX:1.2107,scaleY:1.2107,x:503.45,y:472.1},0).wait(1).to({scaleX:1.2299,scaleY:1.2299,x:500.05,y:478.2},0).wait(1).to({scaleX:1.249,scaleY:1.249,x:496.65,y:484.25},0).wait(1).to({scaleX:1.2682,scaleY:1.2682,x:493.25,y:490.35},0).wait(1).to({scaleX:1.2874,scaleY:1.2874,x:489.85,y:496.5},0).wait(1).to({scaleX:1.3065,scaleY:1.3065,x:486.45,y:502.6},0).wait(1).to({scaleX:1.3257,scaleY:1.3257,x:483.05,y:508.65},0).wait(1).to({scaleX:1.3448,scaleY:1.3448,x:479.6,y:514.75},0).wait(1).to({scaleX:1.364,scaleY:1.364,x:476.2,y:520.85},0).wait(1).to({scaleX:1.3831,scaleY:1.3831,x:472.8,y:527},0).wait(1).to({scaleX:1.4023,scaleY:1.4023,x:469.4,y:533.05},0).wait(1).to({scaleX:1.4215,scaleY:1.4215,x:466,y:539.15},0).wait(1).to({scaleX:1.4406,scaleY:1.4406,x:462.55,y:545.25},0).wait(1).to({scaleX:1.4598,scaleY:1.4598,x:459.15,y:551.35},0).wait(1).to({scaleX:1.4789,scaleY:1.4789,x:455.7,y:557.4},0).wait(1).to({scaleX:1.4981,scaleY:1.4981,x:452.35,y:563.55},0).wait(1).to({scaleX:1.5173,scaleY:1.5173,x:448.95,y:569.65},0).wait(1).to({scaleX:1.5364,scaleY:1.5364,x:445.5,y:575.75},0).wait(1).to({scaleX:1.5556,scaleY:1.5556,x:442.1,y:581.8},0).wait(1).to({scaleX:1.5747,scaleY:1.5747,x:438.65,y:587.9},0).wait(1).to({scaleX:1.5939,scaleY:1.5939,x:435.25,y:594},0).wait(1).to({scaleX:1.613,scaleY:1.613,x:431.9,y:600.15},0).wait(1).to({scaleX:1.6322,scaleY:1.6322,x:428.45,y:606.2},0).wait(1).to({scaleX:1.6514,scaleY:1.6514,x:425.05,y:612.3},0).wait(1).to({scaleX:1.6705,scaleY:1.6705,x:421.6,y:618.4},0).wait(1).to({scaleX:1.6897,scaleY:1.6897,x:418.2,y:624.5},0).wait(1).to({scaleX:1.7088,scaleY:1.7088,x:414.8,y:630.6},0).wait(1).to({scaleX:1.728,scaleY:1.728,x:411.4,y:636.7},0).wait(1).to({scaleX:1.7471,scaleY:1.7471,x:408,y:642.8},0).wait(1).to({scaleX:1.7663,scaleY:1.7663,x:404.55,y:648.9},0).wait(1).to({scaleX:1.7855,scaleY:1.7855,x:401.15,y:655},0).wait(1).to({scaleX:1.8046,scaleY:1.8046,x:397.7,y:661.05},0).wait(1).to({scaleX:1.8238,scaleY:1.8238,x:394.3,y:667.15},0).wait(1).to({scaleX:1.8429,scaleY:1.8429,x:390.95,y:673.3},0).wait(1).to({scaleX:1.8621,scaleY:1.8621,x:387.5,y:679.4},0).wait(1).to({scaleX:1.8812,scaleY:1.8812,x:384.1,y:685.45},0).wait(1).to({scaleX:1.9004,scaleY:1.9004,x:380.65,y:691.55},0).wait(1).to({scaleX:1.9196,scaleY:1.9196,x:377.25,y:697.65},0).wait(1).to({scaleX:1.9387,scaleY:1.9387,x:373.9,y:703.8},0).wait(1).to({scaleX:1.9579,scaleY:1.9579,x:370.45,y:709.85},0).wait(1).to({scaleX:1.977,scaleY:1.977,x:367.05,y:715.95},0).wait(1).to({scaleX:1.9962,scaleY:1.9962,x:363.6,y:722.05},0).wait(1).to({scaleX:2.0153,scaleY:2.0153,x:360.2,y:728.15},0).wait(1).to({scaleX:2.0345,scaleY:2.0345,x:356.8,y:734.2},0).wait(1).to({scaleX:2.0537,scaleY:2.0537,x:353.4,y:740.35},0).wait(1).to({scaleX:2.0728,scaleY:2.0728,x:350,y:746.45},0).wait(1).to({scaleX:2.092,scaleY:2.092,x:346.55,y:752.55},0).wait(1).to({scaleX:2.1111,scaleY:2.1111,x:343.15,y:758.6},0).wait(1).to({scaleX:2.1303,scaleY:2.1303,x:339.75,y:764.7},0).wait(1).to({scaleX:2.1494,scaleY:2.1494,x:336.35,y:770.85},0).wait(1).to({scaleX:2.1686,scaleY:2.1686,x:332.95,y:776.95},0).wait(1).to({scaleX:2.1878,scaleY:2.1878,x:329.5,y:783},0).wait(1).to({scaleX:2.2069,scaleY:2.2069,x:326.1,y:789.1},0).wait(1).to({scaleX:2.2261,scaleY:2.2261,x:322.7,y:795.2},0).wait(1).to({scaleX:2.2452,scaleY:2.2452,x:319.25,y:801.3},0).wait(1).to({scaleX:2.2644,scaleY:2.2644,x:315.9,y:807.4},0).wait(1).to({scaleX:2.2835,scaleY:2.2835,x:312.45,y:813.5},0).wait(1).to({scaleX:2.3027,scaleY:2.3027,x:309.05,y:819.6},0).wait(1).to({scaleX:2.3219,scaleY:2.3219,x:305.65,y:825.7},0).wait(1).to({scaleX:2.341,scaleY:2.341,x:302.2,y:831.8},0).wait(1).to({scaleX:2.3602,scaleY:2.3602,x:298.8,y:837.85},0).wait(1).to({scaleX:2.3793,scaleY:2.3793,x:295.4,y:844},0).wait(1).to({scaleX:2.3985,scaleY:2.3985,x:292,y:850.1},0).wait(1).to({scaleX:2.4177,scaleY:2.4177,x:288.6,y:856.2},0).wait(534).to({_off:true},1).wait(1));

	// tree1
	this.instance_10 = new lib.tree("synched",0);
	this.instance_10.setTransform(711.4,353.15,0.5887,0.5887,0,0,180,-27.2,-92.2);
	this.instance_10._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(92).to({_off:false},0).to({_off:true},29).wait(599));

	// background
	this.instance_11 = new lib.pexelstrangpham954710();
	this.instance_11.setTransform(-74,-106,0.2159,0.2159);

	this.instance_12 = new lib.CachedBmp_5();
	this.instance_12.setTransform(-2.25,65.7,0.5,0.5);

	this.instance_13 = new lib.Symbol3();
	this.instance_13.setTransform(485.7,267.2,1,1,0,0,0,559.7,373.2);
	this.instance_13._off = true;

	this.text = new cjs.Text("Settings", "5px 'Times'");
	this.text.lineHeight = 7;
	this.text.lineWidth = 18;
	this.text.parent = this;
	this.text.setTransform(453.8,146.15);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_12},{t:this.instance_11}]}).to({state:[{t:this.instance_13}]},92).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.text}]},1).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.instance_13).wait(92).to({_off:false},0).wait(1).to({regY:373.1,scaleX:1.0051,scaleY:1.0051,y:267.1},0).wait(1).to({scaleX:1.0103,scaleY:1.0103,y:267.15},0).wait(1).to({scaleX:1.0154,scaleY:1.0154,x:485.75,y:267.1},0).wait(1).to({scaleX:1.0206,scaleY:1.0206,x:485.7},0).wait(1).to({scaleX:1.0257,scaleY:1.0257,x:485.75,y:267.15},0).wait(1).to({scaleX:1.0308,scaleY:1.0308,x:485.7,y:267.1},0).wait(1).to({scaleX:1.036,scaleY:1.036,x:485.75},0).wait(1).to({scaleX:1.0411,scaleY:1.0411,x:485.7,y:267.15},0).wait(1).to({scaleX:1.0463,scaleY:1.0463,x:485.75,y:267.1},0).wait(1).to({scaleX:1.0514,scaleY:1.0514,x:485.7,y:267.15},0).wait(1).to({scaleX:1.0566,scaleY:1.0566,y:267.1},0).wait(1).to({scaleX:1.0617,scaleY:1.0617,x:485.75},0).wait(1).to({scaleX:1.0668,scaleY:1.0668,x:485.7,y:267.15},0).wait(1).to({scaleX:1.072,scaleY:1.072,x:485.75,y:267.1},0).wait(1).to({scaleX:1.0771,scaleY:1.0771,x:485.7},0).wait(1).to({scaleX:1.0823,scaleY:1.0823,x:485.75,y:267.15},0).wait(1).to({scaleX:1.0874,scaleY:1.0874,x:485.7,y:267.1},0).wait(1).to({scaleX:1.0925,scaleY:1.0925,x:485.75,y:267.15},0).wait(1).to({scaleX:1.0977,scaleY:1.0977,y:267.1},0).wait(1).to({scaleX:1.1028,scaleY:1.1028,x:485.7},0).wait(1).to({scaleX:1.108,scaleY:1.108,y:267.15},0).wait(1).to({scaleX:1.1131,scaleY:1.1131,y:267.1},0).wait(1).to({scaleX:1.1183,scaleY:1.1183,x:485.75},0).wait(1).to({scaleX:1.1234,scaleY:1.1234,x:485.7,y:267.15},0).wait(1).to({scaleX:1.1285,scaleY:1.1285,x:485.75,y:267.1},0).wait(1).to({scaleX:1.1337,scaleY:1.1337,x:485.7},0).wait(1).to({scaleX:1.1388,scaleY:1.1388,x:485.75,y:267.15},0).wait(1).to({scaleX:1.144,scaleY:1.144,x:485.7,y:267.1},0).wait(1).to({scaleX:1.1491,scaleY:1.1491,y:267.15},0).wait(1).to({scaleX:1.1542,scaleY:1.1542,x:485.75,y:267.1},0).wait(1).to({scaleX:1.1594,scaleY:1.1594,x:485.7},0).wait(1).to({scaleX:1.1645,scaleY:1.1645,x:485.75,y:267.15},0).wait(1).to({scaleX:1.1697,scaleY:1.1697,x:485.7,y:267.1},0).wait(1).to({scaleX:1.1748,scaleY:1.1748,x:485.75},0).wait(1).to({scaleX:1.1799,scaleY:1.1799,x:485.7,y:267.15},0).wait(1).to({scaleX:1.1851,scaleY:1.1851,x:485.75,y:267.1},0).wait(1).to({scaleX:1.1902,scaleY:1.1902,x:485.7,y:267.15},0).wait(1).to({scaleX:1.1954,scaleY:1.1954,y:267.1},0).wait(1).to({scaleX:1.2005,scaleY:1.2005},0).wait(1).to({scaleX:1.2057,scaleY:1.2057,y:267.15},0).wait(1).to({scaleX:1.2108,scaleY:1.2108,x:485.75,y:267.1},0).wait(1).to({scaleX:1.2159,scaleY:1.2159,x:485.7},0).wait(1).to({scaleX:1.2211,scaleY:1.2211,x:485.75,y:267.15},0).wait(1).to({scaleX:1.2262,scaleY:1.2262,x:485.7,y:267.1},0).wait(1).to({scaleX:1.2314,scaleY:1.2314,x:485.75},0).wait(1).to({scaleX:1.2365,scaleY:1.2365,x:485.7},0).wait(1).to({scaleX:1.2416,scaleY:1.2416,x:485.75},0).wait(1).to({scaleX:1.2468,scaleY:1.2468,x:485.7},0).wait(1).to({scaleX:1.2519,scaleY:1.2519},0).wait(1).to({scaleX:1.2571,scaleY:1.2571,x:485.75},0).wait(1).to({scaleX:1.2622,scaleY:1.2622,x:485.7,y:267.15},0).wait(1).to({scaleX:1.2674,scaleY:1.2674,x:485.75,y:267.1},0).wait(1).to({scaleX:1.2725,scaleY:1.2725,x:485.7},0).wait(1).to({scaleX:1.2776,scaleY:1.2776,x:485.75,y:267.15},0).wait(1).to({scaleX:1.2828,scaleY:1.2828,x:485.7,y:267.1},0).wait(1).to({scaleX:1.2879,scaleY:1.2879,x:485.75},0).wait(1).to({scaleX:1.2931,scaleY:1.2931},0).wait(1).to({scaleX:1.2982,scaleY:1.2982,x:485.7},0).wait(1).to({scaleX:1.3033,scaleY:1.3033},0).wait(1).to({scaleX:1.3085,scaleY:1.3085},0).wait(1).to({scaleX:1.3136,scaleY:1.3136,x:485.75},0).wait(1).to({scaleX:1.3188,scaleY:1.3188,x:485.7,y:267.15},0).wait(1).to({scaleX:1.3239,scaleY:1.3239,x:485.75,y:267.1},0).wait(1).to({scaleX:1.3291,scaleY:1.3291,x:485.7},0).wait(1).to({scaleX:1.3342,scaleY:1.3342,x:485.75},0).wait(1).to({scaleX:1.3393,scaleY:1.3393,x:485.7},0).wait(1).to({scaleX:1.3445,scaleY:1.3445},0).wait(1).to({scaleX:1.3496,scaleY:1.3496,x:485.75},0).wait(1).to({scaleX:1.3548,scaleY:1.3548,x:485.7},0).wait(1).to({scaleX:1.3599,scaleY:1.3599,x:485.75,y:267.15},0).wait(1).to({scaleX:1.365,scaleY:1.365,x:485.7,y:267.1},0).wait(1).to({scaleX:1.3702,scaleY:1.3702,x:485.75},0).wait(1).to({scaleX:1.3753,scaleY:1.3753,x:485.7},0).wait(1).to({scaleX:1.3805,scaleY:1.3805,x:485.75},0).wait(1).to({scaleX:1.3856,scaleY:1.3856,x:485.7},0).wait(1).to({scaleX:1.3907,scaleY:1.3907},0).wait(1).to({scaleX:1.3959,scaleY:1.3959},0).wait(1).to({scaleX:1.401,scaleY:1.401},0).wait(1).to({scaleX:1.4062,scaleY:1.4062,x:485.75},0).wait(1).to({scaleX:1.4113,scaleY:1.4113,x:485.7},0).wait(1).to({scaleX:1.4165,scaleY:1.4165,x:485.75},0).wait(1).to({scaleX:1.4216,scaleY:1.4216,x:485.7},0).wait(1).to({scaleX:1.4267,scaleY:1.4267,x:485.75},0).wait(1).to({scaleX:1.4319,scaleY:1.4319,x:485.7},0).wait(1).to({scaleX:1.437,scaleY:1.437},0).wait(1).to({scaleX:1.4422,scaleY:1.4422},0).wait(1).to({scaleX:1.4473,scaleY:1.4473},0).wait(1).to({scaleX:1.4524,scaleY:1.4524,x:485.75},0).wait(1).to({scaleX:1.4576,scaleY:1.4576,x:485.7},0).wait(1).to({scaleX:1.4627,scaleY:1.4627,x:485.75},0).wait(1).to({scaleX:1.4679,scaleY:1.4679,x:485.7},0).wait(1).to({scaleX:1.473,scaleY:1.473,x:485.75},0).wait(534).to({_off:true},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(-210.5,37.6,1520.7,1797.8000000000002);
// library properties:
lib.properties = {
	id: 'BB5008D556B6487297B12E30F687C816',
	width: 960,
	height: 640,
	fps: 24,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [
		{src:"images/CachedBmp_2.png", id:"CachedBmp_2"},
		{src:"images/pexelstrangpham954710.jpg", id:"pexelstrangpham954710"},
		{src:"images/Final_atlas_1.png", id:"Final_atlas_1"},
		{src:"images/Final_atlas_2.png", id:"Final_atlas_2"},
		{src:"sounds/_30secradio1.mp3", id:"_30secradio1"}
	],
	preloads: []
};



// bootstrap callback support:

(lib.Stage = function(canvas) {
	createjs.Stage.call(this, canvas);
}).prototype = p = new createjs.Stage();

p.setAutoPlay = function(autoPlay) {
	this.tickEnabled = autoPlay;
}
p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

an.bootcompsLoaded = an.bootcompsLoaded || [];
if(!an.bootstrapListeners) {
	an.bootstrapListeners=[];
}

an.bootstrapCallback=function(fnCallback) {
	an.bootstrapListeners.push(fnCallback);
	if(an.bootcompsLoaded.length > 0) {
		for(var i=0; i<an.bootcompsLoaded.length; ++i) {
			fnCallback(an.bootcompsLoaded[i]);
		}
	}
};

an.compositions = an.compositions || {};
an.compositions['BB5008D556B6487297B12E30F687C816'] = {
	getStage: function() { return exportRoot.stage; },
	getLibrary: function() { return lib; },
	getSpriteSheet: function() { return ss; },
	getImages: function() { return img; }
};

an.compositionLoaded = function(id) {
	an.bootcompsLoaded.push(id);
	for(var j=0; j<an.bootstrapListeners.length; j++) {
		an.bootstrapListeners[j](id);
	}
}

an.getComposition = function(id) {
	return an.compositions[id];
}


an.makeResponsive = function(isResp, respDim, isScale, scaleType, domContainers) {		
	var lastW, lastH, lastS=1;		
	window.addEventListener('resize', resizeCanvas);		
	resizeCanvas();		
	function resizeCanvas() {			
		var w = lib.properties.width, h = lib.properties.height;			
		var iw = window.innerWidth, ih=window.innerHeight;			
		var pRatio = window.devicePixelRatio || 1, xRatio=iw/w, yRatio=ih/h, sRatio=1;			
		if(isResp) {                
			if((respDim=='width'&&lastW==iw) || (respDim=='height'&&lastH==ih)) {                    
				sRatio = lastS;                
			}				
			else if(!isScale) {					
				if(iw<w || ih<h)						
					sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==1) {					
				sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==2) {					
				sRatio = Math.max(xRatio, yRatio);				
			}			
		}
		domContainers[0].width = w * pRatio * sRatio;			
		domContainers[0].height = h * pRatio * sRatio;
		domContainers.forEach(function(container) {				
			container.style.width = w * sRatio + 'px';				
			container.style.height = h * sRatio + 'px';			
		});
		stage.scaleX = pRatio*sRatio;			
		stage.scaleY = pRatio*sRatio;
		lastW = iw; lastH = ih; lastS = sRatio;            
		stage.tickOnUpdate = false;            
		stage.update();            
		stage.tickOnUpdate = true;		
	}
}
an.handleSoundStreamOnTick = function(event) {
	if(!event.paused){
		var stageChild = stage.getChildAt(0);
		if(!stageChild.paused || stageChild.ignorePause){
			stageChild.syncStreamSounds();
		}
	}
}
an.handleFilterCache = function(event) {
	if(!event.paused){
		var target = event.target;
		if(target){
			if(target.filterCacheList){
				for(var index = 0; index < target.filterCacheList.length ; index++){
					var cacheInst = target.filterCacheList[index];
					if((cacheInst.startFrame <= target.currentFrame) && (target.currentFrame <= cacheInst.endFrame)){
						cacheInst.instance.cache(cacheInst.x, cacheInst.y, cacheInst.w, cacheInst.h);
					}
				}
			}
		}
	}
}


})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;