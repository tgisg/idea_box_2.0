function attachEditEvents(){
  $(".idea-title").on('focusout', editIdea)
  $(".idea-body").on('focusout', editIdea)
}


//need function to open edit box

//need function to actually edit in the database (this will be editIdeaTitle and editIdeaBody)


function editIdea(){
  var $ideaDiv = $(this).closest(".idea");
  var id = $ideaDiv.data("id");

  var idea = { idea: {
      title: $(this).closest(".idea").find(".idea-title").text(),
      body: $(this).closest(".idea").find(".idea-body").text()
    }
  }

  $.ajax({
    url: `/api/v1/ideas/${id}`,
    method: 'put',
    data: idea,
    type: 'json'
  })
}
