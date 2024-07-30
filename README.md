# Event Management (MERN stack Application):

### live link : https://event-management158.netlify.app

## 1. PROJECT OVERVIEW:
• It is an user specific application where user can manage the scheduled events with a weather update.

• Basically, user can read, add, update, deleted the events.

• Weatherbit api is used to fetch the weather forecast.

• User can also track the sessions.

## 2. APPLICATION SETUP AND RUN:

### 2.1. Clone Repository
```
git clone https://github.com/eswar7981/EventManagement.git
```
### 2.2 Move to the Directory
Open two terminals or use split terminal and move to the following directory in both terminals
```
cd EventManagement
```

### 2.3 Setup
2.3.1 Client

```
cd client
```
install required packages
```
npm install
```
2.3.2 Server

```
cd server
```
install required packages
```
npm install
```
### 2.4 Running Application

2.4.1 Client
```
npm start
```
2.4.2 Server
```
npm run dev
```
## 3. Technologies and Tools:

### Frontend : React, Material UI

### Backemd  : Express, mongoDB, supabase client, Node

## 4. API END POINTS:

### 4.1 User Authentication

### 4.1.1 Registration:

**HTTP Method: POST**

**URL: /api/authentication/register**

**Request body:**

```
{
name:'Eswar',
email:'email@gmail.com',
password:'password',
}
```

**Request headers:**

```
{
"Content-Type": "application/json"
}
```
**Response:**

**Success (200)**

**Error (400)**

```
{
error:"user already exists"
}
```

**Error (500)**

```
{
error:"Internal Server Error"
}
```
### 4.1.2 Sign-In:

**HTTP Method: POST**

**URL: /api/authentication/sign-in**

**Request body:**

```
{
email:'email@gmail.com',
password:'password',
}
```

**Request headers**

```
{
"Content-Type": "application/json"
}
```
**Response:**

**Success (200)**

```
{
sessionToken:token
}
```

**Error (400)**

```
{
error:"Invalid Login Credentials"
}
```

**Error (500)**

```
{
error:"Internal Server Error"
}
```
### 4.2 User Features

### 4.2.1 Fetch Weather Info:

**HTTP Method: GET**

**URL: /api/weather/:location**

**Request headers:**

```
{
"Content-Type": "application/json",
sessionToken:token
}
```
**Response:**

**Success (200)**
```
{
data:{weather information}
}
```

**Error (404)**

```
{
error:"no data found"
}
```

**Error (400)**

```
{
error:"Enter a valid location"
}
```

**Error (500)**

```
{
error:"Internal Server Error"
}
```

### 4.2.2 Add Event:

**HTTP Method: POST**

**URL: /api/events**

**Request body:**

```
{
name: 'Business Conference',
date: '2024-7-31',
location: 'mumbai',
description: 'a meeting with my client',
weatherInfo: 'scattered clouds and temperature will be around 28 C'
}
```

**Request headers**

```
{
"Content-Type": "application/json",
sessionToken:token
}
```
**Response:**

**Success (200)**

**Error (400)**

```
{
error:"Not a valid token"
}
```

**Error (500)**

```
{
error:"Internal Server Error"
}
```

### 4.2.3 Fetch Events:

**HTTP Method: GET**

**URL: /api/events**

**Request headers:**

```
{
"Content-Type": "application/json",
sessionToken:token
}
```
**Response:**

**Success (200)**
```
{
data:[
{
name: 'Business Conference',
date: '2024-7-31',
location: 'delhi',
description: 'a meeting with my clients',
weatherInfo: 'scattered clouds and temperature will be around 28.4 C'
},
{
name: 'Conference',
date: '2024-7-2',
location: 'delhi',
description: 'a meeting with my clients',
weatherInfo: 'thunderstorm and temperature will be around 25.3 C'
}
]
}
```
**Error (400)**

```
{
error:"Enter a valid location"
}
```

**Error (500)**

```
{
error:"Internal Server Error"
}
```

### 4.2.4 Update Event:

**HTTP Method: POST**

**URL: /api/events/:id**

**Request body:**

```
{
name: 'Business Conference',
date: '2024-7-31',
location: 'delhi',
description: 'a meeting with my clients',
weatherInfo: 'scattered clouds and temperature will be around 28 C'
}
```

**Request headers:**

```
{
"Content-Type": "application/json",
sessionToken:token
}
```
**Response:**

**Success (200)**

**Error (400)**

```
{
error:"Not a valid token"
}
```

**Error (500)**

```
{
error:"Internal Server Error"
}
```

### 4.2.5 Delete Event:

**HTTP Method: DELETE**

**URL: /api/events/:id**

**Request headers:**

```
{
"Content-Type": "application/json",
sessionToken:token
}
```
**Response:**

**Success (200)**

**Error (400)**

```
{
error:"Enter a valid token"
}
```

**Error (500)**

```
{
error:"Internal Server Error"
}
```

### 4.2.6 Get Sessions:

**HTTP Method: GET**

**URL: /api/sessions**

**Request headers:**

```
{
"Content-Type": "application/json",
sessionToken:token
}
```
**Response:**

**Success (200)**

```
{
data:
[{
_id:ObjectId('66a73e4b48c67a7c85697b9a')
userId:ObjectId('5f92cbf10cf217478ba93561'),
loginTime:2024-07-29T07:01:31.979+00:00,
logoutTime:2024-07-29T07:01:31.979+00:00,
ipAddress:'::1'
}]
}
```

**Error (400)**

```
{
error:"Enter a valid token"
}
```

**Error (500)**

```
{
error:"Internal Server Error"
}
```

### 4.2.7 log out:

**HTTP Method: DELETE**

**URL: /api/log-out**

**Request headers:**

```
{
"Content-Type": "application/json",
sessionToken:token
}
```
**Response:**

**Success (200)**

**Error (400)**

```
{
error:"Enter a valid token"
}
```

**Error (500)**

```
{
error:"Internal Server Error"
}
```

## 5. DATABASE (MongoDB) SCHEMAS:

### 5.1. User Schema

**Description:** Stores information about users of the application.

- **`_id`**: `ObjectId` (Primary Key)
- **`supabaseId`**: `ObjectId` (Required)
- **`name`**: `String` (Required) - The user's unique username.
- **`email`**: `String` (Unique, Required) - The user's email address.

 ### 5.2. Event Schema

**Description:** Stores information about event.

- **`_id`**: `ObjectId` (Primary Key)
- **`userId`**: `ObjectId` (Required)
- **`name`**: `String` (Required) 
- **`date`**: `Date` (Required) 
- **`location`**: `String` (Required) 
- **`weatherInfo`**: `String` (Required) 
- **`description`**: `String` (Required) 

### 5.3 Session Schema

**Description:** Stores information about user session.

- **`_id`**: `ObjectId` (Primary Key)
- **`userId`**: `ObjectId` (Required)
- **`loginTime`**: `Date` (Required)
- **`logoutTime`**: `Date` (Required)
- **`ipAddress`**: `String` (Required)

## 6. Challenges and Solutions:

• Weather forecast data, fetched from weather api contains lot of seperate columns, i read
  all the information and used only required fields to get a right conclusion out of it.
  
• I deployed the backend on render, but after some period of inactivity, server goes down. Inorder
  to avoid this, I used cron-jobs, which sends a request every period of time and makes server awake.


## 7. Future Improvements:

• Currently, weather forecast information shown to user is forecasted before the scheduled event date, But when user get close to the day of the event,
  weather may change which results in inaccurate information. So, what we can do is to fetch and update the forecast data once a day with 
  help of a scheduler like cron .
