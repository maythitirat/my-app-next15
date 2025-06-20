export function formatDate(dateStr: string) {
  if (!dateStr) return "-";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("en-GB", { year: "numeric", month: "short" });
}

export function getYearDiff(start: string, end: string) {
  const startYear = new Date(start).getFullYear();
  const endYear = new Date(end).getFullYear();
  if (isNaN(startYear) || isNaN(endYear)) return "-";
  return endYear - startYear;
}
