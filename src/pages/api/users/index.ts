import { NextApiRequest, NextApiResponse } from "next";
import {GroupedData, User} from "@/interfaces";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await fetch("https://dummyjson.com/users");
    const { users }: { users: User[] } = await response.json();

    // Group users by department
    const groupedData = groupByDepartment(users);

    res.status(200).json(groupedData);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    } else {
      return res.status(500).json({ error: "Unknown error occurred" });
    }
  }
}

function groupByDepartment(users: User[]) {
  const groupedData: GroupedData = {};

  users.forEach((user) => {
    const department = user.company?.department || "No department"; // Default to "No department" if no department

    // Initialize department if it doesn't exist
    if (!groupedData[department]) {
      groupedData[department] = {
        male: 0,
        female: 0,
        ageRange: "",
        hair: {
          Black: 0,
          Blond: 0,
          Chestnut: 0,
          Brown: 0,
          Green: 0,
          White: 0,
          Red: 0,
          Amber: 0,
          Unknown: 0
        },
        addressUser: {}
      };
    }

    // Count gender
    if (user.gender === "male") groupedData[department].male++;
    if (user.gender === "female") groupedData[department].female++;

    // Group by hair color
    const hairColor = user.hair.color;
    if (hairColor) {
      groupedData[department].hair[hairColor] = (groupedData[department].hair[hairColor] || 0) + 1;
    } else {
      groupedData[department].hair["Unknown"]++; // If hair color is unknown
    }

    // Add user to address group
    const addressKey = `${user.firstName}${user.lastName}`;
    groupedData[department].addressUser[addressKey] = user.address?.postalCode || "Unknown";
  });

  return groupedData;
}
