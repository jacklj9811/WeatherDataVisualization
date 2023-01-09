// d3.json("./test2.json")
// d3.json("../ChinaVis/CN-Reanalysis-monthly-v2-201301.json")
//   .then(function(data){
//     var tmp = 1;
//   })

// 这边的d3是d3v3min版本的！而d3version6是d3v6版本的！！务必注意！！ 
// 这边的d3是d3v3min版本的！而d3version6是d3v6版本的！！务必注意！！ 
// 这边的d3是d3v3min版本的！而d3version6是d3v6版本的！！务必注意！！
function clearElementsByClass(className) {
    var tags = document.getElementsByClassName(className);

    var arrLen = tags.length;
    for (var i = 0; i < arrLen; i++) {
        tags[i].innerHTML = "";

      //当删除 html 元素后，数组元素会减少，此时需要重新获取它们，可通过递归调用实现
        if (tags[i] == undefined && i < arrLen) {
            clearElementsByClass(className);
        }
    }
} 
var m = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
mapboxgl.accessToken = 'pk.eyJ1Ijoic3RldmUtd3lyaWNrIiwiYSI6ImNrb3ZiaXZrazA1dW8ycHBoNm15NTBpdGcifQ.19q7xhbd5XGKH4ggnZb79w'
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/light-v10',
  zoom: 3,
  center: [107.8066380, 37.8300360],
  pitch: 45
});
function filterBy(date) {
  var filters = ['==', 'date', date];
  map.setFilter('air_pollution', filters);
  // Set the label to the month
  document.getElementById('date').textContent = date;
}
var Year = 13;
var Month = "12";
map.on('load', function(){
    d3version6.json("../ChinaVis/months/mean/jsons/CN-Reanalysis-monthly-mean-20"+Year+Month+".json") 
    .then(function(data){
      map.addSource('pollution', {
            'type': 'geojson',
            data: data
      });
      //定义画图
      map.addLayer({
            'id': 'air_pollution',
            'type': 'circle',
            'source': 'pollution',
            // 'source-layer': 'sf2010',
            'paint': {
                // make circles larger as the user zooms from z12 to z22
                'circle-radius': {
                    'base': 1.75,
                    'stops': [
                        [12, 2],
                        [22, 180]
                    ]
                },
                // color circles by ethnicity, using a match expression
                // https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-match
                'circle-color': [
                    // 'case',
                    // ['<',['get', 'PM2.5(mg/m3)'], 35],'#2ECC71',
                    // ['<',['get', 'PM2.5(mg/m3)'], 75],'#FFEB3B',
                    // ['<',['get', 'PM2.5(mg/m3)'], 115],'#FF9800',
                    // ['<',['get', 'PM2.5(mg/m3)'], 150],'#F4511E',
                    // ['<',['get', 'PM2.5(mg/m3)'], 250],'#CE93D8',
                    // /* other */ '#880E4F'

                    'case',
                    ['<',['get', 'AQI_level'], 2],'#2ECC71',
                    ['<',['get', 'AQI_level'], 3],'#FFEB3B',
                    ['<',['get', 'AQI_level'], 4],'#FF9800',
                    ['<',['get', 'AQI_level'], 5],'#F4511E',
                    ['<',['get', 'AQI_level'], 6],'#CE93D8',
                    /* other */ '#880E4F'
                    // 'case',
                    // ['<',['get', 'CO(mg/m3)'], 2],'#2ECC71',
                    // ['<',['get', 'CO(mg/m3)'], 4],'#FFEB3B',
                    // ['<',['get', 'CO(mg/m3)'], 14],'#FF9800',
                    // ['<',['get', 'CO(mg/m3)'], 24],'#F4511E',
                    // ['<',['get', 'CO(mg/m3)'], 36],'#CE93D8',
                    // /* other */ '#880E4F'
                    // 'case',
                    // ['<',['get', 'NO2(mg/m3)'], 40],'#2ECC71',
                    // ['<',['get', 'NO2(mg/m3)'], 80],'#FFEB3B',
                    // ['<',['get', 'NO2(mg/m3)'], 180],'#FF9800',
                    // ['<',['get', 'NO2(mg/m3)'], 280],'#F4511E',
                    // ['<',['get', 'NO2(mg/m3)'], 565],'#CE93D8',
                    // /* other */ '#880E4F'
                    // 'case',
                    // ['<',['get', 'O3(mg/m3)'], 100],'#2ECC71',
                    // ['<',['get', 'O3(mg/m3)'], 160],'#FFEB3B',
                    // ['<',['get', 'O3(mg/m3)'], 215],'#FF9800',
                    // ['<',['get', 'O3(mg/m3)'], 265],'#F4511E',
                    // ['<',['get', 'O3(mg/m3)'], 800],'#CE93D8',
                    // /* other */ '#880E4F'
                    // 'case',
                    // ['<',['get', 'PM10(mg/m3)'], 50],'#2ECC71',
                    // ['<',['get', 'PM10(mg/m3)'], 150],'#FFEB3B',
                    // ['<',['get', 'PM10(mg/m3)'], 250],'#FF9800',
                    // ['<',['get', 'PM10(mg/m3)'], 350],'#F4511E',
                    // ['<',['get', 'PM10(mg/m3)'], 420],'#CE93D8',
                    // /* other */ '#880E4F'
                    // 'case',
                    // ['<',['get', 'SO2(mg/m3)'], 50],'#2ECC71',
                    // ['<',['get', 'SO2(mg/m3)'], 150],'#FFEB3B',
                    // ['<',['get', 'SO2(mg/m3)'], 475],'#FF9800',
                    // ['<',['get', 'SO2(mg/m3)'], 800],'#F4511E',
                    // ['<',['get', 'SO2(mg/m3)'], 1600],'#CE93D8',
                    // /* other */ '#880E4F'
                ]
            }
      });
    })
  d3.select('#slider2')
    .call(d3.slider()
            .axis(d3.svg.axis().orient("left").ticks(12))
            .snap(true)
            .min(1).max(12).step(1)
            .orientation("vertical")
            .on('slide',function(evt,month){
              if (month < 10){Month = '0'+month}
              else{Month = month};
              d3version6.json("../ChinaVis/months/mean/jsons/CN-Reanalysis-monthly-mean-20"+Year+Month+".json") 
                        .then(function(data){
                            map.removeLayer('air_pollution')
                            map.removeSource('pollution')
                            map.addSource('pollution', {
                                  'type': 'geojson',
                                  data: data
                            });
                            //定义画图
                            map.addLayer({
                                  'id': 'air_pollution',
                                  'type': 'circle',
                                  'source': 'pollution',
                                  // 'source-layer': 'sf2010',
                                  'paint': {
                                      // make circles larger as the user zooms from z12 to z22
                                      'circle-radius': {
                                          'base': 1.75,
                                          'stops': [
                                              [12, 2],
                                              [22, 180]
                                          ]
                                      },
                                      // color circles by ethnicity, using a match expression
                                      // https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-match
                                      'circle-color': [
                                          // 'case',
                                          // ['<',['get', 'PM2.5(mg/m3)'], 35],'#2ECC71',
                                          // ['<',['get', 'PM2.5(mg/m3)'], 75],'#FFEB3B',
                                          // ['<',['get', 'PM2.5(mg/m3)'], 115],'#FF9800',
                                          // ['<',['get', 'PM2.5(mg/m3)'], 150],'#F4511E',
                                          // ['<',['get', 'PM2.5(mg/m3)'], 250],'#CE93D8',
                                          // /* other */ '#880E4F'

                                          'case',
                                          ['<',['get', 'AQI_level'], 2],'#2ECC71',
                                          ['<',['get', 'AQI_level'], 3],'#FFEB3B',
                                          ['<',['get', 'AQI_level'], 4],'#FF9800',
                                          ['<',['get', 'AQI_level'], 5],'#F4511E',
                                          ['<',['get', 'AQI_level'], 6],'#CE93D8',
                                          /* other */ '#880E4F'
                                          // 'case',
                                          // ['<',['get', 'CO(mg/m3)'], 2],'#2ECC71',
                                          // ['<',['get', 'CO(mg/m3)'], 4],'#FFEB3B',
                                          // ['<',['get', 'CO(mg/m3)'], 14],'#FF9800',
                                          // ['<',['get', 'CO(mg/m3)'], 24],'#F4511E',
                                          // ['<',['get', 'CO(mg/m3)'], 36],'#CE93D8',
                                          // /* other */ '#880E4F'
                                          // 'case',
                                          // ['<',['get', 'NO2(mg/m3)'], 40],'#2ECC71',
                                          // ['<',['get', 'NO2(mg/m3)'], 80],'#FFEB3B',
                                          // ['<',['get', 'NO2(mg/m3)'], 180],'#FF9800',
                                          // ['<',['get', 'NO2(mg/m3)'], 280],'#F4511E',
                                          // ['<',['get', 'NO2(mg/m3)'], 565],'#CE93D8',
                                          // /* other */ '#880E4F'
                                          // 'case',
                                          // ['<',['get', 'O3(mg/m3)'], 100],'#2ECC71',
                                          // ['<',['get', 'O3(mg/m3)'], 160],'#FFEB3B',
                                          // ['<',['get', 'O3(mg/m3)'], 215],'#FF9800',
                                          // ['<',['get', 'O3(mg/m3)'], 265],'#F4511E',
                                          // ['<',['get', 'O3(mg/m3)'], 800],'#CE93D8',
                                          // /* other */ '#880E4F'
                                          // 'case',
                                          // ['<',['get', 'PM10(mg/m3)'], 50],'#2ECC71',
                                          // ['<',['get', 'PM10(mg/m3)'], 150],'#FFEB3B',
                                          // ['<',['get', 'PM10(mg/m3)'], 250],'#FF9800',
                                          // ['<',['get', 'PM10(mg/m3)'], 350],'#F4511E',
                                          // ['<',['get', 'PM10(mg/m3)'], 420],'#CE93D8',
                                          // /* other */ '#880E4F'
                                          // 'case',
                                          // ['<',['get', 'SO2(mg/m3)'], 50],'#2ECC71',
                                          // ['<',['get', 'SO2(mg/m3)'], 150],'#FFEB3B',
                                          // ['<',['get', 'SO2(mg/m3)'], 475],'#FF9800',
                                          // ['<',['get', 'SO2(mg/m3)'], 800],'#F4511E',
                                          // ['<',['get', 'SO2(mg/m3)'], 1600],'#CE93D8',
                                          // /* other */ '#880E4F'
                                      ]
                                  }
                            });
                        })
            }));
  d3.select('#slider1')
    .call(d3.slider()
            .scale(d3.time.scale()
                          .domain([new Date(2012,12,1), new Date(2018,1,1)]))
            .axis(d3.svg.axis().orient("top"))
            .snap(true)
            .value(new Date(2013,1,1))
            .on('slide',function(evt,year){//*//
        //*//
        console.log(year);
        Year = year.getYear() - 100;
            d3version6.json("../ChinaVis/months/mean/jsons/CN-Reanalysis-monthly-mean-20"+Year+Month+".json") 
      // d3.json("../ChinaVis/CN-Reanalysis-monthly-201301.json")            
        .then(function(data){
            map.removeLayer('air_pollution')
            map.removeSource('pollution')
            map.addSource('pollution', {
                  'type': 'geojson',
                  data: data
            });
            //定义画图
            map.addLayer({
                  'id': 'air_pollution',
                  'type': 'circle',
                  'source': 'pollution',
                  // 'source-layer': 'sf2010',
                  'paint': {
                      // make circles larger as the user zooms from z12 to z22
                      'circle-radius': {
                          'base': 1.75,
                          'stops': [
                              [12, 2],
                              [22, 180]
                          ]
                      },
                      // color circles by ethnicity, using a match expression
                      // https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-match
                      'circle-color': [
                          // 'case',
                          // ['<',['get', 'PM2.5(mg/m3)'], 35],'#2ECC71',
                          // ['<',['get', 'PM2.5(mg/m3)'], 75],'#FFEB3B',
                          // ['<',['get', 'PM2.5(mg/m3)'], 115],'#FF9800',
                          // ['<',['get', 'PM2.5(mg/m3)'], 150],'#F4511E',
                          // ['<',['get', 'PM2.5(mg/m3)'], 250],'#CE93D8',
                          // /* other */ '#880E4F'

                          'case',
                          ['<',['get', 'AQI_level'], 2],'#2ECC71',
                          ['<',['get', 'AQI_level'], 3],'#FFEB3B',
                          ['<',['get', 'AQI_level'], 4],'#FF9800',
                          ['<',['get', 'AQI_level'], 5],'#F4511E',
                          ['<',['get', 'AQI_level'], 6],'#CE93D8',
                          /* other */ '#880E4F'
                          // 'case',
                          // ['<',['get', 'CO(mg/m3)'], 2],'#2ECC71',
                          // ['<',['get', 'CO(mg/m3)'], 4],'#FFEB3B',
                          // ['<',['get', 'CO(mg/m3)'], 14],'#FF9800',
                          // ['<',['get', 'CO(mg/m3)'], 24],'#F4511E',
                          // ['<',['get', 'CO(mg/m3)'], 36],'#CE93D8',
                          // /* other */ '#880E4F'
                          // 'case',
                          // ['<',['get', 'NO2(mg/m3)'], 40],'#2ECC71',
                          // ['<',['get', 'NO2(mg/m3)'], 80],'#FFEB3B',
                          // ['<',['get', 'NO2(mg/m3)'], 180],'#FF9800',
                          // ['<',['get', 'NO2(mg/m3)'], 280],'#F4511E',
                          // ['<',['get', 'NO2(mg/m3)'], 565],'#CE93D8',
                          // /* other */ '#880E4F'
                          // 'case',
                          // ['<',['get', 'O3(mg/m3)'], 100],'#2ECC71',
                          // ['<',['get', 'O3(mg/m3)'], 160],'#FFEB3B',
                          // ['<',['get', 'O3(mg/m3)'], 215],'#FF9800',
                          // ['<',['get', 'O3(mg/m3)'], 265],'#F4511E',
                          // ['<',['get', 'O3(mg/m3)'], 800],'#CE93D8',
                          // /* other */ '#880E4F'
                          // 'case',
                          // ['<',['get', 'PM10(mg/m3)'], 50],'#2ECC71',
                          // ['<',['get', 'PM10(mg/m3)'], 150],'#FFEB3B',
                          // ['<',['get', 'PM10(mg/m3)'], 250],'#FF9800',
                          // ['<',['get', 'PM10(mg/m3)'], 350],'#F4511E',
                          // ['<',['get', 'PM10(mg/m3)'], 420],'#CE93D8',
                          // /* other */ '#880E4F'
                          // 'case',
                          // ['<',['get', 'SO2(mg/m3)'], 50],'#2ECC71',
                          // ['<',['get', 'SO2(mg/m3)'], 150],'#FFEB3B',
                          // ['<',['get', 'SO2(mg/m3)'], 475],'#FF9800',
                          // ['<',['get', 'SO2(mg/m3)'], 800],'#F4511E',
                          // ['<',['get', 'SO2(mg/m3)'], 1600],'#CE93D8',
                          // /* other */ '#880E4F'
                      ]
                  }
            });
        })
      //*//
      })
    );
    d3.select("#slider2")
            .selectAll("text")
            // .attr("fill","blue")
            .style("font-size","24px")
    d3.select("#slider1")
        .selectAll("text")
        // .attr("fill","blue")
        .style("font-size","24px")
            // .style("transform","rotate(-45deg)");
    //   d3.select('#slider3')
    // .call(d3.slider()
    //         .axis(false)
    //         .min(1).max(7).step(1)
    //         .on('slide',function(evt,month){console.log(month)}));

    // var margin = {//距画布边缘的各方向距离
    //   top: 40,//10
    //   left: 100,
    //   right: 100,
    //   bottom: 100
    // };
    // var myChart = d3version6.select('body').append('svg')
    //   .attr('width', 1300)
    //   .attr('height', 600).style('background', '#e5e7ea')
    //   .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    // var w = 1300 - margin.left - margin.right;//画布总宽度1000
    // var h = 600 - margin.top - margin.bottom;//画布总长度600

    // var xAxis = d3version6.axisBottom(d3version6.scaleOrdinal()
    //                                             .domain(["AQI level", "PM2.5", "PM10", "SO2", "NO2", "CO", "O3"])
    //                                             .range([0,w])
    //                                  )
    //                       .ticks(7, 'd');
    // myChart.append("g")
    //   .attr("class", "x-axis")
    //   .attr("transform", "translate("+ (margin.left + cellW/2) + "," + (margin.top + h + 3) + ")")
    //   .call(xAxis)
    //   .attr("font-size", "14px");
});
var file_name = "HangZhou";//上下两行务必一起打对！！！！！
var file_chinese_name = "杭州";//上下两行务必一起打对！！！！！
//////////////////////////////////////////////////////
//////////////////////////////////////////////////////
//////////////////////////////////////////////////////
var margin_Shift = {top: 20, right: 25, bottom: 30, left: 40},
  width_Shift= 260 - margin_Shift.left - margin_Shift.right,
  height_Shift= 120 - margin_Shift.top - margin_Shift.bottom;

