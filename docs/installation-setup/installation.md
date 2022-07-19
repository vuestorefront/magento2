# Installation

[[toc]]

## Prerequisites

Before proceeding, make sure you have [Node 16](https://nodejs.org/en/) installed. You can check this by running the following command:

```bash
node -v
```

## Installation steps

### Step 1: Generate a new project

The easiest way to get started with Vue Storefront is to set up your project using our CLI. You can run it using the following command:

```bash
npx @vue-storefront/cli init
```

It will ask you to enter the project's name and select the e-commerce platform you wish to use. Once selected, the CLI will create project files in the directory matching your project name.

::: warning
CLI will use the project name you enter to create a new directory, so avoid using special characters and spaces.
:::

### Step 2: Install dependencies

Go to the newly created directory and install the required dependencies:

```bash
cd <project_name>

npm install
```

### Step 2. Setup and configure Magento

Before you can configure the project, you need to set up and configure a new Magento instance that Vue Storefront will connect to. To do so, follow the [Configuring Magento](./configure-magento.html) guide.

### Step 3. Configure Vue Storefront

With the Magento instance setup and configured, you can connect your project to it. To do so, follow the [Configuring Vue Storefront](./configure-integration.html) guide.

### Step 4. Start the project

The project is now ready. You can start the application in development mode using the command below. You can read more about available commands and environments on the [Commands and deployment](https://nuxtjs.org/docs/2.x/get-started/commands/) page in Nuxt.js documentation.

```bash
npm run dev
```

## Recommended tools

Below are the tools we use to make the development and debugging easier, and we recommend you use them too.

### Vue.js Devtools

We strongly recommend installing [Vue.js Devtools](https://devtools.vuejs.org/guide/installation.html) in your browser. It's an excellent tool for viewing component structures and their current state, inspecting events, routes, and much more.

### Vetur for VS Code

For those using Visual Studio Code as their primary code editor, we also recommend using [Vetur extension](https://marketplace.visualstudio.com/items?itemName=octref.vetur).
It speeds up the development of Vue.js-based applications by providing features like Vue.js code autocompletion and syntax highlighting.
