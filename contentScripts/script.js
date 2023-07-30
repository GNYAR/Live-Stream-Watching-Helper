const log = (msg) => {
  const now = new Date().toLocaleString();
  return console.log(`[TW-Helper][${now}] ${msg}`);
};
const title = (msg) => `${msg} [圖奇助手]`;

// BonusesClaimer
log("BonusesClaimer");
const bonusCounterId = "bonusCounter";
document.arrive("button .claimable-bonus__icon", function () {
  this.click();
  log("Claim Bonus");
  if (!$(`#${bonusCounterId}`)[0]) {
    const bonusCounter = document.createElement("div");
    bonusCounter.id = bonusCounterId;
    $(".community-points-summary").append(bonusCounter);
  }
  const element = $(`#${bonusCounterId}`);
  const i = Number(element.text().split(" ")[1] ?? 0) + 1;
  element.text(`✔ ${i}`);
  element.attr("title", title(`已領取 ${i} 次特殊額外獎勵`));
});

// EmoteBooster
log("EmoteBooster");
document.arrive(".emote-card h4", function () {
  const btn = document.createElement("button");
  const code = $(this).text();
  $(this).append(btn);
  $(btn)
    .attr("id", "copyBtn")
    .attr("title", title(code))
    .text("複製")
    .click(function (e) {
      e.preventDefault();
      navigator.clipboard
        .writeText(code)
        .then(() =>
          $(btn).text("✔ 已複製").attr("disabled", true).addClass("disabled")
        );
    });
});

// VideoHider
document.arrive(".user-avatar-card__live", function () {
  if ($("#videoBtn").length) return;

  log("VideoHider on");
  const EYE_HTML =
    '<svg width="20" height="20" fill="#FFF" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C17,19.5 21.27,16.39 23,12C21.27,7.61 17,4.5 12,4.5Z" /></svg>';
  const EYE_OFF_HTML =
    '<svg width="20" height="20" fill="#FFF" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M11.83,9L15,12.16C15,12.11 15,12.05 15,12A3,3 0 0,0 12,9C11.94,9 11.89,9 11.83,9M7.53,9.8L9.08,11.35C9.03,11.56 9,11.77 9,12A3,3 0 0,0 12,15C12.22,15 12.44,14.97 12.65,14.92L14.2,16.47C13.53,16.8 12.79,17 12,17A5,5 0 0,1 7,12C7,11.21 7.2,10.47 7.53,9.8M2,4.27L4.28,6.55L4.73,7C3.08,8.3 1.78,10 1,12C2.73,16.39 7,19.5 12,19.5C13.55,19.5 15.03,19.2 16.38,18.66L16.81,19.08L19.73,22L21,20.73L3.27,3M12,7A5,5 0 0,1 17,12C17,12.64 16.87,13.26 16.64,13.82L19.57,16.75C21.07,15.5 22.27,13.86 23,12C21.27,7.61 17,4.5 12,4.5C10.6,4.5 9.26,4.75 8,5.2L10.17,7.35C10.74,7.13 11.35,7 12,7Z" /></svg>';

  const text = document.createElement("span");
  $(text).attr("id", "hiddenTxt").text(title("已隱藏畫面")).hide();
  $(".video-ref").prepend(text);

  const btn = document.createElement("button");
  $(btn)
    .attr("id", "videoBtn")
    .attr("title", title("隱藏畫面"))
    .val(false)
    .html(EYE_HTML)
    .click(function (e) {
      e.preventDefault();

      const val = $(this).val() === "true";
      if (val) {
        log("Show Video");
        $(text).hide();
        $("video").show();
        $(this).attr("title", title("隱藏畫面")).val(false).html(EYE_HTML);
      } else {
        log("Hide Video");
        $(text).show();
        $("video").hide();
        $(this).attr("title", title("顯示畫面")).val(true).html(EYE_OFF_HTML);
      }
    });

  $(".player-controls__right-control-group").prepend(btn);
});

document.leave("#videoBtn", function () {
  log("VideoHider off");
  $("#hiddenTxt").remove();
  $("video").show();
});
