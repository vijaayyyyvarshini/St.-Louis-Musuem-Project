import { useEffect, useState } from "react";

const useImage = (fileName) => {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [image, setImage] = useState(null);

	useEffect(() => {
		const fetchImage = async () => {
			try {
				const response = await import(`../assets/images/${fileName}`); // change relative path to suit your needs
				setImage(response.default);
			} catch (err) {
				console.log("From Useimage hook: " + err);
				setError(true);
			} finally {
				setLoading(false);
			}
		};

		fetchImage();
	}, [fileName]);

	return {
		loading,
		error,
		image,
	};
};

export default useImage;
