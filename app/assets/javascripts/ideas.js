$(document).ready(function(){
//this is so all the old ideas that are already in our list will appear on the page
  addIdeas();
});

function addIdeas(){
  $.getJSON("/api/v1/ideas").then(function(allIdeas){
    allIdeas.forEach(renderIdea)
  }).then(attachDeleteEvent).then(attachEditEvents).then(attachQualityEvents).fail(displayFailure);
}

function renderIdea(idea){
  // $("#ideas-list").append("<div class='idea'><p>" + idea.title + "</p>" + " " + "<p>" + idea.body + "</p></div>" ) BELOW IS STRING INTERPOlation
  $("#ideas-list").append(`<div class='idea' data-id='${idea.id}' id=idea-${idea.id}>
    <div class= 'idea-title' contenteditable= true><p>${idea.title.toUpperCase()}</p></div>
    <div class= 'idea-body' contenteditable=true><p>${idea.body}</p></div>
    <p>
      <button class='upgrade-quality'>+</button>
      <button class='downgrade-quality'>-</button>
    <span>${idea.quality}</span>
      <button class='delete-idea'>DELETE</button>
    </p>
  </div>`)
}

function attachQualityEvents(){
  $(".upgrade-quality").on("click", upgradeQuality)
  $(".downgrade-quality").on("click", downgradeQuality)

}

function upgradeQuality(){
  var $ideaDiv = $(this).closest(".idea");
  var id = $ideaDiv.data("id");
  var quality = $(this).next("span").text()

  if (quality === "swill") { quality = "plausible" }
  if (quality === "plausible") { quality = "genius" }

  updateQuality(quality, id)
}
function updateQuality(quality, id){
  $.ajax({
    url: `/api/v1/ideas/${id}`,
    method: 'put',
    data: {idea : {quality: quality} }
  })
}

function downgradeQuality(){
  var $ideaDiv = $(this).closest(".idea");
  var id = $ideaDiv.data("id");
}
//need to add the id to be accessible by the closest for edit idea title
