# Front-end Project

![React](https://img.shields.io/badge/React-v.18-blue)
![Redux toolkit](https://img.shields.io/badge/Redux-v.1.9-purple)
![TypeScript](https://img.shields.io/badge/TypeScript-v.4.9-green)
![SASS](https://img.shields.io/badge/SASS-v.4.9-hotpink)

## Info 

Basic E-Commerce store setup using the above technologies. I used as an API end point the [platzi fake api](https://fakeapi.platzi.com/). <br/>
Tests can be run with `npm run test` everything should pass because there is a mock server for testing purposes. <br/>
I made all the styling myself from scratch thus it's pretty rough looking, but I wanted the practice. In the future I think I will just be using some ready made library for it.

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
    │       Breadcrumbs.tsx
    │       CategoryCard.tsx
    │       LightCss.ts
    │       NotificationBar.tsx
    │       ProductCard.tsx
    │       Productform.tsx
    │       RadioButton.tsx
    │       Slideshow.tsx
    │       UserForm.tsx
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
    │       Home.tsx
    │       Login.tsx
    │       Products.tsx
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
    │   └───interfaces
    │           category.ts
    │           checkoutItem.ts
    │           credentials.ts
    │           notification.ts
    │           product.ts
    │           user.ts
    │
    └───utility
            dummyData.ts
            testServer.ts
```




