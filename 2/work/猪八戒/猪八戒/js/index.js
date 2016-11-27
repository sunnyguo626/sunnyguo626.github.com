//获取offsetLeft和offsetTop
 function getPos(obj){
            var l = 0;
            var t = 0;
            while(obj){
                l+=obj.offsetLeft;
                t+=obj.offsetTop;
                obj=obj.offsetParent;
            }
            return {left:l,top:t};
        }
//moveIn函数为鼠标移入显示移出隐藏
function moveIn(obj){
	obj.onmouseover=function(){
		var oDiv=obj.getElementsByTagName('div')[0];
		if(oDiv){
			oDiv.style.display='block';
		}
	}
	obj.onmouseout=function(){
		var oDiv=obj.getElementsByTagName('div')[0];
		if(oDiv){
			oDiv.style.display='none';
		}
		
	}
	
}
//move运动
function getStyle(obj,name){
    return obj.currentStyle?obj.currentStyle[name]:getComputedStyle(obj,false)[name];
}
function move(obj,json,options){
    clearInterval(obj.timer);
    options = options || {};
    options.easing = options.easing || 'ease-in';
    options.duration = options.duration || 800;
    var start = {};
    var dis = {}
    for(var name in json){
        start[name] = parseFloat(getStyle(obj,name));
        dis[name] = json[name]-start[name];
    }
    var count = Math.floor(options.duration/30);
    var n = 0;
    obj.timer=setInterval(function(){
        n++;
        for(var name in json){
            switch (options.easing){
                case 'linear':
                    var a = n/count;
                    var cur = start[name]+dis[name]*a;
                    break;
                case 'ease-in':
                    var a = n/count;
                    var cur = start[name]+dis[name]*a*a*a;
                    break;
                case 'ease-out':
                    var a = 1-n/count;
                    var cur = start[name]+dis[name]*(1-a*a*a);
                    break;
            }
            if(name=='opacity'){
                obj.style.opacity=cur;
                obj.style.filter='alpha(opacity:'+cur*100+')';
            }else{
                obj.style[name] =cur+'px'
            }
        }
        if(n==count){
            clearInterval(obj.timer);
            options.complete&&options.complete();
        }
    },30)
}

