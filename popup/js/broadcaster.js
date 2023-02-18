const params = new URLSearchParams(location.search);

getUser(params.get("login")).then(
  ({ id, display_name, login, profile_image_url }) => {
    $("#profile").attr("src", profile_image_url);
    $("#name").text(display_name);
    $("#login").text(login);

    $(".placeholder").removeClass("placeholder");
    $("button").val(id).removeAttr("disabled");
  }
);

$("#add").click(function (e) {
  e.preventDefault();
  list.push($(this).val());
});

$("#remove").click(function (e) {
  e.preventDefault();
  list.remove($(this).val());
});
