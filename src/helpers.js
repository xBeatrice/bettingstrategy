export const styledCell = (value) => {
  const formattedValue = Number(Number(value || 0).toFixed(2)).toLocaleString(
    "en-US",
    {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }
  );

  if (value < 1 && value !== 0) {
    return <div style={{ color: "red" }}>{formattedValue}</div>;
  }

  return <div>{formattedValue}</div>;
};
