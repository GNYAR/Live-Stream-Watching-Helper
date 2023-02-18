const params = new URLSearchParams(location.search);

const showAlert = (msg) => {
  $(".placeholder-glow").removeClass("placeholder-glow");
  $("#alert").text(msg).removeAttr("hidden");
};

getUser(params.get("login"))
  .then((x) => {
    if (x === null) {
      showAlert("查無此人");
      return;
    }

    const { id, display_name, login, profile_image_url } = x;
    $("#profile").attr("src", profile_image_url);
    $("#name").text(display_name);
    $("#login").text(login);

    $(".placeholder").removeClass("placeholder");
    $("button").val(id).removeAttr("disabled");
  })
  .catch(() => showAlert("發生錯誤"));

$("#add").click(function (e) {
  e.preventDefault();
  list.push($(this).val());
});

$("#remove").click(function (e) {
  e.preventDefault();
  list.remove($(this).val());
});
