import { TitleAndSubline, SubHeading } from "../bodyTitle";
import { SummaryCard, RecentApplicationCard } from "./dashboardCards";
import applicationIcon from '../../../images/icons/application.png'
import inProgressIcon from '../../../images/icons/inProgress.png'
import interviewIcon from '../../../images/icons/interviews.png'
import offerIcon from '../../../images/icons/offer.png'
import rejectedIcon from '../../../images/icons/rejected.png'
import { useEffect, useState } from "react";
import { useContext } from "react";
import AuthContext from "../../../../context/authContext";
import ProtectedRoute from "../ProtectedRoute";
function Dashboard() {
    const { token } = useContext(AuthContext);
    const [applications, setApplications] = useState([]);

    const [summary, setSummary] = useState(
        {
            total: 0,
            inProgress: 0,
            interview: 0,
            offer: 0,
            rejection: 0
        }
    )


    useEffect(() => {
        async function fetchApplication() {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/applications`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            const data = await response.json();
            if(!response.ok){
                return;
            }
            setApplications(data);
            // In-Progress
         
            const progressCount = data.filter(application => {
                const lastStage = application.stage[application.stage.length - 1];
                return lastStage && lastStage.status != 'Failed'
            })
            // Interviews
            const interviewCount = data.filter((application) => {
                const lastStage = application.stage[application.stage.length - 1];
                return lastStage && lastStage.name.toLowerCase().includes("interview") && lastStage.status === 'Upcoming'
            })

            // Selected
            const offerCount = data.filter((application) => {
                const lastStage = application.stage[application.stage.length - 1];
                return lastStage && lastStage.name == 'Selected'
            })
            // Rejected
            const rejectCount = data.filter((application) => {
                const lastStage = application.stage[application.stage.length - 1];
                return lastStage && lastStage.status == 'Failed'
            })

            setSummary(prev => ({
                ...prev,
                total: data.length,
                inProgress: progressCount.length,
                interview: interviewCount.length,
                offer: offerCount.length,
                rejection: rejectCount.length
            }
            ))
        }

        fetchApplication();
    }, [token])

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
            icon: interviewIcon,
            title: "Interviews",
            quantity: summary.interview,
            detail: "Upcoming Interviews"
        },
        {
            icon: offerIcon,
            title: "Offers",
            quantity: summary.offer,
            detail: "Yay! Keep it up"
        },
        {
            icon: rejectedIcon,
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
                        <RecentApplicationCard role={application.role} company={application.company} stage={application.stage[application.stage.length - 1].name} status={application.stage[application.stage.length - 1].status} date={application.applicationDate} key={application._id} />
                    ))
                }

            </div>
        </div>

    </div>)
}
export { Dashboard };