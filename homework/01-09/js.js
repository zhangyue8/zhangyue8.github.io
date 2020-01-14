//onload的作用是等事件加载完以后才执行此程序
window.onload=function()
{
	//获取按钮事件
	var bt1=document.getElementById("pre");
	var bt2=document.getElementById("next");
	//获取img标签中的第一个元素结点
	var img=document.getElementsByTagName("img")[0];
	//创建一个数组用来保存图片的路径（即src属性）
	var imgarr=["img/1.jpg","img/2.jpg","img/3.jpg","img/4.jpg","img/5.jpg"];
	//设置数组的索引下标
	 var index=0;
	 //获取p标签
	var pbq=document.getElementById("pid");
	//设置提醒文字
	pbq.innerHTML="共有"+imgarr.length+"张图片,当前第"+(index+1)+"张";
	//绑定事件
	bt1.onclick=function()
	{
		//书写事件驱动程序
		index--;//切换到上一张索引自减
		//判断索引是否小于0
		if(index<0)
		{
			index=imgarr.length-1;//目的是可以实现循环切换
		}
		//修改img的src属性
		img.src=imgarr[index];
		//当点击按钮以后，重新设置p标签中的显示内容
		pbq.innerHTML="共有"+imgarr.length+"张图片,当前第"+(index+1)+"张";
	};
	//绑定事件
	bt2.onclick=function()
	{
		//书写事件驱动程序
		index++;//切换到下一张索引自加
		//判断索引是否大于4
		if(index>imgarr.length-1)
		{
			index=0;//目的是可以实现循环切换
		}
		//修改img的src属性
		img.src=imgarr[index];
		//当点击按钮以后，重新设置p标签中的显示内容
		pbq.innerHTML="共有"+imgarr.length+"张图片,当前第"+(index+1)+"张";
	};
};
