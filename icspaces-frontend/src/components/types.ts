export interface TransactionDetails {
  transactionId: string;
  date: string;
  status: string;
  comment: string;
}

export interface Reservation {
  id: string;
  date: string;
  time: string;
  eventName: string;
  room: string;
  status: string;
  transactionDetails: TransactionDetails;
}

export interface usersAdmin{
  id: string;
  name: string;
  creationDate: string;
  email: string;
  lastlogin: string;
  role: string;
  numRoomReservations: number
}

export interface Users{
  fname:string;
  lname:string;
  usertype:number;
  profilePic:string;
  email:string;
  college:string;
  department:string;
  // add other fields as needed
}