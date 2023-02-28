const API_HELIX = "https://api.twitch.tv/helix";

const setHeaders = (xhr) => {
  xhr.setRequestHeader("Client-Id", CLIENT.ID);
  xhr.setRequestHeader("Authorization", `Bearer ${Cookies.get("token")}`);
  xhr.setRequestHeader("Content-Type", "application/json");
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

function createEventsubSubscription(type, version, condition, session_id) {
  const data = {
    type,
    version,
    condition,
    transport: {
      method: "websocket",
      session_id: session_id,
    },
  };

  return new Promise((resolve, reject) => {
    const query = () =>
      $.ajax({
        url: `${API_HELIX}/eventsub/subscriptions`,
        type: "POST",
        beforeSend: setHeaders,
        data: JSON.stringify(data),
        success: (x) => resolve(x),
      });

    const errorParams = {
      reject,
      funcName: "createEventsubSubscription",
      callback: query,
    };
    query().fail(errorHandler(errorParams));
  });
}

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
