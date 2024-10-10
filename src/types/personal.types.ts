export interface UserInfo {
  email: string;
  confirmEmail: boolean;
  googleId: string | null;
  avatar: string | null;
  fullName: string;
  unsignFullName: string;
  address: string | null;
  phoneNumber: string;
  dob: string | null;
  role: "CUSTOMER";
  status: "ACTIVE" | "INACTIVE";
  id: number;
  createDate: string;
  updateDate: string | null;
  isDeleted: boolean;
  version: string;
}
