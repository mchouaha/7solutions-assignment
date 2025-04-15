import React, { useEffect, useRef, useState } from "react";

// material-ui
import { Box, Grid } from "@mui/material";

// Interfaces
import { CulinaryItem } from "@/interfaces";

// Components
import FruitList from "@/components/pages/question1/FruitList";
import VegetableList from "@/components/pages/question1/VegetableList";
import CulinaryList from "@/components/pages/question1/CulinaryList";
import GoBackButton from "@/components/goBackButton";

const Question1: React.FC = () => {
  const [culinaryList, setCulinaryList] = useState<CulinaryItem[]>([]);
  const [fruitList, setFruitList] = useState<CulinaryItem[]>([]);
  const [vegetableList, setVegetableList] = useState<CulinaryItem[]>([]);
  const [itemTimers, setItemTimers] = useState<{ [key: string]: number }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const timerRefs = useRef<Record<string, NodeJS.Timeout>>({});
  const timeoutRefs = useRef<Record<string, NodeJS.Timeout>>({});

  useEffect(() => {
    const fetchCulinaryList = async () => {
      try {
        const res = await fetch("/api/culinary-list");
        if (!res.ok) throw new Error("Failed to fetch culinary list");
        const data: CulinaryItem[] = await res.json();
        setCulinaryList(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchCulinaryList().then();
  }, []);

  const removeFromList = (list: CulinaryItem[], item: CulinaryItem) =>
    list.filter((el) => el.name !== item.name);

  const addToListIfAbsent = (list: CulinaryItem[], item: CulinaryItem) =>
    list.some((el) => el.name === item.name) ? list : [...list, item];

  const clearItemTimers = (itemName: string) => {
    if (timerRefs.current[itemName]) {
      clearInterval(timerRefs.current[itemName]);
      delete timerRefs.current[itemName];
    }
    if (timeoutRefs.current[itemName]) {
      clearTimeout(timeoutRefs.current[itemName]);
      delete timeoutRefs.current[itemName];
    }
    setItemTimers((prev) => {
      const updated = { ...prev };
      delete updated[itemName];
      return updated;
    });
  };

  const handleItemClick = (item: CulinaryItem) => {
    // Add item to the appropriate list
    if (item.type === "Fruit") {
      setFruitList((prev) => addToListIfAbsent(prev, item));
    } else if (item.type === "Vegetable") {
      setVegetableList((prev) => addToListIfAbsent(prev, item));
    }

    // Remove item from main culinary list
    setCulinaryList((prev) => removeFromList(prev, item));

    // Initialize timer at 5s
    setItemTimers((prev) => ({ ...prev, [item.name]: 5 }));

    // Start countdown (purely visual)
    timerRefs.current[item.name] = setInterval(() => {
      setItemTimers((prev) => {
        const current = prev[item.name];
        return current > 1
          ? { ...prev, [item.name]: current - 1 }
          : prev; // Don't clear or change anything here
      });
    }, 1000);

    // Schedule final removal
    timeoutRefs.current[item.name] = setTimeout(() => {
      if (item.type === "Fruit") {
        setFruitList((prev) => removeFromList(prev, item));
      } else if (item.type === "Vegetable") {
        setVegetableList((prev) => removeFromList(prev, item));
      }

      setCulinaryList((prev) => [...prev, item]);

      clearItemTimers(item.name); // Full cleanup
    }, 5000);
  };

  // const handleItemClick = (item: CulinaryItem) => {
  //   if (item.type === "Fruit") {
  //     setFruitList((prev) => addToListIfAbsent(prev, item));
  //   } else if (item.type === "Vegetable") {
  //     setVegetableList((prev) => addToListIfAbsent(prev, item));
  //   }
  //
  //   setCulinaryList((prev) => removeFromList(prev, item));
  //   setItemTimers((prev) => ({ ...prev, [item.name]: 5 }));
  //
  //   timerRefs.current[item.name] = setInterval(() => {
  //     setItemTimers((prev) => {
  //       const time = prev[item.name];
  //       if (time <= 1) {
  //         clearItemTimers(item.name);
  //         return prev;
  //       }
  //       return { ...prev, [item.name]: time - 1 };
  //     });
  //   }, 1000);
  //
  //   timeoutRefs.current[item.name] = setTimeout(() => {
  //     if (item.type === "Fruit") {
  //       setFruitList((prev) => removeFromList(prev, item));
  //     } else if (item.type === "Vegetable") {
  //       setVegetableList((prev) => removeFromList(prev, item));
  //     }
  //     setCulinaryList((prev) => [...prev, item]);
  //     clearItemTimers(item.name);
  //   }, 5000);
  // };

  const handleRemoveFromSubList = (item: CulinaryItem) => {
    if (item.type === "Fruit") {
      setFruitList((prev) => removeFromList(prev, item));
    } else if (item.type === "Vegetable") {
      setVegetableList((prev) => removeFromList(prev, item));
    }

    setCulinaryList((prev) => [...prev, item]);
    clearItemTimers(item.name);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <Grid container spacing={4}>
        <Grid size={{xs: 12, md: 2}} >
          <CulinaryList culinaryList={culinaryList} handleItemClick={handleItemClick} />
        </Grid>
        <Grid size={{xs: 12, md: 2}}>
          <FruitList fruitList={fruitList} handleRemoveFromSubList={handleRemoveFromSubList} itemTimers={itemTimers} />
        </Grid>
        <Grid size={{xs: 12, md: 2}}>
          <VegetableList vegetableList={vegetableList} handleRemoveFromSubList={handleRemoveFromSubList} itemTimers={itemTimers} />
        </Grid>
      </Grid>

      <Box height="2em" />
      <GoBackButton />
    </>
  );
};

export default Question1;