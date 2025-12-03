## Getting Started

Ensure that you have the Node Version Manager (nvm) installed on your system.  
Install it using the [official nvm guide](https://github.com/nvm-sh/nvm#installing-and-updating).

If the Node.js version specified in the `.nvmrc` file isn't installed on your system, you can install it using the appropriate command:

```sh
nvm install
```

Then switch to the installed version:

```sh
nvm use
```

Environment variables

```sh
cp .env.example .env
```

`VITE_API_URL` is used to specify the API URL for the backend.
If you are running the API locally, you can set it to `http://localhost:3000/api`.
If you are using a different port, make sure to update it accordingly.

Install dependencies

```sh
npm install
```

Run the development server

```sh
npm run dev
```

## Resources

[Material UI](https://mui.com/material-ui/getting-started/installation/) 

