d3.csv("./data/Words.csv").then(function (data) {

    var width = 1000;
    var height = 700;
    var param = 2.9;

    var dataObj = {}, RadicalObj = {};
    data.forEach(function (d) {
        dataObj[d.Chinese_Word] = d;
        if (RadicalObj[d.Radical] === undefined) {
            RadicalObj[d.Radical] = [];
        }
        RadicalObj[d.Radical].push(d);
    });

    var select = d3.select("#selectRadical");
    
    var keyList = Object.keys(RadicalObj);
    keyList.unshift("all");
    select.selectAll("option")
        .data(keyList)
        .join("option")
        .attr("value", d=>d)
        .text(d=>d);
        
    select.on("change", function (d) {
        var myselect = document.getElementById("selectRadical");
        var index = myselect.selectedIndex;
        var val = myselect.options[index].value;
        if (val !== "all") {
            var list = RadicalObj[val];
            Update(list);
        }
        else {
            Update(data);
        }
    });

    var svg = d3.select("#chart")
        .append("svg")
        .attr("viewBox", `-${width / 2} -${height / 2} ${width} ${height}`)
        .attr("width", width)
        .attr("height", height)
        .on("click", function () {            
            zoom(root);
        });

    var tooltip = d3.select("body")
        .append("div")
        .attr("class", "tooltip")
        .style("opacity", 0.0);

    var nested = d3.nest()
        .key(function (d) { return d.Chinese_Word; })
        .rollup(function (d) { return d.length; })
        .entries(data)
        .sort(function (a, b) { return b.value - a.value; });

    var pack = d3.pack()
        .size([width, height])
        .padding(15);

    var hierarchy = d3.hierarchy({ values: nested }, function (d) { return d.values; })
        .sum(function (d) { return d.value; });


    var root = pack(hierarchy);

    var focus = root;
    var view;

    var node = svg.append("g")
        .attr("class","g-circle")
        .selectAll("circle")
        .data(root.descendants())
        .join("circle")
        .attr("r", function (d) {
            if (isNaN(d.r)) {
                return 20;
            }
            return d.r;
        })
        .attr("fill", "#4682b4")
        .attr("fill-opacity", 0.3)
        .attr("stroke", "#FFFFFF")
        .attr("stroke-width", 2)
        .on("click", function (d) {
            (zoom(d), d3.event.stopPropagation());
        });

    var label = svg.append("g")
        .attr("class", "g-text")
        .style("font", "14px sans-serif")
        .attr("pointer-events", "none")
        .attr("text-anchor", "middle")
        .selectAll("text")
        .data(root.descendants())
        .join("text")
        .style("fill-opacity", d => d.parent === root ? 1 : 0)
        .style("display", d => d.parent === root ? "inline" : "none")
        .style("fill","#fff")
        .text(d => d.data.key);


    zoomTo([root.x, root.y, root.r * param]);

    function Update(list) {
        nested = d3.nest()
            .key(function (d) { return d.Chinese_Word; })
            .rollup(function (d) { return d.length; })
            .entries(list)
            .sort(function (a, b) { return b.value - a.value; });

        hierarchy = d3.hierarchy({ values: nested }, function (d) {
            return d.values;
        }).sum(function (d) {
            return d.value;
        });
        root = pack(hierarchy);
        focus = root;

        svg.select(".g-circle")
            .selectAll("circle")
            .remove();

        node = svg.select(".g-circle")
            .selectAll("circle")
            .data(root.descendants())
            .enter()
            .append("circle")
            .attr("r", function (d) {
                if (isNaN(d.r)) {
                    return 20;
                }
                return d.r;
            })
            .attr("fill", "#4682b4")
            .attr("fill-opacity", 0.5)
            .attr("stroke", "#FFFFFF")
            .attr("stroke-width", 3)
            .on("click", function (d) {
                (zoom(d), d3.event.stopPropagation());
            });

        svg.select(".g-text")
            .selectAll("text")
            .remove();

        label = svg.select(".g-text")
            .selectAll("text")
            .data(root.descendants())
            .enter()
            .append("text")
            .style("fill-opacity", d => d.parent === root ? 1 : 0)
            .style("display", d => d.parent === root ? "inline" : "none")
            .style("fill", "#fff")
            .text(d => d.data.key);

        zoomTo([root.x, root.y, root.r * param]);
    }

    function zoomTo(v) {
        const k = width / v[2];
        view = v;
        label.attr("transform", d => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`);
        node.attr("transform", d => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`);
        node.attr("r", d => d.r * k);
    }

    function zoom(d) {       
        if (focus === d && tooltip.style("opacity") * 1 === 0) {
            if (typeof focus.data.key !== "string" || focus.data.key.length <= 0) {
                return;
            }
            var item = dataObj[focus.data.key];
            
            var color = "#CCFC62";
            var div_span = "<div style='margin-top:3px;'><span style='color:" + color + ";'>";
            var html = "<div class='tip-content' style='color:#fff;padding-left:20px;padding: 20px 20px;font-size:20px;'>";
            html += div_span + "Chinese Word:  </span>" + focus.data.key + "</div>";
            html += div_span + "Pinyin:  </span>" + item.Pinyin + "</div>";
            html += div_span + "Tone:  </span>" + item.Tone + "</div>";
            html += div_span + "Meaning:  </span>" + item.Meaning + "</div>";
            html += "</div>";

            tooltip.html(html)
                .style("width", "auto")
                .style("height", "auto")
                .style("left", (d3.event.pageX - 10) + "px")
                .style("top", (d3.event.pageY + 10) + "px")
                .style("opacity", 1.0)
                ;
            return;
        }
        if (tooltip.style("opacity") * 1 !== 0 && focus === d) {
            focus = root;
        }
        else {
            focus = d;
        }
        tooltip.style("width", 0)
            .style("height", 0)
            .style("opacity", 0.0);
        ;
        const transition = svg.transition()
            .duration(d3.event.altKey ? 7500 : 750)
            .tween("zoom", d => {
                const i = d3.interpolateZoom(view, [focus.x, focus.y, focus.r * param]);
                return t => zoomTo(i(t));
            });



            
        label
			.transition(transition)
			.style("font-size", d => d.parent === focus ? "14px" : "40px");




    }
});


