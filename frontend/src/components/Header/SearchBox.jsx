import { IoMdSearch } from "react-icons/io";

export default function SearchBox(){
  return(
    <div className="container-search-box">
      <div className="icon-search-box">
        <IoMdSearch size={20}/>
      </div>
      <input type="text" placeholder="Pesquise..."/>
    </div>
  );
}