function d3_depthError_higherNst_annotation_gen(title, label) {
return [
  {
    note: {
      label: label,
      title: title,
      align: "right",
      lineType: "horizontal"
    },
    type: d3.annotationCalloutRect,
    subject: {
      width: 170,
      height: 335
    },
    connector: {
      //end: "arrow",
      //endScale: 2
    },
    color: ["#010005"],
    x: 635,
    y: 267,
    dy: 300,
    dx: -25
  }
]
}

function d3_depthError_pre1960_annotation_gen(title, label) {
return [
  {
    note: {
      label: label,
      title: title,
      align: "right",
      lineType: "horizontal"
    },
    type: d3.annotationCalloutRect,
    subject: {
      width: 45,
      height: 55
    },
    connector: {
      //end: "arrow",
      //endScale: 2
    },
    color: ["#010005"],
    x: 220,
    y:  75,
    dy: 0,
    dx: 540
  }
]
}

function d3_depthError_consistent10km_annotation_gen(title, label) {
return [
  {
    note: {
      label: label,
      title: title,
      align: "right",
      lineType: "horizontal"
    },
    type: d3.annotationCalloutRect,
    subject: {
      width: 60,
      height: 460
    },
    connector: {
      //end: "arrow",
      //endScale: 2
    },
    color: ["#010005"],
    x: 314,
    y:  111,
    dy: 370,
    dx: -40
  }
]
}

function d3_magError_annotation_gen(title, label) {
return [
  {
    note: {
      label: label,
      title: title,
      align: "right",
      lineType: "horizontal"
    },
    type: d3.annotationCalloutCircle,
    subject: {
      radius: 110,
      radiusPadding: 5
    },
    connector: {
      //end: "arrow",
      //endScale: 2
    },
    color: ["#010005"],
    x: 370,
    y: 190,
    dy: 90,
    dx: -110
  }
]
}

function d3_append_depthError_higherNst_return_annotation(scatter, data, yaxfield, cxfield, cyfield, canvas_width, canvas_height, downsize, logscale, xa_numticks, xa_tickgap, yaxmultiplier, errmultiplier) {
  let title = "Click Here to Go Back";
  let label = "";



  var annotations = d3_depthError_higherNst_annotation_gen(title, label);

  const makeAnnotations = d3.annotation()
        .annotations(annotations)
        .disable(["subject", "connector"])
        .on("noteclick", function(a) {
             // clear expandView svg to revert back to
             // original view
             scatter.svg.remove();

             var d3obj = d3_svg_depthError_setup("depthError", data, yaxfield, cxfield, cyfield, canvas_width, canvas_height, downsize, logscale, xa_numticks, xa_tickgap, yaxmultiplier, errmultiplier);

             d3_append_depthError_consistent10km_annotation(d3obj.scatter, data, yaxfield, cxfield, cyfield, canvas_width, canvas_height, downsize, logscale, xa_numticks, xa_tickgap, yaxmultiplier, errmultiplier);

             d3_append_depthError_pre1960_annotation(d3obj.scatter, data, yaxfield, cxfield, cyfield, canvas_width, canvas_height, downsize, logscale, xa_numticks, xa_tickgap, yaxmultiplier, errmultiplier);

             d3_append_depthError_higherNst_annotation(d3obj.scatter, data, yaxfield, cxfield, cyfield, canvas_width, canvas_height, downsize, logscale, xa_numticks, xa_tickgap, yaxmultiplier, errmultiplier);

             d3_append_circles(d3obj.scatter.chart, d3obj.cx, d3obj.scatter.xscale, d3obj.yax, d3obj.scatter.yscale, d3obj.raderr_sized, d3obj.scatter.rscale, d3obj.scatter.color_map, data, d3_html_tooltip_detailed);
             d3_svg_append_legend(d3obj.scatter.svg, data, d3obj.scatter.color_map);
             });

  scatter.svg.append("g")
     .call(makeAnnotations);
}

