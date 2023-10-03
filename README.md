# Build the NeuroGen App with Next.js 13, React, TypeScript, Tailwind, Shadcn UI, Prisma and Stripe

### Features:
- Tailwind design
- Tailwind animations and effects
- Full responsiveness
- Clerk Authentication (Email, Google, 9+ Social Logins)
- Client form validation and handling using react-hook-form
- Server error handling using react-toast
- Image Generation Tool (Open AI)
- Video Generation Tool (Replicate AI)
- Conversation Generation Tool (Open AI)
- Music Generation Tool (Replicate AI)
- Page loading state
- Stripe monthly subscription
- Free tier with API limiting
- How to write POST, DELETE, and GET routes in route handlers (app/api)
- How to fetch data in server react components by directly accessing database (WITHOUT API! like Magic!)
- How to handle relations between Server and Child components!
- How to reuse layouts
- Folder structure in Next 13 App Router

Follow this instructions: [`steps.txt`](https://github.com/Vinojan1999/NeuroGen-AI/blob/master/steps.txt)

### Prerequisites

**Node version 18.x.x**

### Cloning the repository

```shell
git clone https://github.com/Vinojan1999/NeuroGen-AI.git
```

### Install packages

```shell
npm install
```

### Setup .env file

```js
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

OPENAI_API_KEY=
REPLICATE_API_TOKEN=

DATABASE_URL=

STRIPE_API_KEY=
STRIPE_WEBHOOK_SECRET=

NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### Setup Prisma

Configure the MySQL Database (I used PlanetScale)

```shell
npx prisma db push
```

Run the Prisma Studio:

```shell
npx prisma studio
```

### Setup Stripe:

```shell
stripe login
```
```shell
stripe listen --forward-to localhost:3000/api/webhook
```

### Start the app

```shell
npm run dev
```

Application frontend : [http://localhost:3000](http://localhost:3000) <br>
Prisma Studio : [http://localhost:5555](http://localhost:5555) <br>
Crisp dashboard : [https://app.crisp.chat](https://app.crisp.chat/)

## Prisma
Every time you have you push and generate when you modified "schema.prisma"
```bash
npx prisma generate
```
```bash
npx prisma db push
```

If there any issues or clarification, Contact ma through email [vinojan@dechorizon.com](mailto:vinojan@dechorizon.com) <br>
LinkedIn [@vinojan](https://www.linkedin.com/in/iam-vinojan/)
