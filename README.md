# Mark Farrell Groupon Excerise

Live version can be seen here on github pages 
[github.com/markfarl/groupon_test](https://github.com/markfarl/groupon_test)

This excerise consists of two repos

Groupon FE built in react 
and 
Groupon_serve which is hosted on AWS instance 

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

My Tech stack I decided was:

React
Typscript
Vite which has super quick hotloading and compile
Tailwind CSS - which probably has no advantage, I will probaly use vanilla CSS going forward
Vitest and React testing Library 

### Search
Search component works from context and will update based on URL, a single component does both pages, but deboucing is only active on the search page and not the front page.

### Debouncing 


### Dark mode


## Testing



