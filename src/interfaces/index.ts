// Type for individual culinary item
export interface CulinaryItem {
  type: 'Fruit' | 'Vegetable',
  name: string
}

// Type for individual user
export interface User {
  firstName: string;
  lastName: string;
  gender: "male" | "female";
  age: number;
  hair: {
    color: "Black" | "Blond" | "Chestnut" | "Brown" | "Green" | "White" | "Red" | "Amber" | string;
    type: string;
  };
  company?: {
    department?: string;
  };
  address?: {
    postalCode?: string;
  };
}

export interface DepartmentData {
  male: number;
  female: number;
  ageRange: string;
  hair: {
    [key: string]: number;  // This allows any string as a valid key
  };
  addressUser: { [key: string]: string };
}

// Type for the result object where departments are dynamically added
export interface GroupedData {
  [department: string]: DepartmentData;
}
