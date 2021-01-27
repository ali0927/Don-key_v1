import React from "react";
import "./Loader.scss"

export const Loader = () => {
    return <div className="preloader_main">
    <div className="preloader_main_inner">
        <div className="round_1"></div>
        <div className="round-rotate">
            <div className="round-group">
                <div className="round_2 round-common"></div>
                <div className="round_3 round-common"></div>
            </div>
            <div className="round-group">
                <div className="round_4 round-common"></div>
                <div className="round_5 round-common"></div>
            </div>
        </div>
    </div>
</div>
}