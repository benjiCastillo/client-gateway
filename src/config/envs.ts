import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  NATS_SERVERS: string[];
}

const envVarsSchema = joi
  .object<EnvVars>({
    PORT: joi.number().required(),
    NATS_SERVERS: joi.array().items(joi.string()).required(),
  })
  .unknown(true);

const envVarsResult = envVarsSchema.validate({
  ...process.env,
  NATS_SERVERS: process.env.NATS_SERVERS?.split(',') || [],
});

if (envVarsResult.error) {
  throw new Error(
    `Configuration validation error: ${envVarsResult.error.message}`,
  );
}

const envVars = envVarsResult.value;

console.log(envVars.PORT);

export const envs = {
  port: envVars.PORT,
  natsServers: envVars.NATS_SERVERS,
};
