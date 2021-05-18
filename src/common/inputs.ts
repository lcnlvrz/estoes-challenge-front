export const inputs = [
  { label: "Name:", name: "name" },
  { label: "Description:", name: "description" },
  {
    label: "Assigned to:",
    name: "assignedTo",
    type: "select",
    options: [
      { label: "Luciano Alvarez", value: "Luciano Alvarez" },
      { label: "Luciano Alvarez 2", value: "Luciano Alvarez 2" },
    ],
  },
  {
    label: "Project manager:",
    name: "projectManager",
    type: "select",
    options: [
      { label: "Luciano Alvarez", value: "Luciano Alvarez" },
      { label: "Luciano Alvarez 2", value: "Luciano Alvarez 2" },
    ],
  },
  {
    label: "Status:",
    name: "status",
    type: "select",
    options: [
      { label: "Enabled", value: "Enabled" },
      { label: "Canceled", value: "Canceled" },
    ],
  },
];
