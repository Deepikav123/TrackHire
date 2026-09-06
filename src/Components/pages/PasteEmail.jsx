import { TitleAndSubline, SubHeading } from "./bodyTitle";
import '../../email.css'
import { Link } from 'react-router-dom'
function EmailButton({ to, buttonText, buttonClass }) {
    return (
        <Link to={to} className={buttonClass}>{buttonText}</Link>
    )
}
function PasteEmail() {
    return (
        <div className="paste-email-section">
            <TitleAndSubline title="Add Application" subline="Import a job update from your mail" />
            <div className="email-content">
                <SubHeading subheading="Email Content" />
                <textarea className="email-importBox" placeholder='Paste your job-related email here..' rows={15}  ></textarea>
            </div>
            <div className="secure-message">🔒 Your email content is used only to extract application details.</div>
            <div className="email-buttons">
                <EmailButton to='/trackHire/dashboard' buttonText="Cancel" buttonClass="email-cancel-button email-button" />
                <EmailButton to='dashboard' buttonText="Analyze Email" buttonClass="email-analyze-button email-button" />
            </div>
        </div>
    )
}
export default PasteEmail;