// append the svg object to the body of the page
var svg_Shift= d3version4.select("#city_shift")
.append("svg")
  .attr("width", width_Shift+ margin_Shift.left + margin_Shift.right)
  .attr("height", height_Shift+ margin_Shift.top + margin_Shift.bottom)
.append("g")
  .attr("transform",
        "translate(" + (margin_Shift.left+20) + "," + margin_Shift.top + ")");

//Read the data
// d3version4.csv("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/heatmap_data.csv", function(data) {
d3version4.csv("city_shift.csv", function(data) {
  // Labels of row and columns -> unique identifier of the column called 'group' and 'variable'
  var myGroups = d3version4.map(data, function(d){return d.group;}).keys()
  var myVars = d3version4.map(data, function(d){return d.variable;}).keys()

  // Build X scales and axis:
  var x = d3version4.scaleBand()
    .range([ 0, width_Shift])
    .domain(myGroups)
    .padding(0.05);
  svg_Shift.append("g")
    .style("font-size", 27)
    .attr("transform", "translate(0," + height_Shift+ ")")
    .call(d3version4.axisBottom(x).tickSize(0))
    .select(".domain").remove()

  // Build Y scales and axis:
  var y = d3version4.scaleBand()
    .range([ height_Shift , 0 ])
    .domain(myVars)
    .padding(0.05);
  svg_Shift.append("g")
    .style("font-size", 15)
    .call(d3version4.axisLeft(y).tickSize(0))
    .select(".domain").remove()

  // Build color scale
  var myColor = d3version4.scaleSequential()
    .interpolator(d3version4.interpolateInferno)
    .domain([1,100])

  // create a tooltip
  var Tooltip_Shift = d3version4.select("#city_shift")
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("background-color", "white")
    .style("border", "solid")
    .style("border-width", "2px")
    .style("border-radius", "5px")
    .style("padding", "5px")

  // Three function that change the tooltip when user hover / move / leave a cell
  var mouseover = function(d) {
    // Tooltip_Shift
    //   .style("opacity", 1)
    d3version4.select(this)
      .style("stroke", "black")
      // .style("opacity", 1)
  }
  var mousemove = function(d) {1
    // Tooltip_Shift
    //   .html("The exact value of<br>this cell is: " + d.value)
    //   .style("left", (d3version4.mouse(this)[0]+70) + "px")
    //   .style("top", (d3version4.mouse(this)[1]) + "px")
  }
  var mouseleave = function(d) {
    Tooltip_Shift
      .style("opacity", 0)
    d3version4.select(this)
      .style("stroke", "none")
      // .style("opacity", 0.8)
  }

  // add the squares
  var svg_Shift_rect = svg_Shift.selectAll()
    .data(data, function(d) {return d.group+':'+d.variable;})
    .enter()
    .append("rect")

  svg_Shift_rect.attr("x", function(d) { return x(d.group) })
      .attr("y", function(d) { return y(d.variable) })
      .attr("rx", 4)
      .attr("ry", 4)
      .attr("width", x.bandwidth() )
      .attr("height", y.bandwidth() )
      .style("fill", function(d) { return myColor(d.value)} )
      .style("stroke-width", 4)
      .style("stroke", "none")
      .style("opacity", 0.8);
   for (i=0;i<svg_Shift_rect._groups[0].length;i++){
    if(svg_Shift_rect._groups[0][i].__data__.group == file_chinese_name){
        svg_Shift_rect._groups[0][i].style["opacity"] = "0.2";
     };
   }
  svg_Shift_rect.on("mouseover", mouseover)
    // .on("mousemove", mousemove)
    .on("mouseleave", mouseleave)
    .on("click", function(d, i){
      // console.log(d);
      // console.log(i);
      // console.log(this);
      svg_Shift_rect.style("opacity", 0.8);
      this.style["opacity"] = "0.2";
      if(d.group == "杭州"){file_name = "HangZhou";}
      if(d.group == "上海"){file_name = "SH";}
      if(d.group == "北京"){file_name = "BJ";}
      var obj = document.getElementById("squares");
      obj.innerHTML = "";//删除div内容
      //删除div
      // var parentObj = obj.parentNode;//获取div的父对象
      // parentObj.removeChild(obj);
      var obj = document.getElementById("div_template");
      obj.innerHTML = "";//删除div内容
      //删除div
      // var parentObj = obj.parentNode;//获取div的父对象
      // parentObj.removeChild(obj);
      var obj = document.getElementById("parallel");
      obj.innerHTML = "";//删除div内容
      //删除div
      // var parentObj = obj.parentNode;//获取div的父对象
      // parentObj.removeChild(obj);
      var obj = document.getElementById("tablepre");
      obj.innerHTML = "";//删除div内容
      //删除div
      // var parentObj = obj.parentNode;//获取div的父对象
      // parentObj.removeChild(obj);
/////////xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx////////////
//////////////////////////////////////////////////////////
/////////xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx////////////
//////////////////////////////////////////////////////
//////////////////////////////////////////////////////
//////////////////////////////////////////////////////
// set the dimensions and margin_Rs of the graph
var margin_R = {top: 20, right: 75, bottom: 30, left: 40},
  width_R= 240 - margin_R.left - margin_R.right,
  height_R= 450 - margin_R.top - margin_R.bottom;

// append the svg object to the body of the page
var svg_R= d3version4.select("#div_template")
.append("svg")
  .attr("width", width_R+ margin_R.left + margin_R.right)
  .attr("height", height_R+ margin_R.top + margin_R.bottom)
.append("g")
  .attr("transform",
        "translate(" + (margin_R.left-30) + "," + margin_R.top + ")");

//Read the data
// d3version4.csv("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/heatmap_data.csv", function(data) {
d3version4.csv(file_name+"_result.csv", function(data) {
  // Labels of row and columns -> unique identifier of the column called 'group' and 'variable'
  var myGroups = d3version4.map(data, function(d){return d.group;}).keys()
  var myVars = d3version4.map(data, function(d){return d.variable;}).keys()

  // Build X scales and axis:
  var x = d3version4.scaleBand()
    .range([ 0, width_R])
    .domain(myGroups)
    .padding(0.05);
  svg_R.append("g")
    .style("font-size", 24)
    .attr("transform", "translate(0," + height_R+ ")")
    .call(d3version4.axisBottom(x).tickSize(0))
    .select(".domain").remove()

  // Build Y scales and axis:
  var y = d3version4.scaleBand()
    .range([ height_R , 0 ])
    .domain(myVars)
    .padding(0.05);
  svg_R.append("g")
    .style("font-size", 24)
    .attr("transform", "translate(" + width_R + ',' + "0)")
    .call(d3version4.axisRight(y).tickSize(0))
    .select(".domain").remove()

  // Build color scale
  var myColor = d3version4.scaleSequential()
    .interpolator(d3version4.interpolateInferno)
    .domain([1,100])

  // create a tooltip
  var Tooltip_R = d3version4.select("#div_template")
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("background-color", "white")
    .style("border", "solid")
    .style("border-width", "2px")
    .style("border-radius", "5px")
    .style("padding", "5px")

  // Three function that change the tooltip when user hover / move / leave a cell
  var mouseover = function(d) {
    // Tooltip_R
    //   .style("opacity", 1)
    d3version4.select(this)
      .style("stroke", "black")
      .style("opacity", 1)
  }
  var mousemove = function(d) {1
    // Tooltip_R
    //   .html("The exact value of<br>this cell is: " + d.value)
    //   .style("left", (d3version4.mouse(this)[0]+70) + "px")
    //   .style("top", (d3version4.mouse(this)[1]) + "px")
  }
  var mouseleave = function(d) {
    Tooltip_R
      .style("opacity", 0)
    d3version4.select(this)
      .style("stroke", "none")
      .style("opacity", 0.8)
  }


  // add the squares
  svg_R.selectAll()
    .data(data, function(d) {return d.group+':'+d.variable;})
    .enter()
    .append("rect")
      .attr("x", function(d) { return x(d.group) })
      .attr("y", function(d) { return y(d.variable) })
      .attr("rx", 4)
      .attr("ry", 4)
      .attr("width", x.bandwidth() )
      .attr("height", y.bandwidth() )
      .style("fill", function(d) { return myColor(d.value)} )
      .style("stroke-width", 4)
      .style("stroke", "none")
      .style("opacity", 0.8)
    .on("mouseover", mouseover)
    // .on("mousemove", mousemove)
    .on("mouseleave", mouseleave)
})


//////////////////////////////////////////////////////
//////////////////////////////////////////////////////
//////////////////////////////////////////////////////

var margin_parallel = {top: 66, right: 510, bottom: 20, left: 20},
    width = document.body.clientWidth - margin_parallel.left - margin_parallel.right,
    height = 340 - margin_parallel.top - margin_parallel.bottom,
    innerHeight = height - 2;

var devicePixelRatio = window.devicePixelRatio || 1;

var color = d3version4.scaleOrdinal()
  // .domain(['优','良','轻度污染','中度污染','重度污染','严重污染'])
  .domain(['1','2','3','4','5','6'])
  .range(['#2ECC71','#F2D000','#FF9800','#F4511E','#CE93D8','#880E4F']);

var types = {
  "Number": {
    key: "Number",
    coerce: function(d) { return +d; },
    extent: d3version4.extent,
    within: function(d, extent, dim) { return extent[0] <= dim.scale(d) && dim.scale(d) <= extent[1]; },
    defaultScale: d3version4.scaleLinear().range([innerHeight, 0])
  },
  "String": {
    key: "String",
    coerce: String,
    extent: function (data) { return data.sort(); },
    within: function(d, extent, dim) { return extent[0] <= dim.scale(d) && dim.scale(d) <= extent[1]; },
    defaultScale: d3version4.scalePoint().range([0, innerHeight])
  },
  "Date": {
    key: "Date",
    coerce: function(d) { return new Date(d); },
    extent: d3version4.extent,
    within: function(d, extent, dim) { return extent[0] <= dim.scale(d) && dim.scale(d) <= extent[1]; },
    defaultScale: d3version4.scaleTime().range([innerHeight, 0])
  }
};

var dimensions = [
  {
    key: "AQI_level",
    description: "AQI level",
    type: types["String"],
    axis: d3version4.axisLeft()
      .tickFormat(function(d,i) {
        return d;
      })
  },
  {
    key: "year",
    description: "Year",
    type: types["String"]
  },
  {
    key: "month",
    description: "Month",
    type: types["Number"]
  },  
  {
    key: "day",
    description: "Day",
    type: types["Number"]
  },
  {
    key: "PM10",
    description: "PM10(μg/m³)",
    type: types["Number"]
  },
  {
    key: "PM25",
    type: types["Number"],
    description: "PM2.5(μg/m³)",
  },
  {
    key: "SO2",
    type: types["Number"],
    description: "SO2(μg/m³)",
  },
  {
    key: "NO2",
    description: "NO2(μg/m³)",
    type: types["Number"]
  },
  {
    key: "CO",
    description: "CO(mg/m³)",
    type: types["Number"]
  },
  {
    key: "O3",
    description: "O3(μg/m³)",
    type: types["Number"]
  },
];


var xscale = d3version4.scalePoint()
    .domain(d3version4.range(dimensions.length))
    .range([0, width]);

var yAxis = d3version4.axisLeft();

var container = d3version4
    .select("#parallel").append("div").attr("class", "parcoords")
    .style("width", width + margin_parallel.left + margin_parallel.right + "px")
    .style("height", height + margin_parallel.top + margin_parallel.bottom + "px");

var svg = container.append("svg")
    .attr("width", width + margin_parallel.left + margin_parallel.right)
    .attr("height", height + margin_parallel.top + margin_parallel.bottom)
  .append("g")
    .attr("transform", "translate(" + margin_parallel.left + "," + margin_parallel.top + ")");

var canvas = container.append("canvas")
    .attr("width", width * devicePixelRatio)
    .attr("height", height * devicePixelRatio)
    .style("width", width + "px")
    .style("height", height + "px")
    .style("margin-top", margin_parallel.top + "px")
    .style("margin-left", margin_parallel.left + "px");

var ctx = canvas.node().getContext("2d");
ctx.globalCompositeOperation = 'darken';
ctx.globalAlpha = 0.15;
ctx.lineWidth = 1.5;
ctx.scale(devicePixelRatio, devicePixelRatio);

var output = d3version4.select("#tablepre").append("pre")

var axes = svg.selectAll(".axis")
    .data(dimensions)
  .enter().append("g")
    .attr("class", function(d) { return "axis " + d.key.replace(/ /g, "_"); })
    .attr("transform", function(d,i) { return "translate(" + xscale(i) + ")"; });

d3version4.csv(file_name+".csv", function(error, data) {
  if (error) throw error;

  data.forEach(function(d) {
    dimensions.forEach(function(p) {
      d[p.key] = !d[p.key] ? null : p.type.coerce(d[p.key]);
    });

    // truncate long text strings to fit in data table
    for (var key in d) {
      if (d[key] && d[key].length > 35) d[key] = d[key].slice(0,36);
    }
  });

  // type/dimension default setting happens here
  dimensions.forEach(function(dim) {
    if (!("domain" in dim)) {
      // detect domain using dimension type's extent function
      dim.domain = d3version4_functor(dim.type.extent)(data.map(function(d) { return d[dim.key]; }));
    }
    if (!("scale" in dim)) {
      // use type's default scale for dimension
      dim.scale = dim.type.defaultScale.copy();
    }
    dim.scale.domain(dim.domain);
  });

  var render = renderQueue(draw).rate(30);

  ctx.clearRect(0,0,width,height);
  ctx.globalAlpha = d3version4.min([1.15/Math.pow(data.length,0.3),1]);
  render(data);

  axes.append("g")
      .each(function(d) {
        var renderAxis = "axis" in d
          ? d.axis.scale(d.scale)  // custom axis
          : yAxis.scale(d.scale);  // default axis
        d3version4.select(this).call(renderAxis);
      })
    .append("text")
      .attr("class", "title")
      .attr("text-anchor", "start")
      .text(function(d) { return "description" in d ? d.description : d.key; });

  // Add and store a brush for each axis.
  axes.append("g")
      .attr("class", "brush")
      .each(function(d) {
        d3version4.select(this).call(d.brush = d3version4.brushY()
          .extent([[-10,0], [10,height]])
          .on("start", brushstart)
          .on("brush", brush)
          .on("end", brush)
        )
      })
    .selectAll("rect")
      .attr("x", -8)
      .attr("width", 16);

  d3version4.selectAll(".axis.AQI_level .tick text")
    .style("fill", color);
    
  output.text(d3version4.tsvFormat(data.slice(0,24)));

  function project(d) {
    return dimensions.map(function(p,i) {
      // check if data element has property and contains a value
      if (
        !(p.key in d) ||
        d[p.key] === null
      ) return null;

      return [xscale(i),p.scale(d[p.key])];
    });
  };

  function draw(d) {
    ctx.strokeStyle = color(d.AQI_level);
    ctx.beginPath();
    var coords = project(d);
    coords.forEach(function(p,i) {
      // this tricky bit avoids rendering null values as 0
      if (p === null) {
        // this bit renders horizontal lines on the previous/next
        // dimensions, so that sandwiched null values are visible
        if (i > 0) {
          var prev = coords[i-1];
          if (prev !== null) {
            ctx.moveTo(prev[0],prev[1]);
            ctx.lineTo(prev[0]+6,prev[1]);
          }
        }
        if (i < coords.length-1) {
          var next = coords[i+1];
          if (next !== null) {
            ctx.moveTo(next[0]-6,next[1]);
          }
        }
        return;
      }
      
      if (i == 0) {
        ctx.moveTo(p[0],p[1]);
        return;
      }

      ctx.lineTo(p[0],p[1]);
    });
    ctx.stroke();
  }

  function brushstart() {
    d3version4.event.sourceEvent.stopPropagation();
  }

  // Handles a brush event, toggling the display of foreground lines.
  function brush() {
    render.invalidate();

    var actives = [];
    svg.selectAll(".axis .brush")
      .filter(function(d) {
        return d3version4.brushSelection(this);
      })
      .each(function(d) {
        actives.push({
          dimension: d,
          extent: d3version4.brushSelection(this)
        });
      });

    var selected = data.filter(function(d) {
      if (actives.every(function(active) {
          var dim = active.dimension;
          // test if point is within extents for each active brush
          return dim.type.within(d[dim.key], active.extent, dim);
        })) {
        return true;
      }
    });

    // show ticks for active brush dimensions
    // and filter ticks to only those within brush extents
    /*
    svg.selectAll(".axis")
        .filter(function(d) {
          return actives.indexOf(d) > -1 ? true : false;
        })
        .classed("active", true)
        .each(function(dimension, i) {
          var extent = extents[i];
          d3version4.select(this)
            .selectAll(".tick text")
            .style("display", function(d) {
              var value = dimension.type.coerce(d);
              return dimension.type.within(value, extent, dimension) ? null : "none";
            });
        });

    // reset dimensions without active brushes
    svg.selectAll(".axis")
        .filter(function(d) {
          return actives.indexOf(d) > -1 ? false : true;
        })
        .classed("active", false)
        .selectAll(".tick text")
          .style("display", null);
    */

    ctx.clearRect(0,0,width,height);
    ctx.globalAlpha = d3version4.min([0.85/Math.pow(selected.length,0.3),1]);
    render(selected);

    output.text(d3version4.tsvFormat(selected.slice(0,24)));
  }
});

function d3version4_functor(v) {
  return typeof v === "function" ? v : function() { return v; };
};

/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
////////////////////     方块图    两码事       //////////////////////
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////

var d;//提前设定全局变量防止读取与执行分开做而导致奇妙错误
d3version4.csv(file_name+'.csv',function(error, dataset){
  if (error) { //If error is not null, something went wrong.
    console.log(error); //Log the error.
  } else {
    //console.log(dataset);
    d = dataset;
    var m = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var dateParse = d3version4.timeParse("%Y-%m-%d");
    var SO2 = [], PM25 = [],  date = [],
      PM10 = [], NO2 = [], CO = [], O3 = [],
      monthData = [],//one month
      month = [],
      year = [];
    var meanSO2 = [],
      meanPM25 = [],
      meanPM10 = [],
      meanNO2 = [],
      meanCO = [],
      meanO3 = [],
      meanMonth = [],
      meanMonthPlus = [],
      meanYear = [];
    var sumSO2 = 0, sumPM25 = 0, sumPM10 = 0, sumNO2 = 0, sumCO = 0, sumO3 = 0,
      nowYear = dateParse(d[0]['date']).getFullYear(),
      nowMonth = dateParse(d[0]['date']).getMonth();
    for (var i = 0; i < d.length; i++) {
      var dateobj = dateParse(d[i]['date']);
      year.push(dateobj.getFullYear());
      month.push(dateobj.getMonth());
      date.push(dateobj.getDate());
      SO2.push(Number(d[i]['SO2']));
      PM25.push(Number(d[i]['PM25']));

      PM10.push(Number(d[i]['PM10']));
      NO2.push(Number(d[i]['NO2']));

      CO.push(Number(d[i]['CO']));
      O3.push(Number(d[i]['O3']));


      monthData.push({date: dateobj.getDate(),
                      SO2: Number(d[i]['SO2']),
                      PM25: Number(d[i]['PM25']),
                      PM10: Number(d[i]['PM10']),
                      NO2: Number(d[i]['NO2']),
                      CO: Number(d[i]['CO']),
                      O3: Number(d[i]['O3'])
                      });//monthData是每月数据，长成这样[{date:1,SO2:25,PM25:23},{..}...]，就是为了匹配.path方法读取数据的习惯
      sumSO2 = sumSO2 + Number(d[i]['SO2']);
      sumPM25 = sumPM25 + Number(d[i]['PM25']);
      sumPM10 = sumPM10 + Number(d[i]['PM10']);
      sumNO2 = sumNO2 + Number(d[i]['NO2']);
      sumCO = sumCO + Number(d[i]['CO']);
      sumO3 = sumO3 + Number(d[i]['O3']);
      if(i == d.length - 1 || nowMonth != dateParse(d[i+1]['date']).getMonth()){
        meanYear.push(nowYear);
        meanMonth.push(nowMonth);
        meanMonthPlus.push(monthData);//月份数据list，长成这样[[{..}..],[{..}..],..]
        monthData = [];
        meanSO2.push(sumSO2 / dateobj.getDate());
        meanPM25.push(sumPM25 / dateobj.getDate());
        meanPM10.push(sumPM10 / dateobj.getDate());
        meanNO2.push(sumNO2 / dateobj.getDate());
        meanCO.push(sumCO / dateobj.getDate());
        meanO3.push(sumO3 / dateobj.getDate());
        // PM10.push((sumPM25 + sumSO2) / 2 / dateobj.getDate());
        if (i < d.length - 1){
          nowYear = dateParse(d[i+1]['date']).getFullYear();
          nowMonth = dateParse(d[i+1]['date']).getMonth()
          sumSO2 = 0;
          sumPM25 = 0;
          sumPM10 = 0;
          sumNO2 = 0;
          sumCO = 0;
          sumO3 = 0;
        }
      }
    }

    var margin = {//距画布边缘的各方向距离
      top: 40,//10
      left: 120,
      right: 100,
      bottom: 100
    };
    var w = 1300 - margin.left - margin.right;//画布总宽度1000
    var h = 600 - margin.top - margin.bottom;//画布总长度600

    var cellH = h / 12;//每个小长方形的高度
    var cellW = w / (year[year.length - 1] - year[0]);//小长方形长度
  //下面是一种双射，以映射方法scaleXXX()从前domain 原像 映射到后range 像。与数学写法一致D domain为定义域，而A range为值域
    var padding = 3;
    var x = d3version4.scaleLinear().domain([year[0], year[year.length - 1]]).range([0, w]);//应该是字典结构，代表从年份到横坐标位置的一种连续可逆的双映射

    var yRange = [];

    for (var j = 0; j < 12; j++) {
      yRange.push(cellH * j)
    }

    var y = d3version4.scaleLinear().domain(meanMonth).range(yRange);

    var colorCodes = ['#2ECC71','#FFEB3B','#FF9800','#F4511E','#CE93D8','#880E4F']//////////////
    // var colors = d3version4.scaleQuantile().domain([0,35,75,115,150,250])//////////////////////PM2.5
    var colorThresPM10 = [0,50,150,250,350,420]
    var colorThresPM25 = [0,35,75,115,150,250]
    var colorThresSO2 = [0,50,150,475,800,1600]
    var colorThresNO2 = [0,40,80,180,280,565]
    var colorThresCO = [0,2,4,14,24,36]
    var colorThresO3 = [0,100,160,215,265,800]

    var colors = d3version4.scaleLinear().domain(colorThresPM10)//////////////////////PM2.5

      .range(colorCodes);//scaleQuantile是对各对应分位点命名的方法

    // var colorQuantiles = colors.quantiles();
    // colorQuantiles.unshift(0);//colorbar的开头数字为0.0


    var myChart = d3version4.select('#squares').append('svg').attr("class", "squares")
      .attr('width', 1500)//1300
      .attr('height', 640).style('background', "none")//'#e5e7ea')
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var xSmall = d3version4.scaleLinear().domain([1,31]).range([0, cellW-padding]);//1-31号->0-cellWopading
    var ySmallPM10 = d3version4.scaleLinear().domain([d3version4.min(PM10), d3version4.max(PM10)]).range([cellH-padding, 0]);//这边调过来写很重要，不然图像就是上下颠倒的
    var ySmallPM25 = d3version4.scaleLinear().domain([d3version4.min(PM25), d3version4.max(PM25)]).range([cellH-padding, 0]);//这边调过来写很重要，不然图像就是上下颠倒的
    var ySmallSO2 = d3version4.scaleLinear().domain([d3version4.min(SO2), d3version4.max(SO2)]).range([cellH-padding, 0]);//这边调过来写很重要，不然图像就是上下颠倒的
    var ySmallNO2 = d3version4.scaleLinear().domain([d3version4.min(NO2), d3version4.max(NO2)]).range([cellH-padding, 0]);//这边调过来写很重要，不然图像就是上下颠倒的
    var ySmallCO = d3version4.scaleLinear().domain([d3version4.min(CO), d3version4.max(CO)]).range([cellH-padding, 0]);//这边调过来写很重要，不然图像就是上下颠倒的
    var ySmallO3 = d3version4.scaleLinear().domain([d3version4.min(O3), d3version4.max(O3)]).range([cellH-padding, 0]);//这边调过来写很重要，不然图像就是上下颠倒的
    var cells = myChart.append('g')
                         .attr('class', 'rect')//这个class的名字可以随便起，不影响图像的效果
                         .style("stroke-width", 4)
                         .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    var pathPM10s = myChart.append('g')//一个g下面只能有一种图形，所以这边创建了3个g，事实上最少创建2个g
                           .attr('class', 'path')
                           .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    var pathPM25s = myChart.append('g')//一个g下面只能有一种图形，所以这边创建了3个g，事实上最少创建2个g
                           .attr('class', 'path')
                           .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    var pathSO2s = myChart.append('g')
                           .attr('class', 'path')
                           .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    var pathNO2s = myChart.append('g')
                           .attr('class', 'path')
                           .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    var pathCOs = myChart.append('g')
                           .attr('class', 'path')
                           .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    var pathO3s = myChart.append('g')
                           .attr('class', 'path')
                           .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    var cellsTemp = cells.selectAll('rect')//这边这个rect...
                       .data(meanYear).enter().append('rect')//...与这边这个rect这个两个名字是绝对不可以改的，这两个rect决定了html的开头是<rect xxx></rect>，才能画出方块
                         .attr('height', cellH-padding).attr('width', cellW-padding)
                         .attr('valueType', 'PM10')
                         .attr('x', function(d) {
                           return x(d)
                         })
                         .attr('y', function(d, i) {//第二个参数代表数据集d中第i组数据的index i
                           return y(meanMonth[i])
                         })
                         .attr('fill', function(d, i) {
                           return colors(meanPM10[i]);//等待修改
                         })
    var opacity = 0.185;
    var cells = cellsTemp.each(function(d, i){//each 里的开头的d与i是与上面的d i共用的，因此就可以传递d与i
                         var linePM10 = d3version4.line()
                                          .x(function(da) { return xSmall(da.date) + x(d); })//x(d)就是整体位移参数，与cell的一致
                                          .y(function(da) { return ySmallPM10(da.PM10) + y(meanMonth[i]); });//x(d)就是整体位移参数，与cell的一致
                         var lineSO2 = d3version4.line()
                                         .x(function(da) { return xSmall(da.date) + x(d); })//x(d)就是整体位移参数，与cell的一致
                                         .y(function(da) { return ySmallSO2(da.SO2) + y(meanMonth[i]); });//x(d)就是整体位移参数，与cell的一致
                         var linePM25 = d3version4.line()
                                         .x(function(da) { return xSmall(da.date) + x(d); })//x(d)就是整体位移参数，与cell的一致
                                         .y(function(da) { return ySmallPM25(da.PM25) + y(meanMonth[i]); });//x(d)就是整体位移参数，与cell的一致
                         var lineNO2 = d3version4.line()
                                         .x(function(da) { return xSmall(da.date) + x(d); })//x(d)就是整体位移参数，与cell的一致
                                         .y(function(da) { return ySmallNO2(da.NO2) + y(meanMonth[i]); });//x(d)就是整体位移参数，与cell的一致
                         var lineCO = d3version4.line()
                                         .x(function(da) { return xSmall(da.date) + x(d); })//x(d)就是整体位移参数，与cell的一致
                                         .y(function(da) { return ySmallCO(da.CO) + y(meanMonth[i]); });//x(d)就是整体位移参数，与cell的一致
                         var lineO3 = d3version4.line()
                                         .x(function(da) { return xSmall(da.date) + x(d); })//x(d)就是整体位移参数，与cell的一致
                                         .y(function(da) { return ySmallO3(da.O3) + y(meanMonth[i]); });
                         pathPM10s.append('path')//名字很重要!只有html中的开头是<path xxx></path>才能画出线
                                       .datum(meanMonthPlus[i])
                                       .attr("class", "linePM10")
                                       .attr('d', linePM10)//这边并未处理missing的数据，关于missing数据的处理，详见.defined方法的使用说明
                                       .style('fill', 'none')
                                       .style('stroke', '#0000FF')//蓝色
                         pathPM25s.append('path')//名字很重要!只有html中的开头是<path xxx></path>才能画出线
                                       .datum(meanMonthPlus[i])
                                       .attr("class", "linePM25")
                                       .attr('d', linePM25)//这边并未处理missing的数据，关于missing数据的处理，详见.defined方法的使用说明
                                       .style('fill', 'none')
                                       .style('stroke', '#0000FF')//蓝色
                                       .style('opacity', opacity)
                         pathSO2s.append('path')//名字很重要!只有html中的开头是<path xxx></path>才能画出线
                                       .datum(meanMonthPlus[i])
                                       .attr("class", "lineSO2")
                                       .attr('d', lineSO2)
                                       .style('fill', 'none')
                                       .style('stroke', '#0000FF')//蓝色
                                       .style('opacity', opacity)
                         pathNO2s.append('path')//名字很重要!只有html中的开头是<path xxx></path>才能画出线
                                       .datum(meanMonthPlus[i])
                                       .attr("class", "lineNO2")
                                       .attr('d', lineNO2)//这边并未处理missing的数据，关于missing数据的处理，详见.defined方法的使用说明
                                       .style('fill', 'none')
                                       .style('stroke', '#0000FF')//蓝色
                                       .style('opacity', opacity)
                         pathCOs.append('path')//名字很重要!只有html中的开头是<path xxx></path>才能画出线
                                       .datum(meanMonthPlus[i])
                                       .attr("class", "lineCO")
                                       .attr('d', lineCO)//这边并未处理missing的数据，关于missing数据的处理，详见.defined方法的使用说明
                                       .style('fill', 'none')
                                       .style('stroke', '#0000FF')//蓝色
                                       .style('opacity', opacity)
                         pathO3s.append('path')//名字很重要!只有html中的开头是<path xxx></path>才能画出线
                                       .datum(meanMonthPlus[i])
                                       .attr("class", "linePM10")
                                       .attr('d', lineO3)//这边并未处理missing的数据，关于missing数据的处理，详见.defined方法的使用说明
                                       .style('fill', 'none')
                                       .style('stroke', '#0000FF')//蓝色
                                       .style('opacity', opacity)
                                       // .style('stroke', '#1E90FF')//淡色
                       })


    var tooltip = d3version4.select('body').append('div').attr('class', 'boxtip')
      .style('opacity', 0)
      .style('position', 'absolute')
      .style('background', '#f5f5f5')
      .style('padding', '4px 10px')
      .style('border', '1px #333 solid');
    
    var nameW = 200, nameH = 27, higher = 32;
    var fontSize = '22px';
    var chosenOrNot = ["#66C2A5", "#D53E4F"];
    var detailedNames = ["avg(day.PM10)","avg(day.PM2.5)","avg(day.SO2)",
                        "avg(day.NO2)","avg(day.CO)","avg(day.O3)"];
    var simpleNames = ["PM10", "PM25", "SO2", "NO2", "CO", "O3"];
    var colorWhichTemp = myChart.selectAll(".colorWhichTemp")
                          .data(simpleNames)
                          .enter()
                          .append("g")
                          .attr("class", "legend1")//一个搞笑的错误，改叫legend就会与后面的colorbar【也叫legend】的d3version4选择创建发生冲突，后面的会只创建出3个colorbar...
                          .attr("font-size", fontSize)
                          .attr("font-style", "PT Sans")
                          .attr("fill", "white")
                          .attr("transform", function(d,i){
                            return ("translate(" + i * nameW + ",0)")
                          });
    var rect = colorWhichTemp.append("rect")
                .attr("x", margin.left )
                .attr("y", margin.top - higher)
                .attr("rx", 10)
                .attr("ry", 10)
                .attr("width", nameW-3)
                .attr("height", nameH)
                .text(function(d, i){return detailedNames[i]})
                .style("fill", function(d){
                 return(chosenOrNot[Number(d == cells.attr('valueType'))]);
                });

    colorWhichTemp.append("text")
          .attr("x", margin.left + nameW/2)
          .attr("y", margin.top - higher + nameH*0.75)
          .text(function(d,i){
            return detailedNames[i]
          })
          .style("text-anchor", "middle");

    cells.on('mouseover', function(d,i){
      d3version4.select(this).style("stroke", "black")
    })
    // pathPM10s.selectAll('path').on('mouseover', function(d,i){
    //   d3version4.select("body").select("svg").selectAll("rect:nth-child("+i+1+")").style("stroke", "black")
    // })//pathPM25spathSO2spathNO2spathCOspathO3s
    // pathPM25s.selectAll('path').on('mouseover', function(d,i){
    //   d3version4.select("body").select("svg").selectAll("rect:nth-child("+i+1+")").style("stroke", "black")
    // })
    // pathSO2s.selectAll('path').on('mouseover', function(d,i){
    //   d3version4.select("body").select("svg").selectAll("rect:nth-child("+i+1+")").style("stroke", "black")
    // })
    // pathNO2s.selectAll('path').on('mouseover', function(d,i){
    //   d3version4.select("body").select("svg").selectAll("rect:nth-child("+i+1+")").style("stroke", "black")
    // })
    // pathCOs.selectAll('path').on('mouseover', function(d,i){
    //   d3version4.select("body").select("svg").selectAll("rect:nth-child("+i+1+")").style("stroke", "black")
    // })
    // pathO3s.selectAll('path').on('mouseover', function(d,i){
    //   d3version4.select("body").select("svg").selectAll("rect:nth-child("+i+1+")").style("stroke", "black")
    //   // cellsTemp[i].style("stroke", "black")
    // })
    cells.on('mousemove', function(d, i) {
        tooltip.html('Time: ' + meanYear[i] + '-' + (meanMonth[i]+1) + '<br/>'
         + 'PM10=' + meanPM10[i].toFixed(2)+" μg/m³" + '<br/>'
         + 'PM2.5=' + meanPM25[i].toFixed(2)+" μg/m³" + '<br/>'
         + 'SO2=' + meanSO2[i].toFixed(2)+" μg/m³" + '<br/>'
         + 'NO2=' + meanNO2[i].toFixed(2)+" μg/m³" + '<br/>'
         + 'CO=' + meanCO[i].toFixed(2)+" mg/m³" + '<br/>'
         + 'O3=' + meanO3[i].toFixed(2)+" μg/m³"
         ).style("font-size", fontSize)
          .style('opacity', 0.8)//<br/>是换行符
          // .style('left', (d3version4.mouse(this)[0] + 40) + 'px')//d3.event.pageX
          .style('left', (d3version4.event.pageX + 40) + 'px')//d3.event.pageX
          // .style('top', (d3version4.mouse(this)[1] + 60) + 'px');
          .style('top', (d3version4.event.pageY + 60) + 'px');
      })        
    cells.on("mouseleave",function(d,i){
            d3version4.select(this).transition().delay(100).duration(300).style("stroke", "none");
            clearElementsByClass("boxtip");
            tooltip.style("opacity", 0);
        })
    cells.on('click', function(d){
        if (cells.attr('valueType') == 'PM10')
        {
          cells.attr('valueType', 'PM25')
          colors = d3version4.scaleLinear().domain(colorThresPM25).range(colorCodes);
          legendText.text(function(d,i){return colorThresPM25[i].toFixed(0);})
                    .style("text-anchor", "middle");
          cells.attr('fill', function(d, i){return colors(meanPM25[i])})
          pathPM10s.selectAll('path').style('opacity', opacity)
          pathPM25s.selectAll('path').style('opacity', 1)
        } 
        else
        {
          if (cells.attr('valueType') == 'PM25')
          {
            cells.attr('valueType', 'SO2')
            colors = d3version4.scaleLinear().domain(colorThresSO2).range(colorCodes);
            legendText.text(function(d,i){return colorThresSO2[i].toFixed(0);})
                      .style("text-anchor", "middle");
            cells.attr('fill', function(d, i){return colors(meanSO2[i])})
            pathPM25s.selectAll('path').style('opacity', opacity)
            pathSO2s.selectAll('path').style('opacity', 1)
          } 
          else
          {
            if (cells.attr('valueType') == 'SO2')
            {
              cells.attr('valueType', 'NO2')
              colors = d3version4.scaleLinear().domain(colorThresNO2).range(colorCodes);
              legendText.text(function(d,i){return colorThresNO2[i].toFixed(0);})
                        .style("text-anchor", "middle");
              cells.attr('fill', function(d, i){return colors(meanNO2[i])})
              pathSO2s.selectAll('path').style('opacity', opacity)
              pathNO2s.selectAll('path').style('opacity', 1)
            } 
            else
            {
              if (cells.attr('valueType') == 'NO2')
              {
                cells.attr('valueType', 'CO')
                colors = d3version4.scaleLinear().domain(colorThresCO).range(colorCodes);
                legendText.text(function(d,i){return colorThresCO[i].toFixed(0);})
                          .style("text-anchor", "middle");
                cells.attr('fill', function(d, i){return colors(meanCO[i])})
                pathNO2s.selectAll('path').style('opacity', opacity)
                pathCOs.selectAll('path').style('opacity', 1)
              } 
              else
              {
                if (cells.attr('valueType') == 'CO')
                {
                  cells.attr('valueType', 'O3')
                  colors = d3version4.scaleLinear().domain(colorThresO3).range(colorCodes);
                  legendText.text(function(d,i){return colorThresO3[i].toFixed(0);})
                            .style("text-anchor", "middle");
                  cells.attr('fill', function(d, i){return colors(meanO3[i])})
                  pathCOs.selectAll('path').style('opacity', opacity)
                  pathO3s.selectAll('path').style('opacity', 1)
                } 
                else
                {
                  cells.attr('valueType', 'PM10')
                  colors = d3version4.scaleLinear().domain(colorThresPM10).range(colorCodes);
                  legendText.text(function(d,i){return colorThresPM10[i].toFixed(0);})
                            .style("text-anchor", "middle");
                  cells.attr('fill', function(d, i){return colors(meanPM10[i])})
                  pathO3s.selectAll('path').style('opacity', opacity)
                  pathPM10s.selectAll('path').style('opacity', 1)
                }
              }
            }
          }
        }
        rect.style("fill", function(d){
                 return(chosenOrNot[Number(d == cells.attr('valueType'))]);
                });//应该算是小型的链接图了，会根据方块颜色含义切换最上方的legend的颜色指示，红色选中的就是当前颜色的含义，绿色的则不是
      })

    var xAxis = d3version4.axisBottom(x).ticks(year[year.length-1]-year[0]+1, 'd');

    var yaxRange = [];
    for (var j = 0; j < 12; j++) {
      yaxRange.push(cellH * j + 30)
    }

    var yAxis = d3version4.axisLeft()
      .scale(d3version4.scaleLinear().domain([0,1,2,3,4,5,6,7,8,9,10,11]).range(yRange))
      .ticks(12, 'd')
      .tickFormat("")
      //.tickFormat(function(d,i){return m[i]});

    myChart.append("g")
      .attr("class", "x-axis")
      .attr("transform", "translate("+ (margin.left + cellW/2) + "," + (margin.top + h + 3) + ")")
      .call(xAxis)
      .attr("font-size", fontSize);

    myChart.append("g")
      .attr("class", "y-axis")
      .attr("transform", "translate(" + (margin.left - 3) + "," + (margin.top + cellH/2 - 2) + ")")
      .call(yAxis)
      .attr("font-size", fontSize);

    myChart.append("text")             
          .attr("x", w/2+200)
          .attr("y",  h + margin.top+30)
          .style("text-anchor", "middle")
          .style("font-size", "25px")
          .text("Years");
   

    myChart.append('g')
      .attr("class", "xxx")
      .selectAll('text').data(m).enter()
      .append('text')
      .attr('x',margin.left - 10)
      .attr('y',function(d,i){return margin.top + yRange[i] + 20})
      .style('text-anchor','end')
      .style("font-size", fontSize)
      .text(function(d){return d})






    var legW= 120;
    var legH= 20;
    var legend = myChart.selectAll(".legend")
                    // .data(colorQuantiles)
                    .data(colorThresPM10)
                    .enter()
                    .append("g")
                    .attr("class", "legend")
                    .attr("font-size", fontSize)
                    .attr("font-style", "PT Sans")
                    .attr("transform", function(d,i){
                      
                      return ("translate(" + i * legW + ",0)")
                      
                    });
    var w_rate_go = 0.4;
    legend.append("rect")
          .attr("x", (w/4) * w_rate_go)
          .attr("y", h + margin.bottom)
          .attr("width", legW)
          .attr("height", legH)
          .style("fill", function(d,i){
           return(colorCodes[i]);
          });
    var legendText = legend.append("text")
          .attr("class", "textValue")
          .attr("x", ((w/4) * w_rate_go) + (legW/2) )
          .attr("y", (h+ (margin.bottom/3)) + legH + 42)
    legendText.text(function(d,i){
            // return colorQuantiles[i].toFixed(1);
            return colorThresPM10[i].toFixed(0);
          })
          .style("text-anchor", "middle");
    var legendMeaning = ["优","良","轻度污染","中度污染","重度污染","严重污染"];
    legend.append("text")
          .attr("class", "textMeaning")
          .attr("x", ((w/4) * w_rate_go) + (legW/2) )
          .attr("y", (h+ (margin.bottom/3)) + legH + 88)
          .text(function(d,i){
            // return colorQuantiles[i].toFixed(1);
            return legendMeaning[i];
          })
          .style("text-anchor", "middle");
  }
})//year[i] + '-' + m[month[i] - 1] + '<br/>' + d
/////////xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx////////////
//////////////////////////////////////////////////////////
/////////xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx////////////      
    })
})


