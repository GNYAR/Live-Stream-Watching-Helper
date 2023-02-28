const ws = new WebSocket("wss://eventsub-beta.wss.twitch.tv/ws");
ws.onopen = () => console.log("open connection");
ws.onclose = () => console.log("close connection");
ws.onmessage = (resp) => {
  const data = JSON.parse(resp.data);
  console.log(data);
  if (data?.metadata.message_type === "session_welcome") {
    const session_id = data.payload.session.id;

    createEventsubSubscription(
      "stream.online",
      "1",
      {
        broadcaster_user_id: "66548548",
      },
      session_id
    ).then(console.log);

    console.log(session_id);
  }
};