function d3_append_depthError_pre1960_return_annotation(scatter, data, yaxfield, cxfield, cyfield, canvas_width, canvas_height, downsize, logscale, xa_numticks, xa_tickgap, yaxmultiplier, errmultiplier) {
  let title = "Click Here to Go Back";
  let label = "";

  var annotations = d3_depthError_pre1960_annotation_gen(title, label);

  const makeAnnotations = d3.annotation()
        .annotations(annotations)
        .disable(["subject", "connector"])
        .on("noteclick", function(a) {
             // clear expandView svg to revert back to
             // original view
             scatter.svg.remove();

             var d3obj = d3_svg_depthError_setup("depthError", data, yaxfield, cxfield, cyfield, canvas_width, canvas_height, downsize, logscale, xa_numticks, xa_tickgap, yaxmultiplier, errmultiplier);

             d3_append_depthError_consistent10km_annotation(d3obj.scatter, data, yaxfield, cxfield, cyfield, canvas_width, canvas_height, downsize, logscale, xa_numticks, xa_tickgap, yaxmultiplier, errmultiplier);

             d3_append_depthError_pre1960_annotation(d3obj.scatter, data, yaxfield, cxfield, cyfield, canvas_width, canvas_height, downsize, logscale, xa_numticks, xa_tickgap, yaxmultiplier, errmultiplier);

             d3_append_depthError_higherNst_annotation(d3obj.scatter, data, yaxfield, cxfield, cyfield, canvas_width, canvas_height, downsize, logscale, xa_numticks, xa_tickgap, yaxmultiplier, errmultiplier);

             d3_append_circles(d3obj.scatter.chart, d3obj.cx, d3obj.scatter.xscale, d3obj.yax, d3obj.scatter.yscale, d3obj.raderr_sized, d3obj.scatter.rscale, d3obj.scatter.color_map, data, d3_html_tooltip_detailed);
             d3_svg_append_legend(d3obj.scatter.svg, data, d3obj.scatter.color_map);
             });

  scatter.svg.append("g")
     .call(makeAnnotations);
}

function d3_append_depthError_consistent10km_return_annotation(scatter, data, yaxfield, cxfield, cyfield, canvas_width, canvas_height, downsize, logscale, xa_numticks, xa_tickgap, yaxmultiplier, errmultiplier) {
  let title = "Click Here to Go Back";
  let label = "";

  var annotations = d3_depthError_consistent10km_annotation_gen(title, label);

  const makeAnnotations = d3.annotation()
        .annotations(annotations)
        .disable(["subject", "connector"])
        .on("noteclick", function(a) {
             // clear expandView svg to revert back to
             // original view
             scatter.svg.remove();

             var d3obj = d3_svg_depthError_setup("depthError", data, yaxfield, cxfield, cyfield, canvas_width, canvas_height, downsize, logscale, xa_numticks, xa_tickgap, yaxmultiplier, errmultiplier);

             d3_append_depthError_consistent10km_annotation(d3obj.scatter, data, yaxfield, cxfield, cyfield, canvas_width, canvas_height, downsize, logscale, xa_numticks, xa_tickgap, yaxmultiplier, errmultiplier);

            d3_append_depthError_pre1960_annotation(d3obj.scatter, data, yaxfield, cxfield, cyfield, canvas_width, canvas_height, downsize, logscale, xa_numticks, xa_tickgap, yaxmultiplier, errmultiplier);

             d3_append_depthError_higherNst_annotation(d3obj.scatter, data, yaxfield, cxfield, cyfield, canvas_width, canvas_height, downsize, logscale, xa_numticks, xa_tickgap, yaxmultiplier, errmultiplier);

             d3_append_circles(d3obj.scatter.chart, d3obj.cx, d3obj.scatter.xscale, d3obj.yax, d3obj.scatter.yscale, d3obj.raderr_sized, d3obj.scatter.rscale, d3obj.scatter.color_map, data, d3_html_tooltip_detailed);
             d3_svg_append_legend(d3obj.scatter.svg, data, d3obj.scatter.color_map);
             });

  scatter.svg.append("g")
     .call(makeAnnotations);
}

