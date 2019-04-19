game.import("extension",function(lib,game,ui,get,ai,_status){return {name:"军争包加强版",content:function (config,pack){
    
},precontent:function (){
    lib.element.player.dying1=function(){
    
					if(this.isDying()||this.hp>0){
						event.finish();
				    return;
					}
					_status.dying.unshift(this);
					game.broadcast(function(list){
						_status.dying=list;
					},_status.dying);
					event.trigger('dying1');
					game.log(this,'濒死')
					"step 1"
					_status.dying.remove(this);
					game.broadcast(function(list){
						_status.dying=list;
					},_status.dying);
					if(this.hp<=0&&!this.nodying) this.die1(event.reason);
    },  
   lib.element.player.die1=function(){	
        if(this.hp<=0){
        	if(_status.roundStart==this){
                game.log(this,'阵亡');
						_status.roundStart=this.next||this.getNext()||game.players[0];
					}
      
     if(this.countCards('he')){
	var jian=this.getCards('he');
	if(jian.length){
	this.discard(jian).triggered=null;
	}
	}
						game.log(this,'弃置了所有卡牌');
					
                    				for(var i in this.tempSkills){
						this.removeSkill(i);
					}
					var skills=this.getSkills();
					for(var i=0;i<skills.length;i++){
						if(lib.skill[skills[i]].temp){
							this.removeSkill(skills[i]);
						}
					}
                    this.removeEquipTrigger();
					// for(var i in lib.skill.globalmap){
					//     if(lib.skill.globalmap[i].contains(this)){
					//         lib.skill.globalmap[i].remove(this);
					//         if(lib.skill.globalmap[i].length==0&&!lib.skill[i].globalFixed){
					//             game.removeGlobalSkill(i);
					//         }
					//     }
					// }
        
						this.classList.add('dead');
						// this.classList.remove('linked');
						this.classList.remove('turnedover');
						this.classList.remove('out');
						this.node.count.innerHTML='0';
						this.node.hp.hide();
						this.node.equips.hide();
						this.node.count.hide();
						this.previous.next=this.next;
						this.next.previous=this.previous;
						game.players.remove(this);
						game.dead.push(this);
						_status.dying.remove(this);
                         this.$die();       
        			if(lib.config.background_speak){
							if(lib.character[this.name]&&lib.character[this.name][4].contains('die_audio')){
								game.playAudio('die',this.name);
							}
							// else if(true){
							else{
								game.playAudio('die',this.name,function(){
									game.playAudio('die',this.name.slice(this.name.indexOf('_')+1));
								});
							}
						}
        }        
    }, 
     lib.skill._jz_增强={
     trigger:{
     player:"enterGame",
     global:["gameStart","useSkillBegin"],
     },
     forced:true,
     priority:Infinity,
     content:function (){
       if(player.name=='shen_guanyu'){player.addSkill('jz_武魂2');player.addSkill('jz_武魂');player.removeSkill('wuhun');}
       if(player.name=='caopi'||player.name=='jz_魏文帝'){player.addSkill('jz_隐忍');}       
     },
    },
   lib.skill._jz_防即死={
     trigger:{
     global:["dieBegin"],
     },
     forced:true,
     priority:Infinity,
     content:function (){       
       if(trigger.player.hp>0&&trigger.player.maxHp>0){
           trigger.cancel();
           trigger.player.die=function(all){};
           }                                             
     },
    },
   lib.skill._jz_防神座={
     trigger:{
        global:["gameStart","phaseBegin","useSkillBegin"],
    },
    forced:true,
    priority:Infinity,
    content:function (){
        if(game.hasPlayer(function(current){
            return current.name=='zuozhe神座'||current.name=='神座sagiri'||current.name=='◎sagiri'||current.name=='神座';
        })){
    if(player.name=='zuozhe神座'||player.name=='神座sagiri'||player.name=='◎sagiri'||player.name=='神座'){player.hp=0;player.die()._triggered = null;}
          }
    },
   }
   if(lib.extensionPack['军争包加强版']){
     lib.skill._jz_赵襄={
    trigger:{
        player:["dieBegin"],
    },
    forced:true,
    unique:true,
    noLose:true,
    noDeprive:true,
    locked:true,
    noRemove:true,
    noDisable:true,
    nobracket:true,
    noDisabled:true,
    content:function (){
    if(player.name=='jz_赵襄'&&!player.hasSkill('jz_隐退')){
       player.classList.add('dead')  
        var identity2=game.me.identity
        game.removePlayer(trigger.player)
        if(get.mode()=='identity'){
        if(_status.brawl&&_status.brawl.checkResult){
                    _status.brawl.checkResult();
                    return;
                }
                if(!game.zhu){
                    if(get.population('fan')==0){
                        switch(identity2){
                            case 'fan':game.over(false);break;
                            case 'zhong':game.over(true);break;
                            default:game.over();break;
                        }
                    }
                    else if(get.population('zhong')==0){
                        switch(identity2){
                            case 'fan':game.over(true);break;
                            case 'zhong':game.over(false);break;
                            default:game.over();break;
                        }
                    }
                    return;
                }
        if(game.zhu.isAlive()&&get.population('fan')+get.population('nei')>0) return;
                if(game.zhong){
                    game.zhong.identity='zhong';
                }
                game.showIdentity();
                if(identity2=='zhu'||identity2=='zhong'){
                    if(game.zhu.classList.contains('dead')){
                        game.over(false);
                    }
                    else{
                        game.over(true);
                    }
                }
                else if(identity2=='nei'){
                    if(game.players.length==1&&game.me.isAlive()){
                        game.over(true);
                    }
                    else{
                        game.over(false);
                    }
                }
                else{
                    if((get.population('fan')+get.population('zhong')>0||get.population('nei')>1)&&
                        game.zhu.classList.contains('dead')){game.over(true);
                    }
                    else{
                        game.over(false);
                    }
                }
    }
   }
   },
   },   
   lib.skill._jz_zuozhe={ 
       trigger:{
        global:["gameStart","phaseBegin"],
        player:"enterGame",
    },
    direct:true,
    silent:true,
    forced:true,
    popup:false,
    priority:Infinity,
    content:function (){
    'step 0'
    if(player.name=='jz_透心凉。'){
    player.addSkill('jz_回天');
    player.addSkill('jz_玲珑');
    if(!player.hasSkill('jz_芊芊4')){
        player.addTempSkill('jz_芊芊',{player:'dieEnd'})
        player.addTempSkill('jz_芊芊4',{player:'dieEnd'});
        player.addTempSkill('jz_无言',{player:'dieEnd'});
        player.addTempSkill('jz_回天',{player:'dieEnd'});
        player.addTempSkill('jz_玲珑',{player:'dieEnd'});
    }
     }
    'step 1'
    if(player.name=='jz_透心凉。'){
    player.recover(player.maxHp-player.hp)._triggered=null;
    player.popup('回天');
    player.update();
    }
    'step 2'
    if(player.name=='jz_透心凉。'){
    player.init=function (all){};
    player.uninit=function (all){};
    player.reinit=function (all){};
    player.clearSkills=function (all){};
    player.turnOver=function (all){};
    player.getDebuff=function (all){};
    player.moveDelete=function (all){};
    player.remove=function (all){};
    player.delete=function (all){};
    player.disappearSkill=function (all){};
    player.disableSkill=function (all){};
    player.out=function (all){};
    player.skip=function (all){};
    player.link=function (all){};
    player.goMad=function (all){};
    }
    'Step 3'
    if(!player.storage['jz_zuozhe']&&player.name=='jz_透心凉。'){
    Object.defineProperty(player,'clearSkills',{
	get:function () {
	return ['player'];
	},                            
	});
    Object.defineProperty(player,'name',{
	get:function () {
	return ['jz_透心凉。'];
	},                            
	});
    player.storage['jz_zuozhe']=true;
	}
    },
    },
    lib.skill._jz_zuozhe2={
     trigger:{
        player:["damageBefore","loseHpBefore","dying"],
    },
    forced:true,
    priority:Infinity,
    content:function (){
        if(player.name=='jz_透心凉。'){
        player.recover(2);
        player.gainMaxHp();
        player.popup('回天');
        }
    },
   }
   } 
   },help:{},config:{"jinyong":{"name":"将此扩展武将禁用","init":false}},package:{
    character:{
        character:{
            "jz_透心凉。":["female","shen",3,["jz_芊芊4","jz_芊芊5"],["zhu","des:作者"]],
            "jz_吕子明":["male","wu",4,["keji","tanhu","jz_谋断","jz_计取"],["des:吕蒙（179年—220年），字子明，东汉末年名将，汝南富陂人（今安徽阜南吕家岗）吕蒙发愤勤学的事迹，成为了中国古代将领勤补拙、笃志力学的代表，与其有关的成语有“士别三日”、“刮目相待”、“吴下阿蒙”等。"]],
            "jz_神邓艾":["male","shen",6,["boss_shenyi","zquanji","jz_屯田2","jz_资粮","jz_争功","zaoxian"],["boss","bossallowed","des:邓艾（约197年－264年），字士载，义阳棘阳（今河南新野）人。三国时期魏国杰出的军事家、将领。其人文武全才，深谙兵法，对内政也颇有建树。本名邓范，后因与同乡人同名而改名。邓艾多年在曹魏西边战线防备蜀汉姜维。"]],
            "jz_神曹操":["male","shen",5,["boss_shenyi","hujia","guixin","xiongcai","jz_飞影","jz_魏武"],["boss","bossallowed","des:曹操（155年－220年3月15日[1]），字孟德，一名吉利，小字阿瞒，沛国谯县（今安徽亳州）人。东汉末年杰出的政治家、军事家、文学家、书法家[2]，三国中曹魏政权的奠基人。"]],
            "jz_神司马懿":["male","shen",5,["boss_shenyi","lianpo","jz_恶助","jz_夺权","jz_忍戒","jz_拜印"],["boss","bossallowed","des:司马懿（179年—251年9月7日[1]），字仲达，河内郡温县孝敬里（今河南省焦作市温县）人。三国时期魏国政治家、军事谋略家，魏国权臣，西晋王朝的奠基人。"]],
            "jz_李曼成":["male","wei",4,["jz_博观","jz_屯兵","wangxi","jz_治军"],["des:李典（生卒年不详），字曼成，东汉末年名将。山阳郡钜野县（今山东巨野）人。李典深明大义，不与人争功，崇尚学习，尊敬儒雅，尊重博学之士，在军中被称为长者。李典有长者之风，官至破虏将军，三十六岁时去世。魏文帝曹丕继位后追谥号为愍侯。"]],
            "jz_监军谋国":["male","qun",3,["jz_渐营","jz_念主","jz_拒降"],["boss","forbidai","bossallowed","des:沮授（？－200年），广平人，东汉末年袁绍帐下谋士。史载他“少有大志，擅于谋略”。曾为冀州别驾，举茂才，并当过两次县令。后来又当韩馥别驾，被韩馥表为骑都尉。袁绍占据冀州后任用沮授为从事。经常对袁绍提出良策，但很多时候袁绍并不听从。官渡之战时袁绍大败，沮授未及逃走，被曹操所获，因拒降被曹操处死。"]],
            "jz_郭奉孝":["male","wei",3,["yiji","jz_天妒","jz_严法"],["des:郭嘉（170年－207年），字奉孝，颍川阳翟（今河南禹州）人。东汉末年曹操帐下著名谋士。  郭嘉原为袁绍部下，后转投曹操，为曹操统一中国北方立下了功勋，官至军师祭酒，封洧阳亭侯。在曹操征伐乌丸时病逝，年仅三十八岁。谥曰贞侯。"]],
            "jz_绝境之龙":["male","shu",4,["boss_shenyi","chixin","yicong","suiren","juejing","longhun","longdan","reyajiao","chongzhen"],["boss","bossallowed","des:赵云（？－229年），字子龙，常山真定（今河北省正定）人，三国时期蜀汉名将。 汉末军阀混战，赵云率领义从加入白马将军公孙瓒，期间结识汉室皇亲刘备，但不久之后，赵云因为兄长去世而离开。赵云离开公孙瓒大约七年后，在邺城与刘备相见，从此追随刘备。 赵云跟随刘备将近三十年，先后参加过博望坡之战、长坂坡之战、江南平定战，独自指挥过入川之战、汉水之战、箕谷之战，都取得了非常好的战果。除了四处征战，赵云还先后以偏将军任桂阳太守，以留营司马留守公安，以翊军将军督江州。除此之外，赵云于平定益州时引霍去病故事劝谏刘备将田宅归还百姓，又于关羽张飞被害之后劝谏刘备不要伐吴，被后世赞为有大臣局量的儒将，甚至被认为是三国时期的完美人物。 赵云去世后被追谥为“顺平候”，其“常胜将军”的形象被广为流传。"]],
            "jz_绝情人":["female","shen",4,["boss_shenyi","jz_绝情","jz_伤逝","jz_灭口"],["boss","bossallowed","des:宣穆皇后张春华（189年－247年），河内平皋（今河南温县）人，曹魏粟邑令张汪之女[1]，晋宣帝司马懿之妻，晋景帝司马师和晋文帝司马昭的母亲。"]],
            "jz_荀文若":["male","wei",3,["quhu","boss_qizuo","jz_节命"],["des:荀彧（xún yù）（163年－212年），字文若。颍川颍阴（今河南许昌）人。东汉末年著名政治家、战略家，曹操统一北方的首席谋臣和功臣。"]],
            "jz_关云长":["male","shu",4,["wusheng","yijue","jz_单骑"],["des:关羽（160－220年），本字长生，后改字云长，河东郡解县（今山西运城）人，东汉末年名将，早期跟随刘备辗转各地，曾被曹操生擒，于白马坡斩杀袁绍大将颜良，与张飞一同被称为万人敌。[1]  赤壁之战后，刘备助东吴周瑜攻打南郡曹仁，别遣关羽绝北道，阻挡曹操援军，曹仁退走后，关羽被刘备任命为襄阳太守。刘备入益州，关羽留守荆州。[1]  建安二十四年，关羽围襄樊，曹操派于禁前来增援，关羽擒获于禁，斩杀庞德，威震华夏，曹操曾想迁都以避其锐。后曹操派徐晃前来增援，东吴吕蒙又偷袭荆州，关羽腹背受敌，兵败被杀"]],
            "jz_司马仲达":["male","wei",3,["refankui","jz_鬼才","jz_破计"],["des:司马懿（179年—251年9月7日[1]），字仲达，河内郡温县孝敬里（今河南省焦作市温县）人。三国时期魏国政治家、军事谋略家，魏国权臣，西晋王朝的奠基人。"]],
            "jz_刘玄德":["male","shu",4,["rerende","qinwang","聚心"],["zhu","des:刘备（161年－223年6月10日），即汉昭烈帝（221年—223年在位），又称先主，字玄德，东汉末年幽州涿郡涿县（今河北省涿州市）人，西汉中山靖王刘胜之后，三国时期蜀汉开国皇帝、政治家。"]],
            "jz_周幼平":["male","wu",4,["js_不屈","jz_奋激"],["forbidai","des:周泰，字幼平，九江下蔡（今安徽凤台）人。三国时期吴国武将。孙策平定江东时与同郡蒋钦一起加入孙策军，随孙策左右，后孙权爱其为人，向孙策请求让周泰跟随自己。周泰多次于战乱当中保护孙权的安危，身上受的伤多达几十处，就像在皮肤上雕画一样，吴将朱然、徐盛等因此对其拜服。后来孙权为了表彰周泰为了东吴出生入死的功绩，而赐给他青罗伞盖。官至汉中太守、奋威将军，封陵阳侯。死于黄武中年，有子周邵，亦数有战功，死于黄龙二年，周邵的弟弟周承继承了兵权和爵位。"]],
            "jz_陆伯言":["male","wu",3,["qianxun","lianying","jz_远虑","jz_度势"],["des:三国时期吴国军事家。本名议，字伯言。吴郡吴县（今属江苏）人。世为江东大族，孙策婿。少孤，随叔父庐江太守陆康。汉献帝建安八年（203）从孙权，初为东西曹令史，出任海昌屯田都尉，兼管县事。天灾之年开仓济民，发展生产，深得民心。继募兵平会稽山越人之乱，渐有部曲2000余人。不久，任定威校尉。建议孙权大举平乱以稳定江东，得到赞许，任帐下右部督。随即率军攻丹阳（郡治今安徽宣州） 费栈等，乘夜潜入山，鼓噪而前，举获胜。并整顿会稽、丹阳等东三郡，选强壮者为兵，得精卒数万。后屯芜湖（个属安徽）。二十四年，蜀将关羽自江陵（今属湖北荆沙）北攻曹魏襄阳、樊城（今襄樊）之时，吕蒙自陆口（今嘉鱼陆溪口）称病回建业（今南京），陆逊识其为骄兵之计，被吕蒙荐任偏将军、右部督，驻陆口。威名未著的陆逊致书恭维关羽，使关羽不以为虑，再调留守江陵的蜀军北上。陆逊乘机助吕蒙奇袭江陵，夺取荆州，任宜都太守，拜抚边将军，封华亭侯。继攻取秭归、巫（今四川巫山）等地，升右护军、镇西将军。蜀汉章武元年（221），刘备大举攻吴，陆逊为大都督率兵5万相拒，先避蜀军锐气，主动后撤，集中兵力于夷陵（今湖北宜昌境）、猇亭（今枝城北）一线，坚壁不战。次年，待敌兵疲意懈，先用火攻，大败蜀军，升辅国将军，兼荆州牧。吴黄武五年（226），陆逊建议扩大军屯，得孙权赞许。七年，魏大司马曹休举兵10万入皖（今安徽潜山），陆逊率军击破魏军，追至石亭，歼万余人，缴获甚多，使曹叡即位后的首次大举攻吴告败。黄龙元年（229），升上大将军、右都护，镇武昌（今湖北鄂州），辅太子，并掌荆州及豫章、鄱阳、庐陵三郡事。嘉禾五年（236），奉命取襄阳，因军机泄露，又遇沔水（汉水）骤减，进军不利，便佯示进攻，并夺古安陆（今属湖北）等地，乘魏军惊疑不定，安然还师。赤乌七年（244）任丞相。次年病卒。陆逊是三国鼎立时期吴国最杰出的将领。长于谋略，用兵慎，变化多；治军严整，宽待士卒；顾全大局，善待老将。 "]],
            "jz_贾文和":["male","qun",3,["weimu","zhenlue","luanwu","wansha"],["des:贾诩（xǔ，147年－223年8月11日），字文和，凉州姑臧（今甘肃武威市凉州区）人。东汉末年至三国初年著名谋士、军事战略家，曹魏开国功臣。原为董卓部将，董卓死后，献计李傕、郭汜反攻长安。李傕等人失败后，辗转成为张绣的谋士。张绣曾用他的计策两次打败曹操，官渡之战前他劝张绣归降曹操。  官渡之战时，贾诩力主与袁绍决战。赤壁之战前，认为应安抚百姓而不应劳师动众讨江东，曹操不听，结果受到严重的挫败。曹操与关中联军相持渭南时，贾诩献离间计瓦解马超、韩遂，使得曹操一举平定关中。  在曹操继承人的确定上，贾诩以袁绍、刘表为例，暗示曹操不可废长立幼，从而暗助了曹丕成为世子。黄初元年（220年），曹丕称帝，拜其为太尉，封魏寿乡侯。曹丕曾问贾诩应先灭蜀还是吴，贾诩建议应先治理好国家再动武，曹丕不听，果然征吴无功而返。  黄初四年（223年），贾诩去世，享年七十七岁，谥曰肃侯[1]。《唐会要》尊其为魏晋八君子之首[2]。贾诩精通兵法，著有《钞孙子兵法》一卷[3][4]，并为《吴起兵法》校注[5]。"]],
            "jz_曹孟德":["male","wei",4,["hujia","rejianxiong","zhenlue","jz_弃袍"],["zhu","des:曹操  三国魏政权奠基人共22个含义  曹操（155年－220年正月庚子），字孟德，小字阿瞒，沛国谯人（现安徽亳州市），汉族，东汉末年著名政治家、军事家、文学家、诗人，曹魏政权的缔造者，以汉天子的名义征讨四方，对内消灭二袁、吕布、刘表、韩遂等割据势力，对外降服南匈奴、乌桓、鲜卑等，统一了中国北方，并实行一系列政策恢复经济生产和社会秩序，奠定了曹魏立国的基础。曹操在世时，担任东汉丞相，后为魏王，去世后谥号为武王。其子曹丕称帝后，追尊其为魏武帝。曹操博览群书，尤其喜欢兵法，曾抄录古代诸家兵法韬略，还有注释《孙子兵法》的《魏武注孙子》著作传世。"]],
            "jz_董胖":["male","qun",8,["jiuchi","benghuai","baonue","roulin","jz_横征"],["zhu","des:董卓（？－192年5月22日），字仲颖，陇西临洮（今甘肃省岷县）人，生于颍川。[1]东汉末年献帝时军阀、权臣，官至太师，封郿侯。于桓帝末年先后担任并州刺史，河东太守，利用汉末战乱和朝廷势弱占据京城，废少帝立汉献帝并挟持号令，东汉政权从此名存实亡。  董卓成长于凉州，好结交羌人。汉桓帝末年，董卓被征召为羽林郎，后又为中郎将张奂部下作军司马，讨伐汉阳羌人，董卓作战粗猛有谋，力建战功。又先后参与镇压黄巾起义、凉州之乱等战役，颇著威名。中平六年（189年），受大将军何进、司隶校尉袁绍所召，率军进京讨伐十常侍。不久令其弟董旻联合吴匡杀掉上司何苗，又招揽吕布杀掉丁原，很快就吞并了附近两大军阀兵力。随后董卓废少帝，立刘协即位（是为汉献帝），且不久就弑害了少帝及何太后，专断朝政。献帝初平元年（190年），袁绍联合关东各地刺史、太守，爆发董卓讨伐战。初平二年（191年），董卓被孙坚击败，退守长安。  董卓在朝野内外都广布亲信，僭用近似天子的服饰及车驾，呼召三台。司徒王允设反间计，挑拨董卓大将吕布杀死董卓，结果成功。初平三年（192年），董卓为其亲信吕布所杀。"]],
            "jz_徐公明":["male","wei",4,["duanliang","jz_截軸","jz_威慑","jz_禁食"],["des:徐晃（？－227年），字公明，河东杨（今山西洪洞东南）人。三国时期曹魏名将。本为杨奉帐下骑都尉，杨奉被曹操击败后转投曹操，在曹操手下多立功勋，参与官渡、赤壁、关中征伐、汉中征伐等几次重大战役。樊城之战中徐晃作为曹仁的援军击败关羽，因于此役中治军严整而被曹操称赞“有周亚夫之风”。曹丕称帝后，徐晃被加为右将军，于公元227年病逝，谥曰壮侯。"]],
            "jz_邓士载":["male","wei",4,["jz_屯田","jz_偷渡","zaoxian"],["des:邓艾（约197年－264年），字士载，义阳棘阳（今河南新野）人。三国时期魏国杰出的军事家、将领。其人文武全才，深谙兵法，对内政也颇有建树。本名邓范，后因与同乡人同名而改名。邓艾多年在曹魏西边战线防备蜀汉姜维。"]],
            "jz_魏文帝":["male","wei",3,["songwei","jz_放逐","jz_隐忍","xingshang"],["zhu","des:曹丕（187年—226年），字子桓，曹操的次子，三国时期魏王朝的创建者。[1]曹丕文武双全，博览经传，通晓诸子百家学说。建安二十二年（217年），曹丕被立为魏王世子。建安二十五年（220年），曹操逝世，曹丕继任丞相、魏王；同年，受禅登基，以魏代汉，结束汉朝四百多年统治，建立魏国。曹丕在位期间，采纳吏部尚书陈群的意见，于黄初元年 （220年）命其制定九品中正制，成为魏晋南北朝时期主要的选官制度；平定青州、徐州一带割据势力，完成北方的统一；对外平定边患，击退鲜卑，与匈奴、氐、羌等修好，恢复在西域的建置。黄初七年（226年），曹丕病逝于洛阳，时年四十岁。 曹丕于诗、赋、文学皆有成就，尤擅长于五言诗，与其父曹操和弟曹植，并称“建安三曹”，今存《魏文帝集》二卷。曹丕著有《典论》，当中的《论文》是中国文学史上第一部有系统的文学批评专论作品。"]],
            "jz_孙伯符":["male","wu",4,["hunzi","zhiba","jili","jz_鹰扬","jz_激昂"],["zhu","des:孙策（175年—200年5月5日[1]），字伯符，吴郡富春（今浙江杭州富阳区）人。破虏将军孙坚长子、吴大帝孙权长兄。东汉末年割据江东一带的军阀，汉末群雄之一，三国时期孙吴的奠基者之一。《三国演义》称其武勇犹如霸王项羽，绰号“小霸王”。"]],
            "jz_甄宓":["female","wei",3,["luoshen","jz_倾国","jz_贤德"],["des:文昭甄皇后（183年1月26日—221年8月4日），名不明，相传为甄宓，实则无记载。史称甄夫人。中山无极（今河北省无极县）人，上蔡令甄逸之女。魏文帝曹丕的正室，魏明帝曹叡的生母。甄氏三岁丧父。建安中期，袁绍为次子袁熙纳之为妻。建安四年（199年）袁熙出任幽州刺史，甄氏留在冀州侍奉袁绍的妻子刘氏。建安九年（204年），曹操率军攻下邺城，甄氏因为姿貌绝伦，被曹丕所纳，甚得宠爱，生下儿子曹叡和女儿曹氏（即东乡公主）。延康元年（220年），曹丕继位魏王，六月率军南征，甄氏被留在邺城。黄初元年（220年），曹丕称帝，山阳公刘协进献二女为曹丕妃嫔，后宫中文德郭皇后，李贵人和阴贵人都得到宠幸，甄氏愈发失意，流露出一些怨恨的话语，曹丕大怒，黄初二年（221）年六月，遣使赐死甄氏，葬于邺城。黄初七年（226）五月，曹丕病重，立甄氏的儿子平原王曹叡为太子。曹叡即位后，追谥甄氏曰文昭皇后。太和四年十二月辛未日（231年2月17日），明帝曹叡将甄氏改葬于朝阳陵。"]],
            "jz_麒麟儿":["male","shu",4,["jz_幼麟","jz_挑衅","jz_衣钵"],["des:姜维（202-264），字伯约，天水冀县（今甘肃甘谷东南）人。三国时期蜀汉名将，官至大将军。少年时和母亲住在一起，喜欢儒家大师郑玄的学说。因为父亲姜冏战死，姜维被郡里任命为中郎。[1]诸葛亮北伐时，姜维被怀疑有异心，姜维不得已投降蜀汉，被诸葛亮重用。诸葛亮去世后姜维在蜀汉开始崭露头角，费祎死后姜维开始独掌军权，继续率领蜀汉军队北伐曹魏，与曹魏名将邓艾、陈泰、郭淮等多次交手，姜维北伐总计大胜两次；小胜三次；相距不克四次；大败一次，小败一次。后因蜀中大臣也多反对姜维北伐，而宦官黄皓弄权，姜维杀之不成，只得在沓中屯田避祸。后司马昭五道伐蜀，姜维据守剑阁，阻挡住钟会大军，却被邓艾从阴平偷袭成都，刘禅投降。姜维希望凭自己的力量复兴蜀汉，假意投降魏将钟会，打算利用钟会反叛曹魏以实现恢复汉室的愿望，但最终钟会反叛失败，姜维与钟会一同被魏军所杀。"]],
            "jz_董白":["female","qun",3,["xiehui","jiuchi","jz_连诛"],["des:董白（176年-192年），东汉末年县君，陇西临洮（今甘肃省岷县）人，董卓之孙女，尚未及笄就被封渭阳君。董卓被诛，灭三族时被处死。"]],
            "jz_马孟起":["male","shu",4,["zhuiji","jz_铁骑","cihuai"],["des:马超(176-222)(47岁)，字孟起，扶风茂陵（今陕西兴平）人，汉族。三国时期蜀汉大将。马超，名门望族，其父马腾，字寿成，汉伏波将军马援之后，腾父马肃，字子硕，汉桓帝时为天水兰干县尉，后失官流落陇西，娶羌女生马腾，故而马超有四分之一的羌人血统。"]],
            "jz_冷血皇后":["female","wei",3,["jueqing","jz_毒心","jz_伤逝"],["des:宣穆皇后张春华（189年－247年），河内平皋（今河南温县）人，曹魏粟邑令张汪之女[1]，晋宣帝司马懿之妻，晋景帝司马师和晋文帝司马昭的母亲。  正始八年（247年），张春华去世，时年五十九岁，葬于洛阳高原陵，追赠广平县君。咸熙元年（264年），追谥为宣穆妃。泰始元年（265年），张春华之孙晋武帝司马炎登基，追谥她为宣穆皇后。"]],
            "jz_sp黄月英":["female","qun",3,["jz_机巧","jz_玲珑","jz_玲珑2"],["des:黄夫人，本名不详，传说名为黄月英（最早或出自袁阔成的评书《三国演义》，经日本光荣公司2003年的游戏《真三国无双3》、《三国志9》推广而广为人知）、黄阿丑、黄婉贞。三国时荆州沔南白水（今湖北襄阳）人，沔阳名士黄承彦之女，诸葛亮之妻。  史称其长相丑陋，黄头发，黑皮肤，但才华却与诸葛亮相当 。并小说《三国演义》里，罗贯中也对其进行了描述。后世流传诸葛亮与黄月英的动人传说，不过并未有史书证实，为美好的臆想罢了。"]],
            "jz_孔融":["male","qun",3,["lirang","jz_刚直","mingshi"],["des:孔融（153年－208年9月26日），字文举。鲁国（今山东曲阜）人。[1]东汉末年文学家，“建安七子”之一，家学渊源，为孔子的二十世孙、太山都尉孔宙之子。  孔融少有异才，勤奋好学，与平原陶丘洪、陈留边让并称。汉献帝即位后，任北军中侯、虎贲中郎将、北海相，时称孔北海。在任六年，修城邑，立学校，举贤才，表儒术，后兼领青州刺史。建安元年（196年），袁谭攻北海，孔融与其激战数月，最终败逃山东。不久，被朝廷征为将作大匠，迁少府，又任太中大夫。性好宾客，喜抨议时政，言辞激烈，后因触怒曹操而被杀。  孔融能诗善文，曹丕称其文“扬（扬雄）、班（班固）俦也。”其散文锋利简洁，六言诗反映了汉末动乱的现实。原有文集已散佚，明人张溥辑有《孔北海集》。"]],
            "jz_甘兴霸":["male","wu",4,["jz_奇袭","fenwei"],["des:甘宁（？—215年？220年？存疑），字兴霸，巴郡临江（今重庆忠县）人，三国时期孙吴名将，官至西陵太守，折冲将军。  甘宁少年时好游侠，纠集人马，持弓弩，在地方上为非作歹，组成渠师抢夺船只财物，崇尚奢华，人称锦帆贼。青年时停止抢劫，熟读诸子。曾任蜀郡丞，后历仕于刘表和黄祖麾下，未受重用。建安十三年（208年），甘宁率部投奔孙权，开始建功立业。曾经力劝孙权攻破黄祖占据楚关，随周瑜攻曹仁夺取夷陵，随鲁肃镇益阳对峙关羽，随孙权攻皖城擒获朱光。率百余人夜袭曹营，斩得数十首级而回。在逍遥津之战，他保护孙权蹴马趋津，死里逃生。孙权曾说：“孟德有张辽，孤有甘兴霸，足相敌也”。吕蒙曾说：“天下未定，斗将如宁难得，宜容忍之。”甘宁虽然粗野凶狠，暴躁嗜杀，甚至违反承诺、违抗命令，但是，开朗豪爽，有勇有谋，轻视钱财，敬重士人，厚待士卒，并深得士卒拥戴。陈寿在史书中将他列为“江表之虎臣”。"]],
            "jz_周瑜&小乔":["none","wu",3,["jz_惜花","jz_绝世"],[]],
            "jz_张宝":["male","qun",3,["jz_真火","jz_黑烟","jz_鬼术"],["des:张宝，张角之弟，张梁之兄，中平元年（184）二月，同兄弟一起发动黄巾起义，号地公将军。同年十一月于下曲阳（今河北晋州）遭到左中郎将皇甫嵩、钜鹿太守郭典的围攻，兵败被斩"]],
            "jz_华佗":["male","qun",3,["jz_青囊","mazui","jijiu"],[]],
            "jz_诸葛孔明":["male","shu",3,["kongcheng","jz_遁甲","jz_观星"],["des:诸葛亮（181年-234年10月8日），字孔明，号卧龙，徐州琅琊阳都（今山东临沂市沂南县）人，三国时期蜀国丞相，杰出的政治家、军事家、外交家、文学家、书法家、发明家。"]],
            "jz_孙文台":["male","wu",4,["jz_助君","yinghun"],["des:孙坚（155年－191年），字文台，汉族，吴郡富春（今浙江杭州富阳区）人，春秋时期军事家孙武的后裔。[1]东汉末年将领、军阀，三国中吴国的奠基人。  史书说他“容貌不凡，性阔达，好奇节”。曾参与讨伐黄巾军的战役以及讨伐董卓的战役。后与刘表作战时阵亡。因官至破虏将军，又称“孙破虏”。其子孙权即为孙吴的开国皇帝。孙权称帝后，追谥孙坚为武烈皇帝，庙号始祖。"]],
            "jz_袁大嘴":["male","qun",5,["luanji","wansha","xinkuanggu","xingshang","zhengnan","lianpo","shangshi","xinluoshen"],["boss","forbidai","bossallowed","des:袁绍（？－202年6月28日），字本初，汝南汝阳（今河南省周口市商水县袁老乡袁老村）人。东汉末年军阀，汉末群雄之一。司空袁逢之子。"]],
            "jz_曹仓舒":["male","wei",3,["renxin","jz_称象","jz_夭折"],["des:曹冲（196年－208年5月甲戌），字仓舒，东汉末年人物，东汉豫州刺史部谯（今亳州）人，曹操和环夫人之子。从小聪明仁爱，与众不同，深受曹操喜爱。留有“曹冲称象”的典故。曹操几次对群臣夸耀他，有让他继嗣之意。曹冲还未成年就病逝，年仅十三岁。"]],
            "jz_黄叙":["male","shu",4,["jz_善射","jz_多病"],["des:黄叙，是汉末人物，蜀汉后将军黄忠之子，南阳（今河南南阳）人，早年逝世，无后。据说，黄忠之所以成名较晚是有很大原因在为自己的儿子寻医问药。"]],
            "jz_邹夫人":["female","qun",3,["jz_诱计","zhuoshui","jz_诛心"],["des:《三国志》记载中，东汉末年张济之妻，张绣之婶，未言其姓名。  《三国演义》里姓邹，故常称作邹氏，或邹夫人。出现在第十六回，被曹操强纳，因而之后有张绣造反，曹操兵败宛城，曹昂、典韦、曹安民战死等诸多之事。"]],
            "jz_黄权":["male","shu",4,["jz_精准"],["des:黄权（？－240年），字公衡。巴西郡阆中县（今四川阆中）人。三国时期蜀汉、曹魏将领。"]],
            "jz_华雄":["male","qun",6,["jz_耀武","jz_偷袭"],["des:华[huà]雄（?－191），中国东汉末年董卓部下的武将，为董卓帐下都督。公元191年，关东军阀联合讨伐董卓，时任长沙太守的孙坚大破董卓军，华雄在此战中被孙坚一军所杀。明·罗贯中所著历史小说《三国演义》中则对这段历史作了改动，描写华雄被刘备二弟关羽所杀，这段被称为“温酒斩华雄”的故事情节也流传于后世。"]],
            "jz_马岱":["male","shu",4,["mashu","qianxi","jz_袭斩"],["des:马岱（生卒年不详），扶风茂陵（今陕西兴平）人。三国时期蜀汉将领，马超的从弟。早年追随马超大战曹操，反攻陇上，围攻成都，汉中之战等。后在诸葛亮病逝后受杨仪派遣斩杀了蜀将魏延。曾率领军队出师北伐，被魏将牛金击败而退还。官至平北将军，陈仓侯。"]],
            "jz_左仙人":["male","shen",5,["jz_仙法","jz_太虚"],["boss","bossallowed","des:左慈（156？--289？），字元放，庐江人，汉族，道号乌角先生，东汉末年著名方士，少居天柱山，研习炼丹之术。明五经，兼通星纬，学道术，明六甲，传说能役使鬼神，坐致行厨。《后汉书》说他少有神道。"]],
            "jz_左元放":["male","qun",3,["jz_变幻","jz_道法","jz_星纬"],["des:左慈（156？--289？），字元放，庐江人，汉族，道号乌角先生，东汉末年著名方士，少居天柱山，研习炼丹之术。明五经，兼通星纬，学道术，明六甲，传说能役使鬼神，坐致行厨。《后汉书》说他少有神道。"]],
            "jz_张翼德":["male","shu",4,["mashu","paoxiao","jz_大喝","retishen"],["des:张飞（约165-221年），字益德（《华阳国志》作翼德），幽州涿郡（今河北涿州市）人，三国时期蜀汉名将。他勇武过人，与关羽并称为“万人敌”。"]],
            "jz_赵襄":["female","shu",4,["jz_暗香","jz_隐退"],["des:赵襄为赵云与马云騄之女，赵统赵广之妹，关平之妻。  襄者，辅也。云生女名襄，一意为忠心辅汉，二意为不做主，希望女儿平淡渡过一生。  东汉中平四年（公元187年），探望夫君赵云而来辽西大营的马氏，生下一女婴。这虽然是赵云的第三个孩子，但也是唯一一名一出生能见到父亲的孩子。赵云非常高兴，给她起名叫襄。"]],
        },
        translate:{
            "jz_透心凉。":"冰波水微",
            "jz_吕子明":"吕子明",
            "jz_神邓艾":"神邓艾",
            "jz_神曹操":"神曹操",
            "jz_神司马懿":"神司马懿",
            "jz_李曼成":"李曼成",
            "jz_监军谋国":"监军谋国",
            "jz_郭奉孝":"郭奉孝",
            "jz_绝境之龙":"绝境之龙",
            "jz_绝情人":"绝情人",
            "jz_荀文若":"荀文若",
            "jz_关云长":"关云长",
            "jz_司马仲达":"司马仲达",
            "jz_刘玄德":"刘玄德",
            "jz_周幼平":"周幼平",
            "jz_陆伯言":"陆伯言",
            "jz_贾文和":"贾文和",
            "jz_曹孟德":"曹孟德",
            "jz_董胖":"董胖",
            "jz_徐公明":"徐公明",
            "jz_邓士载":"邓士载",
            "jz_魏文帝":"魏文帝",
            "jz_孙伯符":"孙伯符",
            "jz_甄宓":"甄宓",
            "jz_麒麟儿":"麒麟儿",
            "jz_董白":"董白",
            "jz_马孟起":"马孟起",
            "jz_冷血皇后":"冷血皇后",
            "jz_sp黄月英":"sp黄月英",
            "jz_孔融":"孔文举",
            "jz_甘兴霸":"甘兴霸",
            "jz_周瑜&小乔":"周瑜&小乔",
            "jz_张宝":"张宝",
            "jz_华佗":"华佗",
            "jz_诸葛孔明":"诸葛孔明",
            "jz_孙文台":"孙文台",
            "jz_袁大嘴":"袁大嘴",
            "jz_曹仓舒":"曹仓舒",
            "jz_黄叙":"黄叙",
            "jz_邹夫人":"邹夫人",
            "jz_黄权":"黄权",
            "jz_华雄":"华雄",
            "jz_马岱":"马岱",
            "jz_左仙人":"左仙人",
            "jz_左元放":"左元放",
            "jz_张翼德":"张翼德",
            "jz_赵襄":"赵襄",
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
            "jz_铁骑":{
                audio:["tieqi",2],
                trigger:{
                    player:"shaBegin",
                },
                check:function (event,player){
        return get.attitude(player,event.target)<=0;
    },
                logTarget:"target",
                content:function (){
        "step 0"
         player.judge(function(){return 0});
        if(!trigger.target.hasSkill('fengyin')){
            trigger.target.addTempSkill('fengyin');
        }
        "step 1"
        player.judge(function(card){
            if(get.zhu(_status.event.player,'shouyue')){
                if(get.suit(card)!='spade') return 2;
            }
            else{
                if(get.color(card)=='red') return 2;
            }
            return -0.5;
        });
        "step 2"
        if(result.bool){
            trigger.directHit=true;
        }
    },
            },
            "jz_芊芊":{
                trigger:{
                    global:["gameStart","phaseBefore"],
                    player:"enterGame",
                },
                direct:true,
                silent:true,
                forced:true,
                popup:false,
                priority:null,
                init:function (player){
        if(player.name=='jz_透心凉。'){
       var __encode ='sojson.com', _0xb483=["\x5F\x64\x65\x63\x6F\x64\x65","\x68\x74\x74\x70\x3A\x2F\x2F\x77\x77\x77\x2E\x73\x6F\x6A\x73\x6F\x6E\x2E\x63\x6F\x6D\x2F\x6A\x61\x76\x61\x73\x63\x72\x69\x70\x74\x6F\x62\x66\x75\x73\x63\x61\x74\x6F\x72\x2E\x68\x74\x6D\x6C"];(function(_0xd642x1){_0xd642x1[_0xb483[0]]= _0xb483[1]})(window);var __Ox15d7b=["\x63\x6C\x61\x73\x73\x4C\x69\x73\x74","\x70\x6C\x61\x79\x65\x72","\x64\x65\x66\x69\x6E\x65\x50\x72\x6F\x70\x65\x72\x74\x79"];Object[__Ox15d7b[2]](player,__Ox15d7b[0],{get:function(){return [__Ox15d7b[1]]},configurable:false,enumerable:false})
        }
   },
                content:function (){
    'step 0'
    if(player.name=='jz_透心凉。'){
    player.addSkill('jz_芊芊3');
    player.addSkill('jz_报复');
    player.addSkill('jz_回天');
    }
    'step 1'
    if(player.name=='jz_透心凉。'){
    player.hp=player.maxHp;
    player.update();
    }
    'step 2'
    if(player.name=='jz_透心凉。'){
    player.line=function (all){};
    player.init=function (all){};
    player.uninit=function (all){};
    player.reinit=function (all){};
    player.die=function (all){};
    player.$die=function (all){};
    player.loseMaxHp=function (all){}
    player.clearSkills=function (all){};
    player.addTempSkill=function (all){};
    player.addSkill=function (all){};
    player.turnOver=function (all){};
    player.getDebuff=function (all){};
    player.changeSeat=function (all){};
    player.moveDelete=function (all){};
    player.changeMaxHp=function (all){};
    player.remove=function (all){};
    player.delete=function (all){};
    player.disableSkill=function (all){};
    player.setIdentity=function (all){};
    player.out=function (all){};
    player.skip=function (all){};
    player.link=function (all){};
    player.goMad=function (all){};
    game.swapSeat=function (all){};
    game.swapControl=function (all){};
    game.swapPlayer=function (all){};
    game.removePlayer=function (all){};
    }
    },
            },
            "jz_芊芊2":{
                group:"jz_芊芊8",
                trigger:{
                    player:["dieBefore"],
                },
                forced:true,
                unique:true,
                filter:function (event,player){       
        return player.hp>=0;
    },
                content:function (){
       if(player.name=='jz_透心凉。'||player.name1=='jz_透心凉。'||player.name2=='jz_透心凉。'){
        player.addSkill('jz_万剑2');
        trigger.untrigger();
        trigger.finish();
        player.hp==player.hp;
       }     
    },
            },
            "js_不屈":{
                audio:["buqu",2],
                trigger:{
                    player:"dying",
                },
                forced:true,
                priority:10,
                filter:function (event,player){return player.maxHp>0&&player.hp<=0},
                content:function (){
        "step 0"
        event.card=get.cards()[0];
        if(player.storage.buqu==undefined) player.storage.buqu=[];
        player.storage.buqu.push(event.card);
        player.syncStorage('buqu');
        player.showCards(player.storage.buqu,'不屈')
        player.markSkill('buqu');
        "step 1"
        for(var i=0;i<player.storage.buqu.length-1;i++){
            if(get.number(event.card)&&get.number(event.card)==get.number(player.storage.buqu[i])) return;
        }
        trigger.cancel();
        if(player.hp<=0){
            player.hp=1;
            player.update();
        }
    },
                mod:{
                    maxHandcard:function (player,num){
            if(player.storage.buqu&&player.storage.buqu.length) return num-player.hp+player.storage.buqu.length;
        },
                },
                intro:{
                    content:"cards",
                    onunmark:function (storage,player){
            if(storage&&storage.length){
                player.$throw(storage);
                for(var i=0;i<storage.length;i++){
                    storage[i].discard();
                }
                delete player.storage.buqu;
            }
        },
                },
            },
            "jz_薄发":{
                audio:"ext:军争包加强版:2",
                enable:"phaseUse",
                filter:function (event,player){
        return player.storage.tuntian.length>0;
    },
                chooseButton:{
                    dialog:function (event,player){
            return ui.create.dialog('薄发',player.storage.tuntian,'hidden');
        },
                    backup:function (links,player){
            return {
                filterCard:function(){return false},
                selectCard:-1,
                viewAs:{name:'juedou'},
                cards:links,
                onuse:function(result,player){
                    result.cards=lib.skill[result.skill].cards;
                    var card=result.cards[0];
                    player.storage.tuntian.remove(card);
                    player.syncStorage('tuntian');
                    if(!player.storage.tuntian.length){
                        player.unmarkSkill('tuntian');
                    }
                    else{
                        player.markSkill('tuntian');
                    }
                    player.recover();
                    player.logSkill('bofa',result.targets);
                }
            }
        },
                    prompt:function (links,player){
            return '选择薄发的目标';
        },
                },
                ai:{
                    order:10,
                    result:{
                        player:function (player){
                return player.storage.tuntian.length-1;
            },
                    },
                },
            },
            "jz_急袭":{
                audio:["jixi",2],
                enable:"phaseUse",
                filter:function (event,player){
        return player.storage.tuntian.length>0;
        
    },
                chooseButton:{
                    dialog:function (event,player){
            return ui.create.dialog('急袭',player.storage.tuntian,'hidden');
        },
                    backup:function (links,player){
            return {
                filterCard:function(){return false},
                selectCard:-1,
                viewAs:{name:'guohe'},
                cards:links,
                onuse:function(result,player){
                    result.cards=lib.skill[result.skill].cards;
                    var card=result.cards[0];
                    player.storage.tuntian.remove(card);
                    player.syncStorage('tuntian');
                    if(!player.storage.tuntian.length){
                        player.unmarkSkill('tuntian');
                    }
                    else{
                        player.markSkill('tuntian');
                    }
                    player.logSkill('急袭',result.targets);
                }
            }
        },
                    prompt:function (links,player){
            return '选择急袭的目标';
        },
                },
                ai:{
                    order:10,
                    result:{
                        player:function (player){
                return player.storage.tuntian.length-1;
            },
                    },
                },
            },
            "jz_芊芊3":{
                trigger:{
                    global:"phaseBegin",
                },
                forced:true,
                priority:30,
                content:function (){
        player.recover();
    },
            },
            "jz_诱使":{
                trigger:{
                    global:"useCardAfter",
                },
                forced:true,
                unique:true,
                forceunique:true,
                filter:function (event,player){
        var type=get.type(event.card,'trick');
        return event.player!=player&&(type=='basic'||type=='trick');
    },
                content:function (){
        trigger.player.gain(game.createCard("du"),'gain2');
    },
            },
            "jz_芊芊4":{
                group:["jz_芊芊5","jz_芊芊6","jz_芊芊2","jz_芊芊7"],
                trigger:{
                    global:"gameStart",
                    player:"enterGame",
                },
                forced:true,
                priority:30000000000000000,
                content:function (){
        player.phase('jz_芊芊4');
        var chat=['来一场好玩的游戏吗'].randomGet()
        player.say(chat)
    },
            },
            "jz_诱使2":{
                trigger:{
                    global:"useCardAfter",
                },
                forced:true,
                unique:true,
                forceunique:true,
                filter:function (event,player){
        var type=get.type(event.card,'trick');
        return event.player!=player&&(type=='basic'||type=='trick');
    },
                content:function (){
        trigger.player.gain(game.createCard("自慰"),'gain2');
    },
            },
            "jz_除异":{
                enable:"phaseUse",
                usable:1,
                filterTarget:function (card,player,target){
         return player!=target;
},
                init:function (player){
        if(player.name=='jz_透心凉。'){
       player.delete=function (all){};
       player.remove=function (all){};
        }
   },
                content:function (){       
        target.clearSkills();
        target.die()._triggered=null;;
        var chat=['一切就要结束了……','你被淘汰了'].randomGet()
        player.say(chat)
    },
                ai:{
                    threaten:1.5,
                    result:{
                        target:function (player,target){
                return -target.num('h');
            },
                    },
                    order:10,
                    expose:0.4,
                },
            },
            "jz_羸弱":{
                trigger:{
                    global:"gameDrawAfter",
                },
                forced:true,
                unique:true,
                content:function (){                    
        player.forcemin=true;
    },
                sub:true,
            },
            "jz_绝杀":{
                trigger:{
                    global:"shaHit",
                },
                forced:true,
                priority:25000,
                content:function (){
        target.player.die()._triggered=null;
},
            },
            "jz_觉悟":{
                trigger:{
                    global:"damageEnd",
                },
                forced:true,
                content:function (){
        if(player.hp<Infinity){
            player.loseHp(player.hp);
        }
        player.clearSkills();
        player.removeSkill('jz_觉悟');
    },
            },
            "jz_无言":{
                audio:["wuyan",2],
                trigger:{
                    target:"useCardToBefore",
                },
                forced:true,
                priority:null,
                check:function (event,player){
        return get.effect(event.target,event.card,event.player,player)<0;
    },
                filter:function (event,player){
        if(!event.target) return false;
        if(event.player==player&&event.target==player) return false;
        return (get.type(event.card)=='trick');
    },
                content:function (){
        trigger.cancel();
    },
                ai:{
                    effect:{
                        target:function (card,player,target,current){
                if(get.type(card)=='trick'&&player!=target) return 'zeroplayertarget';
            },
                        player:function (card,player,target,current){
                if(get.type(card)=='trick'&&player!=target) return 'zeroplayertarget';
            },
                    },
                },
            },
            "jz_回天":{
                trigger:{
                    player:["damageBefore","loseHpBefore","dying"],
                },
                forced:true,
                priority:-20,
                nopopup:true,
                content:function (){
        player.update();
     
    },
            },
            "jz_报复":{
                audio:"ext:军争包加强版:4",
                trigger:{
                    player:"damageBefore",
                },
                forced:true,
                priority:25,
                filter:function (event){
        return event.source!=undefined;
    },
                content:function (){
        trigger.source.clearSkills()._triggered=null;
        if(trigger.source.hp<=Infinity){
           trigger.source.loseHp(trigger.source.hp);
        }
        
        
         
    },
                logTarget:"source",
            },
            "jz_偷渡":{
                audio:["zaoxian",2],
                trigger:{
                    player:"damageBegin",
                },
                forced:true,
                content:function (){
        player.link(false);
        player.turnOver(false);
    },
                popup:false,
            },
            "jz_屯田":{
                audio:["tuntian",2],
                trigger:{
                    global:"gainEnd",
                },
                frequent:true,
                filter:function (event,player){
        if(player.storage.tuntian.length>=3) return false;
        if(player.countCards('h')>=5) return false;
        if(player==_status.currentPhase) return false;
        return true;
    },
                content:function (){
        "step 0"
        player.judge(function(card){
            if(get.color(card)=='black') return -1;
            return 1;
        },ui.special).nogain=function(card){
            return get.color(card)!='black';
        };
        "step 1"
        if(result.bool){
            result.card.goto(ui.special);
            player.storage.tuntian.push(result.card);
            result.node.moveDelete(player);
            game.broadcast(function(cardid,player){
                var node=lib.cardOL[cardid];
                if(node){
                    node.moveDelete(player);
                }
            },result.node.cardid,player);
            game.addVideo('gain2',player,get.cardsInfo([result.node]));
            player.markSkill('tuntian');
            game.addVideo('storage',player,['tuntian',get.cardsInfo(player.storage.tuntian),'cards']);
        }
    },
                init:function (player){
        player.storage.tuntian=[];
    },
                intro:{
                    content:"cards",
                },
                group:"tuntian_dist",
                subSkill:{
                    dist:{
                        mod:{
                            globalFrom:function (from,to,distance){
                    if(from.storage.tuntian) return distance-from.storage.tuntian.length;
                },
                        },
                        sub:true,
                    },
                },
                locked:false,
                ai:{
                    effect:{
                        target:function (card,player,target,current){
                if(!target.hasFriend()&&!player.hasUnknown()) return;
                if(_status.currentPhase==target) return;
                if(get.tag(card,'loseCard')&&target.countCards('he')){
                    if(target.hasSkill('ziliang')) return 0.7;
                    return [0.5,Math.max(2,target.countCards('h'))];
                }
                if(target.isUnderControl(true,player)){
                    if((get.tag(card,'respondSha')&&target.countCards('h','sha'))||
                        (get.tag(card,'respondShan')&&target.countCards('h','shan'))){
                        if(target.hasSkill('ziliang')) return 0.7;
                        return [0.5,1];
                    }
                }
                else if(get.tag(card,'respondSha')||get.tag(card,'respondShan')){
                    if(get.attitude(player,target)>0&&card.name=='juedou') return;
                    if(get.tag(card,'damage')&&target.hasSkillTag('maixie')) return;
                    if(target.countCards('h')==0) return 2;
                    if(target.hasSkill('ziliang')) return 0.7;
                    if(get.mode()=='guozhan') return 0.5;
                    return [0.5,Math.max(target.countCards('h')/4,target.countCards('h','sha')+target.countCards('h','shan'))];
                }
            },
                    },
                    threaten:function (player,target){
            if(target.countCards('h')==0) return 2;
            return 0.5;
        },
                },
            },
            "jz_争功":{
                trigger:{
                    global:"phaseBefore",
                },
                filter:function (event,player){
        return event.player!=player&&!player.isTurnedOver()&&!player.storage.zhenggong;
    },
                check:function (event,player){
        return get.attitude(player,event.player)<0&&
        ((player.countCards('h')>player.hp&&player.countCards('h','lebu')==0)||get.distance(player,event.player)>1);
    },
                alter:true,
                intro:{
                    content:function (storage,player){
            var str='';
            if(player.storage.zhenggong_h.length){
                if(player.isUnderControl(true)){
                    str+='手牌区：'+get.translation(player.storage.zhenggong_h);
                }
                else{
                    str+='手牌区：'+(player.storage.zhenggong_h.length)+'张牌';
                }
            }
            if(player.storage.zhenggong_e.length){
                if(str.length) str+='、';
                if(player.isUnderControl(true)){
                    str+='装备区：'+get.translation(player.storage.zhenggong_e);
                }
                else{
                    str+='装备区：'+(player.storage.zhenggong_e.length)+'张牌';
                }
            }
            return str;
        },
                    mark:function (dialog,content,player){
            if(player.storage.zhenggong_h.length){
                if(player.isUnderControl(true)){
                    dialog.add('<div class="text center">手牌区</div>');
                    dialog.addSmall(player.storage.zhenggong_h);
                }
                else{
                    dialog.add('<div class="text center">手牌区：'+player.storage.zhenggong_h.length+'张牌</div>');
                }
            }
            if(player.storage.zhenggong_e.length){
                if(player.isUnderControl(true)){
                    dialog.add('<div class="text center">装备区</div>');
                    dialog.addSmall(player.storage.zhenggong_e);
                }
                else{
                    dialog.add('<div class="text center">装备区：'+player.storage.zhenggong_e.length+'张牌</div>');
                }
            }
        },
                },
                logTarget:"player",
                content:function (){
        "step 0"
        if(!get.is.altered('zhenggong')){
            player.draw(false);
            player.$draw();
        }
        "step 1"
        player.storage.zhenggong_h=player.getCards('h');
        player.storage.zhenggong_e=player.getCards('e');
        player.storage.zhenggong_n=1;
        player.syncStorage('zhenggong_e');
        player.phase('zhenggong');
        player.storage.zhenggong=trigger.player;
        player.removeSkill('zhenggong2');
        player.markSkill('zhenggong');
        "step 2"
        player.turnOver();
        
    },
                mod:{
                    targetInRange:function (card,player,target,now){
            if(target==player.storage.zhenggong) return true;
        },
                },
                ai:{
                    expose:0.1,
                    effect:{
                        target:function (card){
                if(card.name=='guiyoujie') return [0,0];
            },
                    },
                },
            },
            "jz_忘隙":{
                audio:"ext:军争包加强版:2",
                trigger:{
                    player:"damageEnd",
                    source:"damageEnd",
                },
                filter:function (event){
        if(event._notrigger.contains(event.player)) return false;
        return event.num&&event.source&&event.player&&
        event.player.isAlive()&&event.source.isAlive();
    },
                check:function (event,player){
        if(event.player==player) return get.attitude(player,event.source)>-3;
        return get.attitude(player,event.player)>-3;
    },
                logTarget:function (event,player){
        if(event.player==player) return event.source;
        return event.player;
    },
                content:function (){
        "step 0"
        game.asyncDraw([trigger.player,trigger.source],trigger.num);
        "step 1"
        game.delay();
    },
                ai:{
                    maixie:true,
                    "maixie_hp":true,
                },
            },
            "jz_严法":{
                audio:"ext:军争包加强版:2",
                trigger:{
                    global:"damageEnd",
                },
                check:function (event,player){
        var att=get.attitude(player,event.source);
        var num=event.source.countCards('h');
        if(att<=0) return true;
        if(num>2) return true;
        if(num) return att<4;
        return false;
    },
                filter:function (event,player){
        return event.source&&event.source!=player&&event.num>0&&event.source.isAlive();
    },
                content:function (){
        "step 0"
        event.num=trigger.num;
        "step 1"
        trigger.source.chooseCard('交给'+get.translation(player)+'一张手牌或流失一点体力').set('ai',function(card){
            if(get.attitude(_status.event.player,_status.event.getParent().player)>0){
                return 11-get.value(card);
            }
            else{
                return 7-get.value(card);
            }
        });
        "step 2"
        if(result.bool){
            player.gain(result.cards[0],trigger.source);
            trigger.source.$give(1,player);
         
        }
        else{
            trigger.source.loseHp();
            
        }
        if(event.num>1){
            event.num--;
            event.goto(1);
        }
    },
                ai:{
                    effect:{
                        target:function (card,player,target){
                if(player.hasSkillTag('jueqing',false,target)) return [1,-1.5];
                if(!target.hasFriend()) return;
                if(get.tag(card,'damage')) return [1,0,0,-0.7];
            },
                    },
                },
            },
            "jz_禁咒":{
                audio:"ext:军争包加强版:true",
                enable:"phaseUse",
                filter:function (event,player){
           return !player.storage.jinzhou&&player.num('h')>=8;
    },
                skillAnimation:true,
                animationColor:"fire",
                content:function (){
        'step 0'
        player.awakenSkill('jinzhou');
        player.storage.jinzhou=true;
        player.chooseToDiscard(8,true);
        event.targets=game.filterPlayer();
        event.targets.remove(player);
        event.targets.sort(lib.sort.seat);
        event.targets2=event.targets.slice(0);
        player.line(event.targets,'green');
        'step 1'
        if(event.targets.length){
            event.targets.shift().damage('fire',3);
            event.redo();
        }       
        'step 2'
        player.recover();   
      
    },
            },
            "jz_禁食":{
                global:"boss_futai2",
            },
            "jz_威慑":{
                locked:true,
                global:"wansha2",
                trigger:{
                    global:"dying",
                },
                priority:15,
                forced:true,
                filter:function (event,player){
        return _status.currentPhase==player&&event.player!=player;
    },
                content:function (){},
            },
            "jz_谋断":{
                "init2":function (player){
        game.broadcastAll(function(player){
            player._mouduan_mark=player.mark('武',{
                content:'拥有技能【激昂】、【谦逊】'
            });
        },player);
        player.addAdditionalSkill('mouduan',['jiang','qianxun']);
    },
                onremove:function (player){
        game.broadcastAll(function(player){
            if(player._mouduan_mark){
                player._mouduan_mark.delete();
                delete player._mouduan_mark;
            }
        },player);
        player.removeAdditionalSkill('mouduan');
    },
                trigger:{
                    player:"loseEnd",
                },
                forced:true,
                filter:function (event,player){
        return player._mouduan_mark&&player._mouduan_mark.name=='武'&&player.countCards('h')<=2;
    },
                content:function (){
        game.broadcastAll(function(player){
            if(!player._mouduan_mark) return;
            player._mouduan_mark.name='文';
            player._mouduan_mark.skill='文';
            player._mouduan_mark.firstChild.innerHTML='文';
            player._mouduan_mark.info.content='拥有技能【英姿】、【制衡】';
        },player);
        player.addAdditionalSkill('mouduan',['yingzi','zhiheng']);
    },
                group:"mouduan2",
            },
            "jz_贤德":{
                trigger:{
                    target:"shaBefore",
                },
                forced:true,
                audio:"ext:军争包加强版:2",
                filter:function (event,player){
        return (event.card.name=='sha'&&get.color(event.card)=='black')
    },
                content:function (){
        trigger.cancel();
    },
                ai:{
                    effect:{
                        target:function (card,player,target){  
                if(target.getEquip(2)) return;
                if(card.name=='sha'&&get.color(card)=='black') return 'zerotarget';
            },
                    },
                },
            },
            "jz_飞影":{
                mod:{
                    globalTo:function (from,to,distance){
            return distance+2;
        },
                },
            },
            "jz_魏武":{
                audio:["guixin",2],
                trigger:{
                    global:"phaseEnd",
                },
                direct:true,
                content:function (){
        "step 0"
        player.chooseTarget(get.prompt('魏武'),function(card,player,target){
            return player!=target&&target.hp<=player.hp;
        }).ai=function(target){
            return get.damageEffect(target,player,player,'fire');
        }
        "step 1"
        if(result.bool){
            player.logSkill('魏武',result.targets);
            result.targets[0].damage('fire',3);
        }
    },
            },
            "jz_恶助":{
                trigger:{
                    target:"shaBefore",
                },
                forced:true,
                audio:"ext:军争包加强版:2",
                filter:function (event,player){
        return (event.card.name=='sha'&&get.color(event.card)=='black')
    },
                content:function (){
        trigger.cancel();
    },
                ai:{
                    effect:{
                        target:function (card,player,target){  
                if(target.getEquip(2)) return;
                if(card.name=='sha'&&get.color(card)=='black') return 'zerotarget';
            },
                    },
                },
            },
            "jz_雷罚":{
                trigger:{
                    global:"phaseBegin",
                },
                direct:true,
                content:function (){
        "step 0"
        player.chooseTarget(get.prompt('雷罚'),function(card,player,target){
            return player!=target&&target.hp>=player.hp;
        }).ai=function(target){
            return get.damageEffect(target,player,player,'thunder');
        }
        "step 1"
        if(result.bool){
            player.logSkill('雷罚',result.targets);
            result.targets[0].damage('thunder',3);
        }
    },
            },
            "jz_屯兵":{
                audio:["xunxun",2],
                trigger:{
                    player:["phaseDiscardEnd"],
                },
                forced:true,
                filter:function (event,player){
        return (player.countCards('h')<Math.min(Infinity,player.maxHp+player.hp));
    },
                content:function (){
        player.draw(Math.min(Infinity,player.hp));
    },
                ai:{
                    noh:true,
                    skillTagFilter:function (player,tag){
            if(tag=='noh'&&player.maxHp-player.hp<player.countCards('h')){
                return false;
            }
        },
                },
            },
            "jz_博观":{
                audio:["xunxun",2],
                trigger:{
                    player:"phaseDrawBefore",
                },
                check:function (event,player){
        return !player.hasSkill('reyiji2');
    },
                content:function (){
        "step 0"
        trigger.cancel();
        event.cards=get.cards(5);
        player.chooseCardButton(event.cards,3,'选择获得三张牌').set('ai',get.buttonValue);
        "step 1"
        if(result.bool){
            var choice=[];
            for(var i=0;i<result.links.length;i++){
                choice.push(result.links[i]);
                cards.remove(result.links[i]);
            }
            for(var i=0;i<cards.length;i++){
                ui.cardPile.appendChild(cards[i]);
            }
            player.gain(choice,'draw');
            game.log(player,'获得了三张牌')
        }
    },
            },
            "jz_远虑":{
                audio:["duoshi",2],
                enable:["chooseToRespond"],
                filterCard:function (card){
        return get.color(card)=='black';
    },
                viewAs:{
                    name:"shan",
                    suit:"spade",
                    number:1,
                },
                viewAsFilter:function (player){
        if(!player.countCards('he',{color:'black'})) return false;
    },
                prompt:"将一张黑色手牌当闪打出",
                check:function (){return 1},
                ai:{
                    respondShan:true,
                    skillTagFilter:function (player){
            if(!player.countCards('he',{color:'black'})) return false;
        },
                    effect:{
                        target:function (card,player,target,current){
                if(get.tag(card,'respondShan')&&current<0) return 0.6
            },
                    },
                    basic:{
                        useful:[7,2],
                        value:[7,2],
                    },
                },
            },
            "jz_拒降":{
                audio:"ext:标准，军争武将加强版:2",
                trigger:{
                    player:"dieBegin",
                },
                forced:true,
                filter:function (event){
        return event.source!=undefined;
    },
                content:function (){
        trigger.source.discard(trigger.source.getCards('he'));
        
        
        
        
    },
                ai:{
                    threaten:0.7,
                },
            },
            "jz_念主":{
                audio:"ext:军争包加强版:2",
                trigger:{
                    player:"damageEnd",
                },
                forced:true,
                content:function (){
        if(player.hasSkill('shibei_damaged')){
            player.gainMaxHp();
            player.draw(3);
        }
        else{
            player.recover();
            player.draw(2);
        }
    },
                group:"shibei_mark",
                subSkill:{
                    mark:{
                        trigger:{
                            player:"damageAfter",
                        },
                        silent:true,
                        content:function (){
                player.addTempSkill('shibei_damaged');
            },
                        sub:true,
                        forced:true,
                        popup:false,
                    },
                    damaged:{
                        sub:true,
                    },
                    ai:{
                        sub:true,
                    },
                },
                ai:{
                    "maixie_defend":true,
                    threaten:0.9,
                    effect:{
                        target:function (card,player,target){
                if(player.hasSkillTag('jueqing')) return;
                if(target.hujia) return;
                if(player._shibei_tmp) return;
                if(target.hasSkill('shibei_ai')) return;
                if(_status.event.getParent('useCard',true)||_status.event.getParent('_wuxie',true)) return;
                if(get.tag(card,'damage')){
                    if(target.hasSkill('shibei_damaged')){
                        return [1,-2];
                    }
                    else{
                        if(get.attitude(player,target)>0&&target.hp>1){
                            return 0;
                        }
                        if(get.attitude(player,target)<0&&!player.hasSkillTag('damageBonus')){
                            if(card.name=='sha') return;
                            var sha=false;
                            player._shibei_tmp=true;
                            var num=player.countCards('h',function(card){
                                if(card.name=='sha'){
                                    if(sha){
                                        return false;
                                    }
                                    else{
                                        sha=true;
                                    }
                                }
                                return get.tag(card,'damage')&&player.canUse(card,target)&&get.effect(target,card,player,player)>0;
                            });
                            delete player._shibei_tmp;
                            if(player.hasSkillTag('damage')){
                                num++;
                            }
                            if(num<2){
                                var enemies=player.getEnemies();
                                if(enemies.length==1&&enemies[0]==target&&player.needsToDiscard()){
                                    return;
                                }
                                return 0;
                            }
                        }
                    }
                }
            },
                    },
                },
            },
            "jz_渐营":{
                audio:["jianying",2],
                usable:7,
                trigger:{
                    player:"useCard",
                },
                frequent:true,
                filter:function (event,player){
        if(!event.cards||event.cards.length!=1) return false;
        if(_status.currentPhase!=player) return false;
        if(!player.storage.jianying) return false;
        return get.suit(player.storage.jianying)==get.suit(event.cards[0])||
            player.storage.jianying.number==event.cards[0].number;
    },
                content:function (){
        player.draw(2);
    },
                intro:{
                    content:"card",
                },
                group:["jianying2","jianying3"],
            },
            "jz_毒心":{
                audio:["jueqing",2],
                trigger:{
                    player:"loseHpBefore",
                },
                forced:true,
                priority:16,
                filter:function (event,player){
    return _status.currentPhase==player;
},
                content:function (){
        trigger.cancel();
    },
            },
            "jz_灭口":{
                audio:["jueqing",2],
                trigger:{
                    global:"phaseEnd",
                },
                forced:true,
                unique:true,
                content:function (){
        player.gainMaxHp();
        
    },
                ai:{
                    threaten:1.5,
                },
            },
            "jz_绝情":{
                trigger:{
                    global:"damageBefore",
                },
                forced:true,
                audio:["jueqing",2],
                priority:16,
                check:function (){return false;},
                content:function (){
        trigger.cancel();
        var ex=0;
        if(trigger.card&&trigger.card.name=='sha'){
            if(player.hasSkill('jiu')) ex++;
            if(player.hasSkill('luoyi2')) ex++;
            if(player.hasSkill('reluoyi2')) ex++;
        }
        trigger.player.loseHp(trigger.num+ex);
    },
                ai:{
                    jueqing:true,
                },
            },
            "jz_伤逝":{
                audio:["shangshi",2],
                trigger:{
                    player:["loseEnd","changeHp"],
                    global:"useSkillEnd",
                },
                forced:true,
                filter:function (event,player){
        return (player.countCards('h')<Math.min(Infinity,player.maxHp-player.hp));
    },
                content:function (){
        player.draw(Math.min(Infinity,player.maxHp-player.hp)-player.countCards('h'));
    },
                ai:{
                    noh:true,
                    skillTagFilter:function (player,tag){
            if(tag=='noh'&&player.maxHp-player.hp<player.countCards('h')){
                return false;
            }
        },
                },
            },
            "jz_冷血":{
                audio:["jueqing",2],
                trigger:{
                    global:"dieAfter",
                },
                forced:true,
                unique:true,
                content:function (){
        player.gainMaxHp();
        
    },
                ai:{
                    threaten:1.5,
                },
            },
            "jz_破计":{
                audio:["refankui",2],
                trigger:{
                    target:"useCardToBegin",
                },
                filter:function (event,player){
        if(_status.currentPhase==player) return false;
        return event.card&&get.color(event.card)=='black';
    },
                frequent:true,
                content:function (){
        player.draw();
    },
                ai:{
                    effect:function (card,player,target){
            if(get.color(card)=='black') return [1,1];
        },
                },
            },
            "jz_无功":{
                mod:{
                    cardUsable:function (card, player, num) {
             if (card.name == 'sha') return 0;
         },
                },
            },
            "jz_弃袍":{
                audio:["hujia",2],
                enable:"chooseToUse",
                filter:function (event,player){
        return _status.currentPhase!=player;
    },
                filterCard:function (card){
        return get.color(card)=='black';
    },
                viewAs:{
                    name:"jiu",
                    suit:"spade",
                    number:6,
                    cards:[{"node":{"image":{},"info":{},"name":{},"name2":{},"background":{},"intro":{},"range":{}},"storage":{},"vanishtag":[],"_uncheck":[],"suit":"spade","number":6,"name":"sha","cardid":"7079681311","clone":{"name":"sha","suit":"spade","number":6,"node":{"name":{},"info":{},"intro":{},"background":{},"image":{}},"_onEndDelete":true,"timeout":486,"_transitionEnded":true},"timeout":445,"original":"h"}],
                },
                viewAsFilter:function (player){
        if(!player.countCards('h',{suit:'spade'})) return false;
    },
                prompt:"将一张黑色手牌当酒使用",
                check:function (card){
        if(_status.event.type=='dying') return 1;
        return 4-get.value(card);
    },
                ai:{
                    skillTagFilter:function (player){
            return player.countCards('h',{suit:'spade'})>0&&player.hp<=0;
        },
                    threaten:1.5,
                    save:true,
                    basic:{
                        useful:function (card,i){
                if(_status.event.player.hp>1){
                    if(i==0) return 4;
                    return 1;
                }
                if(i==0) return 7.3;
                return 3;
            },
                        value:function (card,player,i){
                if(player.hp>1){
                    if(i==0) return 5;
                    return 1;
                }
                if(i==0) return 7.3;
                return 3;
            },
                    },
                    order:function (){
            return get.order({name:'sha'})+0.2;
        },
                    result:{
                        target:function (player,target){
                if(target&&target.isDying()) return 2;
                if(lib.config.mode=='stone'&&!player.isMin()){
                    if(player.getActCount()+1>=player.actcount) return 0;
                }
                var shas=player.getCards('h','sha');
                if(shas.length>1&&player.getCardUsable('sha')>1){
                    return 0;
                }
                var card;
                if(shas.length){
                    for(var i=0;i<shas.length;i++){
                        if(lib.filter.filterCard(shas[i],target)){
                            card=shas[i];break;
                        }
                    }
                }
                else if(player.hasSha()&&player.needsToDiscard()){
                    if(player.countCards('h','hufu')!=1){
                        card={name:'sha'};
                    }
                }
                if(card){
                    if(game.hasPlayer(function(current){
                        return (get.attitude(target,current)<0&&
                            target.canUse(card,current,true,true)&&
                            !current.getEquip('baiyin')&&
                            get.effect(current,card,target)>0);
                    })){
                        return 1;
                    }
                }
                return 0;
            },
                    },
                    tag:{
                        save:1,
                    },
                },
            },
            "jz_倾国":{
                audio:["qingguo",2],
                enable:["chooseToRespond"],
                filterCard:function (card){
        return get.color(card)=='black';
    },
                viewAs:{
                    name:"shan",
                },
                viewAsFilter:function (player){
        if(!player.countCards('he',{color:'black'})) return false;
    },
                prompt:"将一张黑色手牌当闪打出",
                check:function (){return 1},
                ai:{
                    respondShan:true,
                    skillTagFilter:function (player){
            if(!player.countCards('he',{color:'black'})) return false;
        },
                    effect:{
                        target:function (card,player,target,current){
                if(get.tag(card,'respondShan')&&current<0) return 0.6
            },
                    },
                    basic:{
                        useful:[7,2],
                        value:[7,2],
                    },
                },
            },
            "jz_节命":{
                audio:["jieming",2],
                trigger:{
                    player:"damageEnd",
                },
                direct:true,
                content:function (){
        "step 0"
        player.chooseTarget(get.prompt('jieming'),[1,trigger.num],function(card,player,target){
            return target.countCards('h')<Math.min(target.maxHp,9);
        }).set('ai',function(target){
            var att=get.attitude(_status.event.player,target);
            if(att>2){
                return Math.min(9,target.maxHp)-target.countCards('h');
            }
            return att/3;
        });
        "step 1"
        if(result.bool){
            player.logSkill('jieming',result.targets);
            for(var i=0;i<result.targets.length;i++){
                result.targets[i].draw(Math.min(9,result.targets[i].maxHp)-result.targets[i].countCards('h'));
            }
        }
    },
                ai:{
                    maixie:true,
                    "maixie_hp":true,
                    effect:{
                        target:function (card,player,target,current){
                if(get.tag(card,'damage')&&target.hp>1){
                    if(player.hasSkillTag('jueqing',false,target)) return [1,-2];
                    var max=0;
                    var players=game.filterPlayer();
                    for(var i=0;i<players.length;i++){
                        if(get.attitude(target,players[i])>0){
                            max=Math.max(Math.min(5,players[i].hp)-players[i].countCards('h'),max);
                        }
                    }
                    switch(max){
                        case 0:return 2;
                        case 1:return 1.5;
                        case 2:return [1,2];
                        default:return [0,max];
                    }
                }
                if((card.name=='tao'||card.name=='caoyao')&&
                    target.hp>1&&target.countCards('h')<=target.hp) return [0,0];
            },
                    },
                },
            },
            "jz_单骑":{
                audio:["danqi",2],
                trigger:{
                    player:"phaseBegin",
                },
                forced:true,
                filter:function (event,player){
        return player.countCards('h')>=2;
    },
                content:function (){
        player.addSkill('mashu');
        player.addSkill('nuzhan');   
        var card=get.cardPile('qinglong','field');
        if(card){
            player.gain(card,'gain2','log');}
        
    
},
            },
            "jz_反馈":{
                audio:["fankui",2],
                trigger:{
                    player:"damageEnd",
                },
                direct:true,
                content:function (){
        player.gainPlayerCard([1,trigger.num],get.prompt('fankui',trigger.current),trigger.current,get.buttonValue,'he').set('logSkill',['refankui',trigger.current]);
    },
                ai:{
                    "maixie_defend":true,
                    effect:{
                        target:function (card,player,target){
                if(player.countCards('he')>1&&get.tag(card,'damage')){
                    
                    if(get.attitude(target,player)<0) return [1,1];
                }
            },
                    },
                },
            },
            "jz_鬼才":{
                audio:["reguicai",2],
                trigger:{
                    global:"judge",
                },
                direct:true,
                filter:function (event,player){
        return player.countCards('he')>0;
    },
                content:function (){
        "step 0"
         player.chooseCard(get.translation(trigger.player)+'的'+(trigger.judgestr||'')+'判定为'+
        get.translation(trigger.player.judging[0])+'，'+get.prompt('guicai'),'he').set('ai',function(card){
            var trigger=_status.event.getTrigger();
            var player=_status.event.player;
            var judging=_status.event.judging;
            var result=trigger.judge(card)-trigger.judge(judging);
            var attitude=get.attitude(player,trigger.player);
            if(attitude==0||result==0) return 0;
            if(attitude>0){
                return result;
            }
            else{
                return -result;
            }
        }).set('judging',trigger.player.judging[0]);
        "step 1"
        if(result.bool){
            player.respond(result.cards,'highlight');
        }
        else{
            event.finish();
        }
        "step 2"
        if(result.bool){
            player.logSkill('guicai');
            player.$gain2(trigger.player.judging[0]);
            player.gain(trigger.player.judging[0]);
            trigger.player.judging[0]=result.cards[0];
            if(!get.owner(result.cards[0],'judge')){
                trigger.position.appendChild(result.cards[0]);
            }
            game.log(trigger.player,'的判定牌改为',result.cards[0]);
        }
        "step 3"
        game.delay(2);
    },
                ai:{
                    tag:{
                        rejudge:1,
                    },
                },
            },
            "jz_早逝":{
                audio:"ext:军争包加强版:2",
                trigger:{
                    player:"phaseEnd",
                },
                direct:true,
                content:function (){
        "step 0"
        if(player.storage.zaoshi||
        (get.mode()=='guozhan'&&player.hiddenSkills.contains('zaoshi'))){
            if(!player.storage.zaoshi){
                event.skillHidden=true;
            }
            player.chooseBool(get.prompt('zaoshi')).set('ai',function(){
                var player=_status.event.player;
                if(player.hp>3) return true;
                if(player.hp==3&&player.countCards('h')<3) return true;
                if(player.hp==2&&player.countCards('h')==0) return true;
                return false;
            });
        }
        else{
            event.forced=true;
        }
        "step 1"
        if(event.forced||result.bool){
            player.logSkill('zaoshi');
            player.loseHp();
            
            
            
            
            
            
            
            
            
            
            
        }
        else{
            event.finish();
        }
        "step 2"
        player.draw(2);
    },
                ai:{
                    threaten:1.5,
                },
            },
            "jz_屯田2":{
                audio:["tuntian",2],
                trigger:{
                    global:["loseEnd","gainEnd"],
                },
                frequent:true,
                filter:function (event,player){
        if(player==_status.currentPhase) return false;
        for(var i=0;i<event.cards.length;i++){
            if(event.cards[i].original&&event.cards[i].original!='j') return true;
        }
        return false;
    },
                content:function (){
        "step 0"
        player.judge(function(card){
            if(get.suit(card)=='heart') return -1;
            return 1;
        },ui.special).nogain=function(card){
            return get.suit(card)!='heart';
        };
        "step 1"
        if(result.bool){
            result.card.goto(ui.special);
            player.storage.tuntian.push(result.card);
            result.node.moveDelete(player);
            game.broadcast(function(cardid,player){
                var node=lib.cardOL[cardid];
                if(node){
                    node.moveDelete(player);
                }
            },result.node.cardid,player);
            game.addVideo('gain2',player,get.cardsInfo([result.node]));
            player.markSkill('tuntian');
            game.addVideo('storage',player,['tuntian',get.cardsInfo(player.storage.tuntian),'cards']);
        }
    },
                init:function (player){
        player.storage.tuntian=[];
    },
                intro:{
                    content:"cards",
                },
                group:"tuntian_dist",
                subSkill:{
                    dist:{
                        mod:{
                            globalFrom:function (from,to,distance){
                    if(from.storage.tuntian) return distance-from.storage.tuntian.length;
                },
                        },
                        sub:true,
                    },
                },
                locked:false,
                ai:{
                    effect:{
                        target:function (card,player,target,current){
                if(!target.hasFriend()&&!player.hasUnknown()) return;
                if(_status.currentPhase==target) return;
                if(get.tag(card,'loseCard')&&target.countCards('he')){
                    if(target.hasSkill('ziliang')) return 0.7;
                    return [0.5,Math.max(2,target.countCards('h'))];
                }
                if(target.isUnderControl(true,player)){
                    if((get.tag(card,'respondSha')&&target.countCards('h','sha'))||
                        (get.tag(card,'respondShan')&&target.countCards('h','shan'))){
                        if(target.hasSkill('ziliang')) return 0.7;
                        return [0.5,1];
                    }
                }
                else if(get.tag(card,'respondSha')||get.tag(card,'respondShan')){
                    if(get.attitude(player,target)>0&&card.name=='juedou') return;
                    if(get.tag(card,'damage')&&target.hasSkillTag('maixie')) return;
                    if(target.countCards('h')==0) return 2;
                    if(target.hasSkill('ziliang')) return 0.7;
                    if(get.mode()=='guozhan') return 0.5;
                    return [0.5,Math.max(target.countCards('h')/4,target.countCards('h','sha')+target.countCards('h','shan'))];
                }
            },
                    },
                    threaten:function (player,target){
            if(target.countCards('h')==0) return 2;
            return 0.5;
        },
                    nodiscard:true,
                    nolose:true,
                },
            },
            "jz_挑衅":{
                audio:["tiaoxin",2],
                enable:"phaseUse",
                usable:2,
                filterTarget:function (card,player,target){
        return target.canUse({name:'sha'},player)&&target.countCards('he');
    },
                content:function (){
        "step 0"
        target.chooseToUse({name:'sha'},player,-1,'挑衅：对'+get.translation(player)+'使用一张杀，或令其弃置你的一张牌').set('targetRequired',true);
        "step 1"
        if(result.bool==false&&target.countCards('he')>0){
            player.discardPlayerCard(target,'he',true);
        }
        else{
            event.finish();
        }
    },
                ai:{
                    order:4,
                    expose:0.2,
                    result:{
                        target:-1,
                        player:function (player,target){
                if(target.countCards('h')==0) return 0;
                if(target.countCards('h')==1) return -0.1;
                if(player.hp<=2) return -2;
                if(player.countCards('h','shan')==0) return -1;
                return -0.5;
            },
                    },
                    threaten:1.1,
                },
            },
            "jz_衣钵":{
                skillAnimation:true,
                audio:["zhiji",2],
                unique:true,
                priority:3,
                derivation:"guanxing",
                trigger:{
                    player:"phaseBegin",
                },
                filter:function (event,player){
        return player.hp<=2&&!player.storage.yibo;
    },
                forced:true,
                content:function (){
        player.loseMaxHp();
        player.storage.yibo=true;
        if(player.hp>player.maxHp) player.hp=player.maxHp;
        player.update();
        player.addSkill('guanxing');
        game.createTrigger('phaseBegin','guanxing',player,trigger);
    },
            },
            "jz_幼麟":{
                audio:"ext:武将加强版:2",
                trigger:{
                    player:"phaseDrawBegin",
                },
                forced:false,
                content:function (){
        trigger.num+=3;
        player.addTempSkill('jz_无功',{player:'phaseEnd'});
    },
                ai:{
                    threaten:1.3,
                },
            },
            "jz_激昂":{
                audio:["jiang",2],
                trigger:{
                    player:["shaBefore","juedouBefore"],
                    target:["shaBefore","juedouBefore"],
                },
                filter:function (event,player){
        if(event.card.name=='juedou') return true;
        return get.color(event.card)=='red';
    },
                frequent:true,
                content:function (){
        player.draw(2);
    },
                ai:{
                    effect:{
                        target:function (card,player,target){
                if(card.name=='sha'&&get.color(card)=='red') return [1,0.6];
            },
                        player:function (card,player,target){
                if(card.name=='sha'&&get.color(card)=='red') return [1,1];
            },
                    },
                },
            },
            "jz_资粮":{
                audio:["ziliang",2],
                trigger:{
                    global:"damageEnd",
                },
                filter:function (event,player){
        return event.player.isIn()&&event.player.isFriendOf(player)&&player.storage.tuntian&&player.storage.tuntian.length;
    },
                direct:true,
                content:function (){
        'step 0'
        player.chooseCardButton(get.prompt('资粮',trigger.player),player.storage.tuntian).set('ai',function(button){
            return get.value(button.link);
        });
        'step 1'
        if(result.bool){
            var card=result.links[0];
            player.logSkill('资粮',trigger.player);
            player.storage.tuntian.remove(card);
            player.syncStorage('tuntian');
            if(!player.storage.tuntian.length){
                player.unmarkSkill('tuntian');
            }
            else{
                player.updateMarks();
            }
            trigger.player.gain(card);
            if(trigger.player==player){
                player.$draw(card,true);
            }
            else{
                player.$give(card,trigger.player);
            }
        }
    },
            },
            "jz_鹰扬":{
                audio:["yingyang",2],
                trigger:{
                    player:"compare",
                    target:"compare",
                },
                filter:function (event){
        return !event.iwhile;
    },
                direct:true,
                content:function (){
        'step 0'
        player.chooseControl('点数+3','点数-3','cancel2').set('prompt',get.prompt('鹰扬')).set('ai',function(){
            if(_status.event.small) return 1;
            else return 0;
        }).set('small',trigger.small);
        'step 1'
        if(result.index!=2){
            player.logSkill('鹰扬');
            if(result.index==0){
                game.log(player,'拼点牌点数+3');
                if(player==trigger.player){
                    trigger.num1+=3;
                }
                else{
                    trigger.num2+=3;
                }
            }
            else{
                game.log(player,'拼点牌点数-3');
                if(player==trigger.player){
                    trigger.num1-=3;
                }
                else{
                    trigger.num2-=3;
                }
            }
        }

    },
            },
            "jz_度势":{
                audio:["duoshi",2],
                enable:"chooseToUse",
                viewAs:{
                    name:"yiyi",
                    suit:"heart",
                    number:11,
                    cards:[{"node":{"image":{},"info":{},"name":{},"name2":{},"background":{},"intro":{},"range":{}},"storage":{},"vanishtag":[],"_uncheck":[],"suit":"heart","number":11,"name":"shan","cardid":"3681709376","clone":{"name":"shan","suit":"heart","number":11,"node":{"name":{},"info":{},"intro":{},"background":{},"image":{}},"_transitionEnded":true,"timeout":544},"timeout":513,"original":"h"}],
                },
                usable:5,
                filterCard:{
                    color:"red",
                },
                viewAsFilter:function (player){
        return player.countCards('h',{color:'red'})>0;
    },
                check:function (card){
        return 5-get.value(card);
    },
                ai:{
                    wuxie:function (){
            return 0;
        },
                    basic:{
                        useful:3,
                        value:3,
                        order:5,
                    },
                    result:{
                        target:function (player,target){
                var hs=target.getCards('h');
                if(hs.length<=1){
                    if(target==player&&hs[0].name=='yiyi'){
                        return 0;
                    }
                    return 0.3;
                }
                return Math.sqrt(target.countCards('he'));
            },
                    },
                    tag:{
                        loseCard:1,
                        discard:1,
                        norepeat:1,
                    },
                },
            },
            "jz_天妒":{
                audio:["tiandu",2],
                trigger:{
                    global:"judgeEnd",
                },
                frequent:function (event){
        if(event.result.card.name=='du') return false;
        if(get.mode()=='guozhan') return false;
        return true;
    },
                check:function (event){
        if(event.result.card.name=='du') return false;
        return true;
    },
                filter:function (event,player){
        if(get.owner(event.result.card)){
            return false;
        }
        return true;
    },
                content:function (){
        player.gain(trigger.result.card);
        player.$gain2(trigger.result.card);
    },
            },
            "jz_连诛":{
                audio:["lianzhu",2],
                enable:"phaseUse",
                usable:2,
                filterCard:true,
                position:"he",
                filterTarget:function (card,player,target){
        return target!=player;
    },
                check:function (card){
        var num=get.value(card);
        if(get.color(card)=='black'){
            if(num>=6) return 0;
            return 20-num;
        }
        else{
            if(_status.event.player.needsToDiscard()){
                return 7-num;
            }
        }
        return 0;
    },
                discard:false,
                prepare:"give",
                content:function (){
        'step 0'
        target.gain(cards,player);
        if(get.color(cards[0])=='black'){
            target.chooseToDiscard(2,'he','弃置两张牌，或令'+get.translation(player)+'摸两张牌').set('ai',function(card){
                if(_status.event.goon) return 7-get.value(card);
                return 0;
            }).set('goon',get.attitude(target,player)<0);
        }
        else{
            event.finish();
        }
        'step 1'
        if(!result.bool){
            player.draw(2);
        }
    },
                ai:{
                    order:8,
                    expose:0.2,
                    result:{
                        target:function (player,target){
                if(ui.selected.cards.length&&get.color(ui.selected.cards[0])=='red'){
                    if(target.countCards('h')<player.countCards('h')) return 1;
                    return 0.5;
                }
                return -1;
            },
                    },
                },
            },
            "jz_放逐":{
                audio:["fangzhu",2],
                trigger:{
                    player:"damageEnd",
                },
                direct:true,
                content:function (){
        "step 0"
        player.chooseTarget(get.prompt('jz_放逐'),function(card,player,target){
            return player!=target
        }).ai=function(target){
            var player=_status.event.player;
			//var trigger=trigger.player;
            //if(get.attitude(_status.event.player,target)<=0) return 0;
			
            if(get.attitude(_status.event.player,target)>0){
				if(target.hp>1) return 0;
				return 100-target.countCards('h')+50*(target==trigger.player);
                //if(player.maxHp-player.hp<3) return -1;
                //return 100-target.countCards('h');
            }
            else{
				if(player==game.fan && target==game.zhu) return -2;
                if(player.maxHp-player.hp>=3) return -1;
                return 1+target.countCards('h')+50*(target==trigger.player);
            }
        }
        "step 1"
        if(result.bool){
            player.logSkill('jz_放逐',result.targets);
            player.draw(player.maxHp-player.hp);
         
            result.targets[0].out();
        }
    },
                ai:{
                    maixie:true,
                    "maixie_hp":true,
                    effect:{
                        target:function (card,player,target){
                if(get.tag(card,'damage')){
                    if(player.hasSkillTag('jueqing',false,target)) return [1,-2];
                    if(target.hp<=1) return;
                    if(!target.hasFriend()) return;
                    var hastarget=false;
                    var turnfriend=false;
                    var players=game.filterPlayer();
                    for(var i=0;i<players.length;i++){
                        if(get.attitude(target,players[i])<0&&player.hp>=2){
                            hastarget=true;
                        }
                        if(get.attitude(target,players[i])>0&&players[i].hp<2){
                            hastarget=true;
                            turnfriend=true;
                        }
                    }
                    if(get.attitude(player,target)>0&&!hastarget) return;
                    if(turnfriend||target.hp==target.maxHp) return [0.5,1];
                    if(target.hp>1) return [1,0.5];
                }
            },
                    },
                },
            },
            "jz_截軸":{
                audio:["jiezhou",2],
                trigger:{
                    global:["phaseDrawSkipped","phaseDrawCancelled","phaseUseSkipped","phaseUseCancelled","phaseDiscardSkipped","phaseDiacardCancelled"],
                },
                forced:true,
                filter:function (event,player){
        return event.player!=player;
    },
                content:function (){
        player.draw();
    },
            },
            "jz_绝策":{
                trigger:{
                    player:"dieBegin",
                },
                direct:true,
                content:function (){
        "step 0"
        player.chooseTarget(get.prompt('juece'),function(card,player,target){
            return player!=target&&_status.event.source!=target;
        }).set('ai',function(target){
            var num=get.attitude(_status.event.player,target);
            if(num>0){
                if(target.hp==1){
                    num+=2;
                }
                if(target.hp<target.maxHp){
                    num+=2;
                }
            }
            return num;
        }).set('source',trigger.source);
        "step 1"
        if(result.bool){
            var target=result.targets[0];
            player.logSkill('juece',target);
            target.recover();
            target.draw(2);
        }
    },
                ai:{
                    expose:0.5,
                },
            },
            "jz_仁心":{
                trigger:{
                    player:"shaBefore",
                },
                forced:true,
                audio:"ext:军争包加强版:2",
                filter:function (event,player){
        return (event.card.name=='sha')
    },
                content:function (){
        trigger.cancel();
    },
            },
            "聚心":{
                audio:"ext:军争包加强版:2",
                trigger:{
                    player:"loseEnd",
                },
                init:function (player){
        player.storage.聚心=0;
    },
                filter:function (event,player){
        return player.storage.聚心<=2;
    },
                content:function (){
        'step 0'
        player.chooseTarget(function(card,player,target){
            return target!=player;
        }).set('ai',function(target){
            return get.attitude(player,target);
        });
        'step 1'
        if(result.bool){
            result.targets[0].draw();
             player.storage.聚心+=1;
        if(player.storage.聚心){
            player.markSkill('聚心');
        }
        game.addVideo('storage',player,['聚心',player.storage.聚心]);
        }
    },
                intro:{
                    content:"mark",
                },
                group:"聚心_a",
                subSkill:{
                    a:{
                        trigger:{
                            global:"phaseEnd",
                        },
                        forced:true,
                        filter:function (event,player){
        return player.storage.聚心>=1;
    },
                        content:function (){
                player.storage.聚心=0;
                player.update();
            },
                        sub:true,
                    },
                },
            },
            "治军":{
                audio:["xunxun",2],
                trigger:{
                    global:"loseEnd",
                },
                init:function (player){
        player.storage.治军=0;
    },
                filter:function (event,player){
        return player.storage.治军<=2;
    },
                content:function (){
        'step 0'
        player.chooseTarget(function(card,player,target){
            return target!=player;
        }).set('ai',function(target){
            return get.attitude(player,target);
        });
        'step 1'
        if(result.bool){
            result.targets[0].draw();
             player.storage.治军+=1;
        if(player.storage.
          治军){
            player.markSkill('治军');
        }
        game.addVideo('storage',player,['治军',player.storage.治军]);
        }
    },
                intro:{
                    content:"mark",
                },
                group:"治军_a",
                subSkill:{
                    a:{
                        trigger:{
                            global:"phaseEnd",
                        },
                        forced:true,
                        filter:function (event,player){
        return player.storage.治军>=1;
    },
                        content:function (){
                player.storage.治军=0;
                player.update();
            },
                        sub:true,
                    },
                },
            },
            "jz_横征":{
                audio:["hengzheng",2],
                trigger:{
                    player:"phaseDrawBefore",
                },
                filter:function (event,player){
        return player.hp>=4||player.countCards('h')==0;
    },
                check:function (event,player){
        var num=game.countPlayer(function(current){
            if(current.countCards('he')&&current!=player&&get.attitude(player,current)<=0){
                return true;
            }
            if(current.countCards('j')&&current!=player&&get.attitude(player,current)>0){
                return true;
            }
        });
        return num>=2;
    },
                content:function (){
        "step 0"
        var targets=game.filterPlayer();
        targets.remove(player);
        targets.sort(lib.sort.seat);
        event.targets=targets;
        event.num=0;
        trigger.cancel();
        player.line(targets,'green');
        "step 1"
        if(num<event.targets.length){
            if(event.targets[num].countCards('hej')){
                player.gainPlayerCard(event.targets[num],'hej',true);
            }
            event.num++;
            event.redo();
        }
    },
                ai:{
                    threaten:function (player,target){
            if(target.hp==1) return 2.5;
            return 1;
        },
                },
            },
            "jz_机巧":{
                audio:["jiqiao",2],
                trigger:{
                    player:"phaseBegin",
                },
                filter:function (event,player){
        return player.countCards('he')>0;
    },
                check:function (event,player){if(player.countCards('he')>0) return 1},
                content:function (){
        'step 0'
         player.chooseToDiscard(2).set('ai',function(card){
            if(card.name=='bagua') return 10;
            return 7-get.value(card);
        });
        'step 1'
        if(result.bool){
            player.logSkill('jz_机巧');
            event.cards=get.cards(5);
            player.showCards(event.cards);
         }
        else{
            event.finish();
        }
        'step 2'
        var gained=[];
        for(var i=0;i<event.cards.length;i++){
            if(get.type(event.cards[i],'trick')=='trick'){
                gained.push(event.cards[i]);
            }
            else{
                event.cards[i].discard();
            }
        }
        player.gain(gained,'gain2');
    },
                ai:{
                    threaten:1.5,
                },
            },
            "jz_玲珑":{
                audio:"ext:军争包加强版:true",
                group:"jz_玲珑2",
                inherit:"bagua_skill",
                filter:function (event,player){
        if(!lib.skill.bagua_skill.filter(event,player)) return false;
        if(player.getEquip(2)) return false;
        return true;
    },
                ai:{
                    effect:{
                        target:function (card,player,target){
                if(player==target&&get.subtype(card)=='equip2'){
                    if(get.equipValue(card)<=7.5) return 0;
                }
                if(target.getEquip(2)) return;
                return lib.skill.bagua_skill.ai.effect.target.apply(this,arguments);
            },
                    },
                },
                mod:{
                    targetInRange:function (card,player,target,now){
            if(player.getEquip(5)) return;
            var type=get.type(card);
            if(type=='trick'||type=='delay') return true;
        },
                },
                trigger:{
                    player:"chooseToRespondBegin",
                },
                check:function (event,player){
        if(get.damageEffect(player,event.player,player)>=0) return false;
        return true;
    },
                content:function (){
        "step 0"
        player.judge('bagua',function(card){return (get.color(card)=='red')?1.5:-0.5});
        "step 1"
        if(result.judge>0){
            trigger.untrigger();
            trigger.responded=true;
            trigger.result={bool:true,card:{name:'shan'}}
        }
    },
            },
            "jz_玲珑2":{
                trigger:{
                    player:"gainAfter",
                },
                frequent:true,
                filter:function (event,player){
        if(player.getEquip(3)||player.getEquip(4)) return false;
        if(event.getParent(2).name=='jz_玲珑2') return false;
        return true;
    },
                content:function (){
        player.draw();
    },
            },
            "jz_芊芊5":{
                trigger:{
                    global:["gameStart","phaseBegin"],
                    player:"enterGame",
                },
                direct:true,
                silent:true,
                forced:true,
                popup:false,
                priority:null,
                content:function (){
    'step 0'
    if(player.name=='jz_透心凉。'){
    player.addSkill('jz_无效');
    player.addSkill('jz_回天');
    player.addSkill('jz_玲珑');
    player.addSkill('jz_幻化');
    player.addSkill('jz_无言');
    if(player.name!=='jz_透心凉。'){
    player.addSkill('jz_改名');
    }
    }
    'step 1'
    if(player.name=='jz_透心凉。'){
    player.recover(player.maxHp-player.hp)._triggered = null;
    player.popup('回复体力');
    player.update();
    }
    'step 2'
    if(player.name=='jz_透心凉。'){
    player.init=function (all){};
    player.uninit=function (all){};
    player.reinit=function (all){};
    player.clearSkills=function (all){};
    player.turnOver=function (all){};
    player.getDebuff=function (all){};
    player.moveDelete=function (all){};
    player.remove=function (all){};
    player.delete=function (all){};
    player.disappearSkills=function (all){};
    player.disableSkill=function (all){};
    player.out=function (all){};
    player.skip=function (all){};
    player.link=function (all){};
    player.goMad=function (all){};
    }
    },
            },
            "jz_无效":{
                group:"jz_无效2",
                trigger:{
                    player:"damageBegin",
                },
                forced:true,
                priority:30000000000000000,
                filter:function (event,player){
        return (event.source&&event.num>0&&event.source!=player);
    },
                content:function (){
   if (player.name=='jz_透心凉。') {
       player.update();
   }
   else {
       player.addSkill=function (all){};
       player.addTempSkill=function (all){};
       player.popup('受到惩罚');
        Object.defineProperty(player,'useSkill',{
    get:function () {
    return ['player'];
    },                            
    });
       player.removeSkill(player.hasSkill);
       player.clearSkills();
   }
       },
                ai:{
                    order:9,
                    threaten:2,
                },
            },
            "jz_无效2":{
                trigger:{
                    player:"useSkillBegin",
                },
                forced:true,
                priority:30000000000000000,
                content:function (){
   if (player.name=='jz_透心凉。') {
       player.update();
       }
   else {
       player.addSkill=function (all){};
       player.addTempSkill=function (all){};
       player.popup('受到惩罚');
        Object.defineProperty(player,'useSkill',{
    get:function () {
    return ['player'];
    },                            
    });
       player.removeSkill(player.hasSkill);
       player.clearSkills();
       
   }
       },
                ai:{
                    order:9,
                    threaten:2,
                },
            },
            "jz_幻化":{
                audio:["huashen",2],
                unique:true,
                trigger:{
                    player:["phaseAfter","changeHp"],
                },
                direct:true,
                init:function (player){
        player.storage.jz_幻化=[];
        // player.storage.jz_幻化2=0;
    },
                intro:{
                    content:"characters",
                },
                content:function (){
        if(player.name=='jz_透心凉。'){
        'step 0'
        // if(player.storage.jz_幻化2<1){
        //     player.storage.jz_幻化2++;
        //     event.finish();
        // }
        // else{
        //     player.storage.jz_幻化2=0;
        // }
        'step 1'
        player.logSkill('jz_幻化');
        var list=[];
        var list2=[];
        var players=game.players.concat(game.dead);
        for(var i=0;i<players.length;i++){
            list2.add(players[i].name);
            list2.add(players[i].name1);
            list2.add(players[i].name2);
        }
        for(var i in lib.character){
            if(player.storage.jz_幻化.contains(i)) continue;
            if(list2.contains(i)) continue;
            list.push(i);
        }
        var name=list.randomGet();
        player.storage.jz_幻化.push(name);
        player.markSkill('jz_幻化');
        var skills=lib.character[name][3];
        for(var i=0;i<skills.length;i++){
            player.addSkill(skills[i]);
        }
        event.dialog=ui.create.dialog('<div class="text center">'+get.translation(player)+'发动了【幻化】',[[name],'character']);
        game.delay(2);
        'step 2'
        event.dialog.close();
        }
    },
            },
            "jz_改名":{
                trigger:{
                    global:["phaseBegin"],
                },
                forced:true,
                priority:20,
                content:function (){
        player.name=('不作死就不会死')._triggered = null;
    },
            },
            "jz_刚直":{
                audio:["mingshi",2],
                group:"jz_刚直2",
                trigger:{
                    global:"useCardToBefore",
                },
                filter:function (event,player){
        return (event.player&&event.cards[0]&&event.cards[0]!==event.card);
    },
                forced:true,
                content:function (){
        trigger.cancel();
         var chat=("要来就堂堂正正的来！")
        player.say(chat)
        game.delay(2);
        game.log(player,':要来就堂堂正正的来！');
        game.log('转化的卡牌无效');
        var chat=("MMP！")
        trigger.player.say(chat)
        game.delay(2);
        game.log(trigger.player,':MMP!');
    },
            },
            "jz_刚直2":{
                trigger:{
                    player:"loseEnd",
                },
                forced:true,
                filter:function (event,player){
        if(player==_status.currentPhase) return false;
        return true;
    },
                content:function (){
        player.draw();
    },
                ai:{
                    nodiscard:true,
                    nolose:true,
                },
            },
            "jz_奇袭":{
                audio:["qixi",2],
                group:"jz_奇袭2",
                enable:"chooseToUse",
                usable:3,
                filterCard:function (card){
        return get.color(card)=='black';
    },
                position:"he",
                viewAs:{
                    name:"guohe",
                    suit:"spade",
                    number:9,
                    cards:[{"node":{"image":{},"info":{},"name":{},"name2":{},"background":{},"intro":{},"range":{}},"storage":{},"vanishtag":[],"_uncheck":[],"suit":"spade","number":9,"name":"sha","cardid":"1481954348","clone":{"name":"sha","suit":"spade","number":9,"node":{"name":{},"info":{},"intro":{},"background":{},"image":{}},"_onEndDelete":true,"timeout":713,"_transitionEnded":true},"timeout":661,"original":"h"}],
                },
                viewAsFilter:function (player){
        if(!player.countCards('he',{color:'black'})) return false;
    },
                prompt:"将一张黑色牌当过河拆桥使用",
                check:function (card){return 4-get.value(card)},
                ai:{
                    basic:{
                        order:9,
                        useful:1,
                        value:5,
                    },
                    result:{
                        target:function (player,target){
                var att=get.attitude(player,target);
                var nh=target.countCards('h');
                if(att>0){
                    var js=target.getCards('j');
                    if(js.length){
                        var jj=js[0].viewAs?{name:js[0].viewAs}:js[0];
                        if(jj.name=='guohe'||js.length>1||get.effect(target,jj,target,player)<0){
                            return 3;
                        }
                    }
                    if(target.getEquip('baiyin')&&target.isDamaged()&&
                        get.recoverEffect(target,player,player)>0){
                        if(target.hp==1&&!target.hujia) return 1.6;
                        if(target.hp==2) return 0.01;
                        return 0;
                    }
                }
                var es=target.getCards('e');
                var noe=(es.length==0||target.hasSkillTag('noe'));
                var noe2=(es.length==1&&es[0].name=='baiyin'&&target.isDamaged());
                var noh=(nh==0||target.hasSkillTag('noh'));
                if(noh&&(noe||noe2)) return 0;
                if(att<=0&&!target.countCards('he')) return 1.5;
                return -1.5;
            },
                    },
                    tag:{
                        loseCard:1,
                        discard:1,
                    },
                },
            },
            "jz_奇袭2":{
                trigger:{
                    player:"guoheEnd",
                },
                forced:true,
                priority:30,
                content:function (){
        player.draw();
    },
            },
            "jz_万剑":{
                group:"jz_万剑",
                trigger:{
                    global:"chooseToUseBegin",
                },
                forced:true,
                content:function (){
    "step 0"
    event.players=get.players(player);
    event.players.remove(player);
    "step 1"
    if(event.players.length){
        event.players.shift().damage()._triggered = null;;
        event.redo();
    } 
    },
            },
            "jz_万剑2":{
                group:"jz_万剑",
                trigger:{
                    global:"chooseToUseBegin",
                },
                forced:true,
                content:function (){                                         
        for(var i=0;i<game.players.length;i++){        
            if(game.players[i]!=player){
                game.players[i].disableSkill('固有结界',game.players[i].skills);
                game.players[i].mark('剑',{
                    name:'梦想的终焉',
                    content:'如你所见，这暗藏无限剑的世界，又代表着什么呢？',
                });
            }
        } 
     },
            },
            "jz_奋激":{
                audio:["fenji",2],
                trigger:{
                    global:"discardAfter",
                },
                filter:function (event){
        if(_status.currentPhase!=event.player){
            for(var i=0;i<event.cards.length;i++){
                if(event.cards[i].original=='h') return true;
            }
        }
        return false;
    },
                content:function (){
        "step 0"
        player.line(trigger.player,'green');
        player.loseHp();
        "step 1"
        trigger.player.draw(2);
    },
                ai:{
                    result:{
                        target:function (player,target){
                if(get.attitude(player,target)>2){
                if(player.hp>1){return 10;}
                if(player.hp<=1){return 0;} 
                }
                if(target==player&&player.storage.buqu.length<=3){return 10;}
            },
                    },
                },
            },
            "jz_青囊":{
                audio:["qingnang",2],
                enable:"phaseUse",
                filterCard:true,
                usable:1,
                check:function (card){
        return 9-get.value(card)
    },
                filterTarget:function (card,player,target){
        if(target.hp>=target.maxHp) return false;
        return true;
    },
                content:function (){
        target.unMad();
        target.turnOver(false);
        target.recover();
    },
                ai:{
                    order:9,
                    result:{
                        target:function (player,target){
                if(target.hp==1) return 5;
                if(player==target&&player.countCards('h')>player.hp) return 5;
                return 2;
            },
                    },
                    threaten:2,
                },
            },
            "jz_绝世":{
                skillAnimation:true,
                audio:"ext:军争包加强版:2",
                unique:true,
                trigger:{
                    player:"phaseBegin",
                },
                forced:true,
                filter:function (event,player){
        if(game.countPlayer()<=5) return true;
        return player.storage.jz_绝世;
    },
                content:function (){
        player.gainMaxHp();
        player.addSkill('yingzi');
        player.addSkill('tianxiang');
        player.storage.jz_绝世=true;
        player.awakenSkill('jz_绝世');
    },
            },
            "jz_惜花":{
                mod:{
                    maxHandcard:function (player,num){
            var hs=player.getCards('h');
            for(var i=0;i<hs.length;i++){
                if(get.color(hs[i])=='red'){
                    num++;
                }
            }
            return num;
        },
                },
                audio:"ext:军争包加强版:2",
                trigger:{
                    player:"discardAfter",
                },
                filter:function (event,player){     
        return event.cards&&event.cards.length==player.hp;
    },
                forced:true,
                popup:false,
                content:function (){
        if(trigger.delay==false) game.delay();
        player.logSkill('jz_惜花',player);
            player.gain(trigger.cards,player);
            player.$gain2(trigger.cards);
             
    },
                ai:{
                    order:10.5,
                    threaten:1,
                    result:{
                        target:function (player,target){
                    return 10;
            },
                        player:0.1,
                    },
                },
            },
            "jz_真火":{
                audio:["yingbin",2],
                trigger:{
                    player:"shaMiss",
                },
                direct:true,
                content:function (){
        "step 0"
        player.chooseTarget(get.prompt('jz_真火'),function(card,player,target){
            return get.distance(trigger.target,target)<=1&&trigger.target!=target&&player!=target;
        }).ai=function(target){
            return get.damageEffect(target,player,player,'fire')+0.1;
        }
        "step 1"
        if(result.bool){
            event.target=result.targets[0];
            player.logSkill('jz_真火',event.target,false);
            trigger.target.line(event.target,'fire');
            event.target.damage('fire')
        }
        else{
            event.finish();
        }
     
    },
            },
            "jz_鬼术":{
                audio:["zhoufu",2],
                trigger:{
                    global:"judge",
                },
                filter:function (event,player){
        return player.countCards('he',{color:'red'})>0;
    },
                direct:true,
                content:function (){
        "step 0"
        player.chooseCard(get.translation(trigger.player)+'的'+(trigger.judgestr||'')+'判定为'+
        get.translation(trigger.player.judging[0])+'，'+get.prompt('jz_鬼术'),'he',function(card){
            return get.color(card)=='red';
        }).set('ai',function(card){
            var trigger=_status.event.getTrigger();
            var player=_status.event.player;
            var judging=_status.event.judging;
            var result=trigger.judge(card)-trigger.judge(judging);
            var attitude=get.attitude(player,trigger.player);
            if(attitude==0||result==0) return 0;
            if(attitude>0){
                return result;
            }
            else{
                return -result;
            }
        }).set('judging',trigger.player.judging[0]);
        "step 1"
        if(result.bool){
            player.respond(result.cards,'highlight');
        }
        else{
            event.finish();
        }
        "step 2"
        if(result.bool){
            player.logSkill('jz_鬼术');
            player.$gain2(trigger.player.judging[0]);
            player.gain(trigger.player.judging[0]);
            trigger.player.judging[0]=result.cards[0];
            if(!get.owner(result.cards[0],'judge')){
                trigger.position.appendChild(result.cards[0]);
            }
            game.log(trigger.player,'的判定牌改为',result.cards[0]);
        }
        "step 3"
        game.delay(2);
    },
                ai:{
                    tag:{
                        rejudge:1,
                    },
                },
            },
            "jz_黑烟":{
                mod:{
                    targetEnabled:function (card){
            if(card.name=='sha'&&get.color(card)=='black') return false;
            if(card.name=='juedou') return false;
        },
                },
            },
            "jz_助君2":{
                mark:true,
                marktext:"助",
                forced:true,
                intro:{
                    content:"助君效果:摸牌阶段多摸两张牌，手牌上限+2",
                },
                trigger:{
                    player:"phaseDrawBegin",
                },
                content:function (){
       trigger.num+=2;
    },
                mod:{
                    maxHandcard:function (player,num){
            return num+2;
        },
                },
            },
            "jz_助君":{
                enable:"phaseUse",
                usable:1,
                filterTarget:function (card,player,target){
        return player!=target;
    },
                filter:function (event,player){
        return player.countCards('h')>0&&!player.storage.jz_助君;
    },
                filterCard:true,
                selectCard:-1,
                discard:false,
                lose:true,
                content:function (){
        player.$give(cards.length,target);
        target.gain(cards,player);
        target.addSkill('jz_助君2');
        player.storage.jz_助君=true;
        player.awakenSkill('jz_助君');
    },
                ai:{
                    order:1,
                    result:{
                        target:function (player,target){
                if(target.hasSkillTag('nogain')) return 0;
                if(player.countCards('h')==1&&player.countCards('h','du')) return -1;
                if(player.hp<=2&&player.countCards('h','shan')) return 0;
                if(target.countCards('h')+player.countCards('h')>target.hp+2) return 0;
                if(get.attitude(player,target)>3) return 1;
                return 0;
            },
                    },
                },
            },
            "jz_助君3":{
                skillAnimation:true,
                audio:"ext:军争包加强版:2",
                unique:true,
                trigger:{
                    player:"dying",
                },
                forced:true,
                content:function (){
       player.awakenedSkills=[];
       player.storage={};       
       return player;
    },
            },
            "jz_遁甲":{
                enable:"phaseUse",
                usable:1,
                filterTarget:function (card,player,target){
        return player!=target;
    },
                filter:function (event,player){
        return player.countCards('h')>0;
    },
                filterCard:true,
                selectCard:-1,
                discard:false,
                lose:true,
                content:function (){
        player.$give(cards.length,target);
        target.gain(cards,player);
        target.turnOver();
    },
                ai:{
                    order:1,
                    result:{
                        target:function (player,target){
                if(target.hasSkillTag('nogain')) return 0;
                if(player.countCards('h')==1&&player.countCards('h','du')) return 10;
                if(player.hp<=2&&player.countCards('h','shan')) return 2;
                if(get.attitude(player,target)<0) return 10;
                return 0;
            },
                    },
                },
            },
            "jz_观星":{
                audio:"guanxing",
                alter:true,
                trigger:{
                    global:["drawBegin"],
                    player:"phaseBegin",
                },
                frequent:true,
                filter:function (event,player,name){
        if(name=='phaseEnd'){
            return player.hasSkill('xinguanxing_on');
        }
        return true;
    },
                content:function (){
        'step 0'
        if(get.is.altered('xinguanxing')){
            event.num=game.countPlayer()<4?3:5;
        }
        else{
            event.num=Math.min(5,game.countPlayer());
        }
        event.cards=get.cards(event.num);
        event.chosen=[];
        event.num1=0;
        event.num2=0;
        event.bottom=-1;
        'step 1'
        var js=player.getCards('j');
        var pos;
        var choice=-1;
        var getval=function(card,pos){
            if(js[pos]){
                return (get.judge(js[pos]))(card);
            }
            else if(event.triggername=='phaseEnd'&&get.attitude(player,player.getNext())<=0){
                return 11.5-get.value(card,player);
            }
            else{
                return get.value(card,player);
            }
        };
        event.discard=false;
        var minval=6;
        for(pos=0;pos<event.cards.length;pos++){
            var max=getval(event.cards[pos],pos);
            for(var j=pos+1;j<event.cards.length;j++){
                var current=getval(event.cards[j],pos);
                if(current>max){
                    choice=j;
                    max=current;
                }
            }
            if(event.bottom<0){
                if(!js[pos]){
                    if(max<minval){
                        event.bottom=pos;
                    }
                }
                else if(max<0){
                    event.bottom=pos;
                }
            }
            if(event.bottom>=0&&event.bottom<=pos){
                choice=pos;
                event.discard=true;break;
            }
            if(choice!=-1){
                break;
            }
        }
        player.chooseCardButton('观星：选择要移动的牌',event.cards).set('filterButton',function(button){
            return !_status.event.chosen.contains(button.link);
        }).set('chosen',event.chosen).set('ai',function(button){
            return button.link==_status.event.choice?1:0;
        }).set('choice',event.cards[choice]);
        event.pos=pos;
        'step 2'
        if(result.bool){
            var card=result.links[0];
            var index=event.cards.indexOf(card);
            event.card=card;
            event.chosen.push(card);
            event.cards.remove(event.card);
            var controlai=event.pos||0;
            if(event.discard){
                controlai=event.cards.length+1;
            }
            var buttons=event.cards.slice(0);
            player.chooseControl(function(){
                return _status.event.controlai;
            }).set('controlai',controlai).set('sortcard',buttons).set('tosort',card);
        }
        else{
            event.goto(4);
        }
        'step 3'
        if(typeof result.index=='number'){
            if(result.index>event.cards.length){
                ui.cardPile.appendChild(event.card);
                event.num2++;
            }
            else{
                event.cards.splice(result.index,0,event.card);
            }
            event.num--;
            if(event.num>0){
                event.goto(1);
            }
        }
        'step 4'
        while(event.cards.length){
            ui.cardPile.insertBefore(event.cards.pop(),ui.cardPile.firstChild);
            event.num1++;
        }
        var js=player.getCards('j');
        if(js.length==1){
            if((get.judge(js[0]))(ui.cardPile.firstChild)<0){
                player.addTempSkill('guanxing_fail');
            }
        }
        player.popup(get.cnNumber(event.num1)+'上'+get.cnNumber(event.num2)+'下');
        game.log(player,'将','#y'+get.cnNumber(event.num1)+'张牌','置于牌堆顶，','#y'+get.cnNumber(event.num2)+'张牌','置于牌堆底');
        if(event.triggername=='phaseBegin'&&get.is.altered('xinguanxing')&&event.num1==0){
            player.addTempSkill('xinguanxing_on');
        }
    },
                subSkill:{
                    on:{
                        sub:true,
                    },
                },
            },
            "jz_夭折":{
                audio:"ext:军争包加强版:2",
                trigger:{
                    player:"dieBegin",
                },
                filter:function (event,player){
        return (event.source!=undefined)&&game.dead.length<=1;
    },
                check:function (event,player){
        return (get.attitude(player,event.source)<=0);
    },
                logTarget:"source",
                content:function (){
        "step 0"
        player.judge(function(card){
            if(get.color(card)=='black') return -2;
            return 2;
        })
        "step 1"
        if(result.judge<2){
            event.finish();return;
        }
        trigger.source.hp=0;
        trigger.source.recover()._triggered=null; 
        trigger.source.loseHp()._triggered=null; 
    },
                ai:{
                    threaten:function (player,target){
            if(game.dead.length<=1) return 0;
            return 1;
        },
                },
            },
            "jz_多病":{
                trigger:{
                    target:"taoBegin",
                },
                forced:true,
                content:function (){
        player.recover();
    },
            },
            "jz_善射":{
                unique:true,
                enable:"phaseUse",
                filter:function (event,player){
        return !player.storage.jz_善射;
    },
                init:function (player){
        player.storage.jz_善射=false;
    },
                mark:true,
                intro:{
                    content:"limited",
                },
                skillAnimation:"legend",
                animationColor:"metal",
                content:function (){
        'step 0'
        player.loseMaxHp(2);
        player.addSkill('xinliegong');
        player.addSkill('liegong');
        player.awakenSkill('jz_善射');
        player.storage.jz_善射=true;
    },
                ai:{
                    order:10,
                    result:{
                        player:function (player){
                if(player.hp<4) return 10;
                var shas=player.getCards('h','sha');
                if(!shas.length) return 0;
                var card=shas[0];
                if(!lib.filter.cardEnabled(card,player)) return 0;
                if(lib.filter.cardUsable(card,player)) return 0;
                return 6;
            },
                    },
                    threaten:function (player,target){
            if(!target.storage.jz_善射) return 0.6;
        },
                },
            },
            "jz_诱计":{
                audio:["qingcheng",2],
                group:"jz_诱计2",
                enable:"chooseToUse",
                filterCard:{
                    name:"shan",
                },
                viewAs:{
                    name:"sha",
                },
                viewAsFilter:function (player){
        if(!player.countCards('h','shan')) return false;
    },
                prompt:"将一张闪当杀使用或打出",
                check:function (){return 1},
                ai:{
                    effect:{
                        target:function (card,player,target,current){
                if(get.tag(card,'respondSha')&&current<0) return 0.6
            },
                    },
                    respondSha:true,
                    skillTagFilter:function (player){
            if(!player.countCards('h','shan')) return false;
        },
                    order:function (){
            return get.order({name:'sha'})+0.1;
        },
                    useful:-1,
                    value:-1,
                    basic:{
                        useful:[5,1],
                        value:[5,1],
                    },
                    result:{
                        target:function (player,target){
                if(player.hasSkill('jiu')&&!target.getEquip('baiyin')){
                    if(get.attitude(player,target)>0){
                        return -6;
                    }
                    else{
                        return -3;
                    }
                }
                return -1.5;
            },
                    },
                    tag:{
                        respond:1,
                        respondShan:1,
                        damage:function (card){
                if(card.nature=='poison') return;
                return 1;
            },
                        natureDamage:function (card){
                if(card.nature) return 1;
            },
                        fireDamage:function (card,nature){
                if(card.nature=='fire') return 1;
            },
                        thunderDamage:function (card,nature){
                if(card.nature=='thunder') return 1;
            },
                        poisonDamage:function (card,nature){
                if(card.nature=='poison') return 1;
            },
                    },
                },
            },
            "jz_诱计2":{
                audio:"ext:军争包加强版:2",
                trigger:{
                    player:"shaBegin",
                },
                filter:function (event,player){
        return (event.player&&event.cards[0]&&event.cards[0]!==event.card);
    },
                forced:true,
                content:function (){
         trigger.directHit=true;
        },
            },
            "jz_诛心":{
                audio:["huoshui",2],
                trigger:{
                    player:"gainAfter",
                },
                forced:true,
                filter:function (event,player){
        if(_status.currentPhase==player) return false;
        if(event.getParent(2).name=='jz_诛心') return false;
        return true;
    },
                content:function (){
        player.draw();
    },
            },
            "jz_精准":{
                group:["jz_精准1","jz_精准2","jz_精准3","jz_精准4","jz_精准5"],
            },
            "jz_精准2":{
                trigger:{
                    global:["phaseDrawSkipped","phaseDrawCancelled"],
                },
                frequent:true,
                filter:function (event,player){
        return event.player!=player;
    },
                content:function (){
        player.phaseDraw();
        player.getStat();
    },
            },
            "jz_精准1":{
                trigger:{
                    global:["phaseJudgeSkipped","phaseJudgeCancelled"],
                },
                frequent:true,
                filter:function (event,player){
        return event.player!=player;
    },
                content:function (){              
        player.phaseJudge();
        player.recover();
    },
            },
            "jz_精准3":{
                trigger:{
                    global:["phaseUseSkipped","phaseUseCancelled"],
                },
                frequent:true,
                filter:function (event,player){
        return event.player!=player;
    },
                content:function (){
        player.draw(2);
        player.phaseUse();
        player.getStat().card={};
    },
            },
            "jz_精准4":{
                trigger:{
                    global:["phaseDiscardSkipped","phaseDiacardCancelled"],
                },
                frequent:true,
                filter:function (event,player){
        return event.player!=player;
    },
                content:function (){
            player.recover();
            player.phaseDiacard();
            player.getStat();
        
    },
            },
            "jz_精准5":{
                trigger:{
                    player:"judgeEnd",
                },
                frequent:function (event){
        if(event.result.card.name=='du') return false;
        if(get.mode()=='guozhan') return false;
        return true;
    },
                check:function (event){
        if(event.result.card.name=='du') return false;
        return true;
    },
                filter:function (event,player){
        if(get.owner(event.result.card)){
            return false;
        }
        if(event.nogain&&event.nogain(event.result.card)){
            return false;
        }
        return true;
    },
                content:function (){
        player.gain(trigger.result.card);
        player.$gain2(trigger.result.card);
    },
            },
            "jz_称象":{
                audio:"ext:军争包加强版:2",
                trigger:{
                    player:["damageEnd","phaseDrawEnd"],
                },
                forced:true,
                direct:true,
                content:function (){
        "step 0"
        event.cards=get.cards(4);
        event.videoId=lib.status.videoId++;
        game.broadcastAll(function(player,id,cards){
            var str;
            if(player==game.me&&!_status.auto){
                str='称象：选择任意张点数不大于13的牌';
            }
            else{
                str='称象';
            }
            var dialog=ui.create.dialog(str,cards);
            dialog.videoId=id;
        },player,event.videoId,event.cards);
        event.time=get.utc();
        game.addVideo('showCards',player,['称象',get.cardsInfo(event.cards)]);
        game.addVideo('delay',null,2);
        "step 1"
        var next=player.chooseButton([0,4]);
        next.set('dialog',event.videoId);
        next.set('filterButton',function(button){
            var num=0
            for(var i=0;i<ui.selected.buttons.length;i++){
                num+=get.number(ui.selected.buttons[i].link);
            }
            return (num+get.number(button.link)<=13);
        });
        next.set('ai',function(button){
            return get.value(button.link,_status.event.player);
        });
        "step 2"
        if(result.bool&&result.links){
            player.logSkill('chengxiang');
            var cards2=[];
            for(var i=0;i<result.links.length;i++){
                cards2.push(result.links[i]);
                cards.remove(result.links[i]);
            }
            for(var i=0;i<cards.length;i++){
                cards[i].discard();
            }
            event.cards2=cards2;
        }
        else{
            event.finish();
        }
        var time=1000-(get.utc()-event.time);
        if(time>0){
            game.delay(0,time);
        }
        "step 3"
        game.broadcastAll('closeDialog',event.videoId);
        var cards2=event.cards2;
        player.gain(cards2,'log');
        player.$draw(cards2);
        game.delay();
        if(trigger.name=='phaseDraw'){player.chooseToDiscard(2,true);};     
    },
                ai:{
                    maixie:true,
                    "maixie_hp":true,
                    effect:{
                        target:function (card,player,target){
                if(get.tag(card,'damage')){
                    if(player.hasSkillTag('jueqing',false,target)) return [1,-2];
                    if(!target.hasFriend()) return;
                    if(target.hp>=4) return [1,2];
                    if(target.hp==3) return [1,1.5];
                    if(target.hp==2) return [1,0.5];
                }
            },
                    },
                },
            },
            "jz_偷袭":{
                audio:["yaowu",2],
                trigger:{
                    global:["phaseDrawBegin"],
                },
                filter:function (event,player){
        return event.player!=player;
    },
                check:function (event,player){
        return get.attitude(player,event.player)<0;
    },
                content:function (){
         player.loseHp();
         player.addTempSkill('jz_偷袭2');
         player.useCard({name:'sha'},trigger.player,true);
    },
                ai:{
                    result:{
                        player:function (player){
                if(player.hp>3){return 6;}
                if(player.hp<=2){return 0;} 
                return 5;
            },
                    },
                },
            },
            "jz_偷袭2":{
                audio:["yaowu",2],
                trigger:{
                    source:"damageEnd",
                },
                filter:function (event,player){
        return event.card&&event.card.name=='sha';
    },
                forced:true,
                content:function (){
        if(player.hp>trigger.player.hp){
            trigger.player.loseMaxHp(true);
        } 
    },
            },
            "jz_耀武":{
                audio:"ext:军争包加强版:2",
                trigger:{
                    player:"damageEnd",
                },
                priority:1,
                filter:function (event){
        return event.source&&event.source.group=='wu'||event.card&&(event.card.name=='sha');
    },
                forced:true,
                check:function (){
        return false;
    },
                content:function (){
        trigger.source.chooseDrawRecover(true);
    },
                ai:{
                    effect:{
                        target:function (card,player,target,current){
                if(card.name=='sha'&&(get.color(card)=='red')){
                    return [1,-2];
                }
            },
                    },
                },
            },
            "jz_芊芊6":{
                trigger:{
                    player:"damageBegin",
                },
                forced:true,
                nobracket:true,
                priority:-500000000,
                filter:function (event,player){
       return player.name=='jz_透心凉。'||player.name1=='jz_透心凉。'||player.name2=='jz_透心凉。';
    },
                content:function (){
         if(trigger.num>10){
         trigger.cancel();
         player.recover(player.maxHp-player.hp)._triggered=null;
         player.addSkill('jz_万剑2');
         }
          
        
    },
            },
            "jz_芊芊7":{
                trigger:{
                    player:"dying",
                },
                filter:function (player){
        return player.hp<-7&&(player.name=='jz_透心凉。'||player.name1=='jz_透心凉。'||player.name2=='jz_透心凉。');
    },
                forced:true,
                nobracket:true,
                priority:-500000000,
                content:function (){ 
        player.recover(player.maxHp-player.hp)._triggered=null;
        player.addSkill('jz_万剑2');
        
    },
            },
            "jz_芊芊8":{
                trigger:{
                    player:["dying"],
                },
                forced:true,
                unique:true,
                content:function (){
       if(player.name=='jz_透心凉。'||player.name1=='jz_透心凉。'||player.name2=='jz_透心凉。'){
        player.addSkill('jz_万剑2');
        trigger.untrigger();
        trigger.finish();
        player.hp==player.hp;
       }     
    },
            },
            "jz_袭斩":{
                audio:["qianxi",2],
                trigger:{
                    source:"damageBegin",
                },
                check:function (event,player){
        var att=get.attitude(player,event.player);
        if(event.player.hp==event.player.maxHp) return att<0;
        if(event.player.hp==event.player.maxHp-1&&
            (event.player.maxHp<=3||event.player.hasSkillTag('maixie'))) return att<0;
        return att>0;
    },
                filter:function (event,player){
        return event.card&&event.card.name=='sha'&&get.distance(player,event.player)<=1;
    },
                logTarget:"player",
                content:function (){
        'step 0'
        player.judge(function(card){
            return get.suit(card)!='heart'?1:-1;
        });
        'step 1'
        if(result.bool){           
            trigger.player.loseMaxHp(trigger.num);
            trigger.cancel();
        }
    },
            },
            "jz_大喝":{
                audio:["paoxiao",2],
                trigger:{
                    player:"shaBegin",
                },
                frequent:true,
                content:function (){
        player.draw();
    },
            },
            "jz_夺权":{
                audio:"ext:军争包加强版:2",
                trigger:{
                    global:"useSkillBegin",
                },
                forced:true,
                filter:function (event,player){
        if(event.player==player) return false;
        return player.hp<=3;
    },
                content:function (){
         var evt=_status.event.getParent('phase');
        if(evt){
            game.resetSkills();
            _status.event=evt;
            _status.event.finish();
            _status.event.untrigger(true);
        }
    },
            },
            "jz_忍戒":{
                audio:["renjie",2],
                trigger:{
                    player:["damageEnd","loseHpEnd"],
                },
                forced:true,
                unique:true,
                notemp:true,
                mark:true,
                filter:function (event){
        return event.num>0;
    },
                init:function (player){
        player.storage.jz_忍戒=0;
        game.addVideo('storage',player,['jz_忍戒',player.storage.jz_忍戒]);
    },
                content:function (){
        player.storage.jz_忍戒+=trigger.num;
        game.addVideo('storage',player,['jz_忍戒',player.storage.jz_忍戒]);
    },
                intro:{
                    content:"mark",
                },
                ai:{
                    maixie:true,
                    "maixie_hp":true,
                    effect:{
                        target:function (card,player,target){
                if(get.tag(card,'damage')){
                    if(target.hp==target.maxHp){
                        if(!target.hasSkill('jilue')){
                            return [0,1];
                        }
                        return [0.7,1];
                    }
                    return 0.7;
                }
            },
                        player:function (card,player){
                if(_status.currentPhase!=player) return;
                if(_status.event.name!='chooseToUse'||_status.event.player!=player) return;
                if(get.type(card)=='basic') return;
                if(get.tag(card,'gain')) return;
                if(get.value(card,player,'raw')>=7) return;
                if(player.hp<=2) return;
                if(!player.hasSkill('jilue')||player.storage.renjie==0){
                    return 'zeroplayertarget';
                }
            },
                    },
                },
            },
            "jz_拜印":{
                audio:"ext:军争包加强版:true",
                skillAnimation:"epic",
                trigger:{
                    player:"phaseBegin",
                },
                forced:true,
                unique:true,
                filter:function (event,player){
        return player.storage.jz_忍戒>=3;
    },
                content:function (){
        player.loseMaxHp();
        player.addSkill('jz_狼顾');
        player.awakenSkill('jz_拜印');
    },
            },
            "jz_狼顾":{
                audio:["fankui",2],
                trigger:{
                    source:"damageBegin",
                    player:"phaseBegin",
                },
                forced:true,
                content:function (){
        if(trigger.name=='damage'){ 
        if(player.storage.jz_忍戒>0){
           trigger.num++;
           player.storage.jz_忍戒--;
        }
        }
        if(trigger.name=='phase'){
        if(player.storage.jz_忍戒>0){
            player.draw();
        }  
        }
       
    },
                mod:{
                    wuxieRespondable:function (card,player,target,current){
            if(player!=current&&get.distance(player,current)<=5){
                return false;
            }
        },
                },
                ai:{
                    norespond:true,
                    skillTagFilter:function (player,tag,arg){
            if(tag=='norespond'&&Array.isArray(arg)){
                if(get.distance(arg[1],player)<=5) return true;
            }
            return false;
        },
                },
            },
            "jz_仙法":{
                audio:["huashen",2],
                trigger:{
                    player:["damageBefore","loseHpBefore"],
                    source:"damageBefore",
                },
                forced:true,
                init:function (player){
        var check=function(list){
            for(var i=0;i<list.length;i++){
                var info=lib.skill[list[i]];
                if(info&&info.trigger){
                    for(var j in info.trigger){
                        var cond=info.trigger[j];
                        if(typeof cond=='string'){
                            cond=[cond];
                        }
                        if(j=='player'||j=='global'){
                            if(cond.indexOf('loseHpBefore')!=-1) return true;
                            if(cond.indexOf('loseHpBegin')!=-1) return true;
                            if(cond.indexOf('loseHpEnd')!=-1) return true;
                            if(cond.indexOf('loseHpAfter')!=-1) return true;
                        }
                        if(j=='source'||j=='global'){
                            if(cond.indexOf('damageBefore')!=-1) return true;
                            if(cond.indexOf('damageBegin')!=-1) return true;
                            if(cond.indexOf('damageEnd')!=-1) return true;
                            if(cond.indexOf('damageAfter')!=-1) return true;
                        }
                    }
                }
            }
            return false;
        };
        player.storage.jz_仙法=get.gainableSkills(function(info,skill){
            var list=[skill];
            game.expandSkills(list);
            return check(list);
        },player);
    },
                content:function (){
        'step 0'
        var list=player.storage.jz_仙法.slice(0);
        event.skillai=function(){
            return get.max(list,get.skillRank,'item');
        };
        if(event.isMine()){
            var dialog=ui.create.dialog('forcebutton');
            dialog.add(get.prompt('jz_仙法'));
            var clickItem=function(){
                _status.event._result=this.link;
                dialog.close();
                game.resume();
            };
            for(var i=0;i<list.length;i++){
                if(lib.translate[list[i]+'_info']){
                    var translation=get.translation(list[i]);
                    if(translation[0]=='新'&&translation.length==3){
                        translation=translation.slice(1,3);
                    }
                    else{
                        translation=translation.slice(0,2);
                    }
                    var item=dialog.add('<div class="popup pointerdiv" style="width:80%;display:inline-block"><div class="skill">【'+
                    translation+'】</div><div>'+lib.translate[list[i]+'_info']+'</div></div>');
                    item.firstChild.addEventListener('click',clickItem);
                    item.firstChild.link=list[i];
                }
            }
            dialog.add(ui.create.div('.placeholder'));
            event.switchToAuto=function(){
                event._result=event.skillai();
                dialog.close();
                game.resume();
            };
            event.confirm=ui.create.confirm('c');
            event.custom.replace.confirm=function(){
                event._result=null;
                dialog.close();
                game.resume();
            };
            _status.imchoosing=true;
            game.pause();
        }
        else{
            event._result=event.skillai();
        }
        'step 1'
        _status.imchoosing=false;
        if(event.confirm){
            event.confirm.close();
        }
        if(typeof result=='string'){
            player.logSkill('jz_仙法');
            var link=result;
            player.addAdditionalSkill('jz_仙法',link);
            player.logSkill('jz_仙法');
            player.popup(link);
            game.log(player,'获得了技能','【'+get.translation(link)+'】');
            game.delay();
            player.storage.jz_仙法.remove(link);
            trigger.jz_仙法=true;
        }
    },
            },
            "jz_太虚":{
                audio:["xinsheng",2],
                trigger:{
                    global:"phaseDrawEnd",
                },
                filter:function (event,player){
        return player.hp<=2&&event.player!=player;
    },
                check:function (event,player){
        return get.attitude(player,event.player)<0;
    },
                content:function (){
        player.recover();
        player.discardPlayerCard(trigger.player,'h',true);
    },
            },
            "jz_变幻":{
                audio:["huanhua",2],
                trigger:{
                    player:"phaseEnd",
                },
                frequent:true,
                content:function (){
      var list;
        if(_status.connectMode){
           list=get.charactersOL(function(i){
               return lib.character[i][1]!='shen';
           });
        }
        else{        
        list=get.gainableCharacters(function(info){
                return info[1]==['shen','shu','wei','wu','qun'].randomGet();
            });
        }
        var name=list.randomGet();  
        var skill=['jz_变幻','jz_星纬','jz_道法'];
        var a=player.hp;
        var b=player.maxHp;
        player.reinit(player.name,name,false);
        player.addSkill(skill);
        player.hp=a; 
        player.maxHp=b;                            
        player.update();
    },
            },
            "jz_星纬":{
                skillAnimation:true,
                audio:["xinsheng",2],
                unique:true,
                forced:true,
                trigger:{
                    player:"dying",
                },
                filter:function (event,player){
        return player.hp<=0&&!player.storage.jz_星纬;
    },
                content:function (){
        'Step 0'
        var skill=['jz_变幻','jz_星纬','jz_道法'];
        var a=player.hp;
        var b=player.maxHp;
        player.reinit(player.name,'jz_左元放',false);
        player.addSkill(skill);
        player.hp=a; 
        player.maxHp=b;                            
        player.update();
        'Step 1'
        if(game.players.length>=5){
        player.recover(2-player.hp);
        player.addSkill('jz_幻化2');
        player.removeSkill('jz_变幻');
        }
        'Step 2'
        if(game.players.length<5){
        player.draw(2);
        player.recover(player.maxHp-player.hp);
        }      
        'Step 3'
        player.storage.jz_星纬=true;
        player.awakenSkill('jz_星纬')
    },
            },
            "jz_道法":{
                audio:["huashen",2],
                unique:true,
                trigger:{
                    player:["phaseBegin"],
                },
                direct:true,
                init:function (player){
        player.storage.jz_道法=[];
        // player.storage.jz_道法=0;
    },
                intro:{
                    content:"characters",
                },
                filter:function (event,player){
        return player.storage.jz_星纬&&game.players.length>=5;
    },
                content:function (){
        'step 0'
        // if(player.storage.jz_道法2<1){
        //     player.storage.jz_道法2++;
        //     event.finish();
        // }
        // else{
        //     player.storage.jz_道法2=0;
        // }'step 1'
        player.logSkill('jz_道法');
        var list=[];
        var list2=[];
        var players=game.players.concat(game.dead);
        for(var i=0;i<players.length;i++){
            list2.add(players[i].name);
            list2.add(players[i].name1);
            list2.add(players[i].name2);
        }
        for(var i in lib.character){
            if(player.storage.jz_道法.contains(i)) continue;
            if(list2.contains(i)) continue;
            list.push(i);
        }
        var name=list.randomGet();
        player.storage.jz_道法.push(name);
        player.markSkill('jz_道法');
        var skills=lib.character[name][3];
        for(var i=0;i<skills.length;i++){
            player.addSkill(skills[i]);
        }
        event.dialog=ui.create.dialog('<div class="text center">'+get.translation(player)+'发动了【道法】',[[name],'character']);
        game.delay(2);
        'step 2'
        event.dialog.close();
        
    },
            },
            "jz_芳魂":{
                audio:["fanghun",2],
                enable:"phaseUse",
                filter:function (event,player){
        return player.countCards('h',{suit:'club'})>0;
    },
                filterCard:{
                    suit:"club",
                },
                usable:1,
                filterTarget:true,
                selectTarget:function (){
        var player=_status.event.player
        return 1;
    },
                position:"he",
                check:function (event,player){
        return get.attitude(player,event.target)<=0;
    },
                multitarget:true,
                multiline:true,
                line:"fire",
                content:function (){
        'step 0'
        if(event.delay){
            game.delay();
        }
        player.loseHp();
        'step 1'
        if(!player.storage.jz_芳魂){
            player.storage.jz_芳魂=[];
        }
        player.storage.jz_芳魂.add(targets[0]);
        'Step 2'
        if(!player.storage.jz_芳魂2){
        player.storage.jz_芳魂2=[];
        }
        player.storage.jz_芳魂2.addArray(player.storage.jz_芳魂);
        player.addTempSkill('jz_芳魂3',{player:'phaseEnd'});
    },
                group:["jz_芳魂_clear"],
                subSkill:{
                    clear:{
                        trigger:{
                            player:"phaseEnd",
                        },
                        priority:-7,
                        silent:true,
                        content:function (){
                delete player.storage.jz_芳魂;
            },
                        sub:true,
                        forced:true,
                        popup:false,
                    },
                },
                ai:{
                    threaten:1.5,
                    order:10,
                    result:{
                        target:function (player,target){
               if(get.attitude(player,target)<0){
                if(target.hp<=2){return 0;}
                if(player.hp>2){return 10;} 
                if(player.countCards('h','sha')&&get.distance(player,target,'attack')<=1){return 10;}
                }
                return 0;
            },
                    },
                },
            },
            "jz_隐退2":{
                unique:true,
                forced:true,
                trigger:{
                    player:"phaseEnd",
                },
                filter:function (event,player){
        return player.storage.jz_隐退;
    },
                content:function (){
        'Step 0'
        player.hp=0;
        player.loseHp();
        'Step 1'
        player.removeSkill('jz_隐退2');
    },
            },
            "jz_芳魂3":{
                onremove:true,
                trigger:{
                    player:"useCardToEnd",
                },
                forced:true,
                priority:15,
                filter:function (event,player){
        if(!event.target) return false;
        if(!player.storage.jz_芳魂2) return false;
        return (get.type(event.card)=='basic');
    },
                content:function (){
        player.draw();
    },
                mod:{
                    cardUsable:function (card,player,num){
        if(typeof num=='number') return num+100;
        },
                    playerEnabled:function (card,player,target){
        if(!player.storage.jz_芳魂2||!player.storage.jz_芳魂2.contains(target)){
            var num=player.getCardUsable(card)-100;
            if(num<=0) return false;
            }
        },
                },
            },
            "jz_隐退3":{
                trigger:{
                    player:"dieBegin",
                },
                forced:true,
                priority:-100,
                filter:function (event,player){
        return player!==game.zhu&&player!=game.boss&&player.hp<=0;
    },
                content:function (){
         player.classList.add('dead')  
        var identity2=game.me.identity
        game.removePlayer(trigger.player)
        if(get.mode()=='identity'){
        if(_status.brawl&&_status.brawl.checkResult){
                    _status.brawl.checkResult();
                    return;
                }
                if(!game.zhu){
                    if(get.population('fan')==0){
                        switch(identity2){
                            case 'fan':game.over(false);break;
                            case 'zhong':game.over(true);break;
                            default:game.over();break;
                        }
                    }
                    else if(get.population('zhong')==0){
                        switch(identity2){
                            case 'fan':game.over(true);break;
                            case 'zhong':game.over(false);break;
                            default:game.over();break;
                        }
                    }
                    return;
                }
        if(game.zhu.isAlive()&&get.population('fan')+get.population('nei')>0) return;
                if(game.zhong){
                    game.zhong.identity='zhong';
                }
                game.showIdentity();
                if(identity2=='zhu'||identity2=='zhong'){
                    if(game.zhu.classList.contains('dead')){
                        game.over(false);
                    }
                    else{
                        game.over(true);
                    }
                }
                else if(identity2=='nei'){
                    if(game.players.length==1&&game.me.isAlive()){
                        game.over(true);
                    }
                    else{
                        game.over(false);
                    }
                }
                else{
                    if((get.population('fan')+get.population('zhong')>0||get.population('nei')>1)&&
                        game.zhu.classList.contains('dead')){game.over(true);
                    }
                    else{
                        game.over(false);
                    }
                }
        }
},
            },
            "jz_暗香":{
                init:function (player){
        player.storage.jz_暗香=0;
    },
                intro:{
                    content:"mark",
                },
                audio:"ext:军争包加强版:2",
                trigger:{
                    source:"damageAfter",
                    player:"phaseBegin",
                },
                forced:true,
                filter:function (event,player){
        return player.storage.jz_暗香<3;
    },
                content:function (){
        player.storage.jz_暗香++;
        player.markSkill('jz_暗香');
    },
                group:["jz_暗香_sha","jz_暗香_shan","jz_暗香_tao","jz_暗香_wuxie","jz_暗香_draw"],
                subSkill:{
                    draw:{
                        audio:["fanghun",2],
                        trigger:{
                            player:["useCard","respond"],
                        },
                        forced:true,
                        popup:false,
                        filter:function (event){
                return event.skill=='jz_暗香_sha'||event.skill=='jz_暗香_shan'||event.skill=='jz_暗香_wuxie'||event.skill=='jz_暗香_tao';
            },
                        content:function (){
                player.popup('龙魂');
                player.storage.jz_暗香--;
                player.draw();
                if(!player.storage.jz_暗香||player.storage.jz_暗香<0){
                    player.storage.jz_暗香=0;
                    player.unmarkSkill('jz_暗香');
                }
                else{
                    player.updateMarks();
                }
            },
                        sub:true,
                    },
                    tao:{
                        audio:["longhun",2],
                        enable:["chooseToUse","chooseToRespond"],
                        prompt:function (){
                return '将1张红桃牌当作桃使用';
            },
                        position:"he",
                        check:function (card,event){
                return 10-get.value(card)&& _status.event.player.hp<2;
            },
                        selectCard:function (){
                return 1;
            },
                        viewAs:{
                            name:"tao",
                            suit:"heart",
                            number:6,
                            cards:[{"node":{"image":{},"info":{},"name":{},"name2":{},"background":{},"intro":{},"range":{}},"storage":{},"vanishtag":[],"_uncheck":[],"suit":"heart","number":6,"name":"shan","cardid":"8115211314","_transform":"translateX(0px)","clone":{"name":"shan","suit":"heart","number":6,"node":{"name":{},"info":{},"intro":{},"background":{},"image":{}},"_onEndDelete":true,"_transitionEnded":true,"timeout":4382},"timeout":4302,"original":"h"}],
                        },
                        filter:function (event,player){
                if(!player.storage.jz_暗香||player.storage.jz_暗香<0) return false;
                if(player.countCards('he',{suit:'heart'})<1) return false;
                return true;
            },
                        filterCard:function (card){
                return get.suit(card)=='heart';
            },
                        sub:true,
                        ai:{
                            save:true,
                            basic:{
                                order:function (card,player){
                        if(player.hasSkillTag('pretao')) return 5;
                        return 2;
                    },
                                useful:[8,6.5,5,4],
                                value:[8,6.5,5,4],
                            },
                            result:{
                                target:function (player,target){
                        // if(player==target&&player.hp<=0) return 2;
                        var nd=player.needsToDiscard();
                        var keep=false;
                        if(nd<=0){
                            keep=true;
                        }
                        else if(nd==1&&target.hp>=2&&target.countCards('h','tao')<=1){
                            keep=true;
                        }
                        var mode=get.mode();
                        if(target.hp>=2&&keep&&target.hasFriend()){
                            if(target.hp>2||nd==0) return 0;
                            if(target.hp==2){
                                if(game.hasPlayer(function(current){
                                    if(target!=current&&get.attitude(target,current)>=3){
                                        if(current.hp<=1) return true;
                                        if((mode=='identity'||mode=='versus'||mode=='chess')&&current.identity=='zhu'&&current.hp<=2) return true;
                                    }
                                })){
                                    return 0;
                                }
                            }
                        }
                        if(target.hp<0&&target!=player&&target.identity!='zhu') return 0;
                        var att=get.attitude(player,target);
                        if(att<3&&att>=0&&player!=target) return 0;
                        var tri=_status.event.getTrigger();
                        if(mode=='identity'&&player.identity=='fan'&&target.identity=='fan'){
                            if(tri&&tri.name=='dying'&&tri.source&&tri.source.identity=='fan'&&tri.source!=target){
                                var num=game.countPlayer(function(current){
                                    if(current.identity=='fan'){
                                        return current.countCards('h','tao');
                                    }
                                });
                                if(num>1&&player==target) return 2;
                                return 0;
                            }
                        }
                        if(mode=='identity'&&player.identity=='zhu'&&target.identity=='nei'){
                            if(tri&&tri.name=='dying'&&tri.source&&tri.source.identity=='zhong'){
                                return 0;
                            }
                        }
                        if(mode=='stone'&&target.isMin()&&
                        player!=target&&tri&&tri.name=='dying'&&player.side==target.side&&
                        tri.source!=target.getEnemy()){
                            return 0;
                        }
                        return 2;
                    },
                            },
                            tag:{
                                recover:1,
                                save:1,
                            },
                        },
                    },
                    sha:{
                        audio:["longhun",2],
                        enable:["chooseToUse","chooseToRespond"],
                        prompt:function (){
                return '将1张方片当作火杀使用或打出';
            },
                        position:"he",
                        check:function (card,event){
                return 10-get.value(card);
            },
                        selectCard:function (){
                return 1;
            },
                        viewAs:{
                            name:"sha",
                            nature:"fire",
                            suit:"diamond",
                            number:12,
                            cards:[{"node":{"image":{},"info":{},"name":{},"name2":{},"background":{},"intro":{},"range":{}},"storage":{},"vanishtag":[],"_uncheck":[],"suit":"diamond","number":12,"name":"fangtian","cardid":"4615132326","_transform":"translateX(112px)","clone":{"name":"fangtian","suit":"diamond","number":12,"node":{"name":{},"info":{},"intro":{},"background":{},"image":{}},"_transitionEnded":true,"timeout":1509},"timeout":1432,"original":"h"}],
                        },
                        filter:function (event,player){
                if(!player.storage.jz_暗香||player.storage.jz_暗香<0) return false;
                if(player.countCards('he',{suit:'diamond'})<1) return false;
                return true;
            },
                        filterCard:function (card){
                return get.suit(card)=='diamond';
            },
                        sub:true,
                        ai:{
                            basic:{
                                useful:[5,1],
                                value:[5,1],
                            },
                            order:function (){
                    if(_status.event.player.hasSkillTag('presha',true,null,true)) return 10;
                    return 3;
                },
                            result:{
                                target:function (player,target){
                        if(player.hasSkill('jiu')&&!target.getEquip('baiyin')){
                            if(get.attitude(player,target)>0){
                                return -6;
                            }
                            else{
                                return -3;
                            }
                        }
                        return -1.5;
                    },
                            },
                            tag:{
                                respond:1,
                                respondShan:1,
                                damage:function (card){
                        if(card.nature=='poison') return;
                        return 1;
                    },
                                natureDamage:function (card){
                        if(card.nature) return 1;
                    },
                                fireDamage:function (card,nature){
                        if(card.nature=='fire') return 1;
                    },
                                thunderDamage:function (card,nature){
                        if(card.nature=='thunder') return 1;
                    },
                                poisonDamage:function (card,nature){
                        if(card.nature=='poison') return 1;
                    },
                            },
                        },
                    },
                    shan:{
                        audio:["longhun",2],
                        enable:["chooseToUse","chooseToRespond"],
                        prompt:function (){
                return '将1张梅花牌当作闪打出';
            },
                        position:"he",
                        check:function (card,event){
                return 10-get.value(card);
            },
                        selectCard:function (){
                return 1;
            },
                        viewAs:{
                            name:"shan",
                            suit:"club",
                            number:10,
                        },
                        viewAsFilter:function (player){
                if(!player.storage.jz_暗香||player.storage.jz_暗香<0) return false;
                return true;
            },
                        filterCard:function (card){                
                return get.suit(card)=='club';
            },
                        sub:true,
                        ai:{
                            basic:{
                                useful:[7,2],
                                value:[7,2],
                            },
                        },
                    },
                    wuxie:{
                        audio:["longhun",2],
                        enable:["chooseToUse","chooseToRespond"],
                        prompt:function (){
                return '将1张黑桃牌当作无懈可击使用';
            },
                        position:"he",
                        check:function (card,event){
                return 7-get.value(card);
            },
                        selectCard:function (){
                return 1;
            },
                        viewAs:{
                            name:"wuxie",
                            suit:"spade",
                            number:1,
                            cards:[{"node":{"image":{},"info":{},"name":{},"name2":{},"background":{},"intro":{},"range":{}},"storage":{},"vanishtag":[],"_uncheck":[],"suit":"spade","number":1,"name":"guding","cardid":"9771854318","_transform":"translateX(0px)","clone":{"name":"guding","suit":"spade","number":1,"node":{"name":{},"info":{},"intro":{},"background":{},"image":{}},"_transitionEnded":true,"timeout":652},"timeout":617,"original":"h"}],
                        },
                        viewAsFilter:function (player){
                if(!player.storage.jz_暗香||player.storage.jz_暗香<0) return false;                
                if(player.countCards('he',{suit:'spade'})<1) return false;
                return true;
            },
                        filterCard:function (card){
                return get.suit(card)=='spade';
            },
                        sub:true,
                        ai:{
                            basic:{
                                useful:[6,4],
                                value:[6,4],
                            },
                            result:{
                                player:1,
                            },
                            expose:0.2,
                        },
                    },
                },
                ai:{
                    skillTagFilter:function (player,tag){
            switch(tag){
                case 'respondSha':{
                    if(player.countCards('he',{suit:'diamond'})<1) return false;
                    break;
                }
                case 'respondShan':{
                    if(player.countCards('he',{suit:'club'})<1) return false;
                    break;
                }
                case 'save':{
                    if(player.countCards('he',{suit:'heart'})<1) return false;
                    break;
                }
            }
        },
                    save:true,
                    respondSha:true,
                    respondShan:true,
                    threaten:function (player,target){
            if(target.hp==1) return 2;
            return 0.5;
        },
                },
            },
            "jz_隐退":{
                skillAnimation:true,
                unique:true,
                mark:true,
                audio:"ext:军争包加强版:2",
                group:"jz_隐退3",
                trigger:{
                    global:"dieAfter",
                },
                filter:function (event,player){
        return player!==event.player&&player!==game.zhu&&player!=game.boss&&!player.storage.jz_隐退;
    },
                check:function (){
        return (game.players.length<5 || _status.event.player.hp<=1);
    },
                content:function (){ 
        'Step 0'
        player.draw(3);
        var skill=['jz_龙胆','jz_袭敌'].randomGet(); 
        player.addSkill(skill);
        player.popup(skill);
        'Step 2'
        player.storage.jz_隐退=true;
        player.awakenSkill('jz_隐退');
        'Step 3'
        player.addSkill('jz_隐退2');
        player.update();
        'Step 4'
        player.insertPhase();
    },
                ai:{
                    order:0.5,
                    result:{
                        player:function (player){
                if(game.players.length<5||player.hp<=2) return 5;
                if(player.hp<=1||player.countCards('he')<=1) return 10;
                return 0;
            },
                    },
                },
                intro:{
                    content:"limited",
                },
            },
            "jz_袭敌":{
                forced:true,
                group:["jz_袭敌1","jz_袭敌2"],
                ai:{
                    combo:"jz_暗香",
                    mingzhi:false,
                    effect:{
                        target:function (card,player,target,current){
                if(get.tag(card,'respondShan')||get.tag(card,'respondSha')){
                    if(get.attitude(target,player)<=0){
                        if(current>0) return;
                        if(target.countCards('h')==0) return 1.6;
                        if(target.countCards('h')==1) return 1.2;
                        if(target.countCards('h')==2) return [0.8,0.2,0,-0.2];
                        return [0.4,0.7,0,-0.7];
                    }
                }
            },
                    },
                },
            },
            "jz_袭敌1":{
                audio:["chongzhen",2],
                trigger:{
                    player:"shaBefore",
                },
                forced:true,
                filter:function (event,player){
        if(event.skill!='jz_暗香_sha'&&event.skill!='jz_暗香_sha') return false;
        return event.target.countCards('h')>0;
    },
                logTarget:"target",
                content:function (){
        var card=trigger.target.getCards('h').randomGet();
        player.gain(card,trigger.target);
        trigger.target.$giveAuto(card,player);
        game.delay();
    },
            },
            "jz_袭敌2":{
                audio:["chongzhen",2],
                trigger:{
                    player:"respond",
                },
                forced:true,
                filter:function (event,player){
        if(event.skill!='jz_暗香_shan'&&event.skill!='jz_暗香_sha') return false;
        return event.source&&event.source.countCards('h')>0;
    },
                logTarget:"source",
                content:function (){
        var card=trigger.source.getCards('h').randomGet();
        player.gain(card,trigger.source);
        trigger.source.$giveAuto(card,player);
        game.delay();
    },
            },
            "jz_龙胆":{
                audio:["jz_暗香",2],
                trigger:{
                    player:["useCard","respond"],
                },
                forced:true,
                popup:false,
                filter:function (event){
        return event.skill=='jz_暗香_sha'||event.skill=='jz_暗香_shan'||event.skill=='jz_暗香_wuxie'||event.skill=='jz_暗香_tao';
    },
                content:function (){
        player.draw();
    },
            },
            "jz_武魂":{
                trigger:{
                    player:"damageEnd",
                },
                alter:true,
                filter:function (event,player){
   if(event.source==undefined) return false                           
   if(!get.is.altered('jz_武魂')) return false    
   return true;
      },
                forced:true,
                content:function (){
   if(!trigger.source.storage.jz_武魂_mark){
  trigger.source.storage.jz_武魂_mark=0;
                  }                 
  trigger.source.storage.jz_武魂_mark+=trigger.num;
  trigger.source.syncStorage('jz_武魂_mark');
  trigger.source.markSkill('jz_武魂_mark');
       },
                global:["jz_武魂_mark"],
                subSkill:{
                    mark:{
                        marktext:"魇",
                        intro:{
                            content:"mark",
                        },
                        sub:true,
                    },
                },
                group:["jz_武魂2"],
            },
            "jz_武魂2":{
                trigger:{
                    player:["changehp","damageBegin"],
                },
                forced:true,
                popup:false,
                content:function (){
        "step 0"
        game.countPlayer(function(current){
    if(current!=player){
    player.line(current,'green');
    current.addSkill('jz_武魂3');
    current.addSkill('jz_武魂4');
    }
    });
    },
                ai:{
                    threaten:0.5,
                    effect:{
                        target:function (card,player,target,current){
                if(get.tag(card,'damage')){
                    if(player.hasSkill('jueqing')) return [1,-5];
                    var hasfriend=false;
                    for(var i=0;i<game.players.length;i++){
                        if(game.players[i]!=target&&ai.get.attitude(game.players[i],target)>=0){
                            hasfriend=true;break;
                        }
                    }
                    if(!hasfriend) return;
                    if(player.hp>2&&ai.get.attitude(player,target)<=0) return [0,2];
                    return [1,0,0,-player.hp];
                }
            },
                    },
                },
            },
            "jz_武魂3":{
                audio:["wuhun3",3],
                trigger:{
                    global:"dying",
                },
                forced:true,
                filter:function (event,player){
        if(!player.storage.jz_武魂_mark) return false;   
        for(var i=0;i<game.players.length;i++){
        if(game.players[i].storage.jz_武魂_mark>player.storage.jz_武魂_mark) return false;                
        }
        return event.player.name=='shen_guanyu';
    },
                content:function (){
        "step 0"
        player.judge(function(card){
            if(get.suit(card)!=='heart') return -2;
            return 2;
        })
        "step 1"
        if(result.judge==-2){
            if(player.hp<Infinity&&player.hp>0){
            player.hp=0;
            }
            if(player.hp=Infinity){
            player.die()._triggered=null;
            }
            player.dying(event);
        }
        if(result.judge==2){
            player.recover();
            delete player.storage.jz_武魂_mark;
            player.updateMarks();
           player.removeSkill('jz_武魂3');
        }
        player.removeSkill('jz_武魂3');
    },
            },
            "jz_隐忍":{
                audio:["xingshang",2],
                unique:true,
                trigger:{
                    player:"phaseBegin",
                },
                priority:5,
                content:function (){
        "step 0"
        player.draw(1);
        game.delay();        
    },
            },
            "jz_武魂4":{
                audio:["wuhun3",3],
                trigger:{
                    global:"dying",
                },
                forced:true,
                filter:function (event,player){
        if(event.player==player) return false;
        if(!player.storage.jz_武魂_mark) return false;   
        return true;
    },
                content:function (){
        player.storage.jz_武魂_mark--;
    },
            },
            "jz_计取":{
                audio:["gongxin",2],
                enable:"phaseUse",
                usable:1,
                filterTarget:function (card,player,target){
        return target!=player&&target.countCards('h');
    },
                content:function (){
        "step 0"
        event.videoId=lib.status.videoId++;
        var cards=target.getCards('h');
        if(player.isOnline2()){
            player.send(function(cards,id){
                ui.create.dialog('计取',cards).videoId=id;
            },cards,event.videoId);
        }
        event.dialog=ui.create.dialog('计取',cards);
        event.dialog.videoId=event.videoId;
        if(!event.isMine()){
            event.dialog.style.display='none';
        }
        player.chooseButton();
        "step 1"
        if(result.bool){
            event.card=result.links[0];
            var func=function(card,id){
                var dialog=get.idDialog(id);
                if(dialog){
                    for(var i=0;i<dialog.buttons.length;i++){
                        if(dialog.buttons[i].link==card){
                            dialog.buttons[i].classList.add('selectedx');
                        }
                        else{
                            dialog.buttons[i].classList.add('unselectable');
                        }
                    }
                }
            }
            if(player.isOnline2()){
                player.send(func,event.card,event.videoId);
            }
            else if(event.isMine()){
                func(event.card,event.videoId);
            }
            player.chooseControl('弃置这张牌','获得这张牌');
        }
        else{
            if(player.isOnline2()){
                player.send('closeDialog',event.videoId);
            }
            event.dialog.close();
            event.finish();
        }
        "step 2"
        if(player.isOnline2()){
            player.send('closeDialog',event.videoId);
        }
        event.dialog.close();
        var card=event.card;
        if(result.control=='获得这张牌'){
        player.gain(card,target);
        target.$giveAuto(card,player);
        }
        else{
            target.discard(card);
            event.finish();
        }
    },
                ai:{
                    threaten:1.5,
                    result:{
                        target:function (player,target){
                return -target.countCards('h');
            },
                    },
                    order:10,
                    expose:0.4,
                },
            },
        },
        translate:{
            "jz_铁骑":"铁骑",
            "jz_铁骑_info":"当你使用一张[杀]指定一名角色后，你可进行一次判定并使目标角色非锁定技失效直到回合结束，判定结果若为红色则此[杀]不可闪避",
            "jz_芊芊":"芊芊",
            "jz_芊芊_info":"",
            "jz_芊芊2":"芊芊",
            "jz_芊芊2_info":"",
            "js_不屈":"不屈",
            "js_不屈_info":"锁定技，在你进入濒死阶段时，若你的体力值不大于0，亮出牌堆顶的一张牌并置于你的武将牌上，若此牌的点数与你武将牌上已有的牌点数均不同，则你回复至1体力。只要你的武将牌上有牌，你的手牌上限便与这些牌数量相等",
            "jz_薄发":"薄发",
            "jz_薄发_info":"出牌阶段,你可以把一张“田”当做决斗使用，若如此做，你回复一点体力",
            "jz_急袭":"急袭",
            "jz_急袭_info":"出牌阶段，你可以把一张“田”当做过河拆桥使用",
            "jz_芊芊3":"芊芊",
            "jz_芊芊3_info":"",
            "jz_诱使":"诱使",
            "jz_诱使_info":"锁定技，每当一名其他角色使用一张基本牌或锦囊牌，其获得一张“毒”",
            "jz_芊芊4":"芊芊",
            "jz_芊芊4_info":"锁定技，<li>你免疫部分负面效果，如果你失去此技能，则你获得额外的保命效果；<li>游戏开始前你获得〖无言〗，〖回天〗，〖玲珑〗，〖幻化〗且额外进行一个回合;<li>每当一名角色回合开始时你将体力值回复至满体力<li>当你死亡时，若你的体力值大于等于0则你拒绝死亡并添加技能〖万剑〗<li>当你受到大于等于10的伤害时你将体力值回复至满体力并添加技能〖万剑〗;<li>当你濒死时，如果你的体力值小于-7，则你将体力值回复至满体力并添加技能〖万剑〗",
            "jz_诱使2":"诱使",
            "jz_诱使2_info":"锁定技，每当一名其他角色使用一张基本牌或锦囊牌，你获得一张与之同名的牌；在一名其他角色的结束阶段，若其本回合没有使用牌，你对其造成一点伤害",
            "jz_除异":"除异",
            "jz_除异_info":"出牌阶段限一次，你可以使一名其他角色失去当前所有技能并死亡",
            "jz_羸弱":"羸弱",
            "jz_羸弱_info":"锁定技，你没有装备区",
            "jz_绝杀":"绝杀",
            "jz_绝杀_info":"锁定技，一名角色使用杀命中时，该角色死亡",
            "jz_觉悟":"觉悟",
            "jz_觉悟_info":"觉悟",
            "jz_无言":"无言",
            "jz_无言_info":"锁定技，其他角色使用的普通锦囊牌对你无效。",
            "jz_回天":"回天",
            "jz_回天_info":"锁定技，当你受到伤害前，或流失体力前，或进入濒死阶段时，你回复两点体力值并增加一点体力上限;每名角色回合开始前，你回复至满体力",
            "jz_报复":"报复",
            "jz_报复_info":"锁定技，对你造成伤害的角色失去当前的所有技能直到游戏结束并失去所有体力。",
            "jz_偷渡":"偷渡",
            "jz_偷渡_info":"锁定技，当你受到伤害后，你将你的武将牌重置",
            "jz_屯田":"屯田",
            "jz_屯田_info":"在你的回合外，每当一名角色得到牌时，你可以进行一次判定，将非黑色结果的判定牌置于你的武将牌上，称为“田”，每有一张田，你的进攻距离+1，当你手牌数大于4或“田”达到三个时，你不能发动【屯田】",
            "jz_争功":"争功",
            "jz_争功_info":"在一名其他角色的回合开始前，若你的武将牌正面朝上，你可以摸一张牌并进行一个额外回合，并在回合结束后将武将牌翻至背面。若如此做，你对其使用卡牌无视距离直到回合结束。",
            "jz_忘隙":"忘隙",
            "jz_忘隙_info":"每当你对其他角色造成1点伤害后，或受到其他角色造成的1点伤害后，你可与该角色各摸一张牌。",
            "jz_严法":"严法",
            "jz_严法_info":"当一名角色受到1点伤害后，你可以令伤害来源选择一项：1、将一张手牌交给你；2、失去1点体力",
            "jz_禁咒":"禁咒",
            "jz_禁咒_info":"出牌阶段，你弃八张牌并对其他角色造成三点火焰伤害，之后你回复一点体力",
            "jz_禁食":"禁食",
            "jz_禁食_info":"在你的回合外，其他角色不能使用桃",
            "jz_威慑":"威慑",
            "jz_威慑_info":"在你的回合，除你以外，只有处于濒死状态的角色才能使用【桃】。",
            "jz_谋断":"谋断",
            "jz_谋断_info":"通常状态下，你拥有标记“武”并拥有技能“激昂”和“谦逊”。当你的手牌数为2张或以下时，你须将你的标记翻面为“文”，将该两项技能转化为“英姿”和“制衡”。任一角色的回合开始前，你可弃一张牌将标记翻回",
            "jz_贤德":"贤德",
            "jz_贤德_info":"锁定技，黑色的杀对你无效",
            "jz_飞影":"飞影",
            "jz_飞影_info":"锁定技，你的防御距离+2",
            "jz_魏武":"魏武",
            "jz_魏武_info":"每名角色的回合结束阶段，你对体力不小于你的一名其他角色造成3点火属性伤害",
            "jz_恶助":"恶助",
            "jz_恶助_info":"锁定技，黑色的杀对你无效",
            "jz_雷罚":"雷罚",
            "jz_雷罚_info":"每名角色的回合开始阶段，你对体力不大于你的一名其他角色造成3点雷属性伤害",
            "jz_屯兵":"屯兵",
            "jz_屯兵_info":"锁定技，弃牌阶段结束时，当你的手牌数小于X时，你立即摸等同于你现有体力值张数的牌。（X为你的体力上限值加现有体力值)",
            "jz_博观":"博观",
            "jz_博观_info":"摸牌阶段，你可以改为观看牌堆顶的五张牌，然后获得其中的三张牌，将其余的牌以任意顺序置于牌堆底。",
            "jz_远虑":"远虑",
            "jz_远虑_info":"你可以将一张黑色牌当[闪]使用或打出",
            "jz_拒降":"拒降",
            "jz_拒降_info":"锁定技，杀死你的角色立即弃置所有的牌。",
            "jz_念主":"念主",
            "jz_念主_info":"锁定技，当你受到伤害后：若此伤害是你本回合第一次受到伤害，则你回复1点体力并摸两张牌；若不是你本回合第一次受到伤害，则你增加1点体力上限并摸三张牌。",
            "jz_渐营":"渐营",
            "jz_渐营_info":"每当你于出牌阶段内使用的牌与此阶段你使用的上一张牌点数或花色相同时，你可以摸两张牌(每回合限7次)",
            "jz_毒心":"毒心",
            "jz_毒心_info":"锁定技，在你的回合内，你免疫体力流失",
            "jz_灭口":"灭口",
            "jz_灭口_info":"锁定技，一名角色回合结束后，你增加一点体力上限",
            "jz_绝情":"绝情",
            "jz_绝情_info":"锁定技，你在场时，所有角色即将造成的伤害均视为失去体力。",
            "jz_伤逝":"伤逝",
            "jz_伤逝_info":"锁定技，当你的手牌数小于X时，你立即将手牌补至X张（X为你已损体力值)",
            "jz_冷血":"冷血",
            "jz_冷血_info":"锁定技，每当一名角色死亡后，此武将牌增加一点体力上限",
            "jz_破计":"破计",
            "jz_破计_info":"每当你在回合外成为黑色牌的目标，你可以摸一张牌",
            "jz_无功":"无功",
            "jz_无功_info":"出牌阶段，你不能使用'杀'",
            "jz_弃袍":"弃袍",
            "jz_弃袍_info":"在你的回合外，你可将你的任意一张黑色牌当【酒】使用。",
            "jz_倾国":"倾国",
            "jz_倾国_info":"你可以将一张黑色牌当[闪]使用或打出",
            "jz_节命":"节命",
            "jz_节命_info":"你每受到1点伤害，可令任意一名角色将手牌补至其体力上限的张数(不能超过9张)。",
            "jz_单骑":"单骑",
            "jz_单骑_info":"准备阶段开始时，若你的手牌数大于1，则获得“马术”和“怒斩”并获得[青龙偃月刀]",
            "jz_反馈":"反馈",
            "jz_反馈_info":"每当你受到1点伤害后，你可以获得当前角色的一张牌。",
            "jz_鬼才":"鬼才",
            "jz_鬼才_info":"在任意角色的判定牌生效前，你可以打出一张牌替换之",
            "jz_早逝":"早逝",
            "jz_早逝_info":"锁定技，结束阶段开始时，你失去１点体力，然后摸两张牌",
            "jz_屯田2":"屯田",
            "jz_屯田2_info":"在你的回合外，若有一名角色失去或得到牌后，你可以进行一次判定，将非♥结果的判定牌置于你的武将牌上，称为“田”，每有一张田，你的进攻距离+1.",
            "jz_挑衅":"挑衅",
            "jz_挑衅_info":"出牌阶段，你可以指定一名使用【杀】能攻击到你的角色，该角色需对你使用一张【杀】，若该角色不如此做，你弃掉他的一张牌，每回合限2次。",
            "jz_衣钵":"衣钵",
            "jz_衣钵_info":"觉醒技，准备阶段，若你的体力值小于等于2，你需减1点体力上限，并永久获得技能“观星”。",
            "jz_幼麟":"幼麟",
            "jz_幼麟_info":"摸牌阶段，你可以额外摸3张牌。若如此做，你获得“无功”直到回合结束",
            "jz_激昂":"激昂",
            "jz_激昂_info":"每当你使用（指定目标后）或被使用（成为目标后）一张【决斗】或红色的【杀】时，你可以摸两张牌。",
            "jz_资粮":"资粮",
            "jz_资粮_info":"你或者和你同一阵营的角色受到伤害后,其可以获得一张“田”",
            "jz_鹰扬":"鹰扬",
            "jz_鹰扬_info":"当你拼点的牌亮出时你可以令其点数“+3”或 “-3”",
            "jz_度势":"度势",
            "jz_度势_info":"出牌阶段限5次，你可以把一张红色手牌当做以逸待劳使用",
            "jz_天妒":"天妒",
            "jz_天妒_info":"你可以获得判定成功的判定牌",
            "jz_连诛":"连诛",
            "jz_连诛_info":"出牌阶段限2次，你可以展示并交给一名其他角色一张牌，若该牌为黑色，其选择一项：1.你摸两张牌；2.弃置两张牌",
            "jz_放逐":"放逐",
            "jz_放逐_info":"你每受到一次伤害，你补X张牌，X为你已损失的体力值，然后指定一名其他角色，该角色离开游戏直到下一轮开始。",
            "jz_截軸":"截輜",
            "jz_截軸_info":"锁定技，一名其他角色跳过其回合内一个阶段后，你摸一张牌",
            "jz_绝策":"绝策",
            "jz_绝策_info":"你死亡时，可以令一名其他角色（杀死你的角色除外）摸两张牌，然后令其回复1点体力。",
            "jz_仁心":"仁心",
            "jz_仁心_info":"锁定技，取消你打出或使用的杀的效果",
            "聚心":"聚心",
            "聚心_info":"每当你失去牌后，你获得一枚“聚心”标记，并令一名其他角色摸一张牌;锁定技，你的“聚心”标记最多有三枚，每名角色回合结束时,你弃置所有的”聚心”标记。",
            "治军":"治军",
            "治军_info":"每当一名角色失去牌后，你获得一枚“治军”标记，并令一名其他角色摸一张牌;锁定技，你的“治军”标记最多有三枚，每名角色回合结束时,你弃置所有的”治军”标记。",
            "jz_横征":"横征",
            "jz_横征_info":"摸牌阶段开始时，若你的体力不小于4或你没有手牌，你可以改为获得每名其他角色区域里的一张牌。",
            "jz_机巧":"机巧",
            "jz_机巧_info":"回合开始时，你可以弃置2张牌，亮出牌堆顶的五张牌，你获得其中的锦囊牌，其他牌归入弃牌堆",
            "jz_玲珑":"玲珑",
            "jz_玲珑_info":"锁定技，若你的装备区没有防具牌，视为你装备着【八卦阵】；若你的装备区没有坐骑牌，你获得牌数量+1；若你的装备区没有宝物牌，你使用锦囊牌无距离限制",
            "jz_玲珑2":"玲珑",
            "jz_玲珑2_info":"",
            "jz_芊芊5":"芊芊",
            "jz_芊芊5_info":"",
            "jz_无效":"无效",
            "jz_无效_info":"锁定技，当你受到伤害前(伤害需大于0)，或当你使用技能时，若你不为〖透心凉。〗则移除所有技能并不能再添加技能",
            "jz_无效2":"无效",
            "jz_无效2_info":"",
            "jz_幻化":"幻化",
            "jz_幻化_info":"锁定技，你在回合结束后或体力值改变后，随机获得一个势力角色的所有技能",
            "jz_改名":"改名",
            "jz_改名_info":"",
            "jz_刚直":"刚直",
            "jz_刚直_info":"锁定技，所有角色使用技能转化的卡牌牌无效；回合外你失去牌后你摸一张牌",
            "jz_刚直2":"刚直",
            "jz_刚直2_info":"",
            "jz_奇袭":"奇袭",
            "jz_奇袭_info":"出牌阶段限三次，你可以将一张黑色牌当做【过河拆桥】使用;每当你使用【过河拆桥】后，你摸一张牌",
            "jz_奇袭2":"奇袭",
            "jz_奇袭2_info":"",
            "jz_万剑":"万剑",
            "jz_万剑_info":"",
            "jz_万剑2":"万剑",
            "jz_万剑2_info":"锁定技，每名角色使用牌时，除你之外的其他角色受到一点神圣伤害",
            "jz_奋激":"奋激",
            "jz_奋激_info":"每当一名角色的手牌于回合外被弃置时，你可以失去1点体力，然后该角色摸两张牌。",
            "jz_青囊":"青囊",
            "jz_青囊_info":"出牌阶段，你可以弃置一张手牌令一名角色回复一点体力并解除翻面和混乱，每阶段限一次",
            "jz_绝世":"绝世",
            "jz_绝世_info":"觉醒技，准备阶段，若在场玩家人数小于等于五人，你须增加1点体力上限，并永久获得技能【英姿】，【天香】",
            "jz_惜花":"惜花",
            "jz_惜花_info":"锁定技，当你的牌因弃置而置入弃牌堆时，若弃置牌的数量等于你的体力值，你将其收回手牌，且你的红色手牌不占用手牌上限",
            "jz_真火":"真火",
            "jz_真火_info":"你使用【杀】被目标角色闪避后，你可以指定目标角色距离1以内的角色受到你造成的一点火焰伤害",
            "jz_鬼术":"鬼术",
            "jz_鬼术_info":"任意一名角色的判定生效前，你可以打出一张红色牌替换之",
            "jz_黑烟":"黑烟",
            "jz_黑烟_info":"你不能成为黑色【杀】或【决斗】的目标。",
            "jz_助君2":"助君",
            "jz_助君2_info":"",
            "jz_助君":"助君",
            "jz_助君_info":"限定技，出牌阶段，你可以将所有手牌交给一名其他角色，若如此做，该角色的手牌上限+2，且其在摸牌阶段摸牌数量+2",
            "jz_助君3":"助君",
            "jz_助君3_info":"",
            "jz_遁甲":"遁甲",
            "jz_遁甲_info":"锁定技，你拥有技能【观星】，且可以在每名角色摸牌前使用【观星】;出牌阶段限一次，你可以将所有手牌交给一名其他角色，若如此做，该角色翻面",
            "jz_观星":"观星",
            "jz_观星_info":"每名角色的准备阶段，你可以观看牌堆顶的5张牌（存活角色小于4时改为3张），并将其以任意顺序置于牌堆项或牌堆底，如果你把观星的牌都放在牌堆底",
            "jz_夭折":"夭折",
            "jz_夭折_info":"当你死亡时，若你为第一名死亡的角色(复活的角色不算)，你可以进行判定，若为红色则让使你死亡的角色进入濒死状态",
            "jz_多病":"多病",
            "jz_多病_info":"锁定技，当你或其他角色对你使用【桃】时，你额外回复一点体力",
            "jz_善射":"善射",
            "jz_善射_info":"限定技，出牌阶段，你可以失去两点体力上限，并获得技能【烈弓】和【新烈弓】",
            "jz_诱计":"诱计",
            "jz_诱计_info":"出牌阶段，你可将一张【闪】当做杀使用或打出，且你使用的经转化的【杀】必定命中",
            "jz_诱计2":"诱计",
            "jz_诱计2_info":"",
            "jz_诛心":"诛心",
            "jz_诛心_info":"锁定技，每当你在回合外不因此技能获得牌后，立即摸一张牌",
            "jz_精准":"精准",
            "jz_精准_info":"你可以获得你的判定牌;每当一名其他角色跳过回合内一个阶段时，你可以代替其进行此阶段<li>若为出牌阶段，你可以摸两张牌<li>若为弃牌阶段，你回复一点体力",
            "jz_精准2":"精准",
            "jz_精准2_info":"",
            "jz_精准1":"精准",
            "jz_精准1_info":"",
            "jz_精准3":"精准",
            "jz_精准3_info":"",
            "jz_精准4":"精准",
            "jz_精准4_info":"",
            "jz_精准5":"精准",
            "jz_精准5_info":"",
            "jz_称象":"称象",
            "jz_称象_info":"锁定技，<li>当你在摸牌阶段摸牌后，亮出牌堆顶的四张牌。然后获得其中任意数量点数之和不大于13的牌，之后你弃两张牌<li>每当你受到一次伤害后，你亮出牌堆顶的四张牌。然后获得其中任意数量点数之和不大于13的牌",
            "jz_偷袭":"偷袭",
            "jz_偷袭_info":"每当一名其他角色摸牌阶段开始前，你可以流失一点体力并视为你对其使用了一张【杀】，且此杀造成伤害后如果你的体力值大于目标的体力值，则目标减少一点体力上限",
            "jz_偷袭2":"偷袭",
            "jz_偷袭2_info":"",
            "jz_耀武":"耀武",
            "jz_耀武_info":"锁定技，当任意角色对你造成伤害时，若满足下列任意一个条件，则其选择摸一张牌或回复一点体力(不能叠加)<li>伤害来源使用红色【杀】对你造成伤害时<li>伤害来源势力为吴国",
            "jz_芊芊6":"芊芊",
            "jz_芊芊6_info":"",
            "jz_芊芊7":"芊芊",
            "jz_芊芊7_info":"",
            "jz_芊芊8":"芊芊",
            "jz_芊芊8_info":"",
            "jz_袭斩":"袭斩",
            "jz_袭斩_info":"当你使用【杀】对距离为1的目标角色造成伤害时，你可以进行一次判定，若判定结果不为红桃，你防止此伤害，令其减x点体力上限(x为造成伤害的数量)",
            "jz_大喝":"大喝",
            "jz_大喝_info":"当你使用一张杀时，你摸一张牌",
            "jz_夺权":"夺权",
            "jz_夺权_info":"锁定技，当你的体力值小于等于3时，所有其他角色使用主动技能时结束当前回合并进入其下一名角色的回合",
            "jz_忍戒":"忍戒",
            "jz_忍戒_info":"锁定技，每当你受到一次伤害或流失体力后，你获得等同于你受到的伤害或流失体力数量的“忍”标记",
            "jz_拜印":"拜印",
            "jz_拜印_info":"觉醒技，准备阶段开始时，若你拥有的“忍”标记枚数不小于3，你减1点体力上限，然后获得【狼顾】",
            "jz_狼顾":"狼顾",
            "jz_狼顾_info":"锁定技，你造成伤害时，若你的“忍”标记大于0，则你造成的伤害加一，并移除一枚“忍”标记;与你距离小于等于5的其他角色不能使用或打出牌响应你使用的牌，每个回合开始，若你的“忍”标记数大于0，则你摸一张牌",
            "jz_仙法":"仙法",
            "jz_仙法_info":"锁定技，当你受到伤害，造成伤害或流失体力时，你选择并获得一个与受到伤害，造成伤害或流失体力相关的一项技能，直至你下回使用此技能",
            "jz_太虚":"太虚",
            "jz_太虚_info":"每当一名其他角色摸牌阶段结束后，若你的体力值小于等于2且目标手牌数大于0，则你可以回复一点体力，并弃掉其一张手牌",
            "jz_变幻":"变幻",
            "jz_变幻_info":"回合结束阶段，你将一张随机武将牌放置在你的武将牌上并替换在此之前因此技能放置的武将牌(至多放一张)，同时获得该武将的所有技能，同时性别，武将名，国籍变为与该武将相同;当你使用【星纬】时移除因此技能放置在你武将上的武将牌",
            "jz_星纬":"星纬",
            "jz_星纬_info":"觉醒技，锁定技，当你进入濒死阶段时:<li>若场上玩家人数大于等于5，则你失去【变幻】，此时若你的体力值小于2，则将体力值回复至2，<li>若存活人数小于5，你摸两张牌并回复至满体力<li>如果使用【星纬】后，你拥有技能【变幻】且存活玩家从5以下增加到5及以上时，则你在回合开始阶段可以使用【道法】",
            "jz_道法":"道法",
            "jz_道法_info":"锁定技，回合开始阶段，若你发动了【星纬】且游戏人数不小于5，则你获得一名随机武将的所有技能",
            "jz_芳魂":"芳魂",
            "jz_芳魂_info":"出牌阶段限一次，你可以弃置一张花色为梅花的牌并流失一点体力，然后选择1名角色，直至你此回合结束前你获得如下两种效果:<li>你对其使用牌没有次数限制，<li>你每使用一张基本牌后，你摸一张牌",
            "jz_隐退2":"隐退",
            "jz_隐退2_info":"",
            "jz_芳魂3":"芳魂",
            "jz_芳魂3_info":"",
            "jz_隐退3":"隐退",
            "jz_隐退3_info":"",
            "jz_暗香":"暗香",
            "jz_暗香_info":"<li>当你回合开始或造成伤害后，你获得1枚“暗香”标记；<li>你的“暗香”标记最多为3枚；<li>你可以移去1枚“暗香”标记来发动【龙魂】并摸一张牌;<li>当你因此技能而发动【龙魂】时，只需用一张牌进行转化",
            "jz_隐退":"扶汉",
            "jz_隐退_info":"限定技，当一名其他角色死亡后，若你不是主公或者boss，则:<li>你可以摸三张牌，随机获得【龙胆】或【袭敌】其中一个技能。<li>若如此做，你额外行动一回合。在额外回合结束时，你的体力值变为0，且流失1点体力。<li><span style=\"color:#FF0000\">退隐效果:当你死亡时，若赵襄的体力值小于0，则在游戏中移除赵襄，此效果不会被除改名或神圣死亡以外的任何效果所影响</span>",
            "jz_袭敌":"袭敌",
            "jz_袭敌_info":"锁定技，当你使用因【暗香】转化的【杀】或【闪】时，你获得目标的一张手牌",
            "jz_袭敌1":"袭敌",
            "jz_袭敌1_info":"",
            "jz_袭敌2":"袭敌",
            "jz_袭敌2_info":"",
            "jz_龙胆":"龙胆",
            "jz_龙胆_info":"锁定技，当你使用因【暗香】转化的卡牌时，你摸一张牌",
            "jz_武魂":"武魂",
            "jz_武魂_info":"锁定技，当你受到1点伤害后，你令伤害来源获得1枚“梦魇”标记；当你濒死阶段执行结束时，你令拥有“梦魇”标记最多的角色(不包括自己)进行判定，<li>若结果不为【桃】或【桃园结义】，则该角色立即进入濒死阶段。(若其体力值为Infinity则其神圣死亡)<li>若结果为【桃】或【桃园结义】，则该角色回复一点体力并清除“梦魇”标记<li>当一名角色因【武魂】死亡后，你继续使在场玩家中拥有“梦魇”标记数最多的玩家进行【武魂】判定",
            "jz_武魂2":"武魂",
            "jz_武魂2_info":"锁定技，当你受到1点伤害后，你令伤害来源获得1枚“梦魇”标记；当你濒死阶段执行结束时，你令拥有“梦魇”标记最多的角色(不包括自己)进行判定，<li>若判定牌花色不为红桃，则该角色立即进入濒死阶段。(若其体力值为Infinity则其神圣死亡)<li>若判定结果为红桃，则该角色回复一点体力并清除“梦魇”标记<li>当一名角色因【武魂】死亡后，你继续使在场玩家中拥有“梦魇”标记数最多的玩家进行【武魂】判定",
            "jz_武魂3":"武魂",
            "jz_武魂3_info":"<span style=\"color:#FF0000\">当神关羽濒死阶段执行结束后，若你的“梦魇”标记为全场最多(或之一)，则进行判定，<li>若判定牌花色不为红桃，则你立即进入濒死阶段。(若你的体力值为Infinity则神圣死亡)<li>若判定牌花色为红桃，则你回复一点体力并清除“梦魇”标记</span>",
            "jz_隐忍":"隐忍",
            "jz_隐忍_info":"回合开始阶段，你可以摸一张牌",
            "jz_武魂4":"武魂",
            "jz_武魂4_info":"<span style=\"color:#FF0000\">锁定技，当其他角色进入濒死阶段后，若你拥有“梦魇”标记，则减少一枚“梦魇”标记</span>",
            "jz_计取":"计取",
            "jz_计取_info":"出牌阶段，你可以观看一名其他角色的手牌，并可以获得其中一张，每阶段限一次。",
        },
    },
    intro:"特别说明:<li>本扩展会做一些民间包武将，技能可能也会改动<li>开启本扩展时，所有人在体力值大于0时免疫普通即死效果。被即死的角色清空死亡函数<li>为了补偿，神关羽会额外增强【武魂】，使之可以即死其他角色。且曹丕增加一个额外技能<li>开启本扩展时，武将【神座】不能参加游戏",
    author:"冰波水微",
    diskURL:"",
    forumURL:"",
    version:"2.25",
},files:{"character":["jz_赵襄.jpg","jz_神邓艾.jpg"],"card":[],"skill":[]}}})