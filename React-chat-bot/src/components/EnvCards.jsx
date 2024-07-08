export default function EnvCards({ envInfo, envName }) {
  return (
    <div className="env-card-body">
      <h2 style={{ marginTop: "10px" }}>{envName}</h2>
      <p style={{ marginTop: "30px" }}>{envInfo}</p>
    </div>
  );
}
