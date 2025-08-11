FROM node:18 as build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Build-time env variables for API URLs
ARG REACT_APP_MORSE_API
ARG REACT_APP_BINARY_API
ENV REACT_APP_MORSE_API=$REACT_APP_MORSE_API
ENV REACT_APP_BINARY_API=$REACT_APP_BINARY_API

RUN npm run build

# Serve with a lightweight web server
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
