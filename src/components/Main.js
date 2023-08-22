import { teams } from "../constants/teams";
import { matches } from "../constants/matches";
import TotalInfo from "./TotalInfo";
import StatsInfo from "./StatsInfo.js";
import TeamStatsInfo from "./TeamStatsInfo";
import { useEffect, useState } from "react";

function Main() {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    const stats = getStats();

    setStats(stats);
  }, []);

  const profit = getTotal(stats, "profit");
  const cost = getTotal(stats, "cost");
  const income = getTotal(stats, "income");

  const onSort = (field) => {
    setStats(sortMatches(stats, field));
  };

  return (
    <div>
      <TotalInfo profit={profit} cost={cost} income={income} />
      <div sx={{ m: 4 }}></div>
      <StatsInfo stats={stats} onSort={onSort} />
      <TeamStatsInfo stats={stats} />
    </div>
  );
}

const getStats = () => {
  const result = [];
  const multiplier = 2;

  teams.forEach((team) => {
    let bet = 1;
    let cost = 0;
    let income = 0;
    let history = [];

    const teamMatches = [
      ...matches.filter(
        (match) => match.homeTeam === team.name || match.awayTeam === team.name
      ),
    ];

    teamMatches.reverse();

    teamMatches.forEach((match) => {
      cost += bet;
      let teamHistory = { cost, match, bet };
      if (match.homeTeam === team.name && match.score.home < match.score.away) {
        income += match.odds.away * bet;
        bet = 1;
      } else if (
        match.awayTeam === team.name &&
        match.score.away < match.score.home
      ) {
        income += match.odds.home * bet;
        bet = 1;
      } else {
        bet *= multiplier;
      }
      teamHistory = { ...teamHistory, income, profit: income - cost };

      history.push(teamHistory);
    });

    const profit = Number((Number(income) - Number(cost)).toFixed(2));

    result.push({
      diff: (income / cost).toFixed(2),
      profit,
      team: team.name,
      position: team.position,
      income: Number(income.toFixed(2)),
      cost: Number(cost.toFixed(2)),
      history,
    });
  });

  return result;
};

const sortMatches = (matches, field) => {
  const ascendent = field === "position";

  return [
    ...matches.sort(({ [field]: a }, { [field]: b }) =>
      ascendent ? a - b : b - a
    ),
  ];
};

const getTotal = (matches, field) => {
  return matches
    .map((r) => r[field])
    .reduce((a, b) => a + b, 0)
    .toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
};

export default Main;
