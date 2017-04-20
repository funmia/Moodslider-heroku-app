// **********************************************************
//  Handle file
// **********************************************************

// wait for new file
$('#selectfile').on('change', handleFile);


// holder for programmes
var programmesArray;


// insert programmes from the file into holder
function handleFile(e) {
  var file = e.target.files[0];

  // read file content as text
  var reader = new FileReader();
  reader.readAsText(file);

  // when finished reading, parse text to xml and then json object
  reader.onload = function(data) {
    var xmlParser = new DOMParser();
    var doc = xmlParser.parseFromString(data.target.result, 'application/xml');
    var jsonString = xml2json(doc).replace('undefined', '');
    programmesArray = JSON.parse(jsonString).programmeList.programme;
  }
}




// **********************************************************
//  Handle slider change
// **********************************************************

// wait for slider change
$(".slider").on("change", handleSliderChange);


function handleSliderChange(e) {
  if (programmesArray === undefined) {
    return; // exit function early if programmes not uploaded
  }

  // convert string to a number
  var moodNumber = parseInt(e.target.value);

  // find mood value based on html data-* attributes
  var moodSliderValue;

  if (moodNumber < 50) {
    moodSliderValue = e.target.dataset.left;
  } else {
    moodSliderValue = e.target.dataset.right;
  }

  // find matching programmes
  var matchingProgrammesArray = programmesArray.filter(function(programme) {
    return programme.mood === moodSliderValue;
  });


  // if matching programme found
  if (matchingProgrammesArray.length > 0) {

    // loop through image placeholders and add image and name
    $('.programme-image').each(function(index) {

      // only add image/name if there is sufficient number of programmes
      if (matchingProgrammesArray[index]) {

        // add image
        $(this).attr('src', matchingProgrammesArray[index].image)

        // add name to the name placeholder with an index equal to the index above
        $(`.programme-name:eq(${index})`).text(matchingProgrammesArray[index].name);
      }
    });
  } else {

  }

}
