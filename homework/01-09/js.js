window.onload=function()
{
	var bt1=document.getElementById("pre");
	var bt2=document.getElementById("next");
	//获取img标签中的第一个元素结点
	var img=document.getElementsByTagName("img")[0];
	//创建一个数组用来保存图片的路径（即src属性）
	var imgarr=["01-09_resource/marble-1.jpg","01-09_resource/marble-2.jpg","01-09_resource/marble-3.jpg","01-09_resource/marble-4.jpg","01-09_resource/marble-5.jpg"];
	//设置数组的索引下标
	 var index=0;
	 //获取p标签
	var pbq=document.getElementById("pid");
	//设置提醒文字
	pbq.innerHTML="All have"+imgarr.length+"pictures, now is NO."+(index+1);
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
		pbq.innerHTML="All have "+imgarr.length+" pictures, now is NO."+(index+1);
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
		pbq.innerHTML="All have"+imgarr.length+"pictures, now is NO."+(index+1);
	};
};
