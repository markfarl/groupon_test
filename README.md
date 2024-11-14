# Mark Farrell Groupon Excercise

Live version can be seen here on github pages 
[github.com/markfarl/groupon_test](https://github.com/markfarl/groupon_test)

This Excercise consists of two repos

Groupon Frontend application built in React 
and 
Groupon_serve built in node.js which is hosted on AWS instance from a docker image.

- [github.com/markfarl/groupon_test](https://github.com/markfarl/groupon_test)
- [https://github.com/markfarl/groupon_test_server](https://github.com/markfarl/groupon_test_server)



## Installation

Ton install locally please follow these 
```sh
yarn
```

To start development version.

```sh
yarn dev
```
**NOTE**
The endpoint is set to the AWS server built from [groupon_test_server](https://github.com/markfarl/groupon_test_server) to build locall you can uncomment the URL in [main/src/constants/api.ts](https://github.com/markfarl/groupon_test/blob/main/src/constants/api.ts)

## Design

To start the design I first built out 3 screens in Photoshop, I always like to start here, as I can test different colour schemes.
![screen 1](https://github.com/markfarl/groupon_test/blob/main/public/screen1.png?raw=true)
![screen 2](https://github.com/markfarl/groupon_test/blob/main/public/screen2.png?raw=true)
I wanted a dark mode too so I tested this with some early mockups

![screen 3](https://github.com/markfarl/groupon_test/blob/main/public/screen3.png?raw=true)

## Development
### Tech

The Tech choices I decided are:

- React
- Typscript
- Vite - has super quick hotloading and compile
- Tailwind CSS - Good for quick t
- Vitest and React testing Library 

### Search
Search component works from context and will update based on URL, changes to the input box, changes to the limit option.
A single component does both pages, but debouncing is only active on the search page and not the front page.

### Debouncing 
The debounicng logic is set on a custom hook and called from the main `src/pages/Search.tsx` page

### Dark mode
Dark mode is set by changing `<body>` class, this is a tailwind convention. The choice is saved in local storage 

## Testing
Testing is done with Vitest and React testing Library, it has a focus on what user interactions are expected on each component as well as testing logic.

## CI/CD
I have setup some github actions to run the unit tests and the page is hosted on github pages



