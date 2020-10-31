


d3.csv("./data/air2015-SB.csv").then(function(data) {
    console.log(data)

    var width = document.querySelector("#chart").clientWidth;
    var height = document.querySelector("#chart").clientHeight;
    var margin = {top: 10, left: 80, right: 50, bottom: 90};
    
    var svg = d3.select("#chart")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

var filtered_data_1 = data.filter(function(d) {
    return d.month ==1;
});
var filtered_data_3 = data.filter(function(d) {
    return d.month ==3;
});
var filtered_data_5 = data.filter(function(d) {
    return d.month ==5;
});
var filtered_data_7 = data.filter(function(d) {
    return d.month ==7;
});
var filtered_data_8 = data.filter(function(d) {
    return d.month ==8;
});
var filtered_data_10 = data.filter(function(d) {
    return d.month ==10;
});
var filtered_data_12 = data.filter(function(d) {
    return d.month ==12;
});




console.log(filtered_data_1)
console.log(filtered_data_3)
console.log(filtered_data_5)
console.log(filtered_data_7)
console.log(filtered_data_8)
console.log(filtered_data_10)
console.log(filtered_data_12)




var xScale = d3.scaleLinear()
    .domain([0,31])
    .range([margin.left, width-margin.right]);

var yScale = d3.scaleLinear()
    .domain([0, 600])
    .range([height-margin.bottom, margin.top]);

var xAxis = svg.append("g")
        .attr("class","axis")
        .attr("transform", `translate(0,${height-margin.bottom})`)
        .call(d3.axisBottom().scale(xScale).tickFormat(d3.format("Y")));

var yAxis = svg.append("g")
        .attr("class","axis")
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft().scale(yScale));

var xAxisLabel = svg.append("text")
        .attr("class","axisLabel")
        .attr("x", width/2)
        .attr("y", height-margin.bottom/2)
        .text("Day of the Month");

var yAxisLabel = svg.append("text")
        .attr("class","axisLabel")
        .attr("transform","rotate(-90)")
        .attr("x",-height/2)
        .attr("y",margin.left/2)
        .text("PM 2.5_US post");

var circle = svg.selectAll("circle")
    .data(filtered_data_1)
    .enter()
    .append("circle")
    .attr("cx", function(d) { return xScale(d.day); })
    .attr("cy", function(d) { return yScale(d.PM); })
    .attr("r", 5)
    .attr("fill","red");




var PM = {
        min1: d3.min(filtered_data_1, function(d) { return +d.PM; }),
        max1: d3.max(filtered_data_1, function(d) { return +d.PM; }),
        min7: d3.min(filtered_data_1, function(d) { return +d.PM; }),
        max7: d3.max(filtered_data_1, function(d) { return +d.PM; })
    };






d3.select("#January").on("click", function() { 
            var c = svg.selectAll("circle")
              .data(filtered_data_1, function(d) { return d.area; });
              console.log("test");

        
            c.enter().append("circle")
                .attr("cx", function(d) { return xScale(d.day); })
                .attr("cy", function(d) { return yScale(d.PM); })
                .attr("r",5)
                .attr("fill","#ff0000")
              .merge(c)
                .transition() 
                .duration(1500)
                .attr("cx", function(d) { return xScale(d.day); })
                .attr("cy", function(d) { return yScale(d.PM); })
                .attr("r",5)
                .attr("fill","#ff0000");

                c.exit()
                .transition()
                .duration(1000)
                .attr("r",0)
                .remove();
          });



d3.select("#March").on("click", function() { 
            var c = svg.selectAll("circle")
              .data(filtered_data_3, function(d) { return d.area; });

            c.enter().append("circle")
                .attr("cx", function(d) { return xScale(d.day); })
                .attr("cy", function(d) { return yScale(d.PM); })
                .attr("r",5)
                .attr("fill","#ff9900")
              .merge(c)
                .transition() 
                .duration(1500)
                .attr("cx", function(d) { return xScale(d.day); })
                .attr("cy", function(d) { return yScale(d.PM); })
                .attr("r",5)
                .attr("fill","#ff9900");

                c.exit()
                .transition()
                .duration(1000)
                .attr("r",0)
                .remove();
          });
        

d3.select("#May").on("click", function() { 
            var c = svg.selectAll("circle")
              .data(filtered_data_5, function(d) { return d.area; });
        
            c.enter().append("circle")
                .attr("cx", function(d) { return xScale(d.day); })
                .attr("cy", function(d) { return yScale(d.PM); })
                .attr("r",5)
                .attr("fill","#ffff66")
              .merge(c)
                .transition() 
                .duration(1500)
                .attr("cx", function(d) { return xScale(d.day); })
                .attr("cy", function(d) { return yScale(d.PM); })
                .attr("r",5)
                .attr("fill","#ffff66");

                c.exit()
                .transition()
                .duration(1000)
                .attr("r",0)
                .remove();
          });



        
d3.select("#July").on("click", function() { 
            var c = svg.selectAll("circle")
              .data(filtered_data_7, function(d) { return d.area; });        
            c.enter().append("circle")
                .attr("cx", function(d) { return xScale(d.day); })
                .attr("cy", function(d) { return yScale(d.PM); })
                .attr("r",5)
                .attr("fill","#00cc66")
              .merge(c)
                .transition() 
                .duration(1500)
                .attr("cx", function(d) { return xScale(d.day); })
                .attr("cy", function(d) { return yScale(d.PM); })
                .attr("r",5)
                .attr("fill","#00cc66");

                c.exit()
                .transition()
                .duration(1000)
                .attr("r",0)
                .remove();

          });
        


          
d3.select("#August").on("click", function() { 
            var c = svg.selectAll("circle")
              .data(filtered_data_8, function(d) { return d.area; });        
            c.enter().append("circle")
                .attr("cx", function(d) { return xScale(d.day); })
                .attr("cy", function(d) { return yScale(d.PM); })
                .attr("r",5)
                .attr("fill","#00ffff")
              .merge(c)
                .transition() 
                .duration(1500)
                .attr("cx", function(d) { return xScale(d.day); })
                .attr("cy", function(d) { return yScale(d.PM); })
                .attr("r",5)
                .attr("fill","#00ffff");

                c.exit()
                .transition()
                .duration(1000)
                .attr("r",0)
                .remove();

          });



d3.select("#October").on("click", function() { 
            var c = svg.selectAll("circle")
              .data(filtered_data_10, function(d) { return d.area; });        
            c.enter().append("circle")
                .attr("cx", function(d) { return xScale(d.day); })
                .attr("cy", function(d) { return yScale(d.PM); })
                .attr("r",5)
                .attr("fill","#0099ff")
              .merge(c)
                .transition() 
                .duration(1500)
                .attr("cx", function(d) { return xScale(d.day); })
                .attr("cy", function(d) { return yScale(d.PM); })
                .attr("r",5)
                .attr("fill","#0099ff");

                c.exit()
                .transition()
                .duration(1000)
                .attr("r",0)
                .remove();

          });



d3.select("#December").on("click", function() { 
            var c = svg.selectAll("circle")
              .data(filtered_data_12, function(d) { return d.area; });        
            c.enter().append("circle")
                .attr("cx", function(d) { return xScale(d.day); })
                .attr("cy", function(d) { return yScale(d.PM); })
                .attr("r",5)
                .attr("fill","#9900ff")
              .merge(c)
                .transition() 
                .duration(1500)
                .attr("cx", function(d) { return xScale(d.day); })
                .attr("cy", function(d) { return yScale(d.PM); })
                .attr("r",5)
                .attr("fill","#9900ff");

                c.exit()
                .transition()
                .duration(1000)
                .attr("r",0)
                .remove();

          });


      


});




