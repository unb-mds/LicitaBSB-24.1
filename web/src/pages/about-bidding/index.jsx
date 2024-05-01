import React from "react";
import Header from "../../components/header";
import CardAbout from "../../components/card-about";

import style from './style.module.css'

export default function AboutBidding() {
    return(
        <div className={style.aboutBidding}>
            {/* <div><Header/></div> */}
            <CardAbout/>
        </div>
    )

}