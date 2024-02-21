import { BackgroundComponent } from "../../components/BackgroundComponent";
import "react-step-progress-bar/styles.css";
import "./station-main.css";
import hospital from "../../assets/images/hospital-2.jpg";
import { Fade } from "react-reveal";
import { Outlet, useNavigate, useSearchParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { StepProgressBar } from "../../components/StepProgressBar";
import { PatientContext } from "../../App";
import doctor from "../../assets/images/doctor_standing.png";
import kevin from "../../assets/images/characters/Kevin.png";
import cam from "../../assets/images/characters/Cam.png";
import miguel from "../../assets/images/characters/Miguel.png";
import casey from "../../assets/images/characters/Casey.png";
import anna from "../../assets/images/characters/Anna.png";
import justin from "../../assets/images/characters/Justin.png";
import { Animate } from "react-simple-animate";
import { Quiz } from "../Quiz";

export const patientMap = {
	Kevin: kevin,
	Cam: cam,
	Miguel: miguel,
	Casey: casey,
	Anna: anna,
	Justin: justin,
};
const characterAnimationProps = {
	start: {
		opacity: 0,
		transform: " scale(0.4) ",
	},
	end: {
		opacity: 1,
		transform: " scale(1)",
	},
};

export function StationMain() {
	const [params, setParams] = useSearchParams();
	const patientData = useContext(PatientContext);
	const [currentStationIndex, setCurrentStationIndex] = useState(0);
	const navigate = useNavigate();

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
		} else {
			navigate(
				{
					pathname: `/stations/${patientData["symptoms"][currentStationIndex]}`,
					search: "?" + params.toString(),
				},
				{ replace: true }
			);
		}
	}, [currentStationIndex]);
	if (!patientData["success"]) {
		return <div>Redirecting...</div>;
	}
	return (
		<BackgroundComponent
			backgroundImage={hospital}
			content={
				<div className="station-container">
					<Fade right>
						<div className="progress-bar-card">
							<div
								style={{
									width: "80%",
								}}>
								<StepProgressBar
									titleList={
										params.get("language") == "en-ES"
											? patientData["symptoms-en-ES"]
											: patientData["symptoms-en"]
									}
									progressRatio={
										100 /
										(patientData["symptoms_count"] - 1)
									}
									progress={currentStationIndex}
								/>
							</div>
						</div>
					</Fade>
					<div
						style={{
							content: ".",
							contentVisibility: "hidden",
							height: "120px",
						}}></div>

					<div
						style={{
							height: "85%",
						}}>
						<div className="bones-station-container">
							<Fade bottom>
								<img
									className="doctor-img"
									alt="Doctor"
									src={doctor}></img>
							</Fade>

							<div className="bones-station-content">
								<div className="bones-station-card">
									<div
										style={{
											display: "flex",
											flexDirection: "row",
											height: "100%",
										}}>
										<Outlet
											context={{
												index: currentStationIndex,
											}}
										/>
										<Animate
											play
											delay={1.5}
											{...characterAnimationProps}>
											<img
												className="bones-character-container"
												alt={patientData["name"]}
												src={
													patientMap[
														patientData["name"]
													]
												}
											/>
											<div className="patient-name">
												{patientData["name"]}
											</div>
										</Animate>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div
						style={{
							position: "absolute",
							zIndex: "4",
							bottom: "20px",
							right: "20px",
							display: "flex",
							flexFlow: "row",
						}}>
						{currentStationIndex >= 1 && (
							<div
								onClick={() => {
									setCurrentStationIndex(
										currentStationIndex - 1
									);
								}}
								className="nav-button">
								Prev
							</div>
						)}

						<div
							onClick={() => {
								if (
									currentStationIndex <
									patientData.symptoms_count - 1
								) {
									setCurrentStationIndex(
										currentStationIndex + 1
									);
								} else {
									navigate({
										pathname: "/quiz",
										search: "?" + params.toString(),
									});
								}
							}}
							className="nav-button">
							Next
						</div>
					</div>
				</div>
			}
		/>
	);
}

const apiData = {
	_id: { $oid: "624588e588761360b9821e18" },
	name: "Collette",
	diagnosis: {
		bones: false,
		temperature: 98.6,
		heart: 130,
		skin: "Normal",
		urine: "plain yellow",
		eye_sight: "normal",
		throat: "normal",
		snot: "white",
		vomit: false,
		reflex: "normal",
		food: ["whole milk", "gelatin", "chicken noodle soup"],
		lung: "fast and wheezing",
	},
};

// function Content() {
// 	const [progress, setProgress] = useState(0);
// 	return (

// 	);
// }
