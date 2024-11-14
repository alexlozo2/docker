# Usar la imagen de nginx:stable-alpine
FROM nginx:stable-alpine

# Crear un volumen con el nombre /temp
VOLUME /temp

# Eliminar el contenido de la carpeta /usr/share/nginx/html/*
RUN rm -rf /usr/share/nginx/html/*

# Copiar la configuración de nginx
COPY nginx.conf /etc/nginx/nginx.conf
COPY mime.types /etc/nginx/mime.types

# Copiar el contenido del directorio sistema-ventas-front
COPY dist/proyecto-nad /usr/share/nginx/html

# Exponer el puerto 80
EXPOSE 80

# Ejecutar el comando para mantener nginx en primer plano
CMD ["nginx", "-g", "daemon off;"]