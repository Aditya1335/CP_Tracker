const API_URL = "https://competeapi.vercel.app/contests/upcoming/";

async function fetchContests() {
  try {
    const response = await fetch(API_URL);
    const contests = await response.json();

    const contestList = document.getElementById("contest-list");
    contestList.innerHTML = "";

    contests.forEach(contest => {
      const startTime = new Date(contest.startTime);
      const today = new Date();
      const timeDiff = startTime - today;
      const daysLeft = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      

      const contestDiv = document.createElement("div");
      contestDiv.className = "contest";

      contestDiv.innerHTML = `
        <a href="${contest.url}" target="_blank">${contest.title}</a>
        <div class="site">Platform: ${contest.site}</div>
        <div class="site">Date and Time: ${startTime}</div>
        <div class="days-left">${daysLeft} day(s) left</div>
      `;

      contestList.appendChild(contestDiv);
    });
  } catch (err) {
    console.error("Failed to fetch contests:", err);
    document.getElementById("contest-list").innerText = "Unable to load contests.";
  }
}

fetchContests();

