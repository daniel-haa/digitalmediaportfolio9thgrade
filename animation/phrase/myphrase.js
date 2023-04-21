(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"myphrase_atlas_1", frames: [[0,0,1064,1132],[0,1134,225,225]]}
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



(lib.CachedBmp_1 = function() {
	this.initialize(ss["myphrase_atlas_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.Bitmap4 = function() {
	this.initialize(ss["myphrase_atlas_1"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.pexelsmariaisabellabernotti1049298 = function() {
	this.initialize(img.pexelsmariaisabellabernotti1049298);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,6016,4000);


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
	this.shape.graphics.f().s("#000000").ss(1,1,1).p("AK5i3IgCADIAIAAAK3i0IhIBwQgfAriPBqQgWARg8AZQhAAag3ANQgDABgCABQglAIgQADQgUADgQACQgDABgLABQgRACgjAAABLC4QgOgBgfABQhKAAgOAAQgfgBgUgEQgPgEgKAAQgZgDgbgFQgmgIgpgPQg7gViMhDQghgQhHhDQg1gzgbgfQgMgPgPgZQgNgXgIgJQADAAABABIVrAAABLC4QgFAAgHAAQAOAAALAAABLC4QANAAAAAAAq+i3QAEABACAB");
	this.shape.setTransform(70.25,18.4);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1,-1,142.5,38.8);


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
	this.shape.graphics.f().s("#000000").ss(1,1,1).p("AJNinQAGAAAGAAQAAAAgIACQgEABAAgDQAAgDAsABQAYABAwABQg2BAhOBCQhCA3hEAqQgBAAgCABQgFAEgDACQgBABgCABIgWAJQgNAFgIADQgNAFgJAGQgBAAAAAAQgnATgxAPQh9AmiSABAn8iPQARACAPACQA6AHBCALQAyAIAQAEIBQAAQBVAACxgDQC6gDAPgCQAQgDCxgiQAZgFAXgEQAAAAACAAQAagEA/AAABjgJQBsgCA6gJQANgCCBgfQAPgEAQgMQAUgPALgFQAMgGAHgUQAHgUgEgSAn8iPQgFAyBTAZQAcAIBOALQAwAGA6ANQA8ANAmAGQAeAEBjgCQAsgBAWAAQgHAAgCABQARAAAQAAABLgKQAWAAACABQgBgDgOABQgFAAgEABgAgCCqQhGAEg8gMQg1gKgrgKQhLgOgkgJQg8gPhTgsQg7gfglgdQgigbgkgqQgpgwgPgoAgCCqQABAAABABQAAgBAAAAQgBAAgBAAgAq8ihIA+AAQBJALA5AH");
	this.shape.setTransform(70.5,17.0971);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1,-1,143,36.2);


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
	this.shape.graphics.f().s("#000000").ss(1,1,1).p("AhNghQBqAAByABQBSgBBjgKQAkgEBHgPQBVgSAYgEQAGgBBIgJQAvgGASgHIABAAQgBADgEAEQgBAAgGAFQgDADgEADQgNAKgCACQgqAZg0AfQhHAnhHAbQg8AUgXAJQgCABgCABQhnAdhwAAQhDABg2AAQgJAAgIACAqnhnQAMAYA+AhQAuAZBcAnQAVAJAWAIQAIAGBSAQQAtAJBaARQAhAHAOABQAdADAUADQAgAEAXAEQAMADAKAAQABAAABAAQALAAAEgCAqnhnQAvAOAKADQADABAAAAQAlAJBGAOQCKAdAmgBQA5gBBkAAQBKAAAUABAhNghQAAgBgIAAQgHABgCAAQAJAAAIAAgAqnhnQgCgBgCAA");
	this.shape.setTransform(68.425,10.775);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1,-1,138.9,23.6);


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
	this.shape.graphics.f().s("#000000").ss(1,1,1).p("AqGgkQBLAOBQAWQBRAWAkAHQB8AYA8ANQADAACWAAQBXAAAbgCQApgDBCgLQAygJAzgQQBDgVAVgEQArgMBAgPQA8gNASgDQAkgIAdgIQATgGAFAA");
	this.shape.setTransform(64.725,6.55);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1,-1,131.5,15.1);


// stage content:
(lib.myphrase = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {So:5,what:8,I:14,Bel:15,lieve:20,You:29,were:32,"try":35,ing:41,to:45,say:46,"N/A":60,is:73,Thank:81,you:91,"(moana) thank":99,"you":108,"(maui) your":115,wel:120,come:127,"(moana) wh":139,no:145,"no":149,"no":155,"N/A":161,"I":166,"I":169,did:174,ent:178,"I":185,was:189,"ent":193,why:204,would:208,"I":210,Ev:215,ver:217,"say":221};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0];
	this.streamSoundSymbolsList[0] = [{id:"dwayneyourwelcomewav",startFrame:0,endFrame:263,loop:1,offset:0}];
	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
		var soundInstance = playSound("dwayneyourwelcomewav",0);
		this.InsertIntoSoundStreamData(soundInstance,0,263,1);
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(263));

	// maui_mouth
	this.instance = new lib.Amouth("synched",0);
	this.instance.setTransform(132.45,240.25,0.5267,0.5267,0,0,0,64.8,6.5);

	this.instance_1 = new lib.Cmouth("synched",0);
	this.instance_1.setTransform(129.25,238.25,0.4965,0.4965,0,0,0,70.6,17);
	this.instance_1._off = true;

	this.instance_2 = new lib.Fmouth("synched",0);
	this.instance_2.setTransform(130.6,237.8,0.4096,0.4096,0,0,0,57.8,8.3);
	this.instance_2._off = true;

	this.instance_3 = new lib.Bmouth("synched",0);
	this.instance_3.setTransform(131.75,234.3,0.4276,0.4276,0,0,0,68.4,10.8);
	this.instance_3._off = true;

	this.instance_4 = new lib.Dmouth("synched",0);
	this.instance_4.setTransform(129.4,237.55,0.3772,0.3772,0,0,0,70.2,18.4);

	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(1,1,1).p("Ag8AHQACgBACgBQAXgNAWgFQAOgDAWAAQAfAAAGAQIAAAMQgOADgSABQgSABAAgCIAAgBQAAABABAAQgBAAAAAAQgQAAgPgCQgUgDgRgF");
	this.shape.setTransform(133.85,237.3071);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFCCCC").s().p("AAJAPIACAAIgCgBIAAABQgPAAgPgCQgUgDgRgFQAWgNAXgFQANgDAXAAQAfAAAFAQIAAAMQgNADgTABIgMABQgGAAAAgCgAAJAPIAAAAg");
	this.shape_1.setTransform(134.0875,237.3071);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#000000").ss(1,1,1).p("AgsABQAMgJAEgBIAsgKQAUAAALAPQAEAFAGAQIhHAEQghAAgIgKQAAAAgBAAQAEgEAIgGg");
	this.shape_2.setTransform(134.2375,239.15);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFCCCC").s().p("Ag3ALIgBAAIAMgKQAMgKAEAAIAsgLQAUAAALAPQAEAGAGAQIhHADQghAAgIgJg");
	this.shape_3.setTransform(134.2375,239.15);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},5).to({state:[{t:this.instance_2}]},2).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_4,p:{regX:70.2,scaleX:0.3772,scaleY:0.3772,x:129.4,y:237.55}}]},3).to({state:[{t:this.instance_3}]},2).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.shape_1},{t:this.shape},{t:this.instance_3}]},5).to({state:[{t:this.instance_3}]},5).to({state:[{t:this.instance_2}]},4).to({state:[{t:this.instance_3}]},3).to({state:[{t:this.instance_1}]},3).to({state:[{t:this.instance_3}]},6).to({state:[{t:this.instance_2}]},4).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.instance_3}]},1).to({state:[{t:this.instance_4,p:{regX:70.3,scaleX:0.394,scaleY:0.394,x:134.8,y:232.65}}]},3).to({state:[{t:this.instance}]},11).to({state:[{t:this.instance_3}]},13).to({state:[{t:this.instance_1}]},8).to({state:[{t:this.instance_3}]},6).to({state:[{t:this.instance_2}]},4).to({state:[{t:this.instance}]},8).to({state:[{t:this.instance_2}]},16).to({state:[{t:this.instance_3}]},5).to({state:[{t:this.instance_3}]},6).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},6).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},4).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},123).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.instance).to({_off:true},5).wait(55).to({_off:false,regY:6.7,x:135.1,y:236.9},0).to({_off:true},13).wait(26).to({_off:false,regY:6.8,scaleX:0.455,scaleY:0.455,x:132.85,y:232.6},0).to({_off:true},16).wait(19).to({_off:false,regY:6.6,scaleX:0.4626,scaleY:0.4626,x:136.55,y:237.35},0).wait(4).to({x:134.95,y:228.2},0).wait(1).to({regX:64.7,regY:6.5,scaleX:0.61,scaleY:0.61,x:133.1,y:226.2},0).wait(123).to({x:136.6,y:219.05},0).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(5).to({_off:false},0).to({_off:true},2).wait(28).to({_off:false,regX:70.5,regY:17.1,scaleX:0.5191,scaleY:0.5191,x:134.95,y:235.75},0).to({_off:true},6).wait(40).to({_off:false,scaleX:0.5396,scaleY:0.5396,x:133.9,y:237.15},0).to({_off:true},6).wait(40).to({_off:false,scaleX:0.4326,scaleY:0.4326,x:132.65,y:232.95},0).wait(6).to({x:134.8,y:229.15},0).to({_off:true},1).wait(129));
	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(7).to({_off:false},0).to({_off:true},1).wait(6).to({_off:false,scaleX:0.494,scaleY:0.494,x:131.85,y:235.3},0).to({_off:true},1).wait(14).to({_off:false,scaleX:0.5723,scaleY:0.5723,x:135,y:235.05},0).to({_off:true},3).wait(13).to({_off:false,regX:57.7,scaleX:0.5545,scaleY:0.5545,x:134.45,y:228.9},0).to({_off:true},1).wait(45).to({_off:false,regX:57.8,scaleX:0.4217,scaleY:0.4217,x:135.35,y:233.1},0).to({_off:true},8).wait(16).to({_off:false,scaleX:0.4759,scaleY:0.4759,x:132.9,y:235.65},0).to({_off:true},5).wait(143));
	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(8).to({_off:false},0).to({_off:true},3).wait(2).to({_off:false,scaleX:0.4678,scaleY:0.4678,x:132,y:238.2},0).to({_off:true},1).wait(1).to({_off:false,scaleX:0.5592,scaleY:0.5592,x:134.15,y:238.3},0).wait(5).to({scaleX:0.6372,scaleY:0.6372,x:134.9,y:232.3},0).wait(5).to({regX:68.6,regY:11.1,scaleX:0.4649,scaleY:0.1405,x:131.85,y:233.4},0).to({_off:true},4).wait(3).to({_off:false,regX:68.4,regY:10.8,scaleX:0.5442,scaleY:0.5442,x:135.8,y:233.3},0).to({_off:true},3).wait(6).to({_off:false,scaleX:0.5674,scaleY:0.5674,x:134.1,y:233.2},0).to({_off:true},4).wait(1).to({_off:false,regX:68.5,scaleX:0.5581,scaleY:0.5581,x:133.65,y:235.4},0).to({_off:true},3).wait(24).to({_off:false,regX:68.4,regY:10.7,scaleX:0.5179,scaleY:0.5179,x:133.2,y:237.9},0).to({_off:true},8).wait(6).to({_off:false,regY:10.8,scaleX:0.5142,scaleY:0.5142,x:134.1,y:232.45},0).to({_off:true},4).wait(29).to({_off:false,scaleX:0.5535,scaleY:0.5535,x:131.7,y:233.35},0).wait(6).to({x:133.75,y:229.25},0).to({_off:true},1).wait(136));

	// maui
	this.instance_5 = new lib.CachedBmp_1();
	this.instance_5.setTransform(-19.45,101.3,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(263));

	// BG
	this.instance_6 = new lib.pexelsmariaisabellabernotti1049298();
	this.instance_6.setTransform(-131,-75,0.2203,0.2203);

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(263));

	// trace_idn
	this.instance_7 = new lib.Bitmap4();
	this.instance_7.setTransform(0,81,2.4865,2.4865);

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(263));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(349,245,845.4000000000001,561.3);
// library properties:
lib.properties = {
	id: 'BD0B3E3C4787403EAC00D1140574097A',
	width: 960,
	height: 640,
	fps: 24,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [
		{src:"images/pexelsmariaisabellabernotti1049298.jpg", id:"pexelsmariaisabellabernotti1049298"},
		{src:"images/myphrase_atlas_1.png", id:"myphrase_atlas_1"},
		{src:"sounds/dwayneyourwelcomewav.mp3", id:"dwayneyourwelcomewav"}
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
an.compositions['BD0B3E3C4787403EAC00D1140574097A'] = {
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