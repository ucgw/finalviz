async function read_chart_data() {
  const data = await d3.csv("https://ucgw.github.io/data/mag6plus_charts.csv");
  console.log(data);
}

async function read_record_data() {
  const data = await d3.csv("https://ucgw.github.io/data/mag6plus_records.csv");
  console.log(data);
}
