# 🚧 Velocity 🚧 (Minimalist Email Client)

Built using Node.js, React.js, Tailwind CSS, Passport.js, Redux Toolkit

![HomePage](https://raw.githubusercontent.com/ShadmanAfzal/Velocity-Email-Client/main/screenshots/homepage.png)

## Features:

1. Dark Mode support
2. Easily organize email by drag and drop
3. Minimalist UI
4. Many more to come...

## Setup Guide:

Install docker and docker compose

```bash
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-compose-plugin
```

Clone the Repo

```bash
git clone https://github.com/ShadmanAfzal/Velocity-Email-Client.git
cd Velocity-Email-Client

```

Create docker-compose.yaml file in root directory.

```yaml
version: '3.9'

services:
  server:
    build: .
    ports:
      - '8000:8000'
    expose:
      - 8000
    environment:
      PORT: 8000
      NODE_ENV: production
      SESSION_SECRET:
      CLIENT_ID:
      CLIENT_SECRET:
      CALLBACK_URL:
      REDIS_URL: redis://redis:6379
  redis:
    image: redis
    restart: always
    ports:
      - '6379:6379'
    expose:
      - 6379
    volumes:
      - cache:/data

volumes:
  cache:
```

Start the docker container

```bash
sudo docker compose up --build -d
```
