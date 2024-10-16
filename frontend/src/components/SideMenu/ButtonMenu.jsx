export default function ButtonMenu({icon, title}){
  return (
    <button>
      <div className="icon-button-menu">
        {icon}
      </div>
      <p>{title}</p>
    </button>
  );
}