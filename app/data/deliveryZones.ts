export interface DeliveryZone {
  id: string;
  label: string;
  fee: number;
}

export const DELIVERY_ZONES: DeliveryZone[] = [
  { id: "senegambia", label: "Senegambia / Kololi / Kotu", fee: 200 },
  { id: "bakau", label: "Bakau / Fajara / Cape Point", fee: 250 },
  { id: "serrekunda", label: "Serrekunda / Latrikunda / Bundung", fee: 300 },
  { id: "tabokoto", label: "Tabokoto / Abuko / Fajikunda", fee: 350 },
  { id: "brusubi", label: "Brusubi / Brufut / Bijilo", fee: 400 },
  { id: "brikama", label: "Brikama / Lamin / Airport Area", fee: 500 },
];
