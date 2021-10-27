### .env

teste-gitpush: Gabriel Alves

O arquivo `.env` deve ficar na root com as seguintes variáveis:
```
DB = nome do banco de dados
DB_USER = usuário do banco de dados
DB_PASSWORD = senha do banco de dados
DB_HOST = onde o banco de dados está hosteado
SECRET_KEY = a secret key usada pra gerar o jwt
NODE_ENV = "development" ou "production" 
REDIS_HOST= onde o redis está rodando
PORT= porta que a api escutará
JWT_EXPIRATION = duração do jwt, por exemplo: 10m para 10 minutos, 600 para 600 segundos (10 minutos)
HOST_URL= url onde está hospedada a api
MAIL_USR = gmailUsr (email address)
MAIL_PWD = gmailPwd
IMAGE_KIT_PUBLIC_KEY= public keydo imagekit
IMAGE_KIT_PRIVATE_KEY= private key do imagekit
IMAGE_KIT_URL_ENDPOINT= URL gerada no image kit
```
Nessa parte de email é necessário as credenciais de um email real do google para enviar os emails de esqueci a senha. Para funcionar vc deve entrar [aqui](https://myaccount.google.com/lesssecureapps?pli=1&rapt=AEjHL4MtkSLOQcnXIe3rsHXXooYTbq1_6qRFgw3XE5S2XJOJTCDzW3LH2R7vLqasO33mfgmRmvPNv26rbFMoBlkOXy1MM_xeeg) com o email colocado no env e habilitar (opcional desde que não utilize os endpoints de forgotPassword). 

## Servidor Redis
Para rodar a API é necessário ter um servidor [Redis](https://redis.io) rodando na sua máquina. Caso seu SO seja Windows, baixe o .zip da release mais recente nesse [repositório](https://github.com/microsoftarchive/redis/releases) e rode o executável `redis-server.exe`. Se seu SO for UNIX, basta seguir as instruções dadas nessa [página](https://redis.io/download).

## [Documentação](https://documenter.getpostman.com/view/14887511/UUxzA7yP#ab86b943-62dc-4494-9a47-c532f925c2df)
