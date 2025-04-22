# 🍱 Ordering System

This is a front-end and back-end split ordering platform, developed using Next.js for the front-end and Express.js for the back-end, and using PostgreSQL to store data. Users can log in and enter the console to view merchants, set personal information, and manage merchants and categories through an intuitive UI.

---

## 📸 Page Preview

> Below is a screenshot of the current interface, the actual screen is constantly being updated!
> 

### Client

Home

![](https://github.com/linyuhao8/order/blob/main/client/public/home%20page2.png?raw=true)

Home page light mode

[https://github.com/linyuhao8/order/blob/main/client/public/home page1.png?raw=true](https://github.com/linyuhao8/order/blob/main/client/public/home%20page1.png?raw=true)

---

Login page 

![](https://github.com/linyuhao8/order/blob/main/client/public/login1.png?raw=true)

https://github.com/linyuhao8/order/blob/main/client/public/login2.png?raw=true

---

merchant dashboard

![](https://github.com/linyuhao8/order/blob/main/client/public/merchant%20dashboard1.png?raw=true)

[https://github.com/linyuhao8/order/blob/main/client/public/merchant dashboard2.png?raw=true](https://github.com/linyuhao8/order/blob/main/client/public/merchant%20dashboard2.png?raw=true)

---

add merchant category page

![](https://github.com/linyuhao8/order/blob/main/client/public/add%20merchant%20category.png?raw=true)

add merchant page

https://dai.ly/k4AHXFJJeUBVFbCUjdI

![](https://github.com/linyuhao8/order/blob/main/client/public/add%20merchant.png?raw=true)

---

media component

https://dai.ly/k23Cbl587A7whACUjdK

![](https://github.com/linyuhao8/order/blob/main/client/public/media1.png?raw=true)

https://github.com/linyuhao8/order/blob/main/client/public/media2.png?raw=true

---

merchant list

[https://github.com/linyuhao8/order/blob/main/client/public/merchant list select1.png?raw=true](https://github.com/linyuhao8/order/blob/main/client/public/merchant%20list%20select1.png?raw=true)

![](https://github.com/linyuhao8/order/blob/main/client/public/merchant%20list%20select2.png?raw=true)

---

merchant profile

[https://github.com/linyuhao8/order/blob/main/client/public/merchant profile.png?raw=true](https://github.com/linyuhao8/order/blob/main/client/public/merchant%20profile.png?raw=true)

---

setting Pop-up window

https://github.com/linyuhao8/order/blob/main/client/public/setting1.png?raw=true

![](https://github.com/linyuhao8/order/blob/main/client/public/setting2.png?raw=true)

### Server

model db(subabase) 

![](https://github.com/linyuhao8/order/blob/main/client/public/db-model.png?raw=true)

media upload img will save in google cloud storage.png

![](https://github.com/linyuhao8/order/blob/main/client/public/media%20upload%20img%20will%20save%20in%20google%20cloud%20storage.png?raw=true)

---

## 🧩 Project Organization

```
ordering-system/
├── client/                     # Frontend Next.js project
│   ├── public/                 # Static assets
│   ├── src/
│   │   ├── components/         # Shared UI components
│   │   ├── app/                # Next.js pages and routing
│   │   ├── styles/             # Styling configuration (Tailwind, global CSS)
│   │   ├── context/            # Context providers (e.g., for user session data)
│   │   ├── hoc/                # Higher Order Components (e.g., withAuth for auth protection)
│   │   ├── hooks/              # Custom React Hooks
│   │   ├── lib/                # Redux-related files
│   └── package.json            # Frontend dependencies and scripts (e.g., `npm run dev`)
│
└── server/                     # Backend Express.js project
    ├── src/
    │   ├── controllers/        # Business logic and request handlers
    │   ├── config/             # Configuration files (DB, GCS, etc.)
    │   ├── models/             # Sequelize models (database schema)
    │   ├── routes/             # API routes
    │   ├── middlewares/        # Middlewares (JWT auth, GCS upload, error handling)
    │   ├── validations/        # Joi validation schemas
    │   └── swagger/            # Swagger UI config and YAML documentation
    ├── .env                    # Environment variables (e.g., GCS key, DB URL)
    ├── swagger-output.json     # Generated OpenAPI documentation
    ├── gcs-key.json            # Google Cloud Storage credentials
    ├── swagger.js              # Swagger initialization
    ├── app.js                  # Main app setup (Express app)
    ├── server.js               # Server entry (connects and runs the app)
    └── package.json            # Backend dependencies and scripts (e.g., `npm start`)
```

---

## ⚙️ Tech Stack

**Frontend**

- **Next.js** – React-based framework for server-side rendering and routing
- **Tailwind CSS** – Utility-first CSS framework for styling
- **Axios** – Promise-based HTTP client for API communication
- **Redux** – State management (used for features like dark mode)

**Backend**

- **Express.js** – Fast, unopinionated Node.js web framework
- **Sequelize** – Promise-based ORM for PostgreSQL
- **PostgreSQL** – Relational database
- **Swagger UI** – API documentation and testing interface
- **JWT (JSON Web Token)** – Authentication and authorization
- **Bcrypt** – Password hashing and security
- **@google-cloud/storage** – Upload and manage media files in Google Cloud Storage
- **Joi** – Schema-based request data validation
- **Sharp** – Image processing (e.g., resizing, reading dimensions)

---

## 🚀 Quick Start

### fill out.ENV

### client/.env

```env
NEXT_PUBLIC_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:8080

```

### server/.env

```env
#database mode
NODE_ENV=production  #dev or production

#PostgreSql
SUPABASE_DATABASE_URL=postgresql://<user>:<password>@aws-0-ap-northeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true
LOCAL_DATABASE_URL=postgres://postgres:20779867@localhost:5432/orderDB
SUPABASE_DB_USER=<your-database-username>
SUPABASE_DB_PASSWORD=<your-database-password>
SUPABASE_DB_HOST=aws-0-ap-northeast-1.pooler.supabase.com
SUPABASE_DB_PORT=6543
SUPABASE_DB_NAME=postgres
SUPABASE_DB_DIALECT=postgres

#Choose whether you want online or local, just drop the comment.
#MONGO_URI=mongodb://127.0.0.1:27017/orderDB
MONGO_URI=mongodb+srv://<user>:<password>@project1.d1ulg.mongodb.net/orderDB?retryWrites=true&w=majority

#backend port
SERVER_PORT_ENV=8080

#JWT
JWT_SECRET=hellott

#Google Cloud Storage Fill out the form to use the media function
BUCKET_NAME=order-storage
KEYFILENAME=gcs-key.json
```

### install and start project

```bash
# Client
cd client
npm install
npm run dev

# Server
cd ../server
npm install
node server.js
# if you have nodemen , npm start
```

---

## 🖥 Features (Completed)

- ✅ JWT Login / Authentication (with redirect if not logged in)
- ✅ Dashboard mockup (displays user info with sample data and charts)
- ✅ Add new Merchant / Add Merchant Category (`mdd-merchant` page)
- ✅ User profile settings via modal (view / edit)
- ✅ List all merchants owned by the logged-in user (`select` page)
- ✅ Media library (upload, delete, and select images via `component midea`)
- ✅ Dark mode toggle(Redux)
- ✅ Toast notifications for success / error (login, add merchant, add category, update profile)

---

## 🔧 Swagger UI (API Docs)

The backend is integrated with Swagger UI for quick preview of all available APIs and model structures.

Once the backend is running, you can view it directly:

- 👉 [Swagger UI Page](http://localhost:8080/api-docs)

---

## 🧱 Database Model Summary

👉 [DataBase-Design-map](https://www.figma.com/board/gApRMrBsot08r0lVlDOOjp/order-db-design?node-id=0-1&t=4BVeEKLw70sQkGvL-1)

| Model | references | field |
| --- | --- | --- |
| **User** | hasOne(Admin)、hasMany(Merchant)、hasMany(Image) | `id`, `name`, `email`, `password`, `phoneNumber`, `address`, `role` |
| **Admin** | belongsTo(User) | `id`, `user_id` |
| **Merchant** | belongsTo(User)、hasMany(Menu)、hasMany(ProductOption)、hasMany(MerchantCategory)、belongsTo(Image) | `id`, `user_id`, `business_name`, `description`, `feature`, `location`, `image_id`, `business_hours` |
| **Image** | belongsTo(User)、hasMany(Merchant)、hasMany(MCategory) | `id`, `filename`, `url`, `user_id`, `width`, `height`, `size`, `mime_type`, `timespace` |
| **MerchantCategory** | belongsTo(Merchant)、belongsTo(MCategory) | `merchant_id`, `category_id` |
| **MCategory** | belongsTo(Image)、belongsToMany(ProductCategory) | `id`, `name`, `description`, `img_id`（`img` Fields are abandoned） |
| **Menu** | belongsTo(Merchant)、hasMany(Product) | `id`, `name`, `description`, `merchant_id` |
| **Product** | belongsTo(Menu)、hasMany(ProductImg)、belongsToMany(ProductCategory)、belongsToMany(ProductOption) | `id`, `name`, `description`, `price`, `menu_id` |
| **ProductImg** | belongsTo(Product) | `id`, `product_id`, `image_url`, `title`, `description` |
| **ProductOption** | belongsTo(Product)、belongsTo(Option)、belongsTo(Merchant) | `id`, `product_id`, `option_id`, `is_custom`, `merchant_id` |
| **Option** | hasMany(OptionValue)、belongsTo(Category) | `id`, `name`, `category_id`, `type` |
| **OptionValue** | belongsTo(Option) | `id`, `option_id`, `option_values`, `extra_price` |
| **ProductCategory** | belongsTo(Product)、belongsTo(Category) | `product_id`, `category_id` |
| **Category** | hasMany(ProductCategory) | `id`, `name`, `description`, `img` |

## ✅ Optimization Suggestions

- **Replace all bidirectional bindings with unidirectional associations**
    
    Avoid using both `hasMany` and `belongsTo` simultaneously. Instead, keep only `belongsTo` relationships to reduce circular dependencies, save database resources, and make the system easier to maintain.
    
- **Refactor backend logic using Classes**
    
    Organize repeated API logic and ORM interactions into reusable service or controller classes. This approach promotes better code reuse, cleaner structure, and easier debugging or testing in the long run.
    
- **Separate and modularize frontend API logic**
    
    Refactor frontend API calls into reusable modules or hooks (e.g., `useUser`, `useMerchants`, `merchantService`) to improve maintainability, testability, and reduce code duplication across components.
    

---

## 📌 Next Steps / Roadmap

- Add a public API to display merchant list on the homepage for non-logged-in users
- Product management module (including publish/unpublish status)
- Order system design and implementation
- User roles and permission management
- Dashboard chart integration with backend data
- CI/CD pipeline setup (GitHub Actions + Cloud Run)

---

## 🙌 How to Contribute

1. Fork this project
2. Create a feature branch: `feature/your-feature`
3. Submit a Pull Request (PR) — I’ll assist with code review

---
