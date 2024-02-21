import { BackgroundComponent } from "../components/BackgroundComponent";
import "./Quiz.css";
import hospital from "../assets/images/quiz-background.jpg";
import { useContext, useEffect, useState } from "react";
import { PatientContext } from "../App";
import { useNavigate, useSearchParams } from "react-router-dom";
import { QuizCard } from "../components/QuizCard";
import { Fade } from "react-reveal";
import kevin from "../assets/images/characters/Kevin.png";
import cam from "../assets/images/characters/Cam.png";
import miguel from "../assets/images/characters/Miguel.png";
import casey from "../assets/images/characters/Casey.png";
import anna from "../assets/images/characters/Anna.png";
import justin from "../assets/images/characters/Justin.png";
import { patientMap } from "./stations/station-main.js";
export function Quiz() {
	const patientData = useContext(PatientContext);
	const [params] = useSearchParams();
	const navigate = useNavigate();
	const quizData = patientData["mcq"];
	const infoData = patientData["info"];
	const [showInfo, setShowInfo] = useState(false);
	useEffect(() => {
		if (!patientData["success"]) {
			navigate(
				{
					pathname: "/character-select",
					search: "?" + params.toString(),
				},
				{
					replace: true,
				}
			);
		}
	}, []);

	if (!patientData["success"]) {
		return <div>Redirecting...</div>;
	}
	return (
		<BackgroundComponent
			backgroundImage={hospital}
			content={
				<div className="quiz-container">
					{!showInfo ? (
						<QuizCard
							quizData={quizData}
							onCorrectOption={() => {
								setShowInfo(true);
							}}
						/>
					) : (
						<InfoCard infoData={infoData} />
					)}
					{showInfo && (
						<div
							style={{
								position: "absolute",
								zIndex: "4",
								bottom: "20px",
								right: "20px",
								display: "flex",
								flexFlow: "row",
							}}>
							<div
								className="quiz-nav-button"
								onClick={() => {
									navigate({
										pathname: `/`,
									});
								}}>
								Finish
							</div>
						</div>
					)}
				</div>
			}
		/>
	);
}

function InfoCard({ infoData }) {
	const patientData = useContext(PatientContext);
	const [params] = useSearchParams();
	useEffect(() => {
		//TODO: Later
		// const selectedLanguage =
		// 	params.get("language") == "en-ES" ? "en-ES" : "en";
		// const title = require(`../assets/audio/${patientData["name"]}/${selectedLanguage}/title.wav`);
		// const diagnosis = require(`../assets/audio/${patientData["name"]}/${selectedLanguage}/diagnosis.wav`);
		// const titleAudio = new Audio(title);
		// const diagnosisAudio = new Audio(diagnosis);
		// setTimeout(() => {
		// 	titleAudio.play().catch((error) => console.log(error));
		// 	titleAudio.addEventListener("ended", () => {
		// 		diagnosisAudio.play().catch((error) => console.log(error));
		// 	});
		// }, 1000);
		// return () => {
		// 	try {
		// 		titleAudio.pause();
		// 		diagnosisAudio.pause();
		// 	} catch (err) {
		// 		console.log(err);
		// 	}
		// };
	}, []);
	return (
		<Fade bottom>
			<div className="info-card">
				<div className="info-title">
					{params.get("language") == "en-ES"
						? infoData["title"]["en-ES"]
						: infoData["title"]["en"]}
				</div>
				<div className="info-disease-container">
					<img
						className="quiz-character-container"
						src={patientMap[patientData["name"]]}
						alt={patientData["name"]}
					/>
					<p className="info-content">
						{params.get("language") == "en-ES"
							? infoData["content"]["en-ES"]
							: infoData["content"]["en"]}
					</p>
				</div>
				<div className="info-title">
					{params.get("language") == "en-ES"
						? "Tratamiento"
						: "Treatment"}
				</div>
				<p className="info-content">
					{params.get("language") == "en-ES"
						? infoData["treatment"]["en-ES"]
						: infoData["treatment"]["en"]}
				</p>
			</div>
		</Fade>
	);
}
