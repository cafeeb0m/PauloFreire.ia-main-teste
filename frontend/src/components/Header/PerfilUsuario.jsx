import { IoMdArrowDropdown } from "react-icons/io";
import { FaRegHeart } from "react-icons/fa6";

export default function PerfilUsuario({nomeUsuario, fotoUsuario}){
  return(
    <div className="container-perfil-usuario">
      <div className="icon-heart">
        <FaRegHeart size={20}/>
      </div>
      <div className="icon-arrow">
        <IoMdArrowDropdown size={20}/>
      </div>
      <span>{nomeUsuario}</span>
      <div className="img-usuario">
        <img src={fotoUsuario} alt="foto-usuario"/>
      </div>
    </div>
  );
}