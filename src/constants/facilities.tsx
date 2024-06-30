import React from "react";
import { FaShower, FaSnowflake, FaTv, FaWifi } from "react-icons/fa";
import { LuRefrigerator } from "react-icons/lu";
import { MdBathtub } from "react-icons/md";
import { PiForkKnifeFill, PiTowel } from "react-icons/pi";

export const facilities: { [key: string]: { text: string; icon: React.ReactNode } } = {
	wifi: {
		text: "Wi-Fi",
		icon: <FaWifi />,
	},
	tv: {
		text: "TV",
		icon: <FaTv />,
	},
	ducha: {
		text: "Ducha",
		icon: <FaShower />,
	},
	arCondicionado: {
		text: "Ar Condicionado",
		icon: <FaSnowflake />,
	},
	frigobar: {
		text: "Frigobar",
		icon: <LuRefrigerator />,
	},
	toalhas: {
		text: "Toalhas",
		icon: <PiTowel />,
	},
	cozinha: {
		text: "Cozinha",
		icon: <PiForkKnifeFill />,
	},
	banheira: {
		text: "Banheira",
		icon: <MdBathtub />,
	},
};
