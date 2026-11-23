export interface Iuser {
  userName: string;
  userId: string;
  userRole: string;
  profileDescription: string;
  profileImage: string;
  skills: string[];
  experienceYears: string;
  isActive: boolean;
}

export interface Ires<T> {
  msg: string;
  data: T;
}
