function FormInputText({ subheading, type, placeholder }) {
    return (
        <div className="form-subsection">
            <h4 className="form-subheading">{subheading}</h4>
            <input type={type} className="form-input" placeholder={placeholder} />
        </div>
    )
}

function FormInputSelect({ subheading, optionArray }) {
    return (
        <div className="form-subsection">
            <h4 className="form-subheading">{subheading}</h4>
            <select className="form-input" >
                {
                    optionArray.map((opt) => (
                        <option value={opt}>{opt}</option>

                    ))
                }
            </select>
        </div>
    )
}
function FormInputTextarea({ subheading, placeholder }) {
    return (
        <div className="form-subsection">
            <h4 className="form-subheading">{subheading}</h4>
            <textarea  className="form-input" placeholder={placeholder} role="5"/>
        </div>
    )
}
export { FormInputText, FormInputSelect ,FormInputTextarea}