//////////////////////////////////////////////////////
//////////////////////////////////////////////////////
//////////////////////////////////////////////////////
// set the dimensions and margin_Rs of the graph
var margin_R = {top: 20, right: 75, bottom: 30, left: 40},
  width_R= 240 - margin_R.left - margin_R.right,
  height_R= 450 - margin_R.top - margin_R.bottom;

// append the svg object to the body of the page
var svg_R= d3version4.select("#div_template")
.append("svg")
  .attr("width", width_R+ margin_R.left + margin_R.right)
  .attr("height", height_R+ margin_R.top + margin_R.bottom)
.append("g")
  .attr("transform",
        "translate(" + (margin_R.left-30) + "," + margin_R.top + ")");

//Read the data
// d3version4.csv("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/heatmap_data.csv", function(data) {
d3version4.csv(file_name + "_result.csv", function(data) {
  // Labels of row and columns -> unique identifier of the column called 'group' and 'variable'
  var myGroups = d3version4.map(data, function(d){return d.group;}).keys()
  var myVars = d3version4.map(data, function(d){return d.variable;}).keys()

  // Build X scales and axis:
  var x = d3version4.scaleBand()
    .range([ 0, width_R])
    .domain(myGroups)
    .padding(0.05);
  svg_R.append("g")
    .style("font-size", 24)
    .attr("transform", "translate(0," + height_R+ ")")
    .call(d3version4.axisBottom(x).tickSize(0))
    .select(".domain").remove()

  // Build Y scales and axis:
  var y = d3version4.scaleBand()
    .range([ height_R , 0 ])
    .domain(myVars)
    .padding(0.05);
  svg_R.append("g")
    .style("font-size", 24)
    .attr("transform", "translate(" + width_R + ',' + "0)")
    .call(d3version4.axisRight(y).tickSize(0))
    .select(".domain").remove()

  // Build color scale
  var myColor = d3version4.scaleSequential()
    .interpolator(d3version4.interpolateInferno)
    .domain([1,100])

  // create a tooltip
  var Tooltip_R = d3version4.select("#div_template")
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("background-color", "white")
    .style("border", "solid")
    .style("border-width", "2px")
    .style("border-radius", "5px")
    .style("padding", "5px")

  // Three function that change the tooltip when user hover / move / leave a cell
  var mouseover = function(d) {
    // Tooltip_R
    //   .style("opacity", 1)
    d3version4.select(this)
      .style("stroke", "black")
      .style("opacity", 1)
  }
  var mousemove = function(d) {1
    // Tooltip_R
    //   .html("The exact value of<br>this cell is: " + d.value)
    //   .style("left", (d3version4.mouse(this)[0]+70) + "px")
    //   .style("top", (d3version4.mouse(this)[1]) + "px")
  }
  var mouseleave = function(d) {
    Tooltip_R
      .style("opacity", 0)
    d3version4.select(this)
      .style("stroke", "none")
      .style("opacity", 0.8)
  }


  // add the squares
  svg_R.selectAll()
    .data(data, function(d) {return d.group+':'+d.variable;})
    .enter()
    .append("rect")
      .attr("x", function(d) { return x(d.group) })
      .attr("y", function(d) { return y(d.variable) })
      .attr("rx", 4)
      .attr("ry", 4)
      .attr("width", x.bandwidth() )
      .attr("height", y.bandwidth() )
      .style("fill", function(d) { return myColor(d.value)} )
      .style("stroke-width", 4)
      .style("stroke", "none")
      .style("opacity", 0.8)
    .on("mouseover", mouseover)
    // .on("mousemove", mousemove)
    .on("mouseleave", mouseleave)
})


