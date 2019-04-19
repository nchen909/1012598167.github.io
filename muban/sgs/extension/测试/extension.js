game.import("extension",function(lib,game,ui,get,ai,_status){return {name:"测试",content:function (config,pack){
    
},precontent:function (){
    
},config:{},help:{},package:{
    character:{
        character:{
            "无名氏":["male","wei",4,["翻面","菊花"],["des:测试"]],
        },
        translate:{
            "无名氏":"无名氏",
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
            "翻面":{
                group:"jushou",//拥有技能据守
                audio:"yanzheng",
                trigger:{
                    target:"useCardToBefore",
                },
				check:function (event,player){
        return get.effect(event.target,event.card,event.player,player)<0;
    										},
                forced:true,
                filter:function (event,player){
        if(!event.target) return false;//不是目标取消发动
        if(event.player==player&&event.target==player) return false;//不能自己对自己用
        return event.card&&event.card.name=='guohe'&&player.classList.contains('turnedover');
    },
                priority:100,
				
                content:function (){
					        
        trigger.untrigger();
        trigger.finish();
    },
	    ai:{
        effect:{
            target:function (card,player,target,current){
                if(card.name=='guohe'&&player.classList.contains('turnedover')) return 'zeroplayertarget';
            },},},
                mod:{
                    globalTo:function (from,to,current){
            if(from.classList.contains('turnedover')) return current+1;
        												},
                    },
            },
            "菊花":{
            },
        },
        translate:{
            "翻面":"翻面",
            "翻面_info":"你拥有国战曹仁【据守】，翻面防御距离+1,翻面不可被过河拆桥。",
            "菊花":"菊花",
            "菊花_info":"没装备视为装备古锭刀。",
        },
    },
    intro:"",
    author:"无名玩家",
    diskURL:"",
    forumURL:"",
    version:"1.0",
},files:{"character":["无名氏.jpg"],"card":[],"skill":[]}}})