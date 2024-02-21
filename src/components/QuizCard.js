import { useEffect, useState } from "react";
import { Fade } from "react-reveal";
import { useSearchParams } from "react-router-dom";
import { Animate, AnimateGroup } from "react-simple-animate";
import Shake from "react-reveal/Shake";
import RubberBand from "react-reveal/RubberBand";
import "./QuizCard.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const quizAnimationProps = {
	start: {
		opacity: 0,
		transform: "translateX(-100px)",
	},
	end: {
		opacity: 1,
		transform: "translateX(0px)",
	},
};
export function QuizCard({ quizData, onCorrectOption }) {
	var options = [];
	if (quizData !== undefined) {
		options = quizData["options"];
	}
	const [params] = useSearchParams();
	const optionClasses = options.map((value, index, options) =>
		value.correct ? "correct" : "wrong"
	);
	const optionTriggers = options.map((value, index, options) => {
		return false;
	});
	const spiesList = options.map((value, index) => 0);
	const [spies, setSpies] = useState(spiesList);
	const [answerTriggers, setAnswerTriggers] = useState(optionTriggers);

	function optionClick(index) {
		const selectedLanguage =
			params.get("language") == "en-ES" ? "en-ES" : "en";
		if (!answerTriggers[index]) {
			if (options[index].correct) {
				//TODO: Later
				// const audioFile = require(`../assets/audio/generic/${selectedLanguage}/correct.wav`);
				// const correctSound = new Audio(audioFile);
				// correctSound.play().catch((error) => console.log(error));
				toast.success("Correct!");
			} else {
				//TODO: Later
				// const audioFile = require(`../assets/audio/generic/${selectedLanguage}/wrong.wav`);
				// const wrongSound = new Audio(audioFile);
				// wrongSound.play().catch((error) => console.log(error));
				toast.error("No, that's not the right one. Try again!");
			}
			var newAnswerTriggers = [...answerTriggers];
			newAnswerTriggers[index] = true;
			setAnswerTriggers(newAnswerTriggers);
			var newSpies = [...spies];
			newSpies[index] = newSpies[index] + 1;
			setSpies(newSpies);
		}
	}
	useEffect(() => {
		//TODO: Later
		// const selectedLanguage =
		// 	params.get("language") == "en-ES" ? "en-ES" : "en";
		// const audioFile = require(`../assets/audio/generic/${selectedLanguage}/quiz_question.wav`);
		// const questionAudio = new Audio(audioFile);
		// setTimeout(() => {
		// 	questionAudio.play().catch((error) => console.log(error));
		// }, 1500);
	}, []);
	useEffect(() => {
		// answerTriggers.forEach((value, index) => {
		// 	if (value) {
		// 		setTimeout(() => {
		// 			var newAnswerTriggers = [
		// 				...answerTriggers.map(() => false),
		// 			];
		// 			setAnswerTriggers(newAnswerTriggers);
		// 		}, 1000);
		// 	}
		// });

		options.forEach((option, index) => {
			if (option.correct && answerTriggers[index]) {
				setTimeout(() => {
					onCorrectOption();
				}, 3000);
			}
		});
	}, [answerTriggers]);
	return (
		<Fade bottom>
			<div className="quiz-card">
				<AnimateGroup play>
					<Animate
						delay={2}
						sequenceIndex={0}
						{...quizAnimationProps}>
						<div className="question">
							{params.get("language") == "en-ES"
								? "¿Cuál crees que es la enfermedad?"
								: "What do you think the illness is?"}
						</div>
					</Animate>
					<div className="options-box">
						{options.map((value, index, options) => {
							return (
								<Animate
									key={index}
									sequenceId={index + 1}
									{...quizAnimationProps}>
									{!value.correct ? (
										<Shake spy={spies[index]}>
											<div
												className={`option ${
													answerTriggers[index]
														? optionClasses[index]
														: ""
												}`}
												onClick={() => {
													optionClick(index);
												}}>
												{params.get("language") ==
												"en-ES"
													? value["en-ES"]
													: value["en"]}
											</div>
										</Shake>
									) : (
										<RubberBand spy={spies[index]}>
											<div
												className={`option ${
													answerTriggers[index]
														? optionClasses[index]
														: ""
												}`}
												onClick={() => {
													optionClick(index);
												}}>
												{params.get("language") ==
												"en-ES"
													? value["en-ES"]
													: value["en"]}
											</div>
										</RubberBand>
									)}
								</Animate>
							);
						})}
					</div>
				</AnimateGroup>
				<ToastContainer
					position="bottom-center"
					autoClose={3500}
					hideProgressBar
					newestOnTop={false}
					closeOnClick
					rtl={false}
					pauseOnFocusLoss
					draggable
					pauseOnHover={false}
				/>
			</div>
		</Fade>
	);
}
