import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

function TotalInfo({ profit, cost, income }) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Profit</TableCell>
          <TableCell>Income</TableCell>
          <TableCell>Cost</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>{profit}</TableCell>
          <TableCell>{income}</TableCell>
          <TableCell>{cost}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

export default TotalInfo;
