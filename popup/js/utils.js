const OAUTH = "https://id.twitch.tv/oauth2";

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
    $.post(`${OAUTH}/token`, body, (x) => {
      const { access_token, expires_in } = x;
      const now = new Date();
      const expires = new Date(now.getTime() + expires_in * 1000);

      Cookies.set("token", access_token, { expires });
      resolve(true);
    }).fail(({ responseText }) => {
      const msg = `${responseText} (utils.js/updateToken)`;
      reject(new Error(msg));
    });
  });
};

const getAuthHref = () => {
  const params = [
    `client_id=${CLIENT.ID}`,
    `redirect_uri=${location.href}`,
    "response_type=token",
  ];

  return `${OAUTH}/authorize?${params.join("&")}`;
};
