## Client Gateway
El gateway es el punto de comunicación entre el cliente y los microservicios.
Es el encargado de recibir las peticiones del cliente y enviarlas a los microservicios y devolver la respuesta al cliente.

## Dev
1. Instalar dependencias
2. Crear un archivo `.env` basado en el `.env.example`
3. Levantar el servidor nats
```bash
docker run -d --name nats-main -p 4222:4222 -p 6222:6222 -p 8222:8222 nats
```
4. Tener levantado los microservicios
5. Levantar el gateway `npm run start:dev`

## Prod
```bash
 docker build -f dockerfile.prod -t client-gateway-prod .
 ```