function SummaryCard({ icon, title, quantity, detail }) {
    return (<div className="summary-card">
        <img src={icon} alt="" className="summary-card-icon-img" />
        <div className="summary-card-info">
            <div className="summary-card-title">
                {title}
            </div>
            <div className="summary-card-quantity">
                {quantity}
            </div>
            <div className="summary-card-detail">
                {detail}
            </div>
        </div>
    </div>)
}

function RecentApplicationCard({ logoLetter, role, companyName, stage, date }) {
    return (
        <div className="recent-application-card">
            <div className="recentApplication-company-logo">{logoLetter}</div>
            <div className="recentApplication-company-details">
                <div className="recentApplication-company-role">{role}</div>
                <div className="recentApplication-company-name">{companyName}</div>
            </div>
            <div className="recentApplication-stage">{stage}</div>
            <div className="recentApplication-dateDetails">
                <div className="recentApplication-stageDetail">{stage}</div>
                <div className="recentApplication-date">{date}</div>
            </div>
        </div>
    )
}
export { SummaryCard,RecentApplicationCard }