import React from 'react'
import { NavBar } from "../Navbar";
import { MainSection } from './MainSection/MainSection';
import { CardSection } from './CardSection/CardSection';
import { Footer } from "../Footer";

export const Faq = () => {
    return (
        <div>
            <NavBar />
            <MainSection />
            <CardSection />
            <Footer />
        </div>
    )
}
