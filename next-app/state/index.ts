import { atom } from "jotai";
import { Vehicle } from "@/types";

export const vehicleAtom = atom<Vehicle>({
  id: "",
  state: "Offline",
  driveState: "Unknown",
});
