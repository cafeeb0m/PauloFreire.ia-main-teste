import Disciplines from './disciplines';
import ButtonMenu from './ButtonMenu';
import Logo from './Logo';
import { FaBook } from 'react-icons/fa';
import { TbMath } from 'react-icons/tb';
import { GiAtom } from 'react-icons/gi';
import { PiDna } from 'react-icons/pi'; //biologia
import { SlChemistry } from 'react-icons/sl'; //quimica

import { FaRegCalendarAlt } from 'react-icons/fa';
import { FaRegUserCircle } from 'react-icons/fa';
import { RiRobot2Line } from 'react-icons/ri';
import { BsGlobeAmericas } from 'react-icons/bs';
import { GiSpartanHelmet } from 'react-icons/gi';

export default function SideMenu() {
    return (
        <aside>
            <div className="container-side-menu">
                <Logo />
                <ButtonMenu
                    icon={<FaRegCalendarAlt size={20} />}
                    title={'Agenda'}
                />
                <ButtonMenu
                    icon={<RiRobot2Line size={20} />}
                    title={'ChatBot'}
                />
                <div className="container-disciplines">
                    <Disciplines
                        icon={<FaBook size={20} />}
                        discipline={'Português'}
                    />
                    <Disciplines
                        icon={<TbMath size={20} />}
                        discipline={'Matemática'}
                    />
                    <Disciplines
                        icon={<GiSpartanHelmet size={20} />}
                        discipline={'História'}
                    />
                    <Disciplines
                        icon={<BsGlobeAmericas size={20} />}
                        discipline={'Geografia'}
                    />
                    <Disciplines
                        icon={<SlChemistry size={20} />}
                        discipline={'Química'}
                    />
                    <Disciplines
                        icon={<GiAtom size={20} />}
                        discipline={'Física'}
                    />
                    <Disciplines
                        icon={<PiDna size={20} />}
                        discipline={'Biologia'}
                    />
                </div>
            </div>
            <div className="perfil-usuario">
                <ButtonMenu
                    icon={<FaRegUserCircle size={20} />}
                    title={'Meu Perfil'}
                />
            </div>
        </aside>
    );
}
