import { TitleAndSubline, SubHeading } from "./bodyTitle";
import '../../email.css'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from "react";
import { useContext } from "react";
import AuthContext from "../../../context/authContext";
import { ModalInputText, ModalHeading, ModalButtons } from "./modal";

// function ModalInputText({ subheading, value, onChange }) {
//     return (<div className="modal-form-subsection">
//         <h4 className="modal-form-subheading">{subheading}</h4>
//         <input type="text" className="modal-form-input" value={value} onChange={onChange} />
//     </div>)
// }


function PasteEmail() {
    const { token } = useContext(AuthContext);

    const navigate = useNavigate();
    const [email, setEmail] = useState({
        sender: "",
        body: ""
    });

    const [modal, setModal] = useState(false);

    const [extractedData, setExtractedData] = useState(
        {
            company: "",
            role: "",
            stage: {
                name: "",
                status: ""
            },
            applicationDate: "",
            jobtype: "",
            location: ""
        }
    )

    function capitalizeFirstLetter(word) {
        if (!word) {
            return "";
        }
        return word.charAt(0).toUpperCase() + word.slice(1);
    }

    async function analyzeEmail(e) {
        e.preventDefault();
        const response = await fetch('http://localhost:3000/api/email/analyze', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                "sender": email.sender,
                "emailText": email.body
            })
        });
        const data = await response.json();
        setModal(true);
        console.log(data);
        setExtractedData({
            company: capitalizeFirstLetter(data.company),
            role: capitalizeFirstLetter(data.role),
            applicationDate: data.date,
            location: "",
            jobtype: data.jobtype,
            stage: {
                name: data.stage,
                status: data.stage == "Shortlisted" || data.stage == "Selected" ? "completed" : data.stage == "Rejected" ? "failed" : "upcoming"
            }
        })

    }

    async function PassMailData(e) {
        e.preventDefault();

        const response = await fetch('http://localhost:3000/api/applications',
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(extractedData)

            }
        )
        const data = await response.json();
        console.log(data);
        navigate('/trackhire/app/application');
    }
    function closeModal() {
        setModal(false);
    }

    return (
        <>
            <form className="paste-email-section" onSubmit={analyzeEmail} >
                <TitleAndSubline title="Add Application" subline="Import a job update from your mail" />
                <div className="email-content">
                    <SubHeading subheading="Email Content" />
                    <input type="text" className="sender-data" placeholder="Enter Sender address" onChange={((e) => {
                        setEmail(Prev => {
                            return {
                                ...Prev,
                                sender: e.target.value
                            }
                        })
                    })} />
                    <textarea className="email-importBox" placeholder='Paste your job-related email here..' rows={15} onChange={((e) => (
                        setEmail(Prev => {
                            return {
                                ...Prev,
                                body: e.target.value
                            }
                        }
                        )
                    ))}></textarea>
                </div>
                <div className="secure-message">🔒 Your email content is used only to extract application details.</div>
                <div className="email-buttons">
                    <Link to='/trackhire/app/dashboard' className="email-cancel-button email-button" >Cancel</Link>
                    <button className="email-analyze-button email-button" type="submit">Analyze Email</button>
                </div>

            </form>

            {
                modal && (
                    <div className="overlay">
                        <div className="modal">
                            <ModalHeading title="Extracted Details" subline="Review the information extracted from your email.You can edit any field if needed,then confirm to save it." />
                            <div className="modal-body">
                                <ModalInputText subheading="Company" value={extractedData.company} onChange={(e) => {
                                    setExtractedData(
                                        Prev => {
                                            return {
                                                ...Prev,
                                                company: e.target.value
                                            }
                                        }
                                    )
                                }} />
                                <ModalInputText subheading="Job Role" value={extractedData.role} onChange={(e) => {
                                    setExtractedData(
                                        Prev => {
                                            return {
                                                ...Prev,
                                                role: e.target.value
                                            }
                                        }
                                    )
                                }} />

                                <ModalInputText subheading="Recruitment Stage" value={extractedData.stage.name} onChange={(e) => {
                                    setExtractedData(
                                        Prev => {
                                            return {
                                                ...Prev,
                                                stage: {

                                                    name: e.target.value,
                                                    status: "upcoming"
                                                }
                                            }
                                        }
                                    )
                                }} />

                                <ModalInputText subheading="Application Date" value={extractedData.applicationDate} onChange={(e) => {
                                    setExtractedData(
                                        Prev => {
                                            return {
                                                ...Prev,
                                                applicationDate: e.target.value
                                            }
                                        }
                                    )
                                }} />

                                <ModalInputText subheading="Job Type" value={extractedData.jobtype} onChange={(e) => {
                                    setExtractedData(
                                        Prev => {
                                            return {
                                                ...Prev,
                                                jobtype: e.target.value
                                            }
                                        }
                                    )
                                }} />
                                <ModalInputText subheading="Location(if available)" value={extractedData.location} onChange={(e) => {
                                    setExtractedData(
                                        Prev => {
                                            return {
                                                ...Prev,
                                                location: e.target.value
                                            }
                                        }
                                    )
                                }} />


                            </div>

                            <div className="modal-buttons">

                                <ModalButtons buttonText="Cancel" buttonClass="modal-cancel modal-button" buttonFunction={() => (
                                    closeModal()
                                )} />
                                <ModalButtons buttonText="Confirm" buttonClass="modal-confirm modal-button" buttonFunction={PassMailData} />
                            </div>

                        </div>
                    </div>
                )
            }

        </>
    )
}
export default PasteEmail;