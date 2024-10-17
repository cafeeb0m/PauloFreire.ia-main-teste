import DisciplineCard from "./DisciplineCard";

export default function Agenda(){
  return(
    <div className="container-agenda">
      <DisciplineCard disciplina={'Matemática'} assunto={'Pitágoras'} />
    </div>
  );
}