const filmSelect = $("#pickfilm")

filmSelect.change(function(event){
  console.log(event)
  const filmNum = filmSelect.val()
  console.log('you selected '+filmNum)
  $.getJSON( '/starwars/films/'+filmNum+'/json',
  function( data ) {
    console.log("the AJAX call returned")
    console.log(data)
    $("#info").html("")
    $("#info").html(
      `<h1> ${data.film.title}</h1>`+
      "<h1>"+data.film.title+"</h1>"+
      `released on ${data.film.release_date}`+
      `<hr> raw JSON data is below:<hr>`
    )
    $("#info").append(JSON.stringify(data))
  })
})
