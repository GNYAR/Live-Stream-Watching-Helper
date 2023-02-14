const CLIENT = {
  ID: "",
  SECRET: "",
};

const updateToken = () => {
  const body = {
    client_id: CLIENT.ID,
    client_secret: CLIENT.SECRET,
    grant_type: "client_credentials",
  };

  return new Promise((resolve, reject) => {
    $.post("https://id.twitch.tv/oauth2/token", body, (x) => {
      const { access_token, expires_in } = x;
      const now = new Date();
      const expires = new Date(now.getTime() + expires_in * 1000);

      Cookies.set("token", `Bearer ${access_token}`, { expires });
      resolve(true);
    }).fail(({ responseText }) => {
      const msg = `${responseText} (utils.js/updateToken)`;
      reject(new Error(msg));
    });
  });
};

updateToken().then(console.log).catch(console.error);
