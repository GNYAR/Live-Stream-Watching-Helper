const row = $("#list").html();

const rows = list.get().map((x) => row.replaceAll("${id}", x));
$("#list").html(rows.join("<hr class='m-0'/>"));

getChennels(list.get())
  .then(async (xs) => {
    const data = xs.reduce((obj, x) => {
      const { broadcaster_id: id } = x;
      return { ...obj, [id]: { chennel: x } };
    }, {});
    const logins = xs.map((x) => x.broadcaster_login);
    await getUsers(logins).then((ys) => {
      ys.forEach((user) => {
        Object.assign(data[user.id], { user });
      });
    });
    return data;
  })
  .then((data) => {
    Object.entries(data).map(([id, { chennel, user }]) => {
      const { display_name, login, profile_image_url } = user;
      const { game_name } = chennel;
      const twitch = `https://www.twitch.tv/${login}`;

      $(`#${id}-profile`).attr("src", profile_image_url);
      $(`#${id}-name`).text(display_name).attr("href", twitch);
      $(`#${id}-game-name`).text(game_name ? game_name : "--");
      $(`#${id}-twitch`).attr("href", twitch);
      $(`#${id}-broadcaster`).attr("href", `broadcaster.html?login=${login}`);
    });

    $("button.placeholder").removeAttr("disabled");
    $(".placeholder").removeClass("placeholder");
  });

$("#broadcaster-login").change(function (e) {
  e.preventDefault();
  $("#search").attr("href", `broadcaster.html?login=${$(this).val()}`);
});

$(".remove").click(function (e) {
  e.preventDefault();
  const id = $(this).val();
  list.remove(id);
  $(`#${id}`).prev("hr").remove();
  $(`#${id}`).remove();
  $("#list > hr:first-child").remove();
});
