//主代码
game.import("extension",function(lib,game,ui,get,ai,_status){return {name:"曹操传",content:function (config,pack){
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
},precontent:function (){//启动代码
if(lib.extensionPack['曹操传']){
 lib.skill._ccz_职位系统={
        trigger:{ 
        global:"gameStart",
        player:"enterGame",
        },
        forced:true,
        priority:Infinity,
        content:function (){ 
        game.countPlayer(function(current){
            if(!current.hasSkill('ccz_MP')){
              current.addSkill('ccz_MP');
            }
        });
        if(player.name=='zhugeliang'){
        lib.characterTitle.zhugeliang='<span style="color:#FF00FF">咒术士</span>';//武将介绍的内容
        player.storage.ccz_咒术士=[];
        }
        if(player.name=='guojia'||player.name=='re_guojia'||player.name=='jiaxu'||player.name=='masu'||player.name=='sp_jiaxu'||player.name=='guotufengji'||player.name=='sp_zhangjiao'){
        lib.characterTitle.guojia='<span style="color:#FF00FF">道士</span>';
        lib.characterTitle.re_guojia='<span style="color:#FF00FF">道士</span>';
        lib.characterTitle.jiaxu='<span style="color:#FF00FF">道士</span>';
        lib.characterTitle.sp_jiaxu='<span style="color:#FF00FF">道士</span>';
        lib.characterTitle.masu='<span style="color:#FF00FF">道士</span>';
        lib.characterTitle.guotufengji='<span style="color:#FF00FF">道士</span>'; 
        lib.characterTitle.sp_zhangjiao='<span style="color:#FF00FF">道士</span>';
        player.storage.ccz_道士=[];
        }
        if(player.name=='caocao'||player.name=='re_caocao'||player.name=='liubei'||player.name=='re_liubei'||player.name=='sunquan'||player.name=='sunce'||player.name=='sunjian'||player.name=='yuanshao'||player.name=='re_gongsunzan'){
        lib.characterTitle.caocao='<span style="color:#FF00FF">群雄</span>';
        lib.characterTitle.re_caocao='<span style="color:#FF00FF">群雄</span>';
        lib.characterTitle.liubei='<span style="color:#FF00FF">群雄</span>';
        lib.characterTitle.re_liubei='<span style="color:#FF00FF">群雄</span>';
        lib.characterTitle.sunquan='<span style="color:#FF00FF">群雄</span>';
        lib.characterTitle.sunce='<span style="color:#FF00FF">群雄</span>';
        lib.characterTitle.sunjian='<span style="color:#FF00FF">群雄</span>';
        lib.characterTitle.yuanshao='<span style="color:#FF00FF">群雄</span>';
        lib.characterTitle.re_gongsunzan='<span style="color:#FF00FF">群雄</span>';
        player.storage.ccz_群雄=[];
        }
        if(player.name=='xunyou'||player.name=='manchong'||player.name=='jiangfei'){
        lib.characterTitle.xunyou='<span style="color:#FF00FF">风水士</span>';
        lib.characterTitle.manchong='<span style="color:#FF00FF">风水士</span>';
        lib.characterTitle.jiangfei='<span style="color:#FF00FF">风水士</span>';
        player.storage.ccz_风水士=[];
        }
        if(player.name=='xunyu'||player.name=='chengyu'||player.name=='jiangwei'||player.name=='lvmeng'||player.name=='lusu'){
        lib.characterTitle.xunyu='<span style="color:#FF00FF">策士</span>';
        lib.characterTitle.chengyu='<span style="color:#FF00FF">策士</span>';
        lib.characterTitle.jiangwei='<span style="color:#FF00FF">策士</span>';
        lib.characterTitle.lvmeng='<span style="color:#FF00FF">策士</span>';
        lib.characterTitle.lusu='<span style="color:#FF00FF">群雄</span>';
        player.storage.ccz_策士=[];
        }
        if(player.name=='xiahoudun'||player.name=='sp_xiahoudun'||player.name=='caoren'||player.name=='caozhang'||player.name=='guanyu'||player.name=='re_guanyu'||player.name=='sp_guanyu'||player.name=='zhangfei'||player.name=='re_zhangfei'||player.name=='dongzhuo'||player.name=='huanggai'||player.name=='re_huanggai'||player.name=='zhaoyun'||player.name=='re_zhaoyun'||player.name=='sp_zhaoyun'){
        lib.characterTitle.xiahoudun='<span style="color:#FF00FF">轻骑兵</span>';
        lib.characterTitle.sp_xiahoudun='<span style="color:#FF00FF">轻骑兵</span>';
        lib.characterTitle.caoren='<span style="color:#FF00FF">轻骑兵</span>';
        lib.characterTitle.caozhang='<span style="color:#FF00FF">轻骑兵</span>';
        lib.characterTitle.guanyu='<span style="color:#FF00FF">轻骑兵</span>';    
        lib.characterTitle.re_guanyu='<span style="color:#FF00FF">轻骑兵</span>';
        lib.characterTitle.sp_guanyu='<span style="color:#FF00FF">轻骑兵</span>';
        lib.characterTitle.zhangfei='<span style="color:#FF00FF">轻骑兵</span>';
        lib.characterTitle.re_zhangfei='<span style="color:#FF00FF">轻骑兵</span>';
        lib.characterTitle.huanggai='<span style="color:#FF00FF">轻骑兵</span>';
        lib.characterTitle.re_huanggai='<span style="color:#FF00FF">轻骑兵</span>';
        lib.characterTitle.dongzhuo='<span style="color:#FF00FF">轻骑兵</span>';
        lib.characterTitle.zhaoyun='<span style="color:#FF00FF">轻骑兵</span>';
        lib.characterTitle.re_zhaoyun='<span style="color:#FF00FF">轻骑兵</span>';
        lib.characterTitle.sp_zhaoyun='<span style="color:#FF00FF">轻骑兵</span>';
        player.storage.ccz_轻骑兵=[];
        }
        },
 }
        lib.skill._ccz_职位技能={
        trigger:{ 
        global:"gameStart",
        player:"enterGame",
        },
        forced:true,
        priority:1,
        content:function (){ 
            if(player.storage.ccz_咒术士){
                player.addSkill('ccz_小补给');
                player.addSkill('ccz_觉醒');
                player.addSkill('ccz_灼热');
                player.addSkill('ccz_旋风');
                player.addSkill('ccz_晕眩');
            }
            if(player.storage.ccz_群雄){
                player.addSkill('ccz_旋风');
            }
            if(player.storage.ccz_风水士){
                player.addSkill('ccz_小补给');
                player.addSkill('ccz_觉醒');
            }
            if(player.storage.ccz_策士){
                player.addSkill('ccz_灼热');
            }
            if(player.storage.ccz_道士){
                player.addSkill('ccz_毒烟');
            }
            if(player.storage.ccz_轻骑兵){
                player.addSkill('ccz_骑兵');
            }
        }
       }

       

}           
},help:{},config:{},package:{
    character:{
        character:{
        },
        translate:{
        },
    },
    card:{
        card:{
            "黄金铠":{
                type:"equip",
                subtype:"equip2",
                ai:{
                    basic:{
                        equipValue:7.5,
                        order:function (card,player){
                if(player&&player.hasSkillTag('reverseEquip')){
                    return 8.5-get.equipValue(card,player)/20;
                }
                else{
                    return 8+get.equipValue(card,player)/20;
                }
            },
                        useful:2,
                        value:function (card,player){
                var value=0;
                var info=get.info(card);
                var current=player.getEquip(info.subtype);
                if(current&&card!=current){
                    value=get.value(current,player);
                }
                var equipValue=info.ai.equipValue;
                if(equipValue==undefined){
                    equipValue=info.ai.basic.equipValue;
                }
                if(typeof equipValue=='function') return equipValue(card,player)-value;
                if(typeof equipValue!='number') equipValue=0;
                return equipValue-value;
            },
                    },
                    result:{
                        target:function (player,target){
                return get.equipResult(player,target,name);
            },
                    },
                },
                skills:["ccz_黄金铠"],
                enable:true,
                selectTarget:-1,
                filterTarget:function (card,player,target){
        return target==player;
    },
                modTarget:true,
                allowMultiple:false,
                content:function (){
        target.equip(card);
    },
                toself:true,
                fullskin:true,
            },
            "白银铠":{
                type:"equip",
                subtype:"equip2",
                ai:{
                    basic:{
                        equipValue:7.5,
                        order:function (card,player){
                if(player&&player.hasSkillTag('reverseEquip')){
                    return 8.5-get.equipValue(card,player)/20;
                }
                else{
                    return 8+get.equipValue(card,player)/20;
                }
            },
                        useful:2,
                        value:function (card,player){
                var value=0;
                var info=get.info(card);
                var current=player.getEquip(info.subtype);
                if(current&&card!=current){
                    value=get.value(current,player);
                }
                var equipValue=info.ai.equipValue;
                if(equipValue==undefined){
                    equipValue=info.ai.basic.equipValue;
                }
                if(typeof equipValue=='function') return equipValue(card,player)-value;
                if(typeof equipValue!='number') equipValue=0;
                return equipValue-value;
            },
                    },
                    result:{
                        target:function (player,target){
                return get.equipResult(player,target,name);
            },
                    },
                },
                skills:["ccz_白银铠"],
                enable:true,
                selectTarget:-1,
                filterTarget:function (card,player,target){
        return target==player;
    },
                modTarget:true,
                allowMultiple:false,
                content:function (){
        target.equip(card);
    },
                toself:true,
                fullimage:true,
            },
            "太平清领道":{
                type:"equip",
                subtype:"equip5",
                nomod:true,
                clearLose:true,
                equipDelay:false,
                loseDelay:false,
                skills:["ccz_太平清领道"],
                ai:{
                    equipValue:function (card){
            if(card.card) return 7+card.card.length;
            return 7;
        },
                    basic:{
                        equipValue:7,
                        order:function (card,player){
                if(player&&player.hasSkillTag('reverseEquip')){
                    return 8.5-get.equipValue(card,player)/20;
                }
                else{
                    return 8+get.equipValue(card,player)/20;
                }
            },
                        useful:2,
                        value:function (card,player){
                var value=0;
                var info=get.info(card);
                var current=player.getEquip(info.subtype);
                if(current&&card!=current){
                    value=get.value(current,player);
                }
                var equipValue=info.ai.equipValue;
                if(equipValue==undefined){
                    equipValue=info.ai.basic.equipValue;
                }
                if(typeof equipValue=='function') return equipValue(card,player)-value;
                if(typeof equipValue!='number') equipValue=0;
                return equipValue-value;
            },
                    },
                    result:{
                        target:function (player,target){
                return get.equipResult(player,target,name);
            },
                    },
                },
                enable:true,
                selectTarget:-1,
                filterTarget:function (card,player,target){
        return target==player;
    },
                modTarget:true,
                allowMultiple:false,
                content:function (){
        target.equip(card);
    },
                toself:true,
                fullimage:true,
            },
            "龙鳞铠":{
                fullskin:true,
                type:"equip",
                subtype:"equip2",
                skills:["ccz_龙鳞铠"],
                ai:{
                    basic:{
                        equipValue:7.5,
                        order:function (card,player){
                if(player&&player.hasSkillTag('reverseEquip')){
                    return 8.5-get.equipValue(card,player)/20;
                }
                else{
                    return 8+get.equipValue(card,player)/20;
                }
            },
                        useful:2,
                        value:function (card,player){
                var value=0;
                var info=get.info(card);
                var current=player.getEquip(info.subtype);
                if(current&&card!=current){
                    value=get.value(current,player);
                }
                var equipValue=info.ai.equipValue;
                if(equipValue==undefined){
                    equipValue=info.ai.basic.equipValue;
                }
                if(typeof equipValue=='function') return equipValue(card,player)-value;
                if(typeof equipValue!='number') equipValue=0;
                return equipValue-value;
            },
                    },
                    result:{
                        target:function (player,target){
                return get.equipResult(player,target,name);
            },
                    },
                },
                enable:true,
                selectTarget:-1,
                filterTarget:function (card,player,target){
        return target==player;
    },
                modTarget:true,
                allowMultiple:false,
                content:function (){
        target.equip(card);
    },
                toself:true,
            },
            "蛇矛":{
                fullskin:true,
                type:"equip",
                subtype:"equip1",
                distance:{
                    attackFrom:-2,
                },
                ai:{
                    equipValue:function (card,player){
            var num=2.5+player.countCards('h')/3;
            return Math.min(num,4);
        },
                    basic:{
                        equipValue:3.5,
                        order:function (card,player){
                if(player&&player.hasSkillTag('reverseEquip')){
                    return 8.5-get.equipValue(card,player)/20;
                }
                else{
                    return 8+get.equipValue(card,player)/20;
                }
            },
                        useful:2,
                        value:function (card,player){
                var value=0;
                var info=get.info(card);
                var current=player.getEquip(info.subtype);
                if(current&&card!=current){
                    value=get.value(current,player);
                }
                var equipValue=info.ai.equipValue;
                if(equipValue==undefined){
                    equipValue=info.ai.basic.equipValue;
                }
                if(typeof equipValue=='function') return equipValue(card,player)-value;
                if(typeof equipValue!='number') equipValue=0;
                return equipValue-value;
            },
                    },
                    result:{
                        target:function (player,target){
                return get.equipResult(player,target,name);
            },
                    },
                },
                skills:["ccz_丈八蛇矛"],
                enable:true,
                selectTarget:-1,
                filterTarget:function (card,player,target){
        return target==player;
    },
                modTarget:true,
                allowMultiple:false,
                content:function (){
        target.equip(card);
    },
                toself:true,
            },
            "白银盾":{
                fullskin:true,
                type:"equip",
                subtype:"equip5",
                cardnature:"fire",
                ai:{
                    equipValue:function (card,player){
            if(player.hasSkillTag('maixie')&&player.hp>1) return 0;
            if(player.hasSkillTag('noDirectDamage')) return 10;
            if(get.damageEffect(player,player,player,'fire')>=0) return 10;
            var num=3-game.countPlayer(function(current){
                return get.attitude(current,player)<0;
            });
            if(player.hp==1) num+=4;
            if(player.hp==2) num+=1;
            if(player.hp==3) num--;
            if(player.hp>3) num-=4;
            return num;
        },
                    basic:{
                        equipValue:3,
                        order:function (card,player){
                if(player&&player.hasSkillTag('reverseEquip')){
                    return 8.5-get.equipValue(card,player)/20;
                }
                else{
                    return 8+get.equipValue(card,player)/20;
                }
            },
                        useful:2,
                        value:function (card,player){
                var value=0;
                var info=get.info(card);
                var current=player.getEquip(info.subtype);
                if(current&&card!=current){
                    value=get.value(current,player);
                }
                var equipValue=info.ai.equipValue;
                if(equipValue==undefined){
                    equipValue=info.ai.basic.equipValue;
                }
                if(typeof equipValue=='function') return equipValue(card,player)-value;
                if(typeof equipValue!='number') equipValue=0;
                return equipValue-value;
            },
                    },
                    result:{
                        target:function (player,target){
                return get.equipResult(player,target,name);
            },
                    },
                },
                skills:["ccz_白银盾"],
                enable:true,
                selectTarget:-1,
                filterTarget:function (card,player,target){
        return target==player;
    },
                modTarget:true,
                allowMultiple:false,
                content:function (){
        target.equip(card);
    },
                toself:true,
            },
        },
        translate:{
            "黄金铠":"黄金铠",
            "黄金铠_info":"锁定技，你受到〖杀〗和〖决斗〗的伤害始终为1",
            "白银铠":"白银铠",
            "白银铠_info":"锁定技，你受到的属性伤害始终为1",
            "太平清领道":"太平清领道",
            "太平清领道_info":"锁定技，你不能成为延时锦囊的目标，每回合开始你清除异常状态",
            "龙鳞铠":"龙鳞铠",
            "龙鳞铠_info":"锁定技，当你受到伤害前，失去10点MP取消此伤害",
            "蛇矛":"蛇矛",
            "蛇矛_info":"当你使用【杀】指定一名角色为目标后，你使目标的下一家角色(其不为你的友方)也成为杀的目标",
            "白银盾":"白银盾",
            "白银盾_info":"锁定技，你有15%的几率免疫火属性和雷属性伤害",
        },
        list:[["club","7","白银铠"],["heart","1","白银盾"],["diamond","11","龙鳞铠"],["spade","11","蛇矛"],["club","5","黄金铠"]],
    },
    skill:{
        skill:{
            "ccz_黄金铠":{
                trigger:{
                    player:"damageBegin",
                },
                filter:function (event){
        return event.card&&(event.card.name=='sha'||event.card.name=='juedou');
    },
                forced:true,
                nobracket:true,
                priority:-500000000,
                content:function (){
         if(trigger.num>1){
         trigger.num=1
         }
          
        
    },
            },
            "ccz_太平清领道":{
                group:"ccz_太平清领道2",
                nobracket:true,
                mod:{
                    targetEnabled:function (card,player,target){
            if(get.type(card)=='delay'){
                return false;
            }
        },
                },
            },
            "ccz_白银铠":{
                trigger:{
                    player:"damageBegin",
                },
                forced:true,
                nobracket:true,
                content:function (){
         if(trigger.nature){
         trigger.num=1
         }
          
        
    },
            },
            "ccz_太平清领道2":{
                audio:"ext:曹操传:2",
                trigger:{
                    player:"phaseBefore",
                },
                forced:true,
                nobracket:true,
                content:function (){
        player.removeSkill('fengyin');
        player.unMad();
        player.removeSkill('ccz_毒');
        player.removeSkill('sc_晕眩2');
        player.discard(player.getCards('j'));   
        player.link(false);
        player.turnOver(false);  
    },
                ai:{
                    order:9,
                    threaten:2,
                },
            },
            "ccz_晕眩":{
                audio:"ext:曹操传:1",
                enable:"phaseUse",
                usable:1,
                filterTarget:function (card,player,target){
         if(player==target) return false;
         return get.distance(player,target)<=2;
    },
                filter:function (event,player){
        return player.storage.ccz_MP&&player.storage.ccz_MP>=15;
    },
                content:function (){
    player.storage.ccz_MP-=15;
    var rand=Math.random()+0.15*(player.hasSkill('ccz_七星剑')?1:0);
    if(rand<=0.70){
    target.die()._triggered=null;
    }
    else{target.popup('Miss');game.playXu('ccz_Miss');}   
    player.markSkill('ccz_MP');
    player.syncStorage('ccz_MP');
    },
                contentAfter:function (){
        var evt=_status.event.getParent('phase');     
        if(evt){
            _status.event=evt;
            game.resetSkills();
        }
    },
                ai:{
                    order:1,
                    result:{
                        target:function (player,target){                
                if(get.attitude(player,target)<0&&target.hp>0) return 1;
                return 0;
            },
                    },
                },
            },
            "ccz_白银盾":{
                trigger:{
                    player:"damageBegin",
                },
                forced:true,
                nobracket:true,
                filter:function (event){
    return (event.nature=='thunder'||event.nature=='fire');
    },
                content:function (){
         trigger.cancel();
         },
            },
            "ccz_丈八蛇矛":{
                audio:"ext:曹操传:2",
                group:"ccz_丈八蛇矛2",
                nobracket:true,
                trigger:{
                    player:"shaBegin",
                },
                filter:function (event,player){
        return !event.target.next.isFriendOf(player)&&!player.storage.ccz_丈八蛇矛;
    },
                content:function (){
      player.storage.ccz_丈八蛇矛=[];
      trigger.targets.push(trigger.target.next);
    },
            },
            "ccz_丈八蛇矛2":{
                trigger:{
                    player:"phaseUseBegin",
                },
                filter:function (event,player){
        return player.storage.ccz_丈八蛇矛;
    },
                content:function (){
      delete player.storage.ccz_丈八蛇矛;
    },
            },
            "ccz_龙鳞铠":{
                trigger:{
                    player:"damageBegin",
                },
                forced:true,
                nobracket:true,
                filter:function (event,player){return player.storage.ccz_MP&&player.storage.ccz_MP>=10;},
                content:function (){
         trigger.cancel();
         player.storage.ccz_MP-=10;
         player.markSkill('ccz_MP');
         player.syncStorage('ccz_MP');
         },
            },
            "ccz_灼热":{
                audio:"ext:曹操传:1",
                enable:"phaseUse",
                usable:1,
                filterTarget:function (card,player,target){
        if(player==target) return false;
        if(target.isFriendOf(player)) return false;
        if(player.storage.ccz_天气&&player.storage.ccz_天气>2) return false;
         return get.distance(player,target)<=3;
    },
                filter:function (event,player){
        return player.storage.ccz_MP&&player.storage.ccz_MP>=6;
    },
                selectTarget:1,
                content:function (){
    var rand=Math.random()+0.15*(player.hasSkill('ccz_七星剑')?1:0);
    if(rand<=0.70){
    target.damage('fire');
    }
    else{target.popup('Miss');game.playXu('ccz_Miss');}
        player.storage.ccz_MP-=6;
        player.markSkill('ccz_MP');
        player.syncStorage('ccz_MP');
    },
                contentAfter:function (){
        var evt=_status.event.getParent('phase');     
        if(evt){
            _status.event=evt;
            game.resetSkills();
        }
    },
                ai:{
                    order:1,
                    result:{
                        target:function (player,target){
                if(get.attitude(player,target)<=0) return 1;
                return 0;
            },
                    },
                },
            },
            "ccz_毒":{
                mark:true,
                marktext:"毒",
                forced:true,
                intro:{
                    content:"已中毒，回合开始阶段若体力值大于1，则你有60%几率失去一点体力，15%几率解除中毒状态",
                },
                trigger:{
                    player:"phaseBegin",
                },
                content:function (){
        'Step 0'
        if(Math.random()<=0.15){player.removeSkill('ccz_毒')}
        if(Math.random()<=0.60&&player.hp>1){
         player.loseHp();
        }
        
        
    },
            },
            "ccz_毒烟":{
                audio:"ext:曹操传:1",
                enable:"phaseUse",
                usable:1,
                filterTarget:function (card,player,target){
        if(player==target) return false;
        if(target.isFriendOf(player)) return false;
         return get.distance(player,target)<=3;
    },
                filter:function (event,player){
        return player.storage.ccz_MP&&player.storage.ccz_MP>=8;
    },
                selectTarget:1,
                content:function (){
    var rand=Math.random()+0.15*(player.hasSkill('ccz_七星剑')?1:0);
    if(rand<=0.70){
    target.addSkill('ccz_毒');
    }
    else{target.popup('Miss');game.playXu('ccz_Miss');}
    player.storage.ccz_MP-=8;
    player.markSkill('ccz_MP');
    player.syncStorage('ccz_MP');
    },
                contentAfter:function (){
        var evt=_status.event.getParent('phase');     
        if(evt){
            _status.event=evt;
            game.resetSkills();
        }
    },
                ai:{
                    order:1,
                    result:{
                        target:function (player,target){
                if(get.attitude(player,target)<=0) return 1;
                return 0;
            },
                    },
                },
            },
            "ccz_小补给":{
                audio:"ext:曹操传:2",
                enable:"phaseUse",
                usable:1,
                filterTarget:function (card,player,target){
        if(target.hp==target.maxHp) return false;
         return get.distance(player,target)<=3;
    },
                filter:function (event,player){
        return player.storage.ccz_MP&&player.storage.ccz_MP>=6;
    },
                nobracket:true,
                selectTarget:1,
                content:function (){
        target.recover();
        player.storage.ccz_MP-=6;
        player.markSkill('ccz_MP');
        player.syncStorage('ccz_MP');
      },
                contentAfter:function (){
        var evt=_status.event.getParent('phase');     
        if(evt){
            _status.event=evt;
            game.resetSkills();
        }
    },
                ai:{
                    order:1,
                    result:{
                        target:function (player,target){
                if(get.attitude(player,target)>3) return 1;
                return 0;
            },
                    },
                },
            },
            "ccz_觉醒":{
                audio:"ext:曹操传:2",
                enable:"phaseUse",
                usable:1,
                filterTarget:function (card,player,target){
        if(target.isFriendOf(player)) return false;
         return get.distance(player,target)<=3;
    },
                check:function (event,player,target){
        return (target.countCards('j')>0||target.hasSkill('ccz_毒'))&&get.attitude(player,target)>0;
    },
                filter:function (event,player){
        return player.storage.ccz_MP&&player.storage.ccz_MP>=6;
    },
                selectTarget:1,
                content:function (){
    target.discard(target.getCards('j')); 
    target.removeSkill('ccz_毒');
    target.unMad();
    player.storage.ccz_MP-=6;
    player.markSkill('ccz_MP');
    player.syncStorage('ccz_MP');
    },
                contentAfter:function (){
        var evt=_status.event.getParent('phase');     
        if(evt){
            _status.event=evt;
            game.resetSkills();
        }
    },
                ai:{
                    order:1,
                    result:{
                        target:function (player,target){
                if(get.attitude(player,target)>3) return 1;
                return 0;
            },
                    },
                },
            },
            "ccz_旋风":{
                audio:"ext:曹操传:1",
                enable:"phaseUse",
                usable:1,
                filterTarget:function (card,player,target){
        if(player==target) return false;
        if(target.isFriendOf(player)) return false;
         return get.distance(player,target)<=3;
    },
                filter:function (event,player){
        return player.storage.ccz_MP&&player.storage.ccz_MP>=8;
    },
                selectTarget:1,
                content:function (){
   var rand=Math.random()+0.15*(player.hasSkill('ccz_七星剑')?1:0);
    if(rand<=0.70){
    target.damage('nosource');
    }
    else{target.popup('Miss');game.playXu('ccz_Miss');}
        player.storage.ccz_MP-=8;
        player.markSkill('ccz_MP');
        player.syncStorage('ccz_MP');
       },
                contentAfter:function (){
        var evt=_status.event.getParent('phase');     
        if(evt){
            _status.event=evt;
            game.resetSkills();
        }
    },
                ai:{
                    order:1,
                    result:{
                        target:function (player,target){
                if(get.attitude(player,target)<=0) return 1;
                return 0;
            },
                    },
                },
            },
            "ccz_骑兵":{
                trigger:{
                    global:"damageBegin",
                },
                filter:function (event,player){
    if(player.storage.ccz_轻骑兵&&event.source==player&&event.player!=player&&event.card&&event.card.name=='sha'&&(event.player.storage.ccz_咒术士||event.player.storage.ccz_道士||event.player.storage.ccz_风水士||event.player.storage.ccz_策士)) return true;
    return false;
       },
                content:function (){
      trigger.num++;  
    },
            },
            "ccz_MP":{
                trigger:{
                    global:"gameStart",
                    player:"phaseBegin",
                },
                forced:true,
                locked:true,
                unique:true,
                priority:-1,
                init:function (player){
                  player.storage.ccz_MP=50;
                  player.markSkill('ccz_MP');
                  player.syncStorage('ccz_MP');
                  },
                content:function (){
                  player.markSkill('ccz_MP');
                  player.syncStorage('ccz_MP');
                  },
                marktext:"MP",
                intro:{
                    content:function (storage){
                          return '你拥有'+storage+'点MP';
                       },
                },
            },
        },
        translate:{
            "ccz_黄金铠":"黄金铠",
            "ccz_黄金铠_info":"锁定技，你受到〖杀〗和〖决斗〗的伤害始终为1",
            "ccz_太平清领道":"太平清领道",
            "ccz_太平清领道_info":"锁定技，你无法成为延时锦囊的目标",
            "ccz_白银铠":"白银铠",
            "ccz_白银铠_info":"锁定技，你受到的属性伤害始终为1",
            "ccz_太平清领道2":"太平清领道",
            "ccz_太平清领道2_info":"",
            "ccz_晕眩":"晕眩",
            "ccz_晕眩_info":"出牌阶段限一次，你可以指定与你距离小于等于2的一名敌方角色，若如此做，该角色有15%几率立即死亡。消耗15点MP。",
            "ccz_白银盾":"白银盾",
            "ccz_白银盾_info":"锁定技，你有15%的几率免疫火属性和雷属性伤害",
            "ccz_丈八蛇矛":"丈八蛇矛",
            "ccz_丈八蛇矛_info":"当你使用【杀】指定一名角色为目标后，你使目标的下一家角色(其不为你的友方)也成为杀的目标",
            "ccz_丈八蛇矛2":"丈八蛇矛",
            "ccz_丈八蛇矛2_info":"",
            "ccz_龙鳞铠":"龙鳞铠",
            "ccz_龙鳞铠_info":"锁定技，当你受到伤害前，失去10点MP取消此伤害",
            "ccz_灼热":"灼热",
            "ccz_灼热_info":"出牌阶段限一次(限晴天或阴天使用)，你可以对距离为3以内的一名敌方角色造成一点火焰伤害，消耗6点MP",
            "ccz_毒":"毒",
            "ccz_毒_info":"",
            "ccz_毒烟":"毒烟",
            "ccz_毒烟_info":"出牌阶段限一次，你可以指定一名与你距离小于等于3的敌方角色，使其中毒",
            "ccz_小补给":"小补给",
            "ccz_小补给_info":"出牌阶段限一次，你可以使距离与你小于等于3的角色回复一点体力，消耗6点MP",
            "ccz_觉醒":"觉醒",
            "ccz_觉醒_info":"出牌阶段限一次，你可以指定一名与你距离小于等于3的一名角色，使其清空判定区的牌，解除中毒和混乱",
            "ccz_旋风":"旋风",
            "ccz_旋风_info":"出牌阶段限一次，你指定一名与你距离小于等于3的敌方角色，其受到一点无伤害来源的伤害",
            "ccz_骑兵":"骑兵",
            "ccz_骑兵_info":"锁定技，骑兵类角色使用【杀】对咒术士，风水士，道士，策士类角色造成伤害+1",
            "ccz_MP":"MP",
            "ccz_MP_info":"",
        },
    },
    intro:"<li>使用本扩展的法术技能后结束回合，且攻击类法术命中率为70%<li>本扩展自带天气系统，部分技能与天气有关<li>本扩展主要与无名杀自带魏国势力武将有关，小部分与其他势力角色有关<li>本扩展自带装备",
    author:"冰波水微",
    diskURL:"",
    forumURL:"",
    version:"2.0",
},files:{"character":[],"card":["白银铠.jpg","黄金铠.png","太平清领道.jpg","龙鳞铠.png","蛇矛.png","白银盾.png"],"skill":[]}}})