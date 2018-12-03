// from data.js
var tableData = data;

// Select the submit button
var submit = d3.select("#filter-btn");

// Complete the click handler for the form
submit.on("click", function() {

  // Prevent the page from refreshing
  d3.event.preventDefault();

  // Select the input element and get the raw HTML node
  var input = d3.select("#datetime");

  // Get the value property of the input element
  var inputText = input.property("value");

  // Use the form input to filter the data by blood type
  function dateFilter(data){
    return data.datetime == inputText;
  };

  var sightings = tableData.filter(dateFilter)

  // select table
  var tbody = d3.select("tbody");

  // $("#ufo-table tbody").empty();
  // tbody.empty();

  sightings.forEach(function(sighting) {
    var row = tbody.append("tr");
    Object.entries(sighting).forEach(function([key, value]) {
      var cell = tbody.append("td");
      cell.text(value);
    });
  });
});
