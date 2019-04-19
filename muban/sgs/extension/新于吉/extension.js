game.import("extension",function(lib,game,ui,get,ai,_status){return {name:"新于吉",content:function (config,pack){
    
},precontent:function (){
    
},help:{},config:{},package:{
    character:{
        character:{
            "新于吉":["male","qun",3,["骰子"],["des:骰子之王"]],
        },
        translate:{
            "新于吉":"新于吉",
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
            "骰子":{
                audio:"guhuo",
                trigger:{
                    global:["damageBegin","recoverBegin"],
                },
                filter:function (event,player){
        return event.player!=player;
    },
                check:function (event,player){
        if(event.player.ai.shown==0) return 0;
        if(event.name=='recover') return event.player.hp!=event.player.maxHp-1;
        var tao=player.getCards('h','tao');
        if(player.hp==1) return tao.length;
        return player.hp>1;
    },
                content:function (){
    "step 0"
    player.throwDice();
    event.num1=event.num
    "step 1"
    event.player.throwDice();
    event.num2=event.num
    "step 2"
    if(event.num1<event.num2){
        player.loseHp();
        event.finish();
    }
    "step 3"
    player.chooseControl('数值增加','数值减少','取消',function(){
    var player=_status.event.player;
    if(get.attitude(player,trigger.player)>0&&trigger.name!='damage'){
    return '数值增加';
    }
    if(get.attitude(player,trigger.player)<=0&&trigger.name=='damage'){
    return '数值增加';
    }   
if(event.num1==event.num2){
    return '取消';
    }
    return '数值减少';
    }).set('prompt','选择其该阶段所执行的数值增加或减少');
    "step 4"
    if(result.control=='数值增加'){ 
     trigger.num+=(event.num1-event.num2)
    }
    if(result.control=='数值减少'){  
    trigger.num-=(event.num1-event.num2);
    if(trigger.num<=0){trigger.num=0};
    }
    if(result.control=='取消'){ 
    player.draw();
    }
    },
                ai:{
                    expose:0.3,
                },
            },
        },
        translate:{
            "骰子":"骰子",
            "骰子_info":"投了就知道",
        },
    },
    intro:"",
    author:"无名玩家",
    diskURL:"",
    forumURL:"",
    version:"1.0",
},files:{"character":["新于吉.jpg"],"card":[],"skill":[]}}})