function d3_append_magError_return_annotation(scatter, data, yaxfield, cxfield, cyfield, canvas_width, canvas_height, downsize, logscale, xa_numticks, xa_tickgap, yaxmultiplier, errmultiplier) {
  let title = "Click Here to Go Back";
  let label = "";

  var annotations = d3_magError_annotation_gen(title, label);

  const makeAnnotations = d3.annotation()
        .annotations(annotations)
        .disable(["subject", "connector"])
        .on("noteclick", function(a) {
             // clear expandView svg to revert back to
             // original view
             scatter.svg.remove();

             var d3obj = d3_svg_magError_setup("magError", data, yaxfield, cxfield, cyfield, canvas_width, canvas_height, downsize, logscale, xa_numticks, xa_tickgap, yaxmultiplier, errmultiplier);

             d3_append_magError_annotation(d3obj.scatter, data, yaxfield, cxfield, cyfield, canvas_width, canvas_height, downsize, logscale, xa_numticks, xa_tickgap, yaxmultiplier, errmultiplier);

             d3_append_circles(d3obj.scatter.chart, d3obj.cx, d3obj.scatter.xscale, d3obj.yax, d3obj.scatter.yscale, d3obj.raderr_sized, d3obj.scatter.rscale, d3obj.scatter.color_map, data, d3_html_tooltip_detailed);
             d3_svg_append_legend(d3obj.scatter.svg, data, d3obj.scatter.color_map);
             });

  scatter.svg.append("g")
     .call(makeAnnotations);
}

function d3_append_depthError_higherNst_annotation(scatter, data, yaxfield, cxfield, cyfield, canvas_width, canvas_height, downsize, logscale, xa_numticks, xa_tickgap, yaxmultiplier, errmultiplier) {
  /****
   * Annotation specific for the depthError scene
   * with static data showing relatively low
   * error datapoints for higher Nst counts
   ****/

let title = "Sparse Low Error Region";
let label = "sparsely distributed low error events w/ high measuring station counts";

const annotations = d3_depthError_higherNst_annotation_gen(title, label);

const makeAnnotations = d3.annotation()
  .annotations(annotations)
  .on("subjectover", function(a) {
       this.append("text")
           .attr("class", "clickhelp")
           .text("Click to Expand View");
       })
  .on("subjectout", function(a) {
       this.selectAll("text.clickhelp")
           .remove();
       })
  .on("subjectclick", function(a) {
       var cdata = [];

       // hacks to get the data to fit in the fix.
       let enclosed_y = 500;
       let enclosed_x = 537;
       let enclosed_y_top = 174;

       //console.log(a);
       //console.log("==========");
       //console.log("enc_right_x: "+enclosed_right_x+"  enc_y: "+enclosed_y);

       let circles = scatter.svg.selectAll("circle")._groups[0];

       console.log(scatter.svg);

       // anything less than or equal to _y AND
       // anything less than or equal to _x
       // we target for expansion view
       for (let i = 0; i < circles.length; i++) {
           let curr_cx = circles[i].attributes.cx.value;
           let curr_cy = circles[i].attributes.cy.value;

           if (curr_cy < enclosed_y && curr_cx > enclosed_x && curr_cy > enclosed_y_top) {
             console.log("cx: "+curr_cx+"  cy: "+curr_cy + "  DepthError: "+data[i].depthError+"  Depth: "+data[i].depth);
             cdata.push(data[i]);
           } else {
               // DEBUG: to show which datapoints
               // will actually show up in the subject
               // of the annotation
               //scatter.svg.select(".circle"+i).remove();
           }
       }

       console.log(cdata.length);

       // clear main magError scene to "expand"
       // the d3 annotation subject section data points
       scatter.svg.remove();

       var d3obj = d3_svg_depthError_setup("expandView", cdata, yaxfield, cxfield, cyfield, canvas_width, canvas_height, downsize, logscale, xa_numticks, xa_tickgap, yaxmultiplier, errmultiplier);
       d3_append_depthError_higherNst_return_annotation(d3obj.scatter, data, yaxfield, cxfield, cyfield, canvas_width, canvas_height, downsize, logscale, xa_numticks, xa_tickgap, yaxmultiplier, errmultiplier);

       d3_append_circles(d3obj.scatter.chart, d3obj.cx, d3obj.scatter.xscale, d3obj.yax, d3obj.scatter.yscale, d3obj.raderr_sized, d3obj.scatter.rscale, d3obj.scatter.color_map, cdata, d3_html_tooltip_detailed);
       d3_svg_append_legend(d3obj.scatter.svg, data, scatter.color_map);
       });

scatter.svg.append("g")
   .call(makeAnnotations);
}



