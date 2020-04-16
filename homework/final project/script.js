var promises = [
	d3.csv("./data/Jp2001_2018.csv", parseCSV),
	d3.json("./geojson/jp.json")
];

Promise.all(promises).then(function(data) {
	var earthquakeData = data[0];
	console.log(earthquakeData);
	var jpn = data[1];
	console.log(jpn);

	/* earthquakeData = earthquakeData.filter(function(d){
	   //  return d3.geoContains(jpn,[d.longitude,d.latitude])/////////

	 }) */
	console.log(earthquakeData);

	var width = document.querySelector("#chart").clientWidth;
	var height = document.querySelector("#chart").clientHeight;
	var svg = d3.select("#chart")
		.append("svg")
		.attr("width", width)
		.attr("height", height);

	var projection = d3.geoMercator()
		.translate([width / 2, height / 2])
		.center([138.2529, 36.2048])
		.scale(2000);
	var path = d3.geoPath().projection(projection);



	svg.selectAll("path")
		.data(jpn.features)
		.enter()
		.append("path")
		.attr("stroke", "black")
		.attr("stroke-width", "0.3")
		.attr("fill", "white")
		.attr("d", path);




	earthquakeData = earthquakeData.sort(function(a, b) {
		return a.year - b.year;
	});


	var slider = d3.select("#selectYear");

	slider
		.property("min", earthquakeData[0].year)
		.property("max", earthquakeData[earthquakeData.length - 1].year)
		.property("value", earthquakeData[earthquakeData.length - 1].year);

	var selectedYear = slider.property("value")


	var yearLabel = svg.append("text")
		.attr("class", "yearLabel")
		.attr("x", 50)
		.attr("y", height - 500)
		.text(selectedYear);



	function updateMap(year) {

		var filtered_data = earthquakeData.filter(function(d) {
			return d.year == year;
		});

		var c = svg.selectAll("circle")
			.data(filtered_data, function(d) {
				return d.id;
			});
		/* switch (){
			case value:
				break;
			default:
				break;
		} */
		console.log("mag===>" + earthquakeData[0].mag)
		console.log("c===>" + c.enter())
		c.enter().append("circle").attr("cx", function(d) {
				var proj = projection([d.longitude, d.latitude]);
				return proj[0];
			}).attr("cy", function(d) {
				var proj = projection([d.longitude, d.latitude]);
				return proj[1];
			}).attr("r", 50)
			.attr("mag", function(d) {
				var proj = d.mag;
				return proj;
			})
			
			.attr("fill", function(d) {
				var color = "#000000";
				proj = d.mag;
				switch (Math.floor(proj)) {
					case 4:
						color = "#ffff00";
						break;
					case 5:
						color = "#ff0000";
						break;
					case 6:
						color = "";
						break;
					case 7:
						color = "#ff4400";
						break;
					case 8:
						color = "#ff2200";
						break;
					case 9:
						color = "#ff0000";
						break;
					default:
						break;
				}
				return color;
			})
			.merge(c)
			.transition()
			.duration(1000)
			.attr("cx", function(d) {
				var proj = projection([d.longitude, d.latitude]);
				return proj[0];
			}).attr("cy", function(d) {
				var proj = projection([d.longitude, d.latitude]);
				return proj[1];
			}).attr("r", 5)
			.attr("opacity", 0.9)
			
			.attr("fill", function(d) {
				var color = "#000000";
				proj = d.mag;
				switch (Math.floor(proj)) {
					case 4:
						color = "#ffff00";
						break;
					case 5:
						color = "#ffdd00";
						break;
					case 6:
						color = "#ffaa00";
						break;
					case 7:
						color = "#ff7700";
						break;
					case 8:
						color = "#ff4400";
						break;
					case 9:
						color = "#ff0000";
						break;
					default:
						break;
				}
				return color;

			})




		c.exit()
			.transition()
			.duration(1000)
			.attr("r", 0)
			.remove();


		yearLabel.text(year);
		console.log(svg)

		svg.selectAll("circle")
			.on("mouseover", function(d) {
				var cx = +d3.select(this).attr("cx") + 15;
				var cy = +d3.select(this).attr("cy") + 60;

				tooltip.style("visibility", "visible")
					.style("left", +cx + "px")
					.style("top", +cy + "px")
					.html("Magnitude:" + d.mag + "<br>" + d.date.toLocaleDateString("ja-JP"));

				svg.selectAll("circle")
					

				d3.select(this)
					

			}).on("mouseout", function() {
				tooltip.style("visibility", "hidden");

				svg.selectAll("circle")
					
			})

	}
	updateMap(selectedYear);
	slider.on("input", function() {
		var year = this.value;
		console.log(year);
		selectedYear = year;
		updateMap(selectedYear);
	})

	var tooltip = d3.select("#chart")
		.append("div")
		.attr("class", "tooltip");

	//散点图
	function createChart(year) {
		var filtered_data = earthquakeData.filter(function(d) {
			return d.year == year;
		});
		var padding=30;
		console.log(filtered_data)

		//高宽
		var w = 655;
		var h = 505;
		//创建SVG
		var svg = d3.select("body")
			.append("svg")
			.attr("style","margin:200px 25%")
			.attr("width", w)
			.attr("height", h);
		let xScale=d3.scaleLinear()
			.domain([0,12])
			.range([padding,w-padding*2])

			 //y轴标尺
		let yScale=d3.scaleLinear()
			.domain([4,10])
			.range([h-padding,padding])
			
		svg.selectAll("circle")
			.data(filtered_data)
			.enter()
			.append("circle")
			.attr("cx", function(d) {
				console.log("d.date.getMonth()*50+5=="+d.date.getMonth()*50+5)				
				return xScale(d.date.getMonth()+d.date.getDay()/30)+50;
			})
			.attr("cy", function(d) {
				console.log("d.mag*50=="+d.mag*50)
				return yScale(d.mag);
			})
			.attr("r", 5)
			.attr("opacity", 0.3)
			.attr("fill", function(d) {
				var color = "#000000";
				proj = d.mag;
				switch (Math.floor(proj)) {
					case 4:
						color = "#ffff00";
						break;
					case 5:
						color = "#ffdd00";
						break;
					case 6:
						color = "#ffaa00";
						break;
					case 7:
						color = "#ff7700";
						break;
					case 8:
						color = "#ff4400";
						break;
					case 9:
						color = "#ff0000";
						break;
					default:
						break;
				}
				return color;
			
			})
	   //x
	       let xAxis=d3.axisBottom()
	       .scale(xScale)
	       .ticks(20)
	 
	       //y
	       let yAxis=d3.axisLeft()
	       .scale(yScale)
	       .ticks(15)
		   //
		   svg.append("g")
		   .attr("class","axis")
		   .attr("transform","translate(0,"+(h-30)+")")
		   .call(xAxis)
		   svg.append("g")
		   .attr("class","axis")
		   .attr("transform","translate(30,0)")
		   .call(yAxis)
	}
	createChart(selectedYear)

});

function parseCSV(data) {
	var d = {};
	d.id = data.CaseID;
	d.latitude = +data.Latitude;
	d.longitude = +data.Longitude;
	d.mag = +data["Mag"];
	d.date = new Date(data.Date);
	d.year = d.date.getFullYear();

	return d;
}