//////////////////////////////////////////////////////
//////////////////////////////////////////////////////
//////////////////////////////////////////////////////

var margin_parallel = {top: 66, right: 510, bottom: 20, left: 20},
    width = document.body.clientWidth - margin_parallel.left - margin_parallel.right,
    height = 340 - margin_parallel.top - margin_parallel.bottom,
    innerHeight = height - 2;

var devicePixelRatio = window.devicePixelRatio || 1;

var color = d3version4.scaleOrdinal()
  // .domain(['优','良','轻度污染','中度污染','重度污染','严重污染'])
  .domain(['1','2','3','4','5','6'])
  .range(['#2ECC71','#F2D000','#FF9800','#F4511E','#CE93D8','#880E4F']);

var types = {
  "Number": {
    key: "Number",
    coerce: function(d) { return +d; },
    extent: d3version4.extent,
    within: function(d, extent, dim) { return extent[0] <= dim.scale(d) && dim.scale(d) <= extent[1]; },
    defaultScale: d3version4.scaleLinear().range([innerHeight, 0])
  },
  "String": {
    key: "String",
    coerce: String,
    extent: function (data) { return data.sort(); },
    within: function(d, extent, dim) { return extent[0] <= dim.scale(d) && dim.scale(d) <= extent[1]; },
    defaultScale: d3version4.scalePoint().range([0, innerHeight])
  },
  "Date": {
    key: "Date",
    coerce: function(d) { return new Date(d); },
    extent: d3version4.extent,
    within: function(d, extent, dim) { return extent[0] <= dim.scale(d) && dim.scale(d) <= extent[1]; },
    defaultScale: d3version4.scaleTime().range([innerHeight, 0])
  }
};