function d3_append_depthError_pre1960_annotation(scatter, data, yaxfield, cxfield, cyfield, canvas_width, canvas_height, downsize, logscale, xa_numticks, xa_tickgap, yaxmultiplier, errmultiplier) {
  /****
   * Annotation specific for the depthError scene
   * with static data showing the consistently high
   * error datapoints around 10km depth
   ****/

let title = "Pre-1960 High Error Region";
let label = "high error events w/ low measuring station counts";

const annotations = d3_depthError_pre1960_annotation_gen(title, label);

const makeAnnotations = d3.annotation()
  .annotations(annotations)
  .on("subjectover", function(a) {
       this.append("text")
           .attr("class", "clickhelp")
           .text("Click to Expand View");
       })
  .on("subjectout", function(a) {
       this.selectAll("text.clickhelp")
           .remove();
       })
  .on("subjectclick", function(a) {
       var cdata = [];

       // hacks to get the data to fit in the fix.
       let enclosed_y = 10;

       //console.log(a);
       //console.log("==========");
       //console.log("enc_right_x: "+enclosed_right_x+"  enc_y: "+enclosed_y);

       let circles = scatter.svg.selectAll("circle")._groups[0];

       console.log(scatter.svg);

       // anything less than or equal to _y AND
       // anything less than or equal to _x
       // we target for expansion view
       for (let i = 0; i < circles.length; i++) {
           let curr_cx = circles[i].attributes.cx.value;
           let curr_cy = circles[i].attributes.cy.value;

           if (curr_cy < enclosed_y) {
             console.log("cx: "+curr_cx+"  cy: "+curr_cy + "  DepthError: "+data[i].depthError+"  Depth: "+data[i].depth);
             cdata.push(data[i]);
           } else {
               // DEBUG: to show which datapoints
               // will actually show up in the subject
               // of the annotation
               //scatter.svg.select(".circle"+i).remove();
           }
       }

       console.log(cdata.length);

       // clear main magError scene to "expand"
       // the d3 annotation subject section data points
       scatter.svg.remove();

       var d3obj = d3_svg_depthError_setup("expandView", cdata, yaxfield, cxfield, cyfield, canvas_width, canvas_height, downsize, logscale, xa_numticks, xa_tickgap, yaxmultiplier, errmultiplier);
       d3_append_depthError_pre1960_return_annotation(d3obj.scatter, data, yaxfield, cxfield, cyfield, canvas_width, canvas_height, downsize, logscale, xa_numticks, xa_tickgap, yaxmultiplier, errmultiplier);

       d3_append_circles(d3obj.scatter.chart, d3obj.cx, d3obj.scatter.xscale, d3obj.yax, d3obj.scatter.yscale, d3obj.raderr_sized, d3obj.scatter.rscale, d3obj.scatter.color_map, cdata, d3_html_tooltip_detailed);
       d3_svg_append_legend(d3obj.scatter.svg, data, scatter.color_map);
       });

scatter.svg.append("g")
   .call(makeAnnotations);
}

function d3_append_depthError_consistent10km_annotation(scatter, data, yaxfield, cxfield, cyfield, canvas_width, canvas_height, downsize, logscale, xa_numticks, xa_tickgap, yaxmultiplier, errmultiplier) {
  /****
   * Annotation specific for the depthError scene
   * with static data showing the consistently high
   * error datapoints around 10km depth
   ****/

let title = "Consistent High Error Region (~10 km)";
let label = "A clustering of relatively consistent high error earthquake events at depths around 10 km";

const annotations = d3_depthError_consistent10km_annotation_gen(title, label);

const makeAnnotations = d3.annotation()
  .annotations(annotations)
  .on("subjectover", function(a) {
       this.append("text")
           .attr("class", "clickhelp")
           .text("Click to Expand View");
       })
  .on("subjectout", function(a) {
       this.selectAll("text.clickhelp")
           .remove();
       })
  .on("subjectclick", function(a) {
       var cdata = [];

       // hacks to get the data to fit in the fix.
       let enclosed_left_x = Math.abs(a._y) + Math.abs(a.subject.width) + Math.abs(a._dx);
       let enclosed_right_x = enclosed_left_x + a.subject.width;
       let enclosed_y = a.subject.height + 10;

       //console.log(a);
       //console.log("==========");
       //console.log("enc_right_x: "+enclosed_right_x+"  enc_y: "+enclosed_y);

       let circles = scatter.svg.selectAll("circle")._groups[0];

       console.log(scatter.svg);

       // anything less than or equal to _y AND
       // anything less than or equal to _x
       // we target for expansion view
       for (let i = 0; i < circles.length; i++) {
           let curr_cx = circles[i].attributes.cx.value;
           let curr_cy = circles[i].attributes.cy.value;

           if (curr_cy < enclosed_y && curr_cx < enclosed_right_x && curr_cx > enclosed_left_x) {
             console.log("cx: "+curr_cx+"  cy: "+curr_cy + "  DepthError: "+data[i].depthError+"  Depth: "+data[i].depth);
             cdata.push(data[i]);
           } else {
               // DEBUG: to show which datapoints
               // will actually show up in the subject
               // of the annotation
               //scatter.svg.select(".circle"+i).remove();
           }
       }

       console.log(cdata.length);

       // clear main magError scene to "expand"
       // the d3 annotation subject section data points
       scatter.svg.remove();

       var d3obj = d3_svg_depthError_setup("expandView", cdata, yaxfield, cxfield, cyfield, canvas_width, canvas_height, downsize, logscale, xa_numticks, xa_tickgap, yaxmultiplier, errmultiplier);
       d3_append_depthError_consistent10km_return_annotation(d3obj.scatter, data, yaxfield, cxfield, cyfield, canvas_width, canvas_height, downsize, logscale, xa_numticks, xa_tickgap, yaxmultiplier, errmultiplier);

       d3_append_circles(d3obj.scatter.chart, d3obj.cx, d3obj.scatter.xscale, d3obj.yax, d3obj.scatter.yscale, d3obj.raderr_sized, d3obj.scatter.rscale, d3obj.scatter.color_map, cdata, d3_html_tooltip_detailed);
       d3_svg_append_legend(d3obj.scatter.svg, data, scatter.color_map);
       });

scatter.svg.append("g")
   .call(makeAnnotations);
}

