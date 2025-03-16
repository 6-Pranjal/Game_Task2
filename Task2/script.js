let locations = ["Cave", "Forest", "Lake", "Mountain", "Desert"];
let chances = 5;
let player = { name: "Explorer", gold: 0 };
const getRandomGold = () => Math.floor(Math.random() * 201) - 50;
const searchLocation = async (location) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let found = {
        name: location,
        gold: getRandomGold(),
        trap: Math.random() < 0.3,
      };
      resolve(found);
    }, 1000);
  });
};
const showPopup = (message) => {
  const popup = document.getElementById("popup");
  popup.innerHTML = message;
  popup.style.display = "block";
  setTimeout(() => (popup.style.display = "none"), 2000);
};
const explore = async (location) => {
  if (chances <= 0) return;
  const outputDiv = document.getElementById("output");
  outputDiv.style.opacity = "0";
  outputDiv.innerHTML = `🔍 Searching ${location}...`;
  const found = await searchLocation(location);
  chances--;
  document.getElementById("chances").textContent = chances;
  if (found.trap) {
    outputDiv.innerHTML = `⚠️ Oh no! A trap! You lost all your gold!`;
    player.gold = 0;
    showPopup("You fell into a trap! Gold reset to 0! ⚠️");
  } else {
    outputDiv.innerHTML = `💰 You found ${found.gold} gold!`;
    player.gold += found.gold;
    showPopup(`You found ${found.gold} gold! 💰`);
  }
  document.getElementById("total-gold").textContent = player.gold;
  outputDiv.style.opacity = "1";
  if (chances === 0) {
    declareWinner();
  }
};
const declareWinner = () => {
  const outputDiv = document.getElementById("output");
  outputDiv.innerHTML =
    player.gold > 0
      ? `🎉 Congratulations! You collected ${player.gold} gold!`
      : `😞 Game Over! You didn't collect any gold.`;
  showPopup(player.gold > 0 ? "🎉 You Win!" : "😞 Game Over!");
  document
    .querySelectorAll("#locations button")
    .forEach((button) => (button.disabled = true));
};
const resetGame = () => {
  chances = 5;
  player.gold = 0;
  document.getElementById("chances").textContent = chances;
  document.getElementById("total-gold").textContent = player.gold;
  document.getElementById("output").innerHTML = "";
  document
    .querySelectorAll("#locations button")
    .forEach((button) => (button.disabled = false));
};
document.getElementById("reset-button").addEventListener("click", resetGame);
const locationsDiv = document.getElementById("locations");
locations.forEach((name) => {
  const button = document.createElement("button");
  button.textContent = name;
  button.onclick = () => explore(name);
  locationsDiv.appendChild(button);
});
document.getElementById("options").innerHTML = `
    <h3>Possible Outcomes:</h3>
    <ul>
        <li>💰 Find gold (amount varies between -50 to 200)</li>
        <li>⚠️ Fall into a trap and lose all your gold</li>
        <li>❌ No gold found</li>
    </ul>
`;
