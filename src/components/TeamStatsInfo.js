import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  MenuItem,
  Select,
} from "@mui/material";
import { useEffect, useState } from "react";
import { teams } from "../constants/teams";
import { styledCell } from "../helpers";

function TeamStatsInfo({ stats }) {
  const [selectedTeam, setSelectedTeam] = useState("Arsenal");
  const [teamStats, setTeamStats] = useState({});

  useEffect(() => {
    setTeamStats(stats.find((s) => s.team === selectedTeam));
  }, [selectedTeam, stats]);

  const handleChange = (e) => {
    setSelectedTeam(e.target.value);
  };

  return (
    <div>
      <Select
        sx={{ m: 4 }}
        value={selectedTeam}
        label="Team"
        onChange={handleChange}
      >
        {teams.map((team, index) => (
          <MenuItem key={index} value={team.name}>
            {team.name}
          </MenuItem>
        ))}
      </Select>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>{"nr"}</TableCell>
            <TableCell>{"home team"}</TableCell>
            <TableCell>{"away team"}</TableCell>
            <TableCell>{"scor"}</TableCell>
            <TableCell>{"cote"}</TableCell>
            <TableCell>{"bet"}</TableCell>
            <TableCell>{"profit"}</TableCell>
            <TableCell>{"income"}</TableCell>
            <TableCell>{"cost"}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {teamStats?.history?.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{row.match.homeTeam}</TableCell>
              <TableCell>{row.match.awayTeam}</TableCell>
              <TableCell>
                {row.match.score.home + " - " + row.match.score.away}
              </TableCell>
              <TableCell>
                {row.match.odds.home.toFixed(2) +
                  " - " +
                  row.match.odds.away.toFixed(2)}
              </TableCell>
              <TableCell>{row.bet}</TableCell>
              <TableCell>{styledCell(row.profit)}</TableCell>
              <TableCell>{styledCell(row.income)}</TableCell>
              <TableCell>{styledCell(row.cost)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default TeamStatsInfo;
