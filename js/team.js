const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
  const team1 = form["team-1"].value;
  const team2 = form["team-2"].value;
  let team = {};

  if (team1 !== "" && team2 !== "") team = { team1, team2 };
  else team = { team1: "Equipo 1", team2: "Equipo 2" };

  localStorage.setItem("team", JSON.stringify(team));

  console.log(JSON.parse(localStorage.team));

  location.replace("/");
  e.preventDefault();
});
