async function read_chart_data() {
  return await d3.csv("https://ucgw.github.io/data/mag6plus_charts.csv");
}

async function read_record_data() {
  return await d3.csv("https://ucgw.github.io/data/mag6plus_records.csv");
}

function log_promise_data(promise_data) {
  promise_data
    .then(function(data) { console.log(data); });
}
