export default function DisciplineCard({disciplina, assunto, color}){
  return(
    <div className="container-discipline-card"> 
      <h2>{disciplina}</h2>
      <p>{assunto}</p>
      {color}
    </div>
  );
}