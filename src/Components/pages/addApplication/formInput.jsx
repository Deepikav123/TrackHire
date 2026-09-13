function FormInputText({ subheading, type, placeholder,onChange,value }) {
    return (
        <div className="form-subsection">
            <h4 className="form-subheading">{subheading}</h4>
            <input type={type} className="form-input" placeholder={placeholder} value={value} onChange={onChange} />
        </div>
    )
}

function FormInputSelect({ subheading, optionArray,onChange,value}) {
    return (
        <div className="form-subsection">
            <h4 className="form-subheading">{subheading}</h4>
            <select className="form-input" value={value} onChange={onChange}  >
                {
                    optionArray.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>

                    ))
                }
            </select>
        </div>
        
    )
}
function FormInputTextarea({ subheading, placeholder,onChange,value}) {
    return (
        <div className="form-subsection">
            <h4 className="form-subheading">{subheading}</h4>
            <textarea  className="form-input" placeholder={placeholder} rows="3" value={value} onChange={onChange} />
        </div>
    )
}
function FormInputButton({text,ButtonClassName}){
    return (
            <button  className={ButtonClassName}>{text}</button>
    )
}

function RecruitmentPipeline({stage,optionArray}){
    return(
        <div className="recruitment-form-detail">
            <div className="recruitment-stage">{stage}</div>
            <select className="recruitment-status">
                {optionArray.map((opt)=>(
                    <option value={opt}>{opt}</option>
                ))}
            </select>
            <input type="date" className="recruitment-date" />
            <button className="recruitment-stage-delete">
                Delete
            </button>
        </div>
    )
}

export { FormInputText, FormInputSelect ,FormInputTextarea,FormInputButton,RecruitmentPipeline}