import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  PRODUCTS_MICROSERVICE_HOST: string;
  PRODUCTS_MICROSERVICE_PORT: number;
  ORDERS_MICROSERVICE_HOST: string;
  ORDERS_MICROSERVICE_PORT: number;
}

const envVarsSchema = joi
  .object<EnvVars>({
    PORT: joi.number().required(),
    PRODUCTS_MICROSERVICE_HOST: joi.string().required(),
    PRODUCTS_MICROSERVICE_PORT: joi.number().required(),
    ORDERS_MICROSERVICE_HOST: joi.string().required(),
    ORDERS_MICROSERVICE_PORT: joi.number().required(),
  })
  .unknown(true);

const envVarsResult = envVarsSchema.validate(process.env);

if (envVarsResult.error) {
  throw new Error(
    `Configuration validation error: ${envVarsResult.error.message}`,
  );
}

const envVars = envVarsResult.value;

console.log(envVars.PORT);

export const envs = {
  port: envVars.PORT,
  productsMicroserviceHost: envVars.PRODUCTS_MICROSERVICE_HOST,
  productsMicroservicePort: envVars.PRODUCTS_MICROSERVICE_PORT,
  orderMicroserviceHost: envVars.ORDERS_MICROSERVICE_HOST,
  orderMicroservicePort: envVars.ORDERS_MICROSERVICE_PORT,
};
