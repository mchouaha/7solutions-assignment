import React, { useState, useEffect } from "react";

// material-ui
import {Box} from "@mui/material";

// components
import GoBackButton from "@/components/goBackButton";

// types
import {GroupedUserData} from "@/types";


const Question2: React.FC = () => {
  const [data, setData] = useState<GroupedUserData | null>(null);  // State for API response
  const [error, setError] = useState<string>("");  // State for any errors

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/users");  // Fetch the data from the API
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }

        const result: GroupedUserData = await res.json();  // Parse and type the JSON response
        setData(result);  // Set the response data to state
      } catch (err: unknown) {
        // Handle error with proper typing
        if (err instanceof Error) {
          setError(err.message);  // If an error occurs, set the error state
        } else {
          setError("Unknown error occurred");
        }
      }
    };

    fetchData().then();  // Call the function to fetch the data
  }, []);

  return (
    <div>
      <h1>Question 2 - User Data</h1>

      {error && <p style={{ color: "red" }}>Error: {error}</p>}  {/* Display error message if there is an error */}

      {data ? (
        <pre>{JSON.stringify(data, null, 2)}</pre>
        ) : (
        <p>Loading...</p>
        )}
      <Box height={"2em"}/>

      <GoBackButton/>
    </div>
  );
};

export default Question2;