import { TitleAndSubline } from '../bodyTitle'
import { useEffect, useState } from 'react';


function ApplicationCard({ company, role, stage,status, date }) {
    return (
        <div className="application-card">
            <div className="application-companyName">{company}</div>
            <div className="application-role">{role}</div>
            <div className="application-stage">{stage}</div>
            <div className="application-status">{status}</div>
            <div className="application-date">{date}</div>
        </div>
    )
}
function Application() {
    const [applications, setApplications] = useState([]);
console.log(applications);
useEffect(()=>{
    async function fetchApplication() {
        
        const response = await fetch('http://localhost:3000/api/applications', {
                    method: "GET"
                })
                const data = await response.json();
                setApplications(data);
    }
    fetchApplication();
},[])

    

    return (
        <div className="application-section">
            <TitleAndSubline title="Applications" subline="Track and manage all your job applications in one place" />
            <div className="application-cards-section">
                <div className="application-cards-title">
                    <ApplicationCard company="Company" role="Role" stage="Stage" status="Status" date="Application-Date" />
                </div>
                <div className="application-cards-data">
                    {applications.map((application) => (
                        <ApplicationCard key={application._id} company={application.company} role={application.role} stage={application.stage[0]?.name} status={application.stage[0]?.status} date={application.applicationDate} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export { Application }