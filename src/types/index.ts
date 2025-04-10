// Define the types for the API response and the error
export type HairColor = "Black" | "Blond" | "Chestnut" | "Brown" | "Unknown";

export type GroupedUserData = {
  [department: string]: {
    male: number;
    female: number;
    ageRange: string;
    hair: {
      [key in HairColor]: number;
    };
    addressUser: {
      [key: string]: string; // `{firstName}{lastName}: postalCode`
    };
  };
};
