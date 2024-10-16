import PerfilUsuario from "./PerfilUsuario";
import SearchBox from "./SearchBox";

export default function Header(){
  return(
    <header>
      <div className="container-header">
        <h2>Workspace</h2>
        <SearchBox />
        <PerfilUsuario nomeUsuario={"Kauã Yanase"} fotoUsuario={'./public/kaua-yuuki.jpeg'}/>
      </div>
    </header>
  );
}