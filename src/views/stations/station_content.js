import "./station_content.css";
// import heartRate from "../../assets/images/heart_rate.jpg";
// import chest from "../../assets/images/chest.jpg";
// import breathing_difficulty from "../../assets/images/breathing_difficulty.jpg";
// import blurry_vision from "../../assets/images/blurry_vision.jpg";
// import hunger from "../../assets/images/hunger.jpg";
// import fatigue from "../../assets/images/fatigue.jpg";
// import fever from "../../assets/images/fever.jpg";
// import red_skin from "../../assets/images/red_skin.jpg";
// import dark_urine from "../../assets/images/dark_urine.jpg";
// import snot from "../../assets/images/snot.jpg";
// import pale_skin from "../../assets/images/pale_skin.jpg";
// import red_tonsils from "../../assets/images/red_tonsils.jpg";
// import watery_eyes from "../../assets/images/watery_eyes.jpg";
// import vomit from "../../assets/images/vomit.jpg";
// import brokenBones from "../../assets/images/broken_bones.jpg";
import { useOutletContext, useSearchParams } from "react-router-dom";
import ImgsViewer from "react-images-viewer";
import { useContext, useState } from "react";
import { Animate, AnimateGroup } from "react-simple-animate";
import { PatientContext } from "../../App";
import { useEffect } from "react";

// const imageMap = {
// 	"heart_rate.jpg": heartRate,
// 	"chest.jpg": chest,
// 	"breathing_difficulty.jpg": breathing_difficulty,
// 	"blurry_vision.jpg": blurry_vision,
// 	"hunger.jpg": hunger,
// 	"fatigue.jpg": fatigue,
// 	"fever.jpg": fever,
// 	"red_skin.jpg": red_skin,
// 	"vomit.jpg": vomit,
// 	"dark_urine.jpg": dark_urine,
// 	"snot.jpg": snot,
// 	"pale_skin.jpg": pale_skin,
// 	"red_tonsils.jpg": red_tonsils,
// 	"watery_eyes.jpg": watery_eyes,
// 	"bones_broken.jpg": brokenBones,
// };

const fromMeAnimationProps = {
	start: {
		opacity: 0,
		transform: " translateX(50px) scale(0.7) translateY(20px)",
	},
	end: {
		opacity: 1,
		transform: " translateX(0px) scale(1)  translateY(0px)",
	},
};
const fromThemAnimationProps = {
	start: {
		opacity: 0,
		transform: " translateX(-50px) scale(0.7) translateY(20px)",
	},
	end: {
		opacity: 1,
		transform: " translateX(0px) scale(1)  translateY(0px)",
	},
};

export function StationContent() {
	const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);
	const outletContext = useOutletContext();
	const [params] = useSearchParams();
	const patientData = useContext(PatientContext);
	const stationName = patientData["symptoms"][outletContext.index];
	const stationData = patientData["diagnosis"][stationName];
	const image = require(`../../assets/images/${stationData["image"]}`);
	const selectedLanguage = params.get("language") == "en-ES" ? "en-ES" : "en";
	//TODO: Later
	// const [audio, setAudio] = useState(
	// 	new Audio(
	// 		require(`../../assets/audio/${patientData["name"]}/${selectedLanguage}/${stationName}.wav`)
	// 	)
	// );
	// useEffect(() => {

	// try {
	// 	audio.play().catch((err) => console.log(err));
	// } catch (err) {
	// 	console.log(err);
	// }
	// return () => {
	// 	try {
	// 		audio.pause();
	// 		console.log("audio paused");
	// 	} catch (err) {
	// 		console.log(err);
	// 	}
	// };
	// }, []);
	return (
		<div className="imessage">
			<AnimateGroup play>
				<Animate delay={1} sequenceIndex={0} {...fromMeAnimationProps}>
					<div
						style={{
							display: "flex",
							flexFlow: "row",
						}}>
						<div
							onClick={() => {
								setIsImageViewerOpen(true);
							}}
							style={{
								flexGrow: 1,
								flexShrink: 0,
								content: ".",
								contentVisibility: "hidden",
							}}></div>

						<p className="from-me">
							<img
								onClick={() => {
									setIsImageViewerOpen(true);
								}}
								className="x-ray"
								alt={"bones"}
								// src={imageMap[stationData["image"]]}
								src={image}
							/>
							<ImgsViewer
								backdropCloseable={true}
								imgs={[{ src: image }]}
								isOpen={isImageViewerOpen}
								onClose={() => {
									setIsImageViewerOpen(false);
								}}
							/>
						</p>
					</div>
				</Animate>
				<Animate
					delay={1}
					sequenceIndex={1}
					{...fromThemAnimationProps}>
					<p className="from-them">
						{params.get("language") == "en-ES"
							? stationData["content"]["en-ES"]
							: stationData["content"]["en"]}
					</p>
				</Animate>
			</AnimateGroup>
		</div>
	);
}
