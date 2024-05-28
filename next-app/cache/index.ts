// import { ICacheClient, Heartbeat } from "@/types";
// import { createClient, RedisClientType } from "redis";

// class RedisClient implements ICacheClient {
//   redis: RedisClientType | null = null;

//   constructor(redis: RedisClientType) {
//     this.redis = redis;
//   }

//   setHeartbeat = async (uuid: string, heartbeat: Heartbeat) => {
//     if (!this.redis) return;
//     await this.redis.set(REDIS_KEY_PREFIX_HEARTBEAT + serialNumber, JSON.stringify(heartbeat));
//   };
// }
