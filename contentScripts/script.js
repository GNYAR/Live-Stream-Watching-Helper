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