function d3_append_magError_annotation(scatter, data, yaxfield, cxfield, cyfield, canvas_width, canvas_height, downsize, logscale, xa_numticks, xa_tickgap, yaxmultiplier, errmultiplier) {
  /****
   * Annotation specific for the magError scene
   * with static data
   ****/

let title = "High Error Region (Low Magnitude Events)";
let label = "A clustering of high error earthquake events at lower magnitude / lower number measuring stations";

const annotations = d3_magError_annotation_gen(title, label);

const makeAnnotations = d3.annotation()
  .annotations(annotations)
  .on("subjectover", function(a) {
       this.append("text")
           .attr("class", "clickhelp")
           .text("Click to Expand View");
       })
  .on("subjectout", function(a) {
       this.selectAll("text.clickhelp")
           .remove();
       })
  .on("subjectclick", function(a) {
       var cdata = [];
       let enclosed_x = a._x;
       let enclosed_y = a._y;
       //console.log(a);
       //console.log("==========");
       //console.log(scatter.svg.selectAll("circle"));
       
       let circles = scatter.svg.selectAll("circle")._groups[0];

       console.log(scatter.svg);
       
       // anything less than or equal to _y AND
       // anything less than or equal to _x
       // we target for expansion view
       for (let i = 0; i < circles.length; i++) {
           let curr_cx = circles[i].attributes.cx.value;
           let curr_cy = circles[i].attributes.cy.value;

           if (curr_cx <= enclosed_x && curr_cy <= enclosed_y) {
               console.log("cx: "+curr_cx+"  cy: "+curr_cy + "  MagError: "+data[i].magError+"  Mag: "+data[i].mag);
               cdata.push(data[i]);
           } else {
               // DO NOT USE FOR NOW
               //scatter.svg.select(".circle"+i).remove();
           }
       }

       console.log(cdata.length);

       // clear main magError scene to "expand"
       // the d3 annotation subject section data points
       scatter.svg.remove();

       var d3obj = d3_svg_magError_setup("expandView", cdata, yaxfield, cxfield, cyfield, canvas_width, canvas_height, downsize, logscale, xa_numticks, xa_tickgap, yaxmultiplier, errmultiplier);
       d3_append_magError_return_annotation(d3obj.scatter, data, yaxfield, cxfield, cyfield, canvas_width, canvas_height, downsize, logscale, xa_numticks, xa_tickgap, yaxmultiplier, errmultiplier);

       d3_append_circles(d3obj.scatter.chart, d3obj.cx, d3obj.scatter.xscale, d3obj.yax, d3obj.scatter.yscale, d3obj.raderr_sized, d3obj.scatter.rscale, d3obj.scatter.color_map, cdata, d3_html_tooltip_detailed);
       d3_svg_append_legend(d3obj.scatter.svg, data, scatter.color_map);
       });

scatter.svg.append("g")
   .call(makeAnnotations);
}
