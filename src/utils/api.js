async function getData(startDate, endDate, company_id, employee_id) {

    try {
        const formattedFrom = startDate.toISOString().split("T")[0];
        const formattedTo = endDate.toISOString().split("T")[0];

        const response = await fetch(
            "https://backend.mytime2cloud.com/api/attendance-report-new",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    company_id: company_id,
                    from_date: formattedFrom,
                    to_date: formattedTo,

                    report_type: "Monthly",
                    shift_type_id: 0,
                    report_template: "Template1",
                    overtime: 0,
                    employee_id: [employee_id],
                    department_ids: [],
                    statuses: [],
                    branch_id: null,
                    showTabs: '{"single":true,"double":false,"multi":false}',
                    tabselected: {
                        isTrusted: true,
                    },
                    filterType: "Monthly",
                }),
            }
        );

        const data = await response.json();

        if (data) {
            return data.data;
        }
    } catch (error) {
        console.error("Fetch error:", error);
    } finally {
    }
};

export default getData;