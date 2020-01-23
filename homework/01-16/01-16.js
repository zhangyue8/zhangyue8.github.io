

var realtimeURL="https://whiteboard.datawheel.us/api/google-analytics/realtime/111999474";
    var frequency = 1*1000;







var width = 960,
    height = 500;

var chart = d3.select("#chart")
    .attr("width", width)
    .attr("height", height);


// console.log(new Date())








function fetchData(){
                d3.json(realtimeURL, function(error,users){
                console.log("users:",users);
                d3.select('#users').html(users);









                });
            }






            fetchData();

            setInterval(fetchData,frequency);




