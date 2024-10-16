import { IoIosArrowForward } from "react-icons/io";

export default function SubjectCard({title, description, url}) {
  return (
    <div className="conteinerCard">
      <h2>{title}</h2>
      <p>{description}</p>
      <div className="see-more">
        <IoIosArrowForward />
        <a href={url}>See chat</a> {/*não sei oq sera aq*/}
      </div>
    </div>
  )};