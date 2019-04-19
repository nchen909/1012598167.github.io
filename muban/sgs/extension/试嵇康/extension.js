game.import("extension",function(lib,game,ui,get,ai,_status){return {name:"试嵇康",package:{
    character:{
        character:{
            "嵇康":["male","wei",3,["清弦","绝响"],["des:1"]],
        },
        translate:{
            "嵇康":"嵇康",
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
            "清弦":{
                group:["qingxian_jilie","qingxian_rouhe"],
                ai:{
                    threaten:0.8,
                    maixie:true,
                    "maixie_hp":true,
                    "maixie_defend":true,
                    effect:{
                        target:function (card,player,target){
                if(get.tag(card,'damage')){
                    if(target.hp>1&&target.hasFriend()) return 0.8;
                }
            },
                    },
                },
                subSkill:{
                    rouhe:{
                        trigger:{
                            player:"recoverEnd",
                        },
                        direct:true,
                        content:function (){
                'step 0'
                player.chooseTarget(get.prompt('qingxian'),function(card,player,target){
                    return target!=player;
                }).set('ai',function(target){
                    var att=get.attitude(_status.event.player,target);
                    if(target.isHealthy()&&att>0) return 0;
                    if(target.hp==1&&att!=0){
                        if(att>0) return 9;
                        else return 10;
                    }
                    else{
                        return Math.sqrt(Math.abs(att));
                    }
                }).set('prompt2','当你回复体力后，你可以令一名其他角色执行一项：失去1点体力，随机使用一张装备牌；回复1点体力，弃置一张装备牌。若其以此法使用或弃置的牌为梅花，你回复1点体力');
                'step 1'
                if(result.bool){
                    var target=result.targets[0];
                    player.logSkill('qingxian',target);
                    event.insert(lib.skill.qingxian.content_choose,{target:target,player:player});

                }
            },
                        sub:true,
                    },
                    jilie:{
                        trigger:{
                            player:"damageEnd",
                        },
                        filter:function (event,player){
                return event.source&&event.source.isIn()&&event.source!=player;
            },
                        check:function (event,player){
                if(get.attitude(player,event.source)>0&&event.source.isHealthy()){
                    return false;
                }
                return true;
            },
                        logTarget:"source",
                        "prompt2":"当你受到伤害后，你可以令伤害来源执行一项：失去1点体力，随机使用一张装备牌；回复1点体力，弃置一张装备牌。若其以此法使用或弃置的牌为梅花，你回复1点体力",
                        content:function (){
                event.insert(lib.skill.qingxian.content_choose,{target:trigger.source,player:player});
            },
                        sub:true,
                    },
                },
                "content_choose":function (){
        'step 0'
        var index;
        if(get.attitude(player,target)>0){
            if(target.isHealthy()){
                index=0;
            }
            else{
                index=1;
            }
        }
        else{
            if(target.isHealthy()&&target.countCards('e')){
                index=1;
            }
            else{
                index=0;
            }
        }
        player.chooseControlList(
            ['令'+get.translation(target)+'失去1点体力，随机使用一张装备牌',
            '令'+get.translation(target)+'回复1点体力，弃置一张装备牌'],
            true,function(event,player){
            return _status.event.index;
        }).set('index',index);
        'step 1'
        if(result.index==0){
            target.loseHp();
            event.card=get.cardPile(function(card){
                return get.type(card)=='equip';
            });
            if(event.card){
                target.equip(event.card,true).set('delay',true);
                event.goto(3);
            }
            else{
                event.finish();
            }
        }
        else{
            target.recover();
            if(target.countCards('he',{type:'equip'})){
                target.chooseToDiscard('he',true,'弃置一张装备牌',function(card){
                    return get.type(card)=='equip';
                }).set('ai',function(card){
                    var val=-get.value(card);
                    if(get.suit(card)=='club'){
                        val+=_status.event.att*10;
                    }
                    return val;
                }).set('att',get.sgnAttitude(target,player));
            }
            else{
                event.finish();
            }
        }
        'step 2'
        if(result&&result.cards){
            event.card=result.cards[0];
        }
        'step 3'
        if(event.card&&get.suit(event.card)=='club'){
            player.recover();
        }
    },
            },
            "绝响":{
                trigger:{
                    player:"dieBegin",
                },
                direct:true,
                skillAnimation:true,
                animationColor:"thunder",
                content:function (){
        'step 0'
        player.chooseTarget(get.prompt('juexiang'),function(card,player,target){
            return target!=player;
        }).set('ai',function(target){
            return get.attitude(_status.event.player,target)/Math.sqrt(target.hp+1);
        });
        'step 1'
        if(result.bool){
            var target=result.targets[0]
            player.logSkill('juexiang',target);
            target.addSkill(lib.skill.juexiang.derivation.randomGet());
            target.addTempSkill('juexiang_club',{player:'phaseBegin'});
        }
    },
                derivation:["juexiang_ji","juexiang_lie","juexiang_rou","juexiang_he"],
                subSkill:{
                    ji:{
                        mark:true,
                        nopop:true,
                        intro:{
                            content:"info",
                        },
                        trigger:{
                            player:"damageEnd",
                        },
                        filter:function (event,player){
                return event.source&&event.source.isIn()&&event.source!=player;
            },
                        check:function (event,player){
                return get.attitude(player,event.source)<0;
            },
                        logTarget:"source",
                        content:function (){
                trigger.source.loseHp();
                var card=get.cardPile(function(card){
                    return get.type(card)=='equip';
                });
                if(card){
                    trigger.source.equip(card,true).set('delay',true);
                }
            },
                        ai:{
                            "maixie_defend":true,
                        },
                        sub:true,
                    },
                    lie:{
                        mark:true,
                        nopop:true,
                        intro:{
                            content:"info",
                        },
                        trigger:{
                            player:"recoverEnd",
                        },
                        direct:true,
                        content:function (){
                'step 0'
                player.chooseTarget(get.prompt2('juexiang_lie'),function(card,player,target){
                    return target!=player;
                }).set('ai',function(target){
                    return -get.attitude(player,target)/(1+target.hp);
                });
                'step 1'
                if(result.bool){
                    var target=result.targets[0];
                    player.logSkill('juexiang_lie',target);
                    target.loseHp();
                    var card=get.cardPile(function(card){
                        return get.type(card)=='equip';
                    });
                    if(card){
                        target.equip(card,true).set('delay',true);
                    }
                }
            },
                        sub:true,
                    },
                    rou:{
                        mark:true,
                        nopop:true,
                        intro:{
                            content:"info",
                        },
                        trigger:{
                            player:"damageEnd",
                        },
                        filter:function (event,player){
                return event.source&&event.source.isIn()&&event.source!=player;
            },
                        check:function (event,player){
                var att=get.attitude(player,event.source);
                if(player.isHealthy()){
                    return att<0;
                }
                else{
                    return att>0
                }
            },
                        logTarget:"source",
                        content:function (){
                trigger.source.recover();
                if(trigger.source.countCards('he',{type:'equip'})){
                    trigger.source.chooseToDiscard('he',true,'弃置一张装备牌',function(card){
                        return get.type(card)=='equip';
                    });
                }
            },
                        ai:{
                            "maixie_defend":true,
                        },
                        sub:true,
                    },
                    he:{
                        mark:true,
                        nopop:true,
                        intro:{
                            content:"info",
                        },
                        trigger:{
                            player:"recoverEnd",
                        },
                        direct:true,
                        content:function (){
                'step 0'
                player.chooseTarget(get.prompt2('juexiang_he'),function(card,player,target){
                    return target!=player;
                }).set('ai',function(target){
                    var att=get.attitude(_status.event.player,target);
                    if(target.isHealthy()&&target.countCards('he')){
                        return -att;
                    }
                    else{
                        return 10*att/(1+target.hp);
                    }
                });
                'step 1'
                if(result.bool){
                    var target=result.targets[0];
                    player.logSkill('juexiang_he',target);
                    target.recover();
                    if(target.countCards('he',{type:'equip'})){
                        target.chooseToDiscard('he',true,'弃置一张装备牌',function(card){
                            return get.type(card)=='equip';
                        });
                    }
                }
            },
                        sub:true,
                    },
                    club:{
                        mark:true,
                        nopop:true,
                        intro:{
                            content:"info",
                        },
                        mod:{
                            targetEnabled:function (card,player,target){
                    if(get.suit(card)=='club'&&player!=target){
                        return false;
                    }
                },
                        },
                        sub:true,
                    },
                },
            },
        },
        translate:{
            "清弦":"清弦",
            "清弦_info":"当你受到伤害/回复体力后，你可以令伤害来源/一名其他角色执行一项：失去1点体力，随机使用一张装备牌；回复1点体力，弃置一张装备牌。若其以此法使用或弃置的牌为梅花，你回复1点体力",
            "绝响":"绝响",
            "绝响_info":"当你死亡后，你可以令一名角色随机获得“清弦残谱”其中一个技能，然后直到其下回合开始，其不能被选择为其他角色使用梅花牌的目标",
        },
    },
    intro:"",
    author:"无名玩家",
    diskURL:"",
    forumURL:"",
    version:"1.0",
},files:{"character":["嵇康.jpg"],"card":[],"skill":[]}}})