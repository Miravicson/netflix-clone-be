# Netflix Clone BE

Built with Node.Js powered by express.js and mongoDB

The API Root URL can be accessed [Here](https://netflix-clone-be.herokuapp.com/)

The Frontend URL can be accessed [Here](http://miravicson-netflix.netlify.com)



## Endpoints

1. */* - Home shows that api is working [GET] [NO AUTH]
2. */signup* - Create Account. [POST]  

    Headers = `{token: <Registration_Token>}
    Body = `{email: <Email>, password: <Password>}  
3. */login* - Login User. [POST] 

    Body = `{email: <Email>, password: <Password>}
4. */movies* - Fetch all saved movies [GET]
   
   Headers = `{Autorization: "Bearer <token>"}

5. */search/:query* - Search For movies [GET]
   
   Headers = `{Autorization: "Bearer <token>"}
   UrlParam = `:query`
   