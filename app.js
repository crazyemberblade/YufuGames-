const CHIPSET_TIERS = {
  "Snapdragon 4 Gen 2":1,"Snapdragon 4 Gen 3":1,"Snapdragon 6 Gen 1":2,"Snapdragon 6 Gen 3":2,
  "Snapdragon 7 Gen 1":3,"Snapdragon 7 Gen 3":4,"Snapdragon 7+ Gen 2":5,"Snapdragon 7+ Gen 3":5,
  "Snapdragon 8 Gen 2":7,"Snapdragon 8 Gen 3":8,"Snapdragon 8 Elite":9,"Snapdragon 8s Gen 3":7,
  "Dimensity 6100+":1,"Dimensity 6300":1,"Dimensity 7050":2,"Dimensity 7200":3,"Dimensity 7300":3,
  "Dimensity 7400":3,"Dimensity 8000":4,"Dimensity 8100":4,"Dimensity 8200":5,"Dimensity 8300":6,
  "Dimensity 9000":6,"Dimensity 9200":7,"Dimensity 9300":8,
  "Helio G85":1,"Helio G88":1,"Helio G91":1,"Helio G95":2,"Helio G99":2,
  "Exynos 1280":2,"Exynos 1330":1,"Exynos 1380":3,"Exynos 1480":4,"Exynos 1580":5,
  "Exynos 2100":5,"Exynos 2200":6,"Exynos 2400":8,
  "Google Tensor":4,"Tensor G2":4,"Tensor G3":5,"Tensor G4":6,
  "Unisoc T606":1,"Unisoc T610":1,"Unisoc T612":1,"Unisoc T616":1,"Unisoc T618":2,
  "Unisoc T620":2,"Unisoc T760":3,"Unisoc T820":4
};

const $ = id => document.getElementById(id);
const landingPage = $("landingPage");
const app = $("app");

function openApp() {
  landingPage.classList.add("hidden");
  app.classList.remove("hidden");
  window.scrollTo({top:0, behavior:"instant"});
}

$("enterBtn").addEventListener("click", openApp);
$("helpBtn").addEventListener("click", () => {
  alert("Need Help is a placeholder feature for this prototype.");
});

$("menuToggle").addEventListener("click", () => $("navLinks").classList.toggle("open"));
document.querySelectorAll(".nav-links a").forEach(a => a.addEventListener("click", () => $("navLinks").classList.remove("open")));
$("year").textContent = new Date().getFullYear();

GAME_DATABASE.forEach(game => {
  const option = document.createElement("option");
  option.value = game.name;
  $("gameSuggestions").appendChild(option);
});

function normalize(value) {
  return value.trim().toLowerCase();
}

function findGame(value) {
  const n = normalize(value);
  return GAME_DATABASE.find(game => normalize(game.name) === n);
}

function renderResult(data, verdict, reason, verdictClass) {
  $("resultEmpty").classList.add("hidden");
  const content = $("resultContent");
  content.classList.remove("hidden");

  content.innerHTML = `
    <div class="summary-grid">
      <div class="summary-item"><small>GAME</small><strong>${data.game.name}</strong></div>
      <div class="summary-item"><small>PHONE</small><strong>${data.phone}</strong></div>
      <div class="summary-item"><small>RAM</small><strong>${data.ram} GB</strong></div>
      <div class="summary-item"><small>STORAGE</small><strong>${data.storage === 1024 ? "1 TB" : data.storage + " GB"}</strong></div>
      <div class="summary-item span-full"><small>CHIPSET</small><strong>${data.chipset}</strong></div>
    </div>
    <div class="verdict ${verdictClass}">
      <small>RESULT</small>
      <h2>${verdict}</h2>
      <p><strong>Reason:</strong> ${reason}</p>
    </div>`;
}

$("checkBtn").addEventListener("click", () => {
  const game = findGame($("gameInput").value);
  const phone = $("phoneInput").value.trim();
  const ram = Number($("ramInput").value);
  const storage = Number($("storageInput").value);
  const chipset = $("chipsetInput").value;
  const tier = CHIPSET_TIERS[chipset];

  if (!game) {
    alert("Please choose a supported game from the current YufuGames prototype database.");
    return;
  }
  if (!phone || !ram || !storage || !chipset) {
    alert("Please complete all required game and phone details.");
    return;
  }

  const data = {game, phone, ram, storage, chipset};
  const belowMinimum = ram < game.minRam || tier < game.minTier || storage < game.storage;
  const belowRecommended = ram < game.recRam || tier < game.recTier;

  if (belowMinimum) {
    const weakParts = [];
    if (ram < game.minRam) weakParts.push("RAM");
    if (tier < game.minTier) weakParts.push("chipset/GPU capability");
    if (storage < game.storage) weakParts.push("storage capacity");

    renderResult(
      data,
      "NOT RECOMMENDED",
      `This phone is below the prototype's approximate minimum target for ${weakParts.join(", ")}. ${game.name} is a ${game.demand}-demand game, so the experience may be unstable or the game may not be suitable.`,
      "not-recommended"
    );
  } else if (belowRecommended) {
    const limits = [];
    if (ram < game.recRam) limits.push("RAM");
    if (tier < game.recTier) limits.push("chipset/GPU capability");

    renderResult(
      data,
      "SUPPORTED WITH LIMITATIONS",
      `The phone meets the approximate minimum target, but ${limits.join(" and ")} is below the recommended level. Lower graphics settings or reduced performance may be necessary. Actual results can vary by game updates and device optimization.`,
      "limitations"
    );
  } else {
    renderResult(
      data,
      "SUPPORTED",
      `The selected RAM, chipset capability and storage meet this prototype's approximate recommended target for ${game.name}. Actual performance can still vary because game versions, thermal behavior and manufacturer optimization differ.`,
      "supported"
    );
  }

  $("resultContent").scrollIntoView({behavior:"smooth", block:"nearest"});
});