var dimensions = [
  {
    key: "AQI_level",
    description: "AQI level",
    type: types["String"],
    axis: d3version4.axisLeft()
      .tickFormat(function(d,i) {
        return d;
      })
  },
  {
    key: "year",
    description: "Year",
    type: types["String"]
  },
  {
    key: "month",
    description: "Month",
    type: types["Number"]
  },  
  {
    key: "day",
    description: "Day",
    type: types["Number"]
  },
  {
    key: "PM10",
    description: "PM10(μg/m³)",
    type: types["Number"]
  },
  {
    key: "PM25",
    type: types["Number"],
    description: "PM2.5(μg/m³)",
  },
  {
    key: "SO2",
    type: types["Number"],
    description: "SO2(μg/m³)",
  },
  {
    key: "NO2",
    description: "NO2(μg/m³)",
    type: types["Number"]
  },
  {
    key: "CO",
    description: "CO(mg/m³)",
    type: types["Number"]
  },
  {
    key: "O3",
    description: "O3(μg/m³)",
    type: types["Number"]
  },
];


var xscale = d3version4.scalePoint()
    .domain(d3version4.range(dimensions.length))
    .range([0, width]);

var yAxis = d3version4.axisLeft();

var container = d3version4
    .select("#parallel").append("div").attr("class", "parcoords")
    .style("width", width + margin_parallel.left + margin_parallel.right + "px")
    .style("height", height + margin_parallel.top + margin_parallel.bottom + "px");

