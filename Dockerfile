FROM node:20 AS development

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

#No ejecutar build en desarrollo, solo en producción
#RUN npm run build

#FROM node:20 AS production

# WORKDIR /app

# COPY package*.json ./

# RUN npm install --only=production

#Descomentar la siguiente línea si se ejecuta el build en desarrollo
#COPY --from=development /app/dist ./dist

EXPOSE 3000

#CMD ["node", "dist/main"]
CMD ["npm", "run", "start:dev"]

FROM node:20 AS production

WORKDIR /app

COPY package*.json ./

RUN npm install --only=production

COPY --from=development /app/dist ./dist

EXPOSE 3000

CMD ["node", "dist/main"]