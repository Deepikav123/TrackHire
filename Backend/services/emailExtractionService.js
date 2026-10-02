function extractCompany1(name) {
    let ans = "";
    let i = 0;
    const j = name.length - 1;
    while (name[i] != '@') {
        if (i == j) {
            return "";
        }
        i++;
    }
    i++;
    while (name[i] != '.') {
        if (i == j) {
            return "";
        }
        ans += name[i];
        i++;
    }
    return ans;
}
function normalize(data) {
    let newData = data.replaceAll(' ', '');
    return newData.toLowerCase();
}

function extractCompany2(data2, data1) {
    let newData1 = normalize(data1);
    let newData2 = normalize(data2);
    if (newData2.includes(newData1)) {
        return newData1;
    }

    return "";
}

function processDate(data) {
    const month = data.match(/(\d{1,2})(st|nd|rd|th)?\s+(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*/i)
    const time = data.match(/(\d{1,2})(:\d{2})?\s*(am|pm)/i);
    let monthData = "";
    let timeData = "";

    if (month) {

        monthData = month[0];
    }
    if (time) {

        timeData = time[0];
    }
    return ({
        date: monthData,
        time: timeData
    })
}

// Link
function meetingLinkExtract(data) {
    const link = data.match(/(https?:\/\/[^\s]+)/i);
    if (link) {
        return link[0];
    }
    return "";
}

// Role
function roleExtract(data) {
    const role = data.match(/(?:applying for|applied for|considered for|selected for|shortlisted for)\s+(?:the|our|a|an)?\s*([A-Za-z\s]+?)\s+(?:position|role|internship|opening|program)/i);
    if (role) {
        return role[1];
    }
    return "";
}

// Job Type
function jobType(data) {
    if (data.includes("intern") || data.includes("internship")) {
        return "Internship"
    }
    return "Full-Time";
}

// Stages

function stage(data) {
    const newData = normalize(data);
    const shortListed = ["shortlisted", "nextround", "nextstage"];
    const technicalInterview = ["interview", "technicalinterview"];
    const hrInterview = ["hr"];
    const rejected = ["rejected", "unabletomoveforward", "othercandidates", "profileinfile", "futureroles", "sorry", "apologize"];
    const selected = ["selected", "offerletter"];

    if (rejected.some(word => (
        newData.includes(word)
    ))) {
        return "Rejected";
    }
    else if (selected.some(word => (
        newData.includes(word)
    ))) {
        return "Selected";
    }
    else if (hrInterview.some(word => (
        newData.includes(word)
    ))) {
        return "HR Interview";
    }
    else if (technicalInterview.some(word => (
        newData.includes(word)
    ))) {
        return "Technical Interview";
    }
    else if (shortListed.some(word => (
        newData.includes(word)
    ))) {
        return "Shortlisted";
    }


    return "";
}
module.exports={ extractCompany1, extractCompany2, processDate, meetingLinkExtract, roleExtract, jobType, stage }