import { TitleAndSubline } from '../bodyTitle'
import { useEffect, useState } from 'react';
import { useContext } from "react";
import AuthContext from '../../../../context/authContext';
import company from '../../../images/icons/company.png'
import completed from '../../../images/icons/completed.png'
import failed from '../../../images/icons/failed.png'
import upcoming from '../../../images/icons/upcoming.png'
import edit from '../../../images/icons/edit.png'
import deleteApplication from '../../../images/icons/delete.png'
import { ModalInputText, ModalButtons, ModalHeading } from '../modal';
function Application() {
    const { token } = useContext(AuthContext);

    const [modal, setModal] = useState(false);
    const [selectedStageId, setSelectedStageId] = useState("");
    const [newStatus, setNewStatus] = useState("");
    const [applications, setApplications] = useState([]);
    const [selectedApplication, setSelectedApplication] = useState(null);
    const [formErrMessage, setFormErrMessage] = useState("");
    const [errMessage, setErrMessage] = useState("");

    /* useffect is used,because if we directly write fetch code,it ll extract data from backend then performs
     setApplication and updates applicationstate.When this happens ,the components using application state
     will re-render,then again automatically it fetches and again re-renders.It ll lead to infinite re-rendering and fetching
     */
    useEffect(() => {
        async function fetchApplication() {

            const response = await fetch('http://localhost:3000/api/applications', {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }

            })
            const data = await response.json();
            if (!response.ok) {
                setErrMessage(data.message);
                return;
            }
            setApplications(data);

            setSelectedApplication(data[data.length - 1]);
        }
        fetchApplication();
    }, [token])


    function activeApplication(applicationId) {
        const f = applications.filter((application) => (
            application._id == applicationId
        ))
        if (f.length > 0) {
            setSelectedApplication(f[0]);

        }


    }
    function ApplicationCard({ applicationId, company, role, stage, date }) {

        return (
            <div className="application-card" >
                <div className="company-and-role">
                    <div className="application-role">{role}</div>
                    <div className="application-companyName">{company}</div>
                </div>
                <div className="application-stage" >{stage}</div>
                <div className="application-date">
                    <div className="application-date-sideHeading">Last Updated</div>
                    <div className="application-date-data">{date}</div>
                </div>
                <button className="application-more" onClick={() => { activeApplication(applicationId) }} >...</button>
            </div>
        )
    }

    function PipelineStage({ stage }) {
       
        return (
            <>
                {stage.map(s => (
                    <div className="pipeline-stage" >
                        <img src={s.status == "completed" ? completed : s.status == "upcoming" ? upcoming : failed} alt="" className="indication-circle" />
                        {/* <span className="indication-circle">{s.status == "completed" ? '🟢' : s.status == "upcoming" ? '🟡' : '🔴'}</span> */}
                        {/* <div className="stage-detail"> */}
                        <div className="stage-name" >
                            {s.name}
                        </div>
                        {/* </div> */}
                    </div>
                ))}
            </>)
    }

    function dateConversion(timestamp) {

        const extractedDate = new Date(timestamp).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });

        return extractedDate;
    }

    async function editApplication(id) {


        const response = await fetch(`http://localhost:3000/api/applications/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(selectedApplication)
        })
        const data = await response.json();
        if (!response.ok) {
            setFormErrMessage(data.message);
            return;
        }
        setModal(false);
        setSelectedApplication(data);
        setApplications(prev => prev.map(application =>
            data._id === application._id ? data : application))
    }

    const selectedStage = selectedApplication?.stage.find(s => (
        s._id === selectedStageId
    ))

    async function deleteApplicationFunction(id) {
        const alertNotification = confirm("Do you really want to delete this Application?");
        if (!alertNotification) {
            return;
        }
        const response = await fetch(`http://localhost:3000/api/applications/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            }
        })

        if (response.ok) {
            setApplications(prev =>
                prev.filter((application) => application._id !== id)
            )
            setSelectedApplication(applications[applications.length - 1]);
        }
        else {
            alert("Failed to delete application.");
        }
    }

    return (
        <>
            <div className="application-section">
                <TitleAndSubline title="Applications" subline="Track and manage all your job applications in one place" />
                <div className="application-cards-section">

                    <div className="application-cards-data">
                        {applications.toReversed().map((application) => (
                            <ApplicationCard key={application._id} applicationId={application._id} company={application.company} role={application.role} stage={application.stage[application.stage.length - 1].name} date={dateConversion(application.updatedAt)} />
                        ))}
                    </div>
                    <div className="application-pipeline">

                        <img src={company} alt="" className="application-company-icon" />
                        <div className="pipeline-dataSection">
                            <div className="pipeline-companyTitle">
                                {selectedApplication ? `${selectedApplication.company}-${selectedApplication.role}` : ""}
                            </div>
                            <div className="pipeline-subHeading-section">
                                <div className="pipeline-title">Application Pipeline</div>
                                <div className="edit-and-delete">
                                    <button className="applicationEdit" onClick={() => {
                                        setModal(true)
                                    }}><img src={edit} alt="" className='editIcon' /></button>
                                    <button className="applicationDelete" onClick={() => {
                                        deleteApplicationFunction(selectedApplication._id)
                                    }
                                    }><img src={deleteApplication} alt="" className='deleteIcon' /></button>
                                </div>
                            </div>
                            <div className="pipeline-section">
                                <PipelineStage stage={selectedApplication ? selectedApplication.stage : []} />
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            {
                modal && (
                    <div className="overlay">
                        <div className="modal">
                            <ModalHeading title="Extracted Details" subline="Review the information extracted from your email.You can edit any field if needed,then confirm to save it." />
                            <div className="modal-body">
                                <ModalInputText subheading="Company" required={true} value={selectedApplication.company} onChange={(e) => {
                                    setSelectedApplication(
                                        Prev => {
                                            return {
                                                ...Prev,
                                                company: e.target.value
                                            }
                                        }
                                    )
                                    setFormErrMessage("");

                                }} />
                                <ModalInputText subheading="Job Role" required={true} value={selectedApplication.role} onChange={(e) => {
                                    setSelectedApplication(
                                        Prev => {
                                            return {
                                                ...Prev,
                                                role: e.target.value
                                            }
                                        }
                                    )
                                    setFormErrMessage("");

                                }} />
                                <div className="modal-form-subsection">
                                    <h4 className="modal-form-subheading">Recruitment Stage <span className="required-star" >*</span></h4>
                                    <select name="" id="" className='modal-form-input select-stage' onChange={(e) => setSelectedStageId(e.target.value)


                                    }>
                                        {selectedApplication.stage.toReversed().map(s => (
                                            <option value={s._id} key={s._id}>{s.name}</option>

                                        )
                                        )

                                        }
                                    </select>

                                </div>

                                <div className="modal-form-subsection">
                                    <h4 className="modal-form-subheading">Recruitment Status <span className="required-star" >*</span></h4>
                                    <select name="" id="" className='modal-form-input select-stage' value={selectedStage?.status || ""} onChange={(e) => {
                                        setSelectedApplication(prev => ({
                                            ...prev,
                                            stage: prev.stage.map((s) =>
                                                s._id == selectedStageId ?
                                                    {
                                                        ...s,
                                                        status: e.target.value
                                                    } : s

                                            )
                                        })
                                        )
                                    }}>
                                        <option value="upcoming">Upcoming</option>
                                        <option value="completed">Completed</option>
                                        <option value="failed">Failed</option>
                                    </select>

                                </div>

                                <ModalInputText subheading="Job Type" required={false} value={selectedApplication.jobtype} onChange={(e) => {
                                    setSelectedApplication(
                                        Prev => {
                                            return {
                                                ...Prev,
                                                jobtype: e.target.value
                                            }
                                        }
                                        
                                    )
                                    setFormErrMessage("");

                                }} />
                                <ModalInputText subheading="Location(if available)" required={false} value={selectedApplication.location} onChange={(e) => {
                                    setSelectedApplication(
                                        Prev => {
                                            return {
                                                ...Prev,
                                                location: e.target.value
                                            }
                                        }
                                    )
                                    setFormErrMessage("");

                                }} />


                            </div>
                            {formErrMessage && <div className="pasteEmail-error"><span className="error-icon">!</span> {formErrMessage}</div>}

                            <div className="modal-buttons">

                                <ModalButtons buttonText="Cancel" buttonClass="modal-cancel modal-button" buttonFunction={() => {
                                    setModal(false)
                                }} />
                                <ModalButtons buttonText="Update" buttonClass="modal-confirm modal-button" buttonFunction={() => {
                                    editApplication(selectedApplication._id)
                                }} />
                            </div>

                        </div>
                    </div>
                )
            }
        </>
    )
}

export { Application }