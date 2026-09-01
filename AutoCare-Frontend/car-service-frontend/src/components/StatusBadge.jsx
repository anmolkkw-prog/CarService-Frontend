export default function StatusBadge({ status }) {
  const normalized = String(status || "Pending").toLowerCase().replaceAll(" ", "-");
  return <span className={`status status-${normalized}`}>{status || "Pending"}</span>;
}
