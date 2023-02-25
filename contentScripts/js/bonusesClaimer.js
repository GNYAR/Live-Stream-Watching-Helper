console.log("bonusesClaimer");
const bonusCounterId = "bonusCounter";

document.arrive("button .claimable-bonus__icon", function () {
  this.click();
  console.log(`[${new Date()}] Claim Bonus`);
  if (!$(`#${bonusCounterId}`)[0]) {
    const bonusCounter = document.createElement("div");
    bonusCounter.id = bonusCounterId;
    $(".community-points-summary").append(bonusCounter);
  }
  const element = $(`#${bonusCounterId}`);
  const i = Number(element.text().split(" ")[1] ?? 0) + 1;
  element.text(`✔ ${i}`);
  element.attr("title", `已領取 ${i} 次特殊額外獎勵 (圖奇助手)`);
});
