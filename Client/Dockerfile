FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm config set registry https://registry.npmjs.org/
RUN npm ci --no-optional --legacy-peer-deps
COPY . .
EXPOSE 3000
ENV HOST=0.0.0.0
HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=3 CMD curl -f http://localhost:3000/ || exit 1
CMD ["npm", "start"]