window.onload=function(){
	var oDiv1=document.getElementById('header-nav');
	var aLi=oDiv1.getElementsByTagName('li');
	var oSearch=document.getElementById('search-l2');
	var oOne=document.getElementById('one');
	var oSearch3=document.getElementById('search-r3');
	var oContentL=document.getElementById('content-l');
	var aLi1=oContentL.getElementsByTagName('li');
	var oContentL2=document.getElementById('content-l2');
	var aBtn=oContentL2.getElementsByTagName('input');
	var aLi2=oContentL2.getElementsByTagName('li');
	var oUl=document.getElementById('ul1');
	var oUl2=document.getElementById('ul2');
	var aLi3=oUl2.getElementsByTagName('li');
	var oTab=document.getElementById('tab-c');
	var aOl=oTab.getElementsByTagName('ol');
	var oS=document.getElementById('search');
	var oS1=document.getElementById('search1');
	var top=getPos(oS).top;
	var oPin=document.getElementById('pin-r');
	var aLi4=oPin.getElementsByTagName('li');
	var aDiv=oPin.getElementsByTagName('div');
	var oServe=document.getElementById('serve');
	var aLi5=oServe.getElementsByTagName('li');
	var oBiao=document.getElementById('biao');
	var aUl3=oBiao.getElementsByTagName('ul');
	var oX=document.getElementById('xu');
	var aLi6=oX.getElementsByTagName('li');
	var oQ=document.getElementById('qiu');
	var aUl4=oQ.getElementsByTagName('ul');
	var oUl8=document.getElementById('you');
	var aLi7=oUl8.getElementsByTagName('li');
	//导航栏函数
	for(var i=0; i<aLi.length;i++){
		aLi[i].onmouseover=function(){
			var oDiv2=this.getElementsByTagName('div')[0];
			if(oDiv2){
				this.style.background='#fff';
				oDiv2.style.display='block';
			}
		}
		aLi[i].onmouseout=function(){
			var oDiv2=this.getElementsByTagName('div')[0];
			if(oDiv2){
				this.style.background='';
				oDiv2.style.display='none';
			}
		}
	}
	//搜索框函数
	moveIn(oSearch);
	moveIn(oOne);
	moveIn(oSearch3);
	//content-l
	for(var i=0; i<aLi1.length; i++){
		aLi1[i].onmouseover=function(){
			var oDiv3=this.getElementsByTagName('div')[0];
			if(oDiv3){
				oDiv3.style.display='block';
				move(this,{marginLeft:'-10',background:'#fff'},{duration:500})
			}
		}
		aLi1[i].onmouseout=function(){
			var oDiv3=this.getElementsByTagName('div')[0];
			if(oDiv3){
				oDiv3.style.display='none';
				move(this,{marginLeft:'0'},{duration:500})
			}
		}
	}
	//无缝滚动
	for(var i=0;i<aBtn.length;i++){
		aBtn[i].index=i;
		aBtn[i].onmouseover=function(){
			for(var i=0;i<aBtn.length;i++){
				aBtn[i].className='';
			}
			this.className='active';
			move(oUl,{left:-this.index*aLi2[0].offsetWidth});
		}
	}
	//选项卡
	for(var i=0;i<aLi3.length;i++){
		aLi3[i].index=i;
		aLi3[i].onmouseover=function(){
			for(var i=0; i<aLi3.length;i++){
					aLi3[i].style.background='';
					aOl[i].style.display='none';
			}		
			this.style.background='#fff';
			aOl[this.index].style.display='block';
			
		}
	}
	//吸顶条
	window.onscroll=function(){
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        if(scrollTop>=top){
            //吸住
            oS.style.position='fixed';
            oS.style.top='0';
            oS.style.left='355px';
            oS.style.zIndex=100;
            oS.style.background='#fff';
            oS1.style.display='block';
        }else{
            //回去
            oS.style.position='static';
            oS1.style.display='none';
        }
    };
    //品牌专区
    for(var i=0;i<aLi4.length;i++){
    	aLi4[i].onmouseover=function(){
    		var oDiv5=this.getElementsByTagName('div')[0];
    		if(oDiv5){
    			move(oDiv5,{bottom:0})
    		}
    	}
    	aLi4[i].onmouseout=function(){
    		var oDiv5=this.getElementsByTagName('div')[0];
    		if(oDiv5){
    			move(oDiv5,{bottom:-98},{duration:50,easing:'ease-in'})
    		}
    	}
    }
    //推荐服务商选项卡
    for(var i=0; i<aLi5.length;i++){
    	aLi5[i].index=i;
    	aLi5[i].onmouseover=function(){
    		for(var i=0; i<aLi5.length;i++){
    			aLi5[i].style.color='';
    			aLi5[i].style.border='';
    			aUl3[i].style.display='none';
    		}
    		this.style.color='#ff6600';
    		this.style.borderBottom='3px solid #ff6600';
    		aUl3[this.index].style.display='block';
    	}
    }
    //热点需求
    for(var i=0; i<aLi6.length;i++){
    	aLi6[i].index=i;
    	aLi6[i].onmouseover=function(){
    		for(var i=0; i<aLi6.length;i++){
    			aLi6[i].style.color='';
    			aLi6[i].style.border='';
    			aUl4[i].style.display='none';
    		}
    		this.style.color='#ff6600';
    		this.style.borderBottom='3px solid #ff6600';
    		aUl4[this.index].style.display='block';
    	}
    }
    //运动
    for(var i=0;i<aLi7.length;i++){
    	aLi7[i].onmouseover=function(){
    		var oDiv9=this.getElementsByTagName('div')[0];
    		if(oDiv9){
    			move(oDiv9,{bottom:0})
    		}
    	}
    	aLi7[i].onmouseout=function(){
    		var oDiv9=this.getElementsByTagName('div')[0];
    		if(oDiv9){
    			move(oDiv9,{bottom:-128})
    		}
    	}
    }
    
	
	
	
}
