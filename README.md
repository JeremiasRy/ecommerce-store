# Front-end Project

![React](https://img.shields.io/badge/React-v.18-blue)
![Redux toolkit](https://img.shields.io/badge/Redux-v.1.9-purple)
![TypeScript](https://img.shields.io/badge/TypeScript-v.4.9-green)
![SASS](https://img.shields.io/badge/SASS-v.4.9-hotpink)

## Info 

Basic E-Commerce store setup using the above technologies. I used as an API end point the [platzi fake api](https://fakeapi.platzi.com/). <br/>
Tests can be run with `npm run test` everything should pass because there is a mock server for testing purposes. <br/>
I made all the styling myself from scratch thus it's pretty rough looking, but I wanted the practice. In the future I think I will just be using some ready made library for it.

## Live site

Deployed to [netlify](https://sweet-panda-ef92e4.netlify.app/) 

## Features

Browse all products, pagination is implemented by default but when using sorting or filtering functions it fetches all the products. <br/>
Login and Register functions (Register works if the email is available code block is commented out, the API has some problems with the email verification) <br/>
Notifications for everything you do and error handling <br/>
Checkout and user is stored in localstorage and the user is refreshed from the api everytime site is refreshed. <br/>
Admin priviledges include editing, updating and deleting products. <br/>
Private routes that are only accessible by logging in (Profile and create/update for admin)

## Get it running

`git clone` => `npm install` => `npm start` <br/>
And then for SASS (if for some reason you want to create some more stying) `npm run sass` <br/>

## Project structure

```
.
├───public
│       index.html
│
└───src
    │   App.tsx
    │   index.tsx
    │   react-app-env.d.ts
    │   reportWebVitals.ts
    │   setupTests.ts
    │
    ├───components
    │   │   LightCss.ts
    │   │   NotificationBar.tsx
    │   │   Slideshow.tsx
    │   │
    │   ├───filter
    │   │       FilterActions.tsx
    │   │       RadioButton.tsx
    │   │
    │   ├───header
    │   │       Breadcrumbs.tsx
    │   │       NavBar.tsx
    │   │
    │   └───main
    │           CategoryCard.tsx
    │           CheckoutTable.tsx
    │           ProductCard.tsx
    │           Productform.tsx
    │           SingleProductInfo.tsx
    │           UserForm.tsx
    │
    ├───hooks
    │       reduxHook.ts
    │
    ├───redux
    │   │   store.ts
    │   │
    │   └───reducers
    │           categoryReducer.ts
    │           checkoutReducer.test.ts
    │           checkoutReducer.ts
    │           loadingReducer.test.ts
    │           loadingReducer.ts
    │           notificationReducer.test.ts
    │           notificationReducer.ts
    │           productReducer.test.ts
    │           productReducer.ts
    │           userReducer.test.ts
    │           userReducer.ts
    │
    ├───routes
    │       Categories.tsx
    │       Checkout.tsx
    │       CreateProduct.tsx
    │       ErrorElement.tsx
    │       Home.tsx
    │       Login.tsx
    │       Products.tsx
    │       ProductsByCategory.tsx
    │       Profile.tsx
    │       Root.tsx
    │       SingleProduct.tsx
    │
    ├───services
    │       category.ts
    │       product.ts
    │       user.ts
    │
    ├───styles
    │   │   styles.scss
    │   │
    │   ├───abstracts
    │   │       _mixins.scss
    │   │       _variables.scss
    │   │
    │   ├───compiled
    │   │       styles.css
    │   │       styles.css.map
    │   │
    │   ├───features
    │   │       _basic-styles.scss
    │   │
    │   └───sections
    │           _body.scss
    │           _footer.scss
    │           _header.scss
    │           _main.scss
    │
    ├───types
    │   │   filter.ts
    │   │   user.ts
    │   │
    │   └───interfaces
    │           category.ts
    │           checkoutItem.ts
    │           credentials.ts
    │           notification.ts
    │           product.ts
    │
    └───utility
            dummyData.ts
            testServer.ts
```

## Pictures

![img](./demo%20pics/homepage.png)
![img](./demo%20pics/allproducts.png)
![img](./demo%20pics/login.png)
![img](./demo%20pics/checkout.png)
