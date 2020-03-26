


var promises = [
    d3.csv("./data/Jp2001_2018.csv",parseCSV), 
    d3.json("./geojson/jp.json")
];

Promise.all(promises).then(function(data) {


    var earthquakeData = data[0];
    console.log(earthquakeData);






    var jpn = data[1];
    console.log(jpn);

    earthquakeData = earthquakeData.filter(function(d){
        return d3.geoContains(jpn,[d.longitude,d.latitude])/////////

    })
    console.log(earthquakeData);







    var width = document.querySelector("#chart").clientWidth;
    var height = document.querySelector("#chart").clientHeight;
    var svg = d3.select("#chart")
        .append("svg")
        .attr("width", width)
        .attr("height", height);



var projection = d3.geoMercator()
    .translate([width/2,height/2])
    .center([138.2529, 36.2048])
    .scale(2000);




    var path = d3.geoPath().projection(projection);



    svg.selectAll("path")
    .data(jpn.features)
    .enter()
    .append("path")
        .attr("stroke","red")
        .attr("stroke-width","0.3")
        .attr("fill","white")
        .attr("d",path);




    earthquakeData = earthquakeData.sort(function(a,b) { return a.year - b.year; });


var select = d3.select("#selectYear");

select
    .property("min",earthquakeData[0].year)
    .property("max",earthquakeData[earthquakeData.length-1].year)
    .property("value",earthquakeData[earthquakeData.length-1].year);

var selectedYear = select.property("value")


var yearLabel = svg.append("text")
    .attr("class","yearLabel")
    .attr("x",50)
    .attr("y", height-500)
    .text(selectedYear);
    


function updateMap(year){

var filtered_data = earthquakeData.filter(function(d){
        return d.year == year;
    });

var c = svg.selectAll("circle")
        .data(filtered_data,function(d) {return d.id; });

    c.enter().append("circle")
            .attr("cx",function(d){
                var proj = projection([ d.longitude, d.latitude ]);
                return proj[0];
            }).attr("cy",function(d){
                var proj = projection([d.longitude, d.latitude]);
                return proj[1];
            }).attr("r",20)
            .attr("opacity",0.1)
            .attr("fill","#cc0000")
    .merge(c)
            .transition()
            .duration(1300)
            .attr("cx",function(d){
            var proj = projection([ d.longitude, d.latitude ]);
            return proj[0];
        }).attr("cy",function(d){
            var proj = projection([d.longitude, d.latitude]);
            return proj[1];
        }).attr("r",5)
        .attr("opacity",0.3)
        .attr("fill","#cc0000");

        c.exit()
            .transition()
            .duration(1000)
            .attr("r",0)
            .remove();


        yearLabel.text(year);

        svg.selectAll("circle")
            .on("mouseover",function(d){
                var cx = +d3.select(this).attr("cx")+15;
                var cy = +d3.select(this).attr("cy")+60;

                tooltip.style("visibility","visible")
                .style("left",+ cx + "px")
                .style("top",+ cy + "px")
                .html("Magnitude:"+ d.mag +"<br>"+ d.date.toLocaleDateString("ja-JP"));



            svg.selectAll("circle")
                .attr("opacity", 0.2);

            d3.select(this)
                .attr("opacity", 0.7);


            }).on("mouseout",function() {
                tooltip.style("visibility","hidden");

                svg.selectAll("circle")
                .attr("opacity", 0.7);



            })


        }

    
    updateMap(selectedYear);

 
select.on("input",function(){
    var year = this.value;
    console.log(year);
    selectedYear = year;
    updateMap(selectedYear);
})

var tooltip = d3.select("#chart")
    .append("div")
    .attr("class","tooltip");

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