var svg = container.append("svg")
    .attr("width", width + margin_parallel.left + margin_parallel.right)
    .attr("height", height + margin_parallel.top + margin_parallel.bottom)
  .append("g")
    .attr("transform", "translate(" + margin_parallel.left + "," + margin_parallel.top + ")");

var canvas = container.append("canvas")
    .attr("width", width * devicePixelRatio)
    .attr("height", height * devicePixelRatio)
    .style("width", width + "px")
    .style("height", height + "px")
    .style("margin-top", margin_parallel.top + "px")
    .style("margin-left", margin_parallel.left + "px");

var ctx = canvas.node().getContext("2d");
ctx.globalCompositeOperation = 'darken';
ctx.globalAlpha = 0.15;
ctx.lineWidth = 1.5;
ctx.scale(devicePixelRatio, devicePixelRatio);

var output = d3version4.select("#tablepre").append("pre")

var axes = svg.selectAll(".axis")
    .data(dimensions)
  .enter().append("g")
    .attr("class", function(d) { return "axis " + d.key.replace(/ /g, "_"); })
    .attr("transform", function(d,i) { return "translate(" + xscale(i) + ")"; });

d3version4.csv(file_name + ".csv", function(error, data) {
  if (error) throw error;

  data.forEach(function(d) {
    dimensions.forEach(function(p) {
      d[p.key] = !d[p.key] ? null : p.type.coerce(d[p.key]);
    });

    // truncate long text strings to fit in data table
    for (var key in d) {
      if (d[key] && d[key].length > 35) d[key] = d[key].slice(0,36);
    }
  });

  // type/dimension default setting happens here
  dimensions.forEach(function(dim) {
    if (!("domain" in dim)) {
      // detect domain using dimension type's extent function
      dim.domain = d3version4_functor(dim.type.extent)(data.map(function(d) { return d[dim.key]; }));
    }
    if (!("scale" in dim)) {
      // use type's default scale for dimension
      dim.scale = dim.type.defaultScale.copy();
    }
    dim.scale.domain(dim.domain);
  });

  var render = renderQueue(draw).rate(30);

  ctx.clearRect(0,0,width,height);
  ctx.globalAlpha = d3version4.min([1.15/Math.pow(data.length,0.3),1]);
  render(data);

  axes.append("g")
      .each(function(d) {
        var renderAxis = "axis" in d
          ? d.axis.scale(d.scale)  // custom axis
          : yAxis.scale(d.scale);  // default axis
        d3version4.select(this).call(renderAxis);
      })
    .append("text")
      .attr("class", "title")
      .attr("text-anchor", "start")
      .text(function(d) { return "description" in d ? d.description : d.key; });

  // Add and store a brush for each axis.
  axes.append("g")
      .attr("class", "brush")
      .each(function(d) {
        d3version4.select(this).call(d.brush = d3version4.brushY()
          .extent([[-10,0], [10,height]])
          .on("start", brushstart)
          .on("brush", brush)
          .on("end", brush)
        )
      })
    .selectAll("rect")
      .attr("x", -8)
      .attr("width", 16);

  d3version4.selectAll(".axis.AQI_level .tick text")
    .style("fill", color);
    
  output.text(d3version4.tsvFormat(data.slice(0,24)));

  function project(d) {
    return dimensions.map(function(p,i) {
      // check if data element has property and contains a value
      if (
        !(p.key in d) ||
        d[p.key] === null
      ) return null;

      return [xscale(i),p.scale(d[p.key])];
    });
  };

  function draw(d) {
    ctx.strokeStyle = color(d.AQI_level);
    ctx.beginPath();
    var coords = project(d);
    coords.forEach(function(p,i) {
      // this tricky bit avoids rendering null values as 0
      if (p === null) {
        // this bit renders horizontal lines on the previous/next
        // dimensions, so that sandwiched null values are visible
        if (i > 0) {
          var prev = coords[i-1];
          if (prev !== null) {
            ctx.moveTo(prev[0],prev[1]);
            ctx.lineTo(prev[0]+6,prev[1]);
          }
        }
        if (i < coords.length-1) {
          var next = coords[i+1];
          if (next !== null) {
            ctx.moveTo(next[0]-6,next[1]);
          }
        }
        return;
      }
      
      if (i == 0) {
        ctx.moveTo(p[0],p[1]);
        return;
      }

      ctx.lineTo(p[0],p[1]);
    });
    ctx.stroke();
  }

  function brushstart() {
    d3version4.event.sourceEvent.stopPropagation();
  }

  // Handles a brush event, toggling the display of foreground lines.
  function brush() {
    render.invalidate();

    var actives = [];
    svg.selectAll(".axis .brush")
      .filter(function(d) {
        return d3version4.brushSelection(this);
      })
      .each(function(d) {
        actives.push({
          dimension: d,
          extent: d3version4.brushSelection(this)
        });
      });

    var selected = data.filter(function(d) {
      if (actives.every(function(active) {
          var dim = active.dimension;
          // test if point is within extents for each active brush
          return dim.type.within(d[dim.key], active.extent, dim);
        })) {
        return true;
      }
    });

    // show ticks for active brush dimensions
    // and filter ticks to only those within brush extents
    /*
    svg.selectAll(".axis")
        .filter(function(d) {
          return actives.indexOf(d) > -1 ? true : false;
        })
        .classed("active", true)
        .each(function(dimension, i) {
          var extent = extents[i];
          d3version4.select(this)
            .selectAll(".tick text")
            .style("display", function(d) {
              var value = dimension.type.coerce(d);
              return dimension.type.within(value, extent, dimension) ? null : "none";
            });
        });

    // reset dimensions without active brushes
    svg.selectAll(".axis")
        .filter(function(d) {
          return actives.indexOf(d) > -1 ? false : true;
        })
        .classed("active", false)
        .selectAll(".tick text")
          .style("display", null);
    */

    ctx.clearRect(0,0,width,height);
    ctx.globalAlpha = d3version4.min([0.85/Math.pow(selected.length,0.3),1]);
    render(selected);

    output.text(d3version4.tsvFormat(selected.slice(0,24)));
  }
});

function d3version4_functor(v) {
  return typeof v === "function" ? v : function() { return v; };
};

/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
////////////////////     方块图    两码事       //////////////////////
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////

