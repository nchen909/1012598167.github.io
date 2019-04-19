game.import("extension",function(lib,game,ui,get,ai,_status){return {name:"天气尝试",content:function (config,pack){
    game.playXu = function(fn, dir, sex) {
   if (lib.config.background_speak) {
if (dir && sex)
		game.playAudio(dir, sex, fn);
	else if (dir)
		game.playAudio(dir, fn);
	else
		game.playAudio('..', 'extension', '曹操传', fn);
			}
		};
   lib.skill._ccz_战斗开始={
        trigger:{ 
        global:"gameStart",
        player:"enterGame",
        },
        forced:true,
        priority:Infinity,
     content:function (){
         game.playXu('ccz_战斗开始');
         game.playAudio('effect','damage');
         player.addSkill('ccz_MP');},
   },
   lib.skill._ccz_天气系统={
        trigger:{ 
        global:"gameStart",
        player:"phaseBegin",
        },
        forced:true,
        priority:Infinity,
     content:function (){
     game.countPlayer(function(current){
     current.addSkill('_ccz_天气'); 
     var n=['1','2','3','4'].randomGet();
     current.storage.ccz_天气=n;
     if(current==player){
     if(trigger.name=='phase'){
     if(current.storage.ccz_天气==1) { current.$fullscreenpop('天气为晴','thunder'); game.playXu('ccz_天气系统1');game.log('天气为晴'); }
     if(current.storage.ccz_天气==2) { current.$fullscreenpop('天气为阴','fire'); game.playXu('ccz_天气系统2');game.log('天气为阴'); }
     if(current.storage.ccz_天气==3) { current.$fullscreenpop('天气为雨','thunder'); game.playXu('ccz_天气系统3'); game.log('天气为雨');}
     if(current.storage.ccz_天气==4) { current.$fullscreenpop('天气为雪','fire'); game.playXu('ccz_天气系统4');game.log('天气为雪');}
         }
         }
         });
        
         },
   },
       
		  lib.skill._ccz_天气={
                		trigger:{global:"phaseEnd"},
                		forced:true,                        
                  locked:true,     
                  unique:true,            
                  priority:-1,
                  init:function (player){
                  player.storage.ccz_天气=0;
                  },
                 content:function (){
                     player.storage.ccz_天气=0;
                  },  
          }
},precontent:function (){
    
},help:{},config:{},package:{
    character:{
        character:{
        },
        translate:{
        },
    },
    card:{
        card:{
        },
        translate:{
        },
        list:[],
    },
    skill:{
        skill:{
        },
        translate:{
        },
    },
    intro:"",
    author:"mk",
    diskURL:"",
    forumURL:"",
    version:"1.0",
},files:{"character":[],"card":[],"skill":[]}}})