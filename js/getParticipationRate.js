function getParticipationRateUser(){
alert ("The graph is shown at the bottom of the web page")

document.getElementById("getUserParticipation").innerHTML="<svg width='400' height='350'></svg> <p> My Users <br /> Red = incorrect answers; Green = correct answer; Total = answered questions </p>";

const svg     = d3.select("svg"),
      margin  = {top: 20, right: 20, bottom: 30, left: 50},
      width   = +svg.attr("width")  - margin.left - margin.right,
      height  = +svg.attr("height") - margin.top  - margin.bottom,
      x       = d3.scaleBand().rangeRound([0, width]).padding(0.2),
      y       = d3.scaleLinear().rangeRound([height, 0]),
      g       = svg.append("g")
                   .attr("transform", `translate(${margin.left},${margin.top})`);

d3.json("https://developer.cege.ucl.ac.uk:" + httpsPortNumberAPI + '/getParticipationRateMyUser/' + httpsPortNumberAPI).then(data => {
  data = data.array_to_json;
  console.log(data);
  x.domain(data.map(d => d.day));
  y.domain([0, d3.max(data, d => d.questions_answered)]);

  g.append("g")
      .attr("class", "axis axis-x")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x));


  g.append("g")
      .attr("class", "axis axis-y")
      .call(d3.axisLeft(y).ticks(10).tickSize(8));

  g.selectAll(".bar")
    .data(data)
    .enter().append("rect")
      .attr("class", "bar questions_answered")
      .style ("fill","#ff0000")
      .attr("x", d => x(d.day))
      .attr("y", d => y(d.questions_answered))
      .attr("width", x.bandwidth())
      .attr("height", d => height - y(d.questions_answered));

      g.selectAll(".newbar")
    .data(data)
    .enter().append("rect")
      .attr("class", "bar questions_correct")
      .style ("fill","#32cd32")
      .attr("x", d => x(d.day))
      .attr("y", d => y(d.questions_correct))
      .attr("width", x.bandwidth())
      .attr("height", d => height - y(d.questions_correct));
})
.catch(err => {
  svg.append("text")         
        .attr("y", 20)
        .attr("text-anchor", "left")  
        .style("font-size", "20px") 
        .style("font-weight", "bold")  
        .text(`Couldn't open the data file: "${err}".`);
});
}


function getParticipationRateAll(){
alert ("The graph is shown at the bottom of the web page")
document.getElementById("getAllUserParticipation").innerHTML="<svg width='450' height='350'></svg> <p> All Users <br /> Red = incorrect answers; Green = correct answer; Total = answered questions </p>";
const svg     = d3.select("svg"),
      margin  = {top: 20, right: 20, bottom: 30, left: 50},
      width   = +svg.attr("width")  - margin.left - margin.right,
      height  = +svg.attr("height") - margin.top  - margin.bottom,
      x       = d3.scaleBand().rangeRound([0, width]).padding(0.2),
      y       = d3.scaleLinear().rangeRound([height, 0]),
      g       = svg.append("g")
                   .attr("transform", `translate(${margin.left},${margin.top})`);

d3.json("https://developer.cege.ucl.ac.uk:" + httpsPortNumberAPI + '/getParticipationRateAllUser').then(data => {
  data = data.array_to_json;
  console.log(data);
  x.domain(data.map(d => d.day));
  y.domain([0, d3.max(data, d => d.questions_answered)]);

  g.append("g")
      .attr("class", "axis axis-x")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x));


  g.append("g")
      .attr("class", "axis axis-y")
      .call(d3.axisLeft(y).ticks(10).tickSize(8));

  g.selectAll(".bar")
    .data(data)
    .enter().append("rect")
      .attr("class", "bar questions_answered")
      .style ("fill","#ff0000")
      .attr("x", d => x(d.day))
      .attr("y", d => y(d.questions_answered))
      .attr("width", x.bandwidth())
      .attr("height", d => height - y(d.questions_answered));

      g.selectAll(".newbar")
    .data(data)
    .enter().append("rect")
      .attr("class", "bar questions_correct")
      .style ("fill","#32cd32")
      .attr("x", d => x(d.day))
      .attr("y", d => y(d.questions_correct))
      .attr("width", x.bandwidth())
      .attr("height", d => height - y(d.questions_correct));
})
.catch(err => {
  svg.append("text")         
        .attr("y", 20)
        .attr("text-anchor", "left")  
        .style("font-size", "20px") 
        .style("font-weight", "bold")  
        .text(`Couldn't open the data file: "${err}".`);
});
}