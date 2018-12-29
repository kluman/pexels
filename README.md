# Pexels Adobe InDesign Plugin

An [Adobe CEP](https://www.adobe.io/apis/creativecloud/cep.html) plugin for searching Pexels photos and
importing them directly into an InDesign document.<br>

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.<br>

Developing in this mode is best for UI updates and adding new functionality that is not dependent upon
interactions with the Adobe InDesign application. For those changes you will need to set up your local 
environment for Adobe CEP plugin development. 

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>

All of the configuration and code files required to compile and/or run the Adobe CEP plugin are also copied into the `build` 
directory. See more below on running within Adobe InDesign.

## Running in Adobe InDesign

There are only a few steps required to run in the plugin locally within Adobe InDesign. You will need to do this to test downloading images as well as any changes involving interactions with InDesign. 

### Unistall the Existing Plugin

If you have previously installed the Pexels plugin from [Adobe Exchange](https://www.adobeexchange.com/creativecloud.html) you will need to uninstall it first. It can easily be re-enabled when you are done developing.

### Build the Project

In a following step you will create a symlink to the `build` directory from the Adobe CEP `extensions` directory. To do so `npm run build` first.<br>

### Configure Your Local Machine

Follow the instructions on the [CEP Extensions Cookbook](https://github.com/Adobe-CEP/CEP-Resources/blob/master/CEP_9.x/Documentation/CEP%209.0%20HTML%20Extension%20Cookbook.md#debugging-unsigned-extensions) for "Debugging Unsigned Extensions".<br>

This configuration allows the plugin to run without the normal security checks Adobe enforces so you can point directly to the built code.<br>

Next, create the link in the CEP `extensions` folder to your Git directory's `build` folder. The [CEP Extenstions Cookbook](https://github.com/Adobe-CEP/CEP-Resources/blob/master/CEP_9.x/Documentation/CEP%209.0%20HTML%20Extension%20Cookbook.md#extension-folders) section on "Extension Folders" has details as to where the `extensions` folder resides on your envoronment.<br>
