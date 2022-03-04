import React from 'react';
import { FaTemperatureHigh } from "react-icons/fa";
import { FaRegLightbulb } from "react-icons/fa";
import { VscGraphLine } from "react-icons/vsc";
import { WiHumidity } from "react-icons/wi";
import { GoAlert } from "react-icons/go";
import { GiSmart } from "react-icons/gi";
import { useKeycloak } from "@react-keycloak/web";

const Welcome = () => {
    const { keycloak, initialized } = useKeycloak();
    const isLoggedIn = keycloak.authenticated;

    return (
        <div className="App">
            <div>
                <h3 className='companyName'>Signum<span className='company-color'>tte</span></h3>
            </div>
            <h1 className='centeredHeader'>Smart IoT Twin</h1>
            <div className='description'>
                <h2 className='header-content'>Control your buildings</h2>
                <p className='header-info'>Customers can use the heat, humidity and light sensors in their buildings to save energy and money.</p>
            </div>

            <div className='container'>
                <div className='rowBoxes'>
                    <div className='boxes'>
                        <FaTemperatureHigh className='icons' />
                        <p className='boxes-content'>Measure Heat</p>
                    </div>
                    <div className='boxes'>
                        <FaRegLightbulb className='icons' />
                        <p className='boxes-content'>Measure Light</p>
                    </div>
                </div>
                <div className='rowBoxes'>
                    <div className='boxes'>
                        <WiHumidity className='icons' />
                        <p className='boxes-content'>Measure Humidity</p>
                    </div>
                    <div className='boxes'>
                        <VscGraphLine className='icons' />
                        <p className='boxes-content'>Data Visualization</p>
                    </div>
                </div>
                <div className='rowBoxes'>
                    <div className='boxes'>
                        <GiSmart className='icons' />
                        <p className='boxes-content'>Provide Smart Solution</p>
                    </div>
                    <div className='boxes'>
                        <GoAlert className='icons' />
                        <p className='boxes-content'>Create Alerts</p>
                    </div>
                </div>
            </div>
            <div>
                <div className='footer'>
                    <div className='footer-left'>
                        <h3 className='companyName'>SIGNUM<span className='company-color'>TTE</span></h3>
                        <p className='footer-text'>
                            SIGNUMTTE, Bilişim sektöründe farklılık yaratacak yazılımlar üreten bağımsız bir Ar-Ge şirketi olarak,  WinDesk Platform v4.0 ile müşterilerine değer ve fark yaratan sektörel çözümler tasarlamaktadır.
                        </p>
                    </div>
                    <div>
                        <h3 className='footer-text-center'>Contact Details</h3>
                        <div className='contactView'>
                            <div className='contactDetail divider'>
                                <h4>Ankara</h4>
                                <span>Üniversiteler Mahallesi 1596 Cadde 5. AR-Ge Binası No: 8B Kat: 3 / 12 Beytepe 06800 Çankaya / Ankara</span>
                                <h4>0312 491 28 13</h4>
                            </div>
                            <div className='contactDetail'>
                                <h4>İstanbul</h4>
                                <span>Bağlarbaşı Mahallesi Atatürk Caddesi Sakarya Sokak Malte Plaza No 35 K 1/101 Maltepe TR34844 İstanbul</span>
                                <h4>0216 706 17 47</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Welcome;