export const dashboardData = {
  categories: [
    {
      categoryName: "CSPM Executive Dashboard",
      shortName: "CSPM",
      widgets: [
        {
          title: "Cloud Accounts",
          type: "donut",
          data: [50, 50],
          labels: ["Connected (2)", "Not Connected (2)"],
          dotColors: ["#0096d6", "#efefef"],
        },
        {
          title: "Cloud Account Risk Assessment",
          type: "donut",
          data: [1689, 681, 36, 7253],
          labels: ["Failed", "Warning", "Not Available", "Passed"],
          dotColors: ["#b00000", "#f1c232", "#dadada", "#3eb209"],
        },
      ],
    },
    {
      categoryName: "CWPP Dashboard",
      shortName: "CWPP",
      widgets: [
        {
          title: "Top 5 Namespace Specific Alerts",
          data: "No Graph data available!",
        },
        {
          title: "Workload Alerts",
          data: "No Graph data available!",
        },
      ],
    },
    {
      categoryName: "Registry Scan",
      shortName: "Image",
      widgets: [
        {
          title: "Image Risk Assessment",
          type: "customProgressBar",
          data: [5, 30, 20, 5],
          labels: [
            "Critical (5%)",
            "High (30%)",
            "Moderate (20%)",
            "Low (5%)",
          ],
          colors: ["#a70000", "#ff9600", "#ffe71a", "#c4c3bd"],
        },
        {
          title: "Image Security Issues",
          type: "customProgressBar",
          data: [20, 30, 20, 5],
          labels: [
            "Critical (20%)",
            "High (30%)",
            "Moderate (20%)",
            "Low 5%)",
          ],
          colors: ["#a70000", "#ff9600", "#ffe71a", "#c4c3bd"],
        },
      ],
    },
    {
      categoryName: "Ticket",
      shortName: "Ticket",
      widgets: [],
    },
  ],
};