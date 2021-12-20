import "./style.css";
const TextInput = ({ className, ...props }) => {
	return (
		<>
			<input className={`text-input text-center ${className}`} {...props}></input>
		</>
	);
};
export default TextInput;
