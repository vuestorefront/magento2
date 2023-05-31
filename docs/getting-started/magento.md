# Magento Installation

Welcome to this Magento 2 installation guide! This guide will help you install Magento 2 on your local machine.

:::tip
We created this guide to help you get up and running quickly.
If you already have a Magento 2 instance for development, you can skip this guide.
:::

- **[Installation using CLI](#installation-using-cli)** - install Magento 2 instance locally using CLI (recommended)

## Prerequisites

Before you start, make sure you have the following tools installed:

- [Node.js](https://nodejs.org/en/) - Node.js installed.
- [Docker](https://docs.docker.com/get-docker/) - only if you want to install Magento 2 instance locally using CLI. We recommend using [Docker Desktop](https://www.docker.com/products/docker-desktop/).
- [Magento Marketplace account](https://account.magento.com/customer/account/create/) - to get API credentials for your Magento instance.

## Installation using CLI

::: tip
This is a beta version of the CLI. If you encounter any issues, please report them on **[GitHub](https://github.com/vuestorefront/vue-storefront/issues/new/choose)**. Thanks for helping us make the CLI better!
:::

## Installation steps

**Supported OS:** MacOS, Linux, Windows (using WSL2)
If you are using Windows, please proceed with the [Manual Installation](https://docs.vuestorefront.io/magento/installation-setup/installation.html#manual-installation) guide.

**Installation using CLI** is a quick and easy way to get your project up and running. It will install Vue Storefront and Magento 2 instance locally using Docker. It will also generate sample data for your store *(optional)*.

**CLI** will guide you through the installation process and ask you to provide the required information.

::: tip
CLI may take up to 10 minutes to complete the installation process. Please be patient.
:::

### Step 1: Run CLI to create a new project


```bash
npx @vue-storefront/cli m2-only
```

CLI uses [`markshust/docker-magento`](https://github.com/markshust/docker-magento) script to install Magento 2 instance locally using Docker.

### Step 1: Enter project name

When prompted, enter the name of your project. It will be used as a directory name for your project.

```bash
┌ Welcome to Vue Storefront 2 CLI! 💚
|
◆  🚀  Please provide a name for the Magento 2 directory
|  magentolocal
```

::: warning
Avoid using special characters and spaces in the project name.
:::

### Step 2: Provide Magento 2 API credentials

When prompted, provide your Magento 2 API credentials:

```bash
◆ 🔐 Please provide your Magento access keys
|
◆ 🔑 Magento access key:
| <YOUR_MAGENTO_ACCESS_KEY>
◆ 🔒 Magento secret key
| <YOUR_MAGENTO_SECRET_KEY>
```

To get Magento 2 API credentials - [Adobe Merchant Center - Magento 2 Access Keys](https://marketplace.magento.com/customer/accessKeys/)

### Step 5: Provide Magento 2 instance URL

When prompted, provide the URL of your Magento 2 instance:

```bash
◆ 🌐 Magento domain name
| <YOUR_MAGENTO_DOMAIN_NAME>
```

The Magento 2 instance URL will be used to connect Vue Storefront to your Magento 2 instance - by default, the URL of the local Magento instance is `magento.test`

CLI will start installing Magento 2 instance locally using Docker. It will take a few minutes.

::: tip
You will be asked to provide system administrator password to allow Docker to run commands on your machine.
:::

### Step 6: Generate sample data (optional)

When prompted, select the option to generate sample data:

```bash
◆ 🛒 Do you want to generate sample data for the store?
| > Yes / No
```

### Step 7: Start the project

Once CLI finishes the installation process, you will have a completely configured and ready to use Vue Storefront project. You can start the application using the commands below:

Go to the newly created directory and start the project in development mode:

```bash
cd my-project

yarn dev
```

### Congratulations! 🎉

You have successfully installed Magento 2 instance locally. 🚀