var d;//提前设定全局变量防止读取与执行分开做而导致奇妙错误
d3version4.csv(file_name + '.csv',function(error, dataset){
  if (error) { //If error is not null, something went wrong.
    console.log(error); //Log the error.
  } else {
    //console.log(dataset);
    d = dataset;
    var m = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var dateParse = d3version4.timeParse("%Y-%m-%d");
    var SO2 = [], PM25 = [],  date = [],
      PM10 = [], NO2 = [], CO = [], O3 = [],
      monthData = [],//one month
      month = [],
      year = [];
    var meanSO2 = [],
      meanPM25 = [],
      meanPM10 = [],
      meanNO2 = [],
      meanCO = [],
      meanO3 = [],
      meanMonth = [],
      meanMonthPlus = [],
      meanYear = [];
    var sumSO2 = 0, sumPM25 = 0, sumPM10 = 0, sumNO2 = 0, sumCO = 0, sumO3 = 0,
      nowYear = dateParse(d[0]['date']).getFullYear(),
      nowMonth = dateParse(d[0]['date']).getMonth();
    for (var i = 0; i < d.length; i++) {
      var dateobj = dateParse(d[i]['date']);
      year.push(dateobj.getFullYear());
      month.push(dateobj.getMonth());
      date.push(dateobj.getDate());
      SO2.push(Number(d[i]['SO2']));
      PM25.push(Number(d[i]['PM25']));

      PM10.push(Number(d[i]['PM10']));
      NO2.push(Number(d[i]['NO2']));

      CO.push(Number(d[i]['CO']));
      O3.push(Number(d[i]['O3']));


      monthData.push({date: dateobj.getDate(),
                      SO2: Number(d[i]['SO2']),
                      PM25: Number(d[i]['PM25']),
                      PM10: Number(d[i]['PM10']),
                      NO2: Number(d[i]['NO2']),
                      CO: Number(d[i]['CO']),
                      O3: Number(d[i]['O3'])
                      });//monthData是每月数据，长成这样[{date:1,SO2:25,PM25:23},{..}...]，就是为了匹配.path方法读取数据的习惯
      sumSO2 = sumSO2 + Number(d[i]['SO2']);
      sumPM25 = sumPM25 + Number(d[i]['PM25']);
      sumPM10 = sumPM10 + Number(d[i]['PM10']);
      sumNO2 = sumNO2 + Number(d[i]['NO2']);
      sumCO = sumCO + Number(d[i]['CO']);
      sumO3 = sumO3 + Number(d[i]['O3']);
      if(i == d.length - 1 || nowMonth != dateParse(d[i+1]['date']).getMonth()){
        meanYear.push(nowYear);
        meanMonth.push(nowMonth);
        meanMonthPlus.push(monthData);//月份数据list，长成这样[[{..}..],[{..}..],..]
        monthData = [];
        meanSO2.push(sumSO2 / dateobj.getDate());
        meanPM25.push(sumPM25 / dateobj.getDate());
        meanPM10.push(sumPM10 / dateobj.getDate());
        meanNO2.push(sumNO2 / dateobj.getDate());
        meanCO.push(sumCO / dateobj.getDate());
        meanO3.push(sumO3 / dateobj.getDate());
        // PM10.push((sumPM25 + sumSO2) / 2 / dateobj.getDate());
        if (i < d.length - 1){
          nowYear = dateParse(d[i+1]['date']).getFullYear();
          nowMonth = dateParse(d[i+1]['date']).getMonth()
          sumSO2 = 0;
          sumPM25 = 0;
          sumPM10 = 0;
          sumNO2 = 0;
          sumCO = 0;
          sumO3 = 0;
        }
      }
    }

    var margin = {//距画布边缘的各方向距离
      top: 40,//10
      left: 120,
      right: 100,
      bottom: 100
    };
    var w = 1300 - margin.left - margin.right;//画布总宽度1000
    var h = 600 - margin.top - margin.bottom;//画布总长度600

    var cellH = h / 12;//每个小长方形的高度
    var cellW = w / (year[year.length - 1] - year[0]);//小长方形长度
  //下面是一种双射，以映射方法scaleXXX()从前domain 原像 映射到后range 像。与数学写法一致D domain为定义域，而A range为值域
    var padding = 3;
    var x = d3version4.scaleLinear().domain([year[0], year[year.length - 1]]).range([0, w]);//应该是字典结构，代表从年份到横坐标位置的一种连续可逆的双映射

    var yRange = [];

    for (var j = 0; j < 12; j++) {
      yRange.push(cellH * j)
    }

    var y = d3version4.scaleLinear().domain(meanMonth).range(yRange);

    var colorCodes = ['#2ECC71','#FFEB3B','#FF9800','#F4511E','#CE93D8','#880E4F']//////////////
    // var colors = d3version4.scaleQuantile().domain([0,35,75,115,150,250])//////////////////////PM2.5
    var colorThresPM10 = [0,50,150,250,350,420]
    var colorThresPM25 = [0,35,75,115,150,250]
    var colorThresSO2 = [0,50,150,475,800,1600]
    var colorThresNO2 = [0,40,80,180,280,565]
    var colorThresCO = [0,2,4,14,24,36]
    var colorThresO3 = [0,100,160,215,265,800]

    var colors = d3version4.scaleLinear().domain(colorThresPM10)//////////////////////PM2.5

      .range(colorCodes);//scaleQuantile是对各对应分位点命名的方法

    // var colorQuantiles = colors.quantiles();
    // colorQuantiles.unshift(0);//colorbar的开头数字为0.0


    var myChart = d3version4.select('#squares').append('svg').attr("class", "squares")
      .attr('width', 1500)//1300
      .attr('height', 640).style('background', "none")//'#e5e7ea')
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var xSmall = d3version4.scaleLinear().domain([1,31]).range([0, cellW-padding]);//1-31号->0-cellWopading
    var ySmallPM10 = d3version4.scaleLinear().domain([d3version4.min(PM10), d3version4.max(PM10)]).range([cellH-padding, 0]);//这边调过来写很重要，不然图像就是上下颠倒的
    var ySmallPM25 = d3version4.scaleLinear().domain([d3version4.min(PM25), d3version4.max(PM25)]).range([cellH-padding, 0]);//这边调过来写很重要，不然图像就是上下颠倒的
    var ySmallSO2 = d3version4.scaleLinear().domain([d3version4.min(SO2), d3version4.max(SO2)]).range([cellH-padding, 0]);//这边调过来写很重要，不然图像就是上下颠倒的
    var ySmallNO2 = d3version4.scaleLinear().domain([d3version4.min(NO2), d3version4.max(NO2)]).range([cellH-padding, 0]);//这边调过来写很重要，不然图像就是上下颠倒的
    var ySmallCO = d3version4.scaleLinear().domain([d3version4.min(CO), d3version4.max(CO)]).range([cellH-padding, 0]);//这边调过来写很重要，不然图像就是上下颠倒的
    var ySmallO3 = d3version4.scaleLinear().domain([d3version4.min(O3), d3version4.max(O3)]).range([cellH-padding, 0]);//这边调过来写很重要，不然图像就是上下颠倒的
    var cells = myChart.append('g')
                         .attr('class', 'rect')//这个class的名字可以随便起，不影响图像的效果
                         .style("stroke-width", 4)
                         .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    var pathPM10s = myChart.append('g')//一个g下面只能有一种图形，所以这边创建了3个g，事实上最少创建2个g
                           .attr('class', 'path')
                           .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    var pathPM25s = myChart.append('g')//一个g下面只能有一种图形，所以这边创建了3个g，事实上最少创建2个g
                           .attr('class', 'path')
                           .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    var pathSO2s = myChart.append('g')
                           .attr('class', 'path')
                           .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    var pathNO2s = myChart.append('g')
                           .attr('class', 'path')
                           .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    var pathCOs = myChart.append('g')
                           .attr('class', 'path')
                           .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    var pathO3s = myChart.append('g')
                           .attr('class', 'path')
                           .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    var cellsTemp = cells.selectAll('rect')//这边这个rect...
                       .data(meanYear).enter().append('rect')//...与这边这个rect这个两个名字是绝对不可以改的，这两个rect决定了html的开头是<rect xxx></rect>，才能画出方块
                         .attr('height', cellH-padding).attr('width', cellW-padding)
                         .attr('valueType', 'PM10')
                         .attr('x', function(d) {
                           return x(d)
                         })
                         .attr('y', function(d, i) {//第二个参数代表数据集d中第i组数据的index i
                           return y(meanMonth[i])
                         })
                         .attr('fill', function(d, i) {
                           return colors(meanPM10[i]);//等待修改
                         })
    var opacity = 0.185;
    var cells = cellsTemp.each(function(d, i){//each 里的开头的d与i是与上面的d i共用的，因此就可以传递d与i
                         var linePM10 = d3version4.line()
                                          .x(function(da) { return xSmall(da.date) + x(d); })//x(d)就是整体位移参数，与cell的一致
                                          .y(function(da) { return ySmallPM10(da.PM10) + y(meanMonth[i]); });//x(d)就是整体位移参数，与cell的一致
                         var lineSO2 = d3version4.line()
                                         .x(function(da) { return xSmall(da.date) + x(d); })//x(d)就是整体位移参数，与cell的一致
                                         .y(function(da) { return ySmallSO2(da.SO2) + y(meanMonth[i]); });//x(d)就是整体位移参数，与cell的一致
                         var linePM25 = d3version4.line()
                                         .x(function(da) { return xSmall(da.date) + x(d); })//x(d)就是整体位移参数，与cell的一致
                                         .y(function(da) { return ySmallPM25(da.PM25) + y(meanMonth[i]); });//x(d)就是整体位移参数，与cell的一致
                         var lineNO2 = d3version4.line()
                                         .x(function(da) { return xSmall(da.date) + x(d); })//x(d)就是整体位移参数，与cell的一致
                                         .y(function(da) { return ySmallNO2(da.NO2) + y(meanMonth[i]); });//x(d)就是整体位移参数，与cell的一致
                         var lineCO = d3version4.line()
                                         .x(function(da) { return xSmall(da.date) + x(d); })//x(d)就是整体位移参数，与cell的一致
                                         .y(function(da) { return ySmallCO(da.CO) + y(meanMonth[i]); });//x(d)就是整体位移参数，与cell的一致
                         var lineO3 = d3version4.line()
                                         .x(function(da) { return xSmall(da.date) + x(d); })//x(d)就是整体位移参数，与cell的一致
                                         .y(function(da) { return ySmallO3(da.O3) + y(meanMonth[i]); });
                         pathPM10s.append('path')//名字很重要!只有html中的开头是<path xxx></path>才能画出线
                                       .datum(meanMonthPlus[i])
                                       .attr("class", "linePM10")
                                       .attr('d', linePM10)//这边并未处理missing的数据，关于missing数据的处理，详见.defined方法的使用说明
                                       .style('fill', 'none')
                                       .style('stroke', '#0000FF')//蓝色
                         pathPM25s.append('path')//名字很重要!只有html中的开头是<path xxx></path>才能画出线
                                       .datum(meanMonthPlus[i])
                                       .attr("class", "linePM25")
                                       .attr('d', linePM25)//这边并未处理missing的数据，关于missing数据的处理，详见.defined方法的使用说明
                                       .style('fill', 'none')
                                       .style('stroke', '#0000FF')//蓝色
                                       .style('opacity', opacity)
                         pathSO2s.append('path')//名字很重要!只有html中的开头是<path xxx></path>才能画出线
                                       .datum(meanMonthPlus[i])
                                       .attr("class", "lineSO2")
                                       .attr('d', lineSO2)
                                       .style('fill', 'none')
                                       .style('stroke', '#0000FF')//蓝色
                                       .style('opacity', opacity)
                         pathNO2s.append('path')//名字很重要!只有html中的开头是<path xxx></path>才能画出线
                                       .datum(meanMonthPlus[i])
                                       .attr("class", "lineNO2")
                                       .attr('d', lineNO2)//这边并未处理missing的数据，关于missing数据的处理，详见.defined方法的使用说明
                                       .style('fill', 'none')
                                       .style('stroke', '#0000FF')//蓝色
                                       .style('opacity', opacity)
                         pathCOs.append('path')//名字很重要!只有html中的开头是<path xxx></path>才能画出线
                                       .datum(meanMonthPlus[i])
                                       .attr("class", "lineCO")
                                       .attr('d', lineCO)//这边并未处理missing的数据，关于missing数据的处理，详见.defined方法的使用说明
                                       .style('fill', 'none')
                                       .style('stroke', '#0000FF')//蓝色
                                       .style('opacity', opacity)
                         pathO3s.append('path')//名字很重要!只有html中的开头是<path xxx></path>才能画出线
                                       .datum(meanMonthPlus[i])
                                       .attr("class", "linePM10")
                                       .attr('d', lineO3)//这边并未处理missing的数据，关于missing数据的处理，详见.defined方法的使用说明
                                       .style('fill', 'none')
                                       .style('stroke', '#0000FF')//蓝色
                                       .style('opacity', opacity)
                                       // .style('stroke', '#1E90FF')//淡色
                       })


    var tooltip = d3version4.select('body').append('div').attr('class', 'boxtip')
      .style('opacity', 0)
      .style('position', 'absolute')
      .style('background', '#f5f5f5')
      .style('padding', '4px 10px')
      .style('border', '1px #333 solid');
    
    var nameW = 200, nameH = 27, higher = 32;
    var fontSize = '22px';
    var chosenOrNot = ["#66C2A5", "#D53E4F"];
    var detailedNames = ["avg(day.PM10)","avg(day.PM2.5)","avg(day.SO2)",
                        "avg(day.NO2)","avg(day.CO)","avg(day.O3)"];
    var simpleNames = ["PM10", "PM25", "SO2", "NO2", "CO", "O3"];
    var colorWhichTemp = myChart.selectAll(".colorWhichTemp")
                          .data(simpleNames)
                          .enter()
                          .append("g")
                          .attr("class", "legend1")//一个搞笑的错误，改叫legend就会与后面的colorbar【也叫legend】的d3version4选择创建发生冲突，后面的会只创建出3个colorbar...
                          .attr("font-size", fontSize)
                          .attr("font-style", "PT Sans")
                          .attr("fill", "white")
                          .attr("transform", function(d,i){
                            return ("translate(" + i * nameW + ",0)")
                          });
    var rect = colorWhichTemp.append("rect")
                .attr("x", margin.left )
                .attr("y", margin.top - higher)
                .attr("rx", 10)
                .attr("ry", 10)
                .attr("width", nameW-3)
                .attr("height", nameH)
                .text(function(d, i){return detailedNames[i]})
                .style("fill", function(d){
                 return(chosenOrNot[Number(d == cells.attr('valueType'))]);
                });

    colorWhichTemp.append("text")
          .attr("x", margin.left + nameW/2)
          .attr("y", margin.top - higher + nameH*0.75)
          .text(function(d,i){
            return detailedNames[i]
          })
          .style("text-anchor", "middle");

    cells.on('mouseover', function(d,i){
      d3version4.select(this).style("stroke", "black")
    })
    // pathPM10s.selectAll('path').on('mouseover', function(d,i){
    //   d3version4.select("body").select("svg").selectAll("rect:nth-child("+i+1+")").style("stroke", "black")
    // })//pathPM25spathSO2spathNO2spathCOspathO3s
    // pathPM25s.selectAll('path').on('mouseover', function(d,i){
    //   d3version4.select("body").select("svg").selectAll("rect:nth-child("+i+1+")").style("stroke", "black")
    // })
    // pathSO2s.selectAll('path').on('mouseover', function(d,i){
    //   d3version4.select("body").select("svg").selectAll("rect:nth-child("+i+1+")").style("stroke", "black")
    // })
    // pathNO2s.selectAll('path').on('mouseover', function(d,i){
    //   d3version4.select("body").select("svg").selectAll("rect:nth-child("+i+1+")").style("stroke", "black")
    // })
    // pathCOs.selectAll('path').on('mouseover', function(d,i){
    //   d3version4.select("body").select("svg").selectAll("rect:nth-child("+i+1+")").style("stroke", "black")
    // })
    // pathO3s.selectAll('path').on('mouseover', function(d,i){
    //   d3version4.select("body").select("svg").selectAll("rect:nth-child("+i+1+")").style("stroke", "black")
    //   // cellsTemp[i].style("stroke", "black")
    // })
    cells.on('mousemove', function(d, i) {
        tooltip.html('Time: ' + meanYear[i] + '-' + (meanMonth[i]+1) + '<br/>'
         + 'PM10=' + meanPM10[i].toFixed(2)+" μg/m³" + '<br/>'
         + 'PM2.5=' + meanPM25[i].toFixed(2)+" μg/m³" + '<br/>'
         + 'SO2=' + meanSO2[i].toFixed(2)+" μg/m³" + '<br/>'
         + 'NO2=' + meanNO2[i].toFixed(2)+" μg/m³" + '<br/>'
         + 'CO=' + meanCO[i].toFixed(2)+" mg/m³" + '<br/>'
         + 'O3=' + meanO3[i].toFixed(2)+" μg/m³"
         ).style("font-size", fontSize)
          .style('opacity', 0.8)//<br/>是换行符
          // .style('left', (d3version4.mouse(this)[0] + 40) + 'px')//d3.event.pageX
          .style('left', (d3version4.event.pageX + 40) + 'px')//d3.event.pageX
          // .style('top', (d3version4.mouse(this)[1] + 60) + 'px');
          .style('top', (d3version4.event.pageY + 60) + 'px');
      })

    cells.on("mouseleave",function(d,i){
            d3version4.select(this).transition().delay(100).duration(300).style("stroke", "none");
            clearElementsByClass("boxtip");
            tooltip.style("opacity", 0);
        })
    cells.on('click', function(d){
        if (cells.attr('valueType') == 'PM10')
        {
          cells.attr('valueType', 'PM25')
          colors = d3version4.scaleLinear().domain(colorThresPM25).range(colorCodes);
          legendText.text(function(d,i){return colorThresPM25[i].toFixed(0);})
                    .style("text-anchor", "middle");
          cells.attr('fill', function(d, i){return colors(meanPM25[i])})
          pathPM10s.selectAll('path').style('opacity', opacity)
          pathPM25s.selectAll('path').style('opacity', 1)
        } 
        else
        {
          if (cells.attr('valueType') == 'PM25')
          {
            cells.attr('valueType', 'SO2')
            colors = d3version4.scaleLinear().domain(colorThresSO2).range(colorCodes);
            legendText.text(function(d,i){return colorThresSO2[i].toFixed(0);})
                      .style("text-anchor", "middle");
            cells.attr('fill', function(d, i){return colors(meanSO2[i])})
            pathPM25s.selectAll('path').style('opacity', opacity)
            pathSO2s.selectAll('path').style('opacity', 1)
          } 
          else
          {
            if (cells.attr('valueType') == 'SO2')
            {
              cells.attr('valueType', 'NO2')
              colors = d3version4.scaleLinear().domain(colorThresNO2).range(colorCodes);
              legendText.text(function(d,i){return colorThresNO2[i].toFixed(0);})
                        .style("text-anchor", "middle");
              cells.attr('fill', function(d, i){return colors(meanNO2[i])})
              pathSO2s.selectAll('path').style('opacity', opacity)
              pathNO2s.selectAll('path').style('opacity', 1)
            } 
            else
            {
              if (cells.attr('valueType') == 'NO2')
              {
                cells.attr('valueType', 'CO')
                colors = d3version4.scaleLinear().domain(colorThresCO).range(colorCodes);
                legendText.text(function(d,i){return colorThresCO[i].toFixed(0);})
                          .style("text-anchor", "middle");
                cells.attr('fill', function(d, i){return colors(meanCO[i])})
                pathNO2s.selectAll('path').style('opacity', opacity)
                pathCOs.selectAll('path').style('opacity', 1)
              } 
              else
              {
                if (cells.attr('valueType') == 'CO')
                {
                  cells.attr('valueType', 'O3')
                  colors = d3version4.scaleLinear().domain(colorThresO3).range(colorCodes);
                  legendText.text(function(d,i){return colorThresO3[i].toFixed(0);})
                            .style("text-anchor", "middle");
                  cells.attr('fill', function(d, i){return colors(meanO3[i])})
                  pathCOs.selectAll('path').style('opacity', opacity)
                  pathO3s.selectAll('path').style('opacity', 1)
                } 
                else
                {
                  cells.attr('valueType', 'PM10')
                  colors = d3version4.scaleLinear().domain(colorThresPM10).range(colorCodes);
                  legendText.text(function(d,i){return colorThresPM10[i].toFixed(0);})
                            .style("text-anchor", "middle");
                  cells.attr('fill', function(d, i){return colors(meanPM10[i])})
                  pathO3s.selectAll('path').style('opacity', opacity)
                  pathPM10s.selectAll('path').style('opacity', 1)
                }
              }
            }
          }
        }
        rect.style("fill", function(d){
                 return(chosenOrNot[Number(d == cells.attr('valueType'))]);
                });//应该算是小型的链接图了，会根据方块颜色含义切换最上方的legend的颜色指示，红色选中的就是当前颜色的含义，绿色的则不是
      })

    var xAxis = d3version4.axisBottom(x).ticks(year[year.length-1]-year[0]+1, 'd');

    var yaxRange = [];
    for (var j = 0; j < 12; j++) {
      yaxRange.push(cellH * j + 30)
    }

    var yAxis = d3version4.axisLeft()
      .scale(d3version4.scaleLinear().domain([0,1,2,3,4,5,6,7,8,9,10,11]).range(yRange))
      .ticks(12, 'd')
      .tickFormat("")
      //.tickFormat(function(d,i){return m[i]});

    myChart.append("g")
      .attr("class", "x-axis")
      .attr("transform", "translate("+ (margin.left + cellW/2) + "," + (margin.top + h + 3) + ")")
      .call(xAxis)
      .attr("font-size", fontSize);

    myChart.append("g")
      .attr("class", "y-axis")
      .attr("transform", "translate(" + (margin.left - 3) + "," + (margin.top + cellH/2 - 2) + ")")
      .call(yAxis)
      .attr("font-size", fontSize);

    myChart.append("text")             
          .attr("x", w/2+200)
          .attr("y",  h + margin.top+30)
          .style("text-anchor", "middle")
          .style("font-size", "25px")
          .text("Years");
   

    myChart.append('g')
      .selectAll('text').data(m).enter()
      .append('text')
      .attr('x',margin.left - 10)
      .attr('y',function(d,i){return margin.top + yRange[i] + 20})
      .style('text-anchor','end')
      .style("font-size", fontSize)
      .text(function(d){return d})

    

    var legW= 120;
    var legH= 20;
    var legend = myChart.selectAll(".legend")
                    // .data(colorQuantiles)
                    .data(colorThresPM10)
                    .enter()
                    .append("g")
                    .attr("class", "legend")
                    .attr("font-size", fontSize)
                    .attr("font-style", "PT Sans")
                    .attr("transform", function(d,i){
                      
                      return ("translate(" + i * legW + ",0)")
                      
                    });
    var w_rate_go = 0.4;
    legend.append("rect")
          .attr("x", (w/4) * w_rate_go)
          .attr("y", h + margin.bottom)
          .attr("width", legW)
          .attr("height", legH)
          .style("fill", function(d,i){
           return(colorCodes[i]);
          });
    var legendText = legend.append("text")
          .attr("class", "textValue")
          .attr("x", ((w/4) * w_rate_go) + (legW/2) )
          .attr("y", (h+ (margin.bottom/3)) + legH + 42)
    legendText.text(function(d,i){
            // return colorQuantiles[i].toFixed(1);
            return colorThresPM10[i].toFixed(0);
          })
          .style("text-anchor", "middle");
    var legendMeaning = ["优","良","轻度污染","中度污染","重度污染","严重污染"];
    legend.append("text")
          .attr("class", "textMeaning")
          .attr("x", ((w/4) * w_rate_go) + (legW/2) )
          .attr("y", (h+ (margin.bottom/3)) + legH + 88)
          .text(function(d,i){
            // return colorQuantiles[i].toFixed(1);
            return legendMeaning[i];
          })
          .style("text-anchor", "middle");
  }
})//year[i] + '-' + m[month[i] - 1] + '<br/>' + d
var tmp = 1;