import { TitleAndSubline } from '../bodyTitle'
import { useEffect, useState } from 'react';
import { useContext } from "react";
import AuthContext from '../../../../context/authContext';

function Application() {
    const { token } = useContext(AuthContext);

    const [applications, setApplications] = useState([]);
    const [selectedApplication, setSelectedApplication] = useState(null);
    console.log(applications);

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
                <div className="application-stage">{stage}</div>
                <div className="application-date">
                    <div className="application-date-sideHeading">Applied On</div>
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
                        <span className="indication-circle">{s.status == "completed" ? '🟢' : s.status == "upcoming" ? '🟡' : '🔴'}</span>
                        {/* <div className="stage-detail"> */}
                        <div className="stage-name" >
                            {s.name}
                        </div>
                        {/* </div> */}
                    </div>
                ))}
            </>)
    }

    return (
        <div className="application-section">
            <TitleAndSubline title="Applications" subline="Track and manage all your job applications in one place" />
            <div className="application-cards-section">

                <div className="application-cards-data">
                    {applications.toReversed().map((application) => (
                        <ApplicationCard key={application._id} applicationId={application._id} company={application.company} role={application.role} stage={application.stage[application.stage.length - 1]?.name} date={application.applicationDate} />
                    ))}
                </div>
                <div className="application-pipeline">
                    <div className="pipeline-companyTitle">
                        {selectedApplication ? `${selectedApplication.company}-${selectedApplication.role}` : ""}
                        {/* Google-SWE Intern */}
                    </div>
                    <div className="pipeline-title">Application Pipeline</div>
                    <div className="pipeline-section">
                        <PipelineStage stage={selectedApplication ? selectedApplication.stage : []} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export { Application }