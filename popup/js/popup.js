$("#broadcaster-login").change(function (e) {
  e.preventDefault();
  $("#search").attr("href", `broadcaster.html?login=${$(this).val()}`);
});
