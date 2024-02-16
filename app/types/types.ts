import * as moment from 'moment';
interface AddOn {
  id: number;
  checked: boolean;
  title: string;
  subtitle: string;
  price: number;
}



export type FormItems = {
  name: string;
  email: string;
  phone: string;
  plan: "arcade" | "advanced" | "pro";
  yearly: boolean;
  addOns: AddOn[];
};
