import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import SortIcon from "@mui/icons-material/Sort";
import { styledCell } from "../helpers";

function StatsInfo({ stats, onSort }) {
  const sortableHeader = (name, label) => {
    return (
      <div>
        <SortIcon onClick={() => onSort(name.toLowerCase())} />
        {label || name}
      </div>
    );
  };

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell sx={{ width: "80px" }}>
            {sortableHeader("Position")}
          </TableCell>
          <TableCell sx={{ width: "500px" }}>
            <div>Team</div>
          </TableCell>
          <TableCell>{sortableHeader("Profit")}</TableCell>
          <TableCell>{sortableHeader("Diff", "X-Profit")}</TableCell>
          <TableCell>{sortableHeader("Income")}</TableCell>
          <TableCell>{sortableHeader("Cost")}</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {stats.map((row, index) => (
          <TableRow key={index}>
            <TableCell>{row.position}</TableCell>
            <TableCell>{row.team}</TableCell>
            <TableCell>{styledCell(row.profit)}</TableCell>
            <TableCell>{styledCell(row.diff)}</TableCell>
            <TableCell>{row.income}</TableCell>
            <TableCell>{row.cost}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default StatsInfo;
