import {TitleAndSubline,SubHeading} from "../bodyTitle";
import { SummaryCard, RecentApplicationCard } from "./dashboardCards";
import applicationIcon from '../../../images/icons/application.png'
import inProgressIcon from '../../../images/icons/inProgress.png'
function Dashboard() {
    return (<div className="dashboard-body">
        <TitleAndSubline title="Dashboard" subtitle="Here's what's happening with your job applications" />
        <div className="summary-cards">
            <SummaryCard icon={applicationIcon} title="Applications" quantity={25} detail="Total applications" />
            <SummaryCard icon={inProgressIcon} title="In Progress" quantity={10} detail="Actively moving forward" />
            <SummaryCard icon={applicationIcon} title="Interviews" quantity={8} detail="Upcoming Interviews" />
            <SummaryCard icon={applicationIcon} title="Offers" quantity={3} detail="Yay! Keep it up" />
            <SummaryCard icon={applicationIcon} title="Rejected" quantity={2} detail="Don't give up" />
        </div>

        <div className="recent-applications-card">
          <SubHeading subheading="Recent Application"/>
            <div className="recent-applications">
<RecentApplicationCard logoLetter="G" role="SWE Intern" companyName="Google" stage="Technical Interview" date="Sep 10,2026"/>
<RecentApplicationCard logoLetter="M" role="SWE Intern" companyName="Microsoft" stage="OA" date="Sep 12,2026"/>
<RecentApplicationCard logoLetter="G" role="SWE Intern" companyName="Google" stage="Technical Interview" date="Sep 10,2026"/>
            </div>
        </div>

    </div>)
}
export { Dashboard };