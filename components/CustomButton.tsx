import React from "react";
import { getStaticProps } from "../pages/blog";
import globalStyles from '../styles/CustomButton.styles.js'
import { BiLeftArrowAlt } from 'react-icons/bi';
import { motion } from "framer-motion";

interface ButtomProps{
    text: string;
    onClick: Function;
    icon: ButtonIcon;
    description: string;
};
export enum ButtonIcon{
    arrowBack = 1,
}

const geticon = (iconName: ButtonIcon) =>{
    switch (iconName) {
        case 1:
            return(<BiLeftArrowAlt className="button-icon"/>)
        default:
            return(<div></div>)
    }
}

const CustomButton: React.FC<ButtomProps> = (props: ButtomProps)=>{
    return(
        <>
            <style jsx global>
                {globalStyles}
            </style>
            <motion.button 
                aria-label={props.description}
                name={props.description}
                className="button-div" 
                onClick={() => {props.onClick()}}
                whileHover={{scale: 1.1}}
                whileTap={{scale: 0.9}}
            >
                {geticon(props.icon)}
                <h1 className="button-text">{props.text}</h1>
            </motion.button>
        </>
    )
}

export default CustomButton;