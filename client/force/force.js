var width = 800,
    height = 500;

var color = d3.scale.category20();

var force = d3.layout.force()
    .charge(-150)
    .linkDistance(150)
    
    .size([width, height]);

var chart  = d3.select("#chart")
  .on("resize",function(d){
    console.log(d);


});

var svg = d3.select("#chart").append("svg")
    .attr("width", "100%")
    .attr("height", height)
      .attr("viewBox",function() {return [width/4, height/4, width/2 + width/4, height/2 + height/4]});
    
var target = null;

var controls = d3.select("#controls");

var form = controls.append("form")
    .attr("name","chartcontrol")
    .attr("novalidate",true);

var cbNames = form.append("input")
    .attr("type","checkbox")
    .attr("name","cbNames")
    .attr("checked",true);

form.append("label")
  .text("Show Text");

var rgZoom = form.append("input")
  .attr("type","range")
  .attr("name","rgZoom")
  .attr ("min",0.02)
  .attr("max",10)
  .attr("step",0.01)
  .attr("value",1);

var rgLink = form.append("input")
  .attr("type","range")
  .attr("name","rgLink")
  .attr ("min",0)
  .attr("max",1000)
  .attr("step",10)
  .attr("value",100)
  .on("change",function(d,i){
    console.log(rgLink[0][0].value);
    //force.distance=rgLink[0][0].value;
    force.linkDistance=rgLink[0][0].value;
    //force.charge=rgLink[0][0].value*-1;
    
    force.resume();
    //console.log(force.linkDistance);

  });


var nodeDetails = controls.append("textarea")
  .attr("name","nodeDetails");

d3.json("miserables.json", function(json) {

  for(i=0;i<json.nodes.length;i++){
    //json.nodes[i].charge=-30;
    for(j=0;j<json.links.length;j++){
      //console.log(json.nodes[i]);
      if (json.nodes[i].name == json.links[j].source){
        json.links[j].source = i;
      }

      if (json.nodes[i].name == json.links[j].target){
        json.links[j].target = i;
      }
    }
  }

  force
      .nodes(json.nodes)
      .links(json.links)
      .start();




  var link = svg.selectAll("line.link")
      .data(json.links)
    .enter().append("line")
      .attr("class", "link")
      .style("stroke-width", function(d) { return Math.sqrt(d.value); });

  // var node = svg.selectAll(".node")
  //     .data(json.nodes)
  //     .enter().append("g")
  //     .attr("class", "node")
  //     .call(force.drag);


  //     node.append("circle")
  //     .attr("r", 5)
  //     .style("fill", function(d) { return color(d.group); });




var circle = svg.append("g")
    .attr("class", "nodes")
  .selectAll("circle")
    .data(json.nodes)
  .enter().append("circle")
    .attr("r", 1)
    .attr("fill",function(d) {
      d.color= {};
      d.color.r = (Math.random() *256).toFixed();
      d.color.g = (Math.random() *256).toFixed();
      d.color.b = (Math.random() *256).toFixed();
      return "rgb(" + d.color.r + "," + d.color.g + "," + d.color.b + ")"})
    .on("mouseover",function(d){
      nodeDetails.text(d.name + "\n" + d.group );
    })
    .on("mouseout",function(d){
      nodeDetails.text("");
    })
    .on("click",function(d){
      target  =d;
      force.start();
    })
    .call(force.drag);



var text = svg.append("g")
    .attr("class", "text")
  .selectAll("text")
    .data(json.nodes)
  .enter().append("text")
    .attr("dx", 12)
    .attr("dy", ".07em")
    .attr("stroke",function(d) {return "rgb(" + d.color.r + "," + d.color.g + "," + d.color.b + ")"})
   .on("mouseover",function(d){
      nodeDetails.text(d.name + "\n" + d.group );
    })
    .on("mouseout",function(d){
      nodeDetails.text("");
    })
    .on("click",function(d){
      //target.weight += 100;
      target =d;
      //target.weight -= 100;
      force.start();
      //svg.attr("viewBox", [d.x-width/2 , d.y-height/2, d.x+width/2, d.y+height/2]);
    })
    //.attr("transform",function(d){
    .attr("font-size",function(d){
      //return "scale(" + d.weight/2 + ")";
      return d.weight+10;
    })
    .text(function(d) { return d.name });

    //console.log(t);
    target = json.nodes[0];

  cbNames.on("change",function(d,i){
    console.log("cbchange");
    var gt = d3.select("g.text");

    if (cbNames[0][0].checked==true) {
      if (gt[0][0] == null) {
        force.stop();
        text = svg.append("g")
            .attr("class", "text")
          .selectAll("text")
            .data(json.nodes)
          .enter().append("text")
            .attr("dx", 12)
            .attr("dy", ".07em")
            .attr("stroke",function(d) {return "rgb(" + d.color.r + "," + d.color.g + "," + d.color.b + ")"})
            .on("mouseover",function(d){
              nodeDetails.text(d.name + "\n" + d.group );
            })
            .on("mouseout",function(d){
              nodeDetails.text("");
            })
          .on("click",function(d){
                //target.weight -= 100;

                target = d;
                //target.weight +=100;
                force.start();
                //svg.attr("viewBox", [d.x-width/2 , d.y-height/2, d.x+width/2, d.y+height/2]);
              })
            .text(function(d) { return d.name });
        force.start();
      }
    } else {
      force.stop();
      gt.remove();
      text = null;
      force.start();
    };
   // console.log(text);

console.log(links);

  });

  rgZoom.on("change",function(){force.start()});


  force.on("tick", function() {
    link.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    if (text != null){
      text.attr("x", function(d) { return d.x; })
          .attr("y", function(d) { return d.y; });
    };
    if (target != null){
      //target.weight -=1;
      //console.log(target.weight);
      //console.log(rgZoom);
      var a = width/rgZoom[0][0].value;
      var b = height/rgZoom[0][0].value;
      //svg.attr("viewBox", [target.x-a/2<0?0:target.x-a/2 , target.y-b/2<0?0:target.y-b/2, a, b]);
      svg.attr("viewBox", [target.x-a/2, target.y-b/2, a, b]);
    }
    circle.attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; })
        .attr("r",function(d){
          return d.weight;
        });
  });
});
