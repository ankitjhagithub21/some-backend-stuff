import Redis from 'ioredis'

const redis = new Redis("redis://localhost:6379")

export async function getRedisValue(key) {
  return await redis.get(key);
}

export async function setRedisValue(key, value){
    await redis.set(key, value);
}
