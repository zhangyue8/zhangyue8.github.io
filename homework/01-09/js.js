window.onload=function()
{
	var bt1=document.getElementById("pre");
	var bt2=document.getElementById("next");
	var img=document.getElementsByTagName("img")[0];
	var imgarr=["01-09_resource/marble-1.jpg","01-09_resource/marble-2.jpg","01-09_resource/marble-3.jpg","01-09_resource/marble-4.jpg","01-09_resource/marble-5.jpg"];
	 var index=0;
	var pbq=document.getElementById("pid");
	pbq.innerHTML="All have "+imgarr.length+" pictures, now is NO."+(index+1);
	bt1.onclick=function()
	{
		index--;
		if(index<0)
		{
			index=imgarr.length-1;
		}
		img.src=imgarr[index];
		pbq.innerHTML="All have "+imgarr.length+" pictures, now is NO."+(index+1);
	};

    bt2.onclick=function()
	{
		index++;
		if(index>imgarr.length-1)
		{
			index=0;
		}
		img.src=imgarr[index];
		pbq.innerHTML="All have "+imgarr.length+" pictures, now is NO."+(index+1);
	};
};
