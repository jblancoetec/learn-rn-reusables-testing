import z from 'zod';

const ENV_SCHEMA = z.object({
  EXPO_PUBLIC_WEATHER_API_KEY: z.string().min(16, 'Es necesaria una clave para la api weather'),
});

export const { EXPO_PUBLIC_WEATHER_API_KEY: api_key_weather } = ENV_SCHEMA.parse(process.env);
