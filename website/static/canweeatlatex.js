console.log("JAVASCRIPTY STUFF");

// Data obtained from Brischoux and Legagneux (2009)'s article in
//     The Scientists, Volume 23, Issue 7, Page 24
//     link: http://www.cebc.cnrs.fr/publipdf/2009/BTS24_2009.pdf

latex_usage_rate = {"Mathematics": 96.9,"Statistics and Probability": 89.1,
		   "Physics": 74.0, "Computer Sciences": 45.8,
		   "Astronomy and Astrophysics": 35.1, "Engineering": 1.0,
		   "Geosciences": 0.8, "Ecology": 0.4, "Chemistry": 0.3,
		   "Biology": 0.0, "Medicine": 0.0, "Psychology": 0.0,
		   "Sport Sciences": 0.0, "Mean/Total": 26.8}

var fields = d3.keys(latex_usage_rate);
var percents = fields.map(function(key) {
    return latex_usage_rate[key];
});

// Bar Graph

// The initial variable setup
var margin_top = 80;
var margin_bottom = 200;
var margin_right = 50;
var margin_left = 50;

var bar_width = 1300 - margin_left - margin_right;
var bar_height = 800 - margin_top - margin_bottom;

// Ordinal for discrete (candidate names) domain
var x = d3.scale.ordinal()
    .rangeRoundBands([0, bar_width], .05)
    .domain(fields);

// Linear because...votes are tallied in numbers
var y = d3.scale.linear()
    .domain([0, d3.max(percents)])
    .range([bar_height, 0]);

// Formatting the axes
var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

//The tooltip pop-up that appears on mouseover 
var tip = d3.tip()
    .attr("class", "d3-tip")
    .html(function (d){return d;});


// Setting up the SVG coordinate space
var svg = d3.select("barchart").append("svg")
    .attr("width", margin_left + bar_width + margin_right)
    .attr("height", margin_bottom + bar_height + margin_top)
    .append("g")
    .attr("transform", "translate(" + margin_left + "," + margin_top + ")");

// Formatting the x axis
svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + bar_height + ")")
    .call(xAxis)
    .selectAll("text")
    .style("text-anchor", "end")
    .attr("dx", "-.8em")
    .attr("dy", "-.55em")
    .attr("transform", "rotate(-90)");

// Formatting the y axis
svg.append("g")
    .attr("class", "y axis")
    .call(yAxis)
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dx","5em")
    .attr("dy", "-1.0em")
    .style("text-anchor", "end")
    .text("Percentage");

// Formatting the individual bars

svg.call(tip)

svg.selectAll("bar")
    .data(fields)
    .enter().append("rect")
    .style("fill", function(d) {
        d = d.toLowerCase();
	if (d === "mean/total"){
	    return "green";
	}
	else {
	    return "steelblue";
	}
    })
    .attr("x", function(d) {
        return x(d);
    })
    .attr("width", x.rangeBand())
    .attr("y", function(d) {
        return y(latex_usage_rate[d]);
    })
    .attr("height", function(d) {
        return (bar_height - y(latex_usage_rate[d]));
    })
    .on('mouseover', function(d){
	tip.show(latex_usage_rate[d] + "%");
    })
    .on('mouseout', function(d){
	tip.hide(latex_usage_rate[d] + "%");
    });

// Compiled Image Transitions
var center = d3.select("#center")
    .transition()
    .duration(500)
    .style("opacity",0);

var centerCode = d3.select("#centerCode")
    .style("opacity",100) // you must explicitly set the value first
    .on('click',function(){
	d3.select("#centerCode")
	    .transition()
	    .duration(500)
	    .style("opacity", function(){
		console.log(this.style.opacity);
		if (this.style.opacity == 0)
		    return 100;
		else if (this.style.opacity == 100)
		    return 0;
	    });
	d3.select("#center")
	    .transition()
	    .duration(500)
	    .style("opacity", function(){
		console.log(this.style.opacity);
		if (this.style.opacity == 0)
		    return 100;
		else if (this.style.opacity == 100)
		    return 0;
	    }); 
    });

/*
var ihop = d3.select("#ihop")
    .style("opacity",0);
var pythagorean = d3.select("#pythagorean")
    .style("opacity",0);
var table = d3.select("#table")
    .style("opacity",0);
var electric = d3.select("#electric")
    .style("opacity",0);
var physics = d3.select("#physics")
    .style("opacity",0);
var riemann = d3.select("#riemann")
    .style("opacity",0);
var ol = d3.select("#ol")
    .style("opacity",0);
*/
