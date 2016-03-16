
// cityPop array that stores our cities and population data
var cityPop = [
	{ 
        city: 'Colorado Springs',
        population: 439886
    },
    {
        city: 'Park City',
        population: 7962
    },
    {
        city: 'Norman',
        population: 118197
    },
    {
        city: 'Portland',
        population: 609456
    }
];

//execute script when window is loaded
window.onload = function(){
	
	//SVG dimension variables
    var w = 1000, h = 600;
    
    var container = d3.select("body") //get the <body> element
    	.append("svg") //put new svg in the body
        .attr("width", w) //assign width
        .attr("height", h) //assign height
        .attr("class", "container") //assign class name
        .style("background-color", "rgba(0,0,0,0.2)"); //assign background color
    
    var format = d3.format(",");
        
    //innerRect block
    var innerRect = container.append("rect")
        .datum(400) //a single value is a DATUM
        .attr("width", function(d){ //rectangle width
            return d * 2.3; //400 * 2.3 = 920
        })
        .attr("height", function(d){ //rectangle height
            return d*1.05; //400 * 1.05 = 420
        })
        .attr("class", "innerRect") //assign class name
        .attr("x", 50) //position from left on the x (horizontal) axis
        .attr("y", 50) //position from top on the y (vertical) axis
        .style("fill", "#FFFFFF"); //fill color
        
        
    //find the minimum value of the array
    var minPop = d3.min(cityPop, function(d){
        return d.population;
    });

    //find the maximum value of the array
    var maxPop = d3.max(cityPop, function(d){
        return d.population;
    });
    
    var color = d3.scale.linear()
        .range([
            "#FDBE85",
            "#D94701"
        ])
        .domain([
            minPop, 
            maxPop
        ]);

    //scale for circles center y coordinate
    var y = d3.scale.linear()
        .range([450, 50]) //was 440, 95
        .domain([0, 700000]); //was minPop, maxPop
	
	var x = d3.scale.linear() //create the scale
        .range([90, 810]) //output min and max
        .domain([0, 3]); //input min and max
        
        
	var circles = container.selectAll(".circles") //create an empty selection
        .data(cityPop) //here we feed in an array
        .enter()
        .append("circle") //inspect the HTML
        .attr("class", "circles")
        .attr("id", function(d){
            return d.city;
        })
        .attr("r", function(d){
            //calculate the radius based on population value as circle area
            var area = d.population * 0.01;
            return Math.sqrt(area/Math.PI);
        })
        .attr("cx", function(d, i){
            //use the scale generator with the index to place each circle horizontally
            return x(i);
        })
        .attr("cy", function(d){
            return y(d.population);
        })
        .style("fill", function(d, i){ //add a fill based on the color scale generator
            return color(d.population);
        })
        .style("stroke", "#000"); //black circle stroke
        
        
        
    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        
    //create axis g element and add axis
    var axis = container.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(50, 0)")
        .call(yAxis);
        
    var title = container.append("text")
        .attr("class", "title")
        .attr("text-anchor", "middle")
        .attr("x", 450)
        .attr("y", 30)
        .text("Some City Populations");
        
    var labels = container.selectAll(".labels")
        .data(cityPop)
        .enter()
        .append("text")
        .attr("class", "labels")
        .attr("text-anchor", "left")
        .attr("y", function(d){
            //vertical position centered on each circle
            return y(d.population) + 5;
        });

    //first line of label
    var nameLine = labels.append("tspan")
        .attr("class", "nameLine")
        .attr("x", function(d,i){
            //horizontal position to the right of each circle
            return x(i) + Math.sqrt(d.population * 0.01 / Math.PI) + 5;
        })
        .text(function(d){
            return d.city;
        });

    //second line of label
    var popLine = labels.append("tspan")
        .attr("class", "popLine")
        .attr("x", function(d,i){
            return x(i) + Math.sqrt(d.population * 0.01 / Math.PI) + 5;
        })
        .attr("dy", "15") //vertical offset
        .text(function(d){
            return "Pop. " + format(d.population); //use format generator to format numbers
        });
};






	



