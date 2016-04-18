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
var margin_top = 70;
var margin_bottom = 200;
var margin_right = 50;
var margin_left = 50;

var bar_width = 1300 - margin_left - margin_right;
var bar_height = 700 - margin_top - margin_bottom;

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
    .html(function(d) {return d.name + ": " + d.value;
    });


// Setting up the SVG coordinate space
var svg = d3.select("barchart").append("svg")
    .attr("width", margin_left + bar_width + margin_right)
    .attr("height", margin_bottom + bar_height + margin_top)
    .append("g")
    .attr("transform", "translate(" + margin_left + "," + margin_top + ")")
    .on("mouseover", tip.show)
    .on("mouseout", tip.hide);

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

svg.selectAll("bar")
    .data(fields)
    .enter().append("rect")
    .style("fill", function(d) {
        d = d.toLowerCase();
	return "steelblue";
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
    });

svg.call(tip);
