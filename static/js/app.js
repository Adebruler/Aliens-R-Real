// from data.js
var tableData = data;

// Categories for inputs
var inputCats = ['date', 'city', 'state', 'country', 'shape'];
var cat;
var numCats = inputCats.length;
var catsLists=[];
for (cat = 0; cat < inputCats.length; cat++){
  catsLists.push([]);
};
var currKey;
var currValue;

// Search through sightings for filter data
tableData.forEach(function(sighting) {
  for (cat = 0; cat < numCats; cat++){
    if (cat == 0){
      currKey = 'datetime';
    }
    else{
      currKey = inputCats[cat];
    };
    currValue = sighting[currKey];
    // add unique values to choices for filters
    if (!catsLists[cat].includes(currValue)) {
      catsLists[cat].push(currValue);
    };
  };
});

// Enter found data into dropdowns
var currList;
var option;
for (cat=0; cat < numCats; cat++){
  currList = catsLists[cat];
  // Sort all data but dates for easier searching
  if (cat > 0 ){
    currList.sort();
  };
  // Enter into each dropdown
  currForm = d3.select(`#sel-${inputCats[cat]}`);
  currList.forEach(currValue => {
    option = currForm.append("option");
    option.text(currValue);
  });
};

// Select the submit button
var submit = d3.select("#filter-btn");

// Complete the click handler for the form
submit.on("click", function() {

  // Prevent the page from refreshing
  d3.event.preventDefault();

  // Create a list of the specified inputs
  var inputs=[];
  for (cat = 0; cat < inputCats.length; cat++){
    inputs.push(d3.select(`#sel-${inputCats[cat]}`).property("value"));
  };

  // Filter the data by the specified inputs
  var currInput;
  var sightings = tableData;
  for (cat = 0; cat < numCats; cat++){
    if (cat == 0){
      currKey = 'datetime';
    }
    else{
      currKey = inputCats[cat];
    };
    currInput = inputs[cat];
    // If an input is given, filter inline by that input
    if (currInput != "(all)"){
      sightings = sightings.filter(sighting => sighting[currKey]=== currInput);
    };
  };

  // select table
  var tbody = d3.select("tbody");

  // Use a JQuery statement to clear table
  $("#mod-table").empty();

  // Append each filtered sighting into the table without refreshing page or filters
  sightings.forEach(function(sighting) {
    var row = tbody.append("tr");
    Object.entries(sighting).forEach(function([key, value]) {
      var cell = row.append("td");
      cell.text(value);
    });
  });
  // Inform user if selection is empty with meme relevant to 2010
  if (sightings.length == 0){
    var img = document.getElementById('myImg');
    var modalImg = document.getElementById("img01");
        modal.style.display = "block";
        modalImg.src = img.src;
  };
});

// Code for modal lifted from <https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_modal_img>
// Get the modal
var modal = document.getElementById('myModal');

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}
