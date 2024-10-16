export default function Disciplines({icon, discipline}) {
  return (
    <button>
      <div className="icon-discipline">
        {icon}
      </div>
      <p>{discipline}</p>
    </button>
  );
}