game.import('extension',{
    name:'示例-修改武将',
    content:function(config){
        // 执行到此处时技能还未载入，所以要等到arenaReady再修改
        lib.arenaReady.push(function(){
            lib.skill.fenyin.filter=function(event,player){
                if(!event.cards||event.cards.length!=1) return false;
                if(_status.currentPhase!=player) return false;
                if(!player.storage.fenyin) return false;
                return get.color(player.storage.fenyin)!=get.color(event.cards[0]);
            };
        });
    },
    help:{
        '修改武将':'<ul><li>去掉留赞奋音技能的发动次数限制'
    }
});
