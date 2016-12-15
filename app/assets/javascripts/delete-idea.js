function attachDeleteEvent(){
  $(".delete-idea").on('click', deleteIdea)
}

function deleteIdea(){
  //we need to make the id accessible in our html with data-id
  var id = $(this).closest(".idea").data("id");
  //making a js object
  $.ajax({
    url: `/api/v1/ideas/${id}`,
    method: 'delete',
    type: 'json',
  }).then(removeIdea.bind(this))
}

function removeIdea(){
 $(this).closest(".idea").remove()
}
