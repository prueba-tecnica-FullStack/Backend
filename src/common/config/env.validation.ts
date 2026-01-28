import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  DATABASE_URL: string;
  NODE_ENV: string;
}

const envSchema = joi.object({
  PORT: joi.number().default(3000),
  DATABASE_URL: joi.string().required(),
  NODE_ENV: joi.string().default('local'),
}).unknown(true);

const { error, value } = envSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
  port: envVars.PORT,
  databaseUrl: envVars.DATABASE_URL,
  nodeEnv: envVars.NODE_ENV,
};
