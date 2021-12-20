const TextArea = ({ title, value, onChange, cols }) => {
    return (<div class="w-full  px-3 mb-6 md:mb-0">
        <label class="block uppercase tracking-wide text-white text-xs font-bold mb-2" for="grid-first-name">
            {title}
        </label>
        <textarea
            value={value}
            onChange={onChange}
            cols={cols}
            class="appearance-none block w-full bg-transparent border border-gray-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none " id="grid-first-name" type="text" placeholder="Name of your Collection" />
    </div>)
}
export default TextArea;