'use strict';
game.import('mode',function(lib,game,ui,get,ai,_status){
	return {
		name:'connect',
		start:function(){
			var directstartmode=lib.config.directstartmode;
			ui.create.menu(true);
			event.textnode=ui.create.div('','输入联机地址');
			var createNode=function(){
				if(event.created) return;
				if(directstartmode&&lib.node){
					ui.exitroom=ui.create.system('退出房间',function(){
						game.saveConfig('directstartmode');
						game.reload();
					},true);
					game.switchMode(directstartmode);
					return;
				}
				if(lib.node&&window.require){
					ui.startServer=ui.create.system('启动服务器',function(e){
						e.stopPropagation();
						ui.click.connectMenu();
					},true);
				}

				event.created=true;
				var node=ui.create.div('.shadowed');
				node.style.width='400px';
				node.style.height='30px';
				node.style.lineHeight='30px';
				node.style.fontFamily='xinwei';
				node.style.fontSize='30px';
				node.style.padding='10px';
				node.style.left='calc(50% - 210px)';
				node.style.top='calc(50% - 20px)';
				node.style.whiteSpace='nowrap';
				node.innerHTML=lib.config.last_ip||lib.hallURL;
				node.contentEditable=true;
				node.style.webkitUserSelect='text';
				node.style.textAlign='center';

				// var search=function(obj)
				// {
				// 	var shortid=obj.value;
				// 	window.location.href="connect.php?q='+shortid+'";
				// }
				// search(lib.hallURL);
				var ajax=function(){
					//创建XMLHttpResquest对象
					var xmlHttp = new XMLHttpRequest();

//创建一个Http请求，（method,url,async)
					xmlHttp.open('POST','mode/connect.php','true');
					xmlHttp.setRequestHeader("content-type","application/x-www-form-urlencoded");
//发送Http请求
					console.log(node.innerHTML);
					xmlHttp.send('fname='+node.innerHTML);

//当async为false时数据处理
// document.getElementById("mydiv").innerHTML=xmlhttp.responseText;

//异步时，没有得到服务器响应的情况下，防止代码停止的方法。 （同步不需要设置此方法
//当异步时，即async为ture时数据处理，接收到服务端响应时触发
					xmlHttp.onreadystatechange=function () {
						if(xmlHttp.readyState==4&&xmlHttp.status==200){
							var msg = xmlHttp.responseText;
							console.log(msg);
							return msg;
							//alert(msg);
							// var divtag = document.getElementById('result');
							// divtag.innerHTML = msg;
						}else{
							//没有响应的代码
						}
					}
				}
				ajax();
				var connect=function(e){
					event.textnode.innerHTML='正在连接...';
					clearTimeout(event.timeout);
					if(e) e.preventDefault();
					// console.log(node.innerHTML);
					game.saveConfig('last_ip',node.innerHTML);
					game.connect(node.innerHTML,function(success){
						if(!success&&event.textnode){
							alert('连接失败');
							event.textnode.innerHTML='输入联机地址';
						}
					});
				};
				node.addEventListener('keydown',function(e){
					if(e.keyCode==13){
						connect(e);
					}
				});
				ui.window.appendChild(node);
				ui.ipnode=node;

				var text=event.textnode;
				text.style.width='400px';
				text.style.height='30px';
				text.style.lineHeight='30px';
				text.style.fontFamily='xinwei';
				text.style.fontSize='30px';
				text.style.padding='10px';
				text.style.left='calc(50% - 200px)';
				text.style.top='calc(50% - 80px)';
				text.style.textAlign='center';
				ui.window.appendChild(text);
				ui.iptext=text;

				var button=ui.create.div('.menubutton.highlight.large.pointerdiv','连接',connect);
				button.style.width='70px';
				button.style.left='calc(50% - 35px)';
				button.style.top='calc(50% + 60px)';
				ui.window.appendChild(button);
				ui.ipbutton=button;

				ui.hall_button=ui.create.system('联机大厅',function(){
					node.innerHTML=get.config('hall_ip')||lib.hallURL;
					connect();
				},true);
				if(!get.config('hall_button')){
					ui.hall_button.style.display='none';
				}
				ui.recentIP=ui.create.system('最近连接',null,true);
				var clickLink=function(){
					node.innerHTML=this.innerHTML;
					connect();
				};
				lib.setPopped(ui.recentIP,function(){
					if(!lib.config.recentIP.length) return;
					var uiintro=ui.create.dialog('hidden');
					uiintro.listen(function(e){
						e.stopPropagation();
					});
					var list=ui.create.div('.caption');
					for(var i=0;i<lib.config.recentIP.length;i++){
						ui.create.div('.text.textlink',list,clickLink).innerHTML=get.trimip(lib.config.recentIP[i]);
					}
					uiintro.add(list);
					var clear=uiintro.add('<div class="text center">清除</div>');
					clear.style.paddingTop=0;
					clear.style.paddingBottom='3px';
					clear.listen(function(){
						lib.config.recentIP.length=0;
						game.saveConfig('recentIP',[]);
						uiintro.delete();
					});
					return uiintro;
				},220);
				lib.init.onfree();
			}
			if(window.isNonameServer){
				game.connect(window.isNonameServerIp||'localhost');
			}
			else if(lib.config.reconnect_info){
				var info=lib.config.reconnect_info;
				game.onlineID=info[1];
				game.roomId=info[2];
				if(typeof game.roomId=='number'){
					game.roomIdServer=true;
				}
				var n=5;
				var connect=function(){
					event.textnode.innerHTML='正在连接...';
					game.connect(info[0],function(success){
						if(!success&&n--){
							createNode();
							event.timeout=setTimeout(connect,1000);
						}
						else{
							event.textnode.innerHTML='输入联机地址';
						}
					});
				};
				event.timeout=setTimeout(connect,500);
				_status.createNodeTimeout=setTimeout(createNode,2000);
			}
			else{
				createNode();
			}
			if(!game.onlineKey){
				game.onlineKey=localStorage.getItem(lib.configprefix+'key');
				if(!game.onlineKey){
					game.onlineKey=get.id();
					localStorage.setItem(lib.configprefix+'key',game.onlineKey);
				}
			}
			_status.connectDenied=createNode;
			for(var i in lib.element.event){
				event.parent[i]=lib.element.event[i];
			}
			event.parent.custom={
				add:{},
				replace:{}
			};
			setTimeout(lib.init.onfree,1000);
		}
	};
});
