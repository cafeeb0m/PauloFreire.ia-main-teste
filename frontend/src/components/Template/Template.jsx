import Header from '../Header/Header';
import Main from '../Main-Specific-Disciplines/Main-Specific-Disciplines';
import SideMenu from '../SideMenu/SideMenu';

export default function Template() {
    return (
        <div className="container-especific-disciplines">
            <SideMenu />
            <div className="container-header-e-main">
                <Header />
                <Main />
            </div>
        </div>
    );
}
