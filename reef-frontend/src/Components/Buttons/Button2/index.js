const Button2 = ({ children, className, ...props }) => {
    return (<>
        <button
            class={`block w-48 truncate text-md px-4 py-2 rounded text-white m-2 font-bold hover:text-white mt-4 hover:bg-red-800 bg-primary lg:mt-0 ${className}`} {...props}>{children}</button>
    </>);
}
export default Button2