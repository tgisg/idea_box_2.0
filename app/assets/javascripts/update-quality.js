function attachQualityEvents(){
  $(".upgrade-quality").on("click", upgradeQuality)
  $(".downgrade-quality").on("click", downgradeQuality)

}

function updateQuality(quality, id){
  $.ajax({
    url: `/api/v1/ideas/${id}`,
    method: 'put',
    data: {idea : {quality: quality} }
  })
}

function upgradeQuality(){
  var $ideaDiv = $(this).closest(".idea");
  var id = $ideaDiv.data("id");
  var quality =
  $(this).next().next().text()
  if (quality === "swill") { quality = "plausible" }
  if (quality === "plausible") { quality = "genius" }
  updateQuality(quality, id)
}

function downgradeQuality(){
  var $ideaDiv = $(this).closest(".idea");
  var id = $ideaDiv.data("id");
  var quality =
  $(this).next().text()
  if (quality === "plausible") { quality = "swill" }
  if (quality === "genius") { quality = "plausible" }
  updateQuality(quality, id)
}
//need to add the id to be accessible by the closest for edit idea title
