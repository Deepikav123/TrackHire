import { TitleAndSubline, SubHeading } from "../bodyTitle";
import { SummaryCard, RecentApplicationCard } from "./dashboardCards";
import applicationIcon from '../../../images/icons/application.png'
import inProgressIcon from '../../../images/icons/inProgress.png'
import { useEffect, useState } from "react";
function Dashboard() {
    const [applications, setApplications] = useState([]);

    const [summary, setSummary] = useState(
        {
            total: 0
        }
    )

    useEffect(() => {
        async function fetchApplication() {
            const response = await fetch('http://localhost:3000/api/applications')
            const data = await response.json();
            setApplications(data);
            setSummary(prev => ({
                ...prev,
                total: data.length
            }
            ))
        }

        fetchApplication();
    }, [])

const SummaryCardsArray=[
    {
        icon:applicationIcon,
        title:"Applications",
        quantity:summary.total,
        detail:"Total applications"
    },
    {
        icon:inProgressIcon,
        title:"In Progress",
        quantity:summary.total,
        detail:"Actively moving forward"
    },
    {
        icon:applicationIcon,
        title:"Interviews",
        quantity:summary.total,
        detail:"Upcoming Interviews"
    },
    {
        icon:applicationIcon,
        title:"Offers",
        quantity:summary.total,
        detail:"Yay! Keep it up"
    },
    {
        icon:applicationIcon,
        title:"Rejected",
        quantity:summary.total,
        detail:"Don't give up"
    }

]

    return (<div className="dashboard-body">
        <TitleAndSubline title="Dashboard" subtitle="Here's what's happening with your job applications" />
        <div className="summary-cards">
            {
                SummaryCardsArray.map((s)=>(
            <SummaryCard  icon={s.icon} title={s.title} quantity={s.quantity} detail={s.detail} />

                ))
            }

        </div>

        <div className="recent-applications-card">
            <SubHeading subheading="Recent Application" />
            <div className="recent-applications">
                {
                    applications.map((application)=>(

                        <RecentApplicationCard  role={application.role} company={application.company} date={application.applicationDate} key={application._id}/>
                    ))
                }
               
            </div>
        </div>

    </div>)
}
export { Dashboard };