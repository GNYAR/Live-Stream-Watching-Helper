const API_HELIX = "https://api.twitch.tv/helix";

const setHeaders = (xhr) => {
  xhr.setRequestHeader("Client-Id", CLIENT.ID);
  xhr.setRequestHeader("Authorization", `Bearer ${Cookies.get("token")}`);
};

const errorHandler =
  (params, retry = false) =>
  ({ status, responseText }) => {
    const { reject, funcName, callback } = params;

    if (!retry && status === 401) {
      updateToken().then((_) => {
        callback().fail(errorHandler(params, true));
      });
      return;
    }

    const msg = `${responseText} (apis.js/${funcName})`;
    const err = new Error(msg);
    console.error(err);
    reject(err);
  };

function getChennels(ids) {
  return new Promise((resolve, reject) => {
    const key = "broadcaster_id";
    const query = () =>
      $.ajax({
        url: `${API_HELIX}/channels?${key}=${ids.join(`&${key}=`)}`,
        type: "GET",
        beforeSend: setHeaders,
        success: ({ data }) => resolve(data.length ? data : null),
      });

    const errorParams = { reject, funcName: "getChennels", callback: query };
    query().fail(errorHandler(errorParams));
  });
}

async function getUser(login) {
  const x = await getUsers([login]);
  return x === null ? null : x[0];
}

function getUsers(logins) {
  return new Promise((resolve, reject) => {
    const key = "login";
    const query = () =>
      $.ajax({
        url: `${API_HELIX}/users?${key}=${logins.join(`&${key}=`)}`,
        type: "GET",
        beforeSend: setHeaders,
        success: ({ data }) => resolve(data.length ? data : null),
      });

    const errorParams = { reject, funcName: "getUsers", callback: query };
    query().fail(errorHandler(errorParams));
  });
}
