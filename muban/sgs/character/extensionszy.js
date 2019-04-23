'use strict';
game.import("character",function(lib,game,ui,get,ai,_status){
    return {
        name:"新神周瑜",
        character:{
            "xin_shenzhouyu":["male","shen",4,["xin_qinyin","xin_yeyan"],[]],
        },
        characterIntro:{
            xin_shenzhouyu:'mathskiller改版 改了内核',
         },
    card:{
        card:{
        },
        translate:{
        },
        list:[],
    },

        skill:{
            "xin_qinyin":{
                audio:["qinyin",2],
                trigger:{
                    player:"phaseDiscardEnd",
                },
                direct:true,
                filter:function (event,player){
        return event.cards&&event.cards.length>1
    },
                content:function (){
        "step 0"
        //if(typeof event.count!='number'){
            // event.count=trigger.cards.length-1;
        //    event.count=1;
        //}
        var recover=0,lose=0,players=game.filterPlayer();
        for(var i=0;i<players.length;i++){
            if(players[i].hp<players[i].maxHp){
                if(get.attitude(player,players[i])>0){
                    if(players[i].hp<2){
                        lose--;
                        recover+=0.5;
                    }
                    lose--;
                    recover++;
                }
                else if(get.attitude(player,players[i])<0){
                    if(players[i].hp<2){
                        lose++;
                        recover-=0.5;
                    }
                    lose++;
                    recover--;
                }
            }
            else{
                if(get.attitude(player,players[i])>0){
                    lose--;
                }
                else if(get.attitude(player,players[i])<0){
                    lose++;
                }
            }
        }
        var prompt=get.prompt('xin_qinyin')+'（剩余'+get.cnNumber(event.count)+'次）';
        player.chooseControl('失去体力','回复体力','cancel2',
        ui.create.dialog(get.prompt('xin_qinyin'),'hidden')).ai=function(){//dialog就是显示提示
            if(lose>recover&&lose>0) return 0;
            if(lose<recover&&recover>0) return 1;
            return 2;
        }
        "step 1"
        if(result.control=='cancel2'){
            event.finish();
        }
        else{
            player.logSkill('qinyin');
            event.bool=(result.control=='回复体力');
            event.num=0;
            event.players=game.players;//filterPlayer();
        }
        "step 2"
        if(event.num<event.players.length){
            var target=event.players[event.num];
            if(event.bool){
                target.recover();
            }
            else{
                target.loseHp();
            }
            //player.draw();
            event.num++;
            event.redo();
        }
        "step 3"
        //if(event.count>1){
        //    event.count--;
        //    event.goto(0);
        //}
        player.draw(2);
    },
                ai:{
                    expose:0.1,
                    threaten:3,
                },
            },
            "xin_yeyan":{
                unique:true,
                enable:"phaseUse",
                audio:["yeyan",3],
                animationColor:"fire",
                skillAnimation:"legend",
                filterTarget:function (card,player,target){
        var length=ui.selected.cards.length;
        return (length==0||length==4);
    },
                filterCard:function (card){
        var suit=get.suit(card);
        for(var i=0;i<ui.selected.cards.length;i++){
            if(get.suit(ui.selected.cards[i])==suit) return false;
        }
        return true;
    },
                complexCard:true,
                limited:true,
                selectCard:[0,4],
                line:"fire",
                check:function (){
                var num=game.countPlayer(function(current){
                if(get.attitude(_status.event.player,current)<0){
                    return true;
                    }
                    });
                //console.log(player,'有',num,'个敌人');
                //console.log('is player.hp<=1 || num>=3?',player.hp<=1 || num>=3)
                return !(_status.event.player.hp<=1 || num>=3)},
                selectTarget:function (){
        if(ui.selected.cards.length==4) return 1;
        if(ui.selected.cards.length==0) return [1,3];
        game.uncheck('target');
        return [1,3];
                },
                content:function (){
        player.awakenSkill('xin_yeyan');
        player.storage.xin_yeyan=true;
        if(cards.length==4){
            player.loseHp(3);
            target.damage('fire',3,'nocard');
                }
        else{
            target.damage('fire','nocard');
            }
            },
                ai:{
                    order:1,
                    result:{
                        target:function (player,target){
if(target.hasSkillTag('nofire')) return 0;//如孙茹 技能中ai:{nofire:true,……}
if(lib.config.mode=='versus') return -1;//游戏模式 身份国战对决等 是对决所以直接发动就完事了
//if(player.hasUnknown()) return 0;//如果除自己外全场有猜则不发动 导致了ai只能等身份猜得齐全了才去业炎 //猜在少部分情况下可能是ai知道身份了还是显示猜
//console.log('从',target,'的角度看',player,'对',target,'造成火伤害的effect为',get.damageEffect(target,player,target,'fire'));
return get.damageEffect(target,player,target,'fire');//全场没猜了，按伤害效果选择对谁发动 从target的角度看player对target产生火伤害的效果
//return -get.damageEffect(target,player,target,'fire');自相残杀
                        },
                    },
                },
                mark:true,
                intro:{
                    content:"limited",
                },
                init:function (player){
        player.storage.xin_yeyan=false;
    },
            },
        },
        translate:{
            xin_shenzhouyu:'新神周瑜',
            xin_qinyin:"琴音",
            xin_qinyin_info:"弃牌阶段结束时，若你于此阶段内弃置过你的至少两张手牌，则你可以选择一项：1. 所有角色各回复1点体力；2. 所有角色各失去1点体力。结算后摸2张牌。",
            xin_yeyan:"业炎",
            xin_yeyan_info:"限定技，出牌阶段，你可以对一至三名角色造成至多共3点火焰伤害（你可以任意分配每名目标角色受到的伤害点数），若你将对一名角色分配2点或更多的火焰伤害，你须先弃置四张不同花色的手牌再失去3点体力。",
        },
    };
});