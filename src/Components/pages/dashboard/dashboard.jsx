import { TitleAndSubline, SubHeading } from "../bodyTitle";
import { SummaryCard, RecentApplicationCard } from "./dashboardCards";
import applicationIcon from '../../../images/icons/application.png'
import inProgressIcon from '../../../images/icons/inProgress.png'
import { useEffect, useState } from "react";
function Dashboard() {
    const [applications, setApplications] = useState([]);

    const [summary, setSummary] = useState(
        {
            total: 0,
            inProgress: 0,
            interview: 0,
            offer:0,
            rejection:0
        }
    )

    useEffect(() => {
        async function fetchApplication() {
            const response = await fetch('http://localhost:3000/api/applications')
            const data = await response.json();
            setApplications(data);
            console.log(data);
            // In-Progress
            const progressCount = data.filter(application => {
                const lastStage = application.stage[application.stage.length - 1];
                return lastStage && lastStage.status != 'failed'
            })
            // Interviews
            const interviewCount = data.filter((application) => {
                const lastStage = application.stage[application.stage.length - 1];
                return lastStage && lastStage.name.includes("interview") && lastStage.status == 'upcoming'
            })
            
            // Selected
            const offerCount = data.filter((application) => {
                const lastStage = application.stage[application.stage.length - 1];
                return lastStage && lastStage.name=='selected' && lastStage.status == 'selected'
            })
            // Rejected
            const rejectCount = data.filter((application) => {
                const lastStage = application.stage[application.stage.length - 1];
                return lastStage &&  lastStage.status == 'failed'
            })

            setSummary(prev => ({
                ...prev,
                total: data.length,
                inProgress: progressCount.length,
                interview: interviewCount.length,
                offer:offerCount.length,
                rejection:rejectCount.length
            }
            ))
        }

        fetchApplication();
    }, [])

    const SummaryCardsArray = [
        {
            icon: applicationIcon,
            title: "Applications",
            quantity: summary.total,
            detail: "Total applications"
        },
        {
            icon: inProgressIcon,
            title: "In Progress",
            quantity: summary.inProgress,
            detail: "Actively moving forward"
        },
        {
            icon: applicationIcon,
            title: "Interviews",
            quantity: summary.interview,
            detail: "Upcoming Interviews"
        },
        {
            icon: applicationIcon,
            title: "Offers",
            quantity: summary.offer,
            detail: "Yay! Keep it up"
        },
        {
            icon: applicationIcon,
            title: "Rejected",
            quantity: summary.rejection,
            detail: "Don't give up"
        }

    ]

    return (<div className="dashboard-body">
        <TitleAndSubline title="Dashboard" subtitle="Here's what's happening with your job applications" />
        <div className="summary-cards">
            {
                SummaryCardsArray.map((s) => (
                    <SummaryCard icon={s.icon} title={s.title} quantity={s.quantity} detail={s.detail} />

                ))
            }

        </div>

        <div className="recent-applications-card">
            <SubHeading subheading="Recent Application" />
            <div className="recent-applications">
                {
                    applications.slice(-3).map((application) => (
                        <RecentApplicationCard role={application.role} company={application.company} stage={application.stage[application.stage.length-1].name} status={application.stage[application.stage.length-1].status}  date={application.applicationDate} key={application._id} />
                    ))
                }

            </div>
        </div>

    </div>)
}
export { Dashboard };