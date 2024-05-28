export type VehicleState = "Offline" | "Stopped" | "Idle" | "Active"; // API inferred. These aren't states sent by Nav
export type PowerState = "Unknown" | "Error" | "Init" | "Stopped" | "Stopping" | "Starting" | "Running";
export type SafetyState = "Unknown" | "Fault" | "E_Stop" | "Safe_to_Approach" | "Manual" | "Autonomous";
export type DriveState = "Unknown" | "Disarmed" | "Armed" | "Disarming";

export type Vehicle = {
  id: string; // vehicle uuid
  state: VehicleState;
  driveState: DriveState;
};

export type Heartbeat = {
  id: string; // vehicle uuid
  vehicleState: VehicleState;
};

export interface ICacheClient {
  setHeartbeat: (uuid: string, heartbeat: Heartbeat) => Promise<void>;
}
