import { TitleAndSubline, SubHeading } from "./bodyTitle";

function ModalInputText({ subheading, value, onChange }) {
    return (<div className="modal-form-subsection">
        <h4 className="modal-form-subheading">{subheading}</h4>
        <input type="text" className="modal-form-input" value={value} onChange={onChange} />
    </div>)
}

function ModalHeading({ title, subline }) {
    return (
        <div className="modal-heading">
            <TitleAndSubline title={title} subline={subline} />
        </div>
    )
}

function ModalButtons({buttonText,buttonClass,buttonFunction}) {
    return(<div className="modal-buttons">
        <button className={buttonClass} onClick={buttonFunction}>{buttonText}</button>
    </div>)
}

export { ModalInputText, ModalHeading,ModalButtons };