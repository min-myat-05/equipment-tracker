export interface dataType {
  "ID No.": string; // unique identifier
  "Maker,Model & Type": string; // manufacturer + model/type
  Category: string; // e.g. "PC", "Digital Device", "Network Device"
  Condition: string; // e.g. "RN", "RP", "US", "W/O"
  Deployment: string; // e.g. "FT", "PT", "RS", "SP" or null
  Quantity: number; // count of items
  Location: string;
  "Date Received": string;
}

export interface titleType {
  name: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: "super_admin" | "user";
  status: "pending" | "active" | "rejected";
  createdAt?: string;
  updatedAt?: string;
}
