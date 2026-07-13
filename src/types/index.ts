export type TemplateField = 'lastDay' | 'startDate' | 'endDate' | 'newSchedule' | 'bankName' | 'iban' | 'amount' | 'reason' | 'newAddress' | 'marriageDate';

export interface Template {
  id: string;
  name: string;
  title: string;
  recipient: string;
  fields: TemplateField[];
  bodyText: string;
}

export interface FormData {
  company: string;
  city: string;
  date: string;
  name: string;
  dni: string;
  position: string;
  lastDay: string;
  startDate: string;
  endDate: string;
  newSchedule: string;
  bankName: string;
  iban: string;
  amount: string;
  reason: string;
  newAddress: string;
  marriageDate: string;
  bodyText: string;
  signatureImage: string | null;
  extraSignatures?: { image: string | null, name: string, role: string }[];
}
