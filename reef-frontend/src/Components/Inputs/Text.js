const Text = ({ title, value, onChange, ...props }) => {
    return (<div class="w-full  px-3 mb-6 md:mb-0">
        <label class="block uppercase tracking-wide text-white text-xs font-bold mb-2" for="grid-first-name">
            {title}
        </label>
        <input
            class="text-input w-full text-left" id="grid-first-name" type="text"
            placeholder={"Enter " + title}
            value={value}
            onChange={onChange}
            {...props}
        />
    </div>)
}
export default Text;