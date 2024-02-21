import { ProgressBar, Step } from "react-step-progress-bar";
import "./StepProgressBar.css";
export function StepProgressBar({ progressRatio, titleList, progress }) {
	return (
		<ProgressBar
			hasStepZero={true}
			percent={
				progress * progressRatio < 100 ? progress * progressRatio : 100
			}
			height={15}
			filledBackground="linear-gradient(to right,  #2D99AA, #104B6D)">
			{titleList.map((val, index) => {
				return (
					<StationStep
						key={index}
						currentProgress={progress}
						name={val}
						totalSteps={titleList.length}
					/>
				);
			})}
		</ProgressBar>
	);
}
function StationStep({ totalSteps, name, currentProgress, ...props }) {
	return (
		<Step
			{...props}
			transition="scale"
			children={({ accomplished, index }) => {
				return (
					<StepContent
						accomplished={accomplished}
						stepNumber={index + 1}
						currentProgress={currentProgress}
						title={name}
						totalSteps={totalSteps}
					/>
				);
			}}></Step>
	);
}
function StepContent({
	totalSteps,
	accomplished,
	currentProgress,
	stepNumber,
	title,
}) {
	return (
		<div className="step-container">
			<div
				className="step"
				style={{
					backgroundColor: accomplished ? "#104B6D" : "white",
				}}>
				<p
					className="step-text"
					style={{
						color: accomplished ? "white" : "#104B6D",
					}}>
					{stepNumber}
				</p>
			</div>
			{totalSteps <= 5 ? (
				<p className="step-title">{title}</p>
			) : (
				currentProgress == stepNumber - 1 && (
					<p className="step-title">{title}</p>
				)
			)}
		</div>
	);
}
