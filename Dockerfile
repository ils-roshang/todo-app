FROM node:18

WORKDIR /app

# Copy backend
COPY backend/package*.json ./backend/
RUN cd backend && npm install --production

COPY backend ./backend

# Copy frontend
COPY frontend ./frontend

EXPOSE 8080

# Start single express server that serves both
CMD ["node", "backend/server.js"]
