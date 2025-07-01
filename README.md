# 🍱 Ordering System

This is a front-end and back-end split ordering platform, developed using Next.js for the front-end and Express.js for the back-end, and using PostgreSQL to store data. Users can log in and enter the console to view merchants, set personal information, and manage merchants and categories through an intuitive UI.

---

## Page Preview

> Below is a screenshot of the current interface, the actual screen is constantly being updated!

### Client

Home

![](https://github.com/linyuhao8/order/blob/main/client/public/home%20page2.png?raw=true)

Home page light mode

[https://github.com/linyuhao8/order/blob/main/client/public/home page1.png?raw=true](https://github.com/linyuhao8/order/blob/main/client/public/home%20page1.png?raw=true)

---

Login page

![](https://github.com/linyuhao8/order/blob/main/client/public/login1.png?raw=true)

---

merchant dashboard
![](https://github.com/linyuhao8/order/blob/main/client/public/dashboard1.png?raw=true)
![](https://github.com/linyuhao8/order/blob/main/client/public/dashboard2.png?raw=true)

---

add merchant and M_category page

![](https://github.com/linyuhao8/order/blob/main/client/public/add-merchant-and-category1.png?raw=true)
![](https://github.com/linyuhao8/order/blob/main/client/public/add-merchant-and-category2.png?raw=true)

---

media component

![](https://github.com/linyuhao8/order/blob/main/client/public/media.png?raw=true)
![](https://github.com/linyuhao8/order/blob/main/client/public/media-detail.png?raw=true)

---

Product / Menu management
![](https://github.com/linyuhao8/order/blob/main/client/public/produc-management.png?raw=true)

---

My Option
![](https://github.com/linyuhao8/order/blob/main/client/public/get-option-by-userid.png?raw=true)
![](https://github.com/linyuhao8/order/blob/main/client/public/get-option-by-merchatID.png?raw=true)
![](https://github.com/linyuhao8/order/blob/main/client/public/add-option-value.png?raw=true)

---

add menu and product page

![](https://github.com/linyuhao8/order/blob/main/client/public/add-menu.png?raw=true)
![](https://github.com/linyuhao8/order/blob/main/client/public/add-product.png?raw=true)

---

User Setting Pop-up window

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
├── client/                         # Frontend Next.js project
│   ├── public/                     # Static assets
│   ├── src/
│   │   ├── components/             # Shared UI components
│   │   ├    ├── common/            # common components(merchant and public can use)
│   │   ├    ├── merchant/          # merchant components
│   │   ├    ├── public/            # public components(only no login use)
│   │   ├── app/                    # Next.js pages and routing
│   │   ├    ├── public/            # public page
│   │   ├    ├── merchant/
│   │   ├           ├── dashboard/  # merchant dashboard page
│   │   ├── api/                    # API
│   │   ├── styles/                 # Styling configuration (Tailwind, global CSS)
│   │   ├── contexts/               # Context providers (e.g., for user session data)
│   │   ├── hoc/                    # Higher Order Components (e.g., withAuth for auth protection)
│   │   ├── hooks/                  # Custom React Hooks
│   │   ├── lib/                    # Redux-related files
│   └── package.json                # Frontend dependencies and scripts (e.g., `npm run dev`)
│
└── server/                         # Backend Express.js project
    ├── controllers/                # Business logic and request handlers
    ├── config/                     # Configuration files (DB, GCS, etc.)
    ├── models/                     # Sequelize models (database schema)
    ├── routes/                     # API routes
    ├── migrations/                 # DB Changed Backup
    ├── middlewares/                # Middlewares (JWT auth, GCS upload, error handling)
    ├── validations/                # Joi validation schemas
    └── swagger.js/                 # Swagger UI config and YAML documentation
    ├── .env                        # Environment variables (e.g., GCS key, DB URL)
    ├── swagger-output.json         # Generated OpenAPI documentation
    ├── gcs-key.json                # Google Cloud Storage credentials
    ├── swagger.js                  # Swagger initialization
    ├── app.js                      # Main app setup (Express app)
    ├── server.js                   # Server entry (connects and runs the app)
    └── package.json                # Backend dependencies and scripts (e.g., `npm start`)
```

---

## ⚙️ Tech Stack

**Frontend**

- **Next.js** – React-based framework for server-side rendering and routing
- **Tailwind CSS** – Utility-first CSS framework for styling
- **Axios** – Promise-based HTTP client for API communication
- **Redux** – State management (used for features like dark mode)
- **recharts**
- **cookies-next**

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
#database node
NODE_ENV=development #development or production

#PostgreSql
SUPABASE_DATABASE_URL=postgresql://<user>:<password>@aws-0-ap-northeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true
# ?pgbouncer=true
LOCAL_DATABASE_URL=postgres://postgres:20779867@localhost:5432/orderDB

SUPABASE_DB_USER=<your-database-username>
SUPABASE_DB_PASSWORD=<your-database-password>
SUPABASE_DB_HOST=aws-0-ap-northeast-1.pooler.supabase.com
SUPABASE_DB_PORT=6543
SUPABASE_DB_NAME=postgres
SUPABASE_DB_DIALECT=postgres


#選擇要線上還是本地，把comment掉就好
#MONGO_URI=mongodb://127.0.0.1:27017/orderDB
MONGO_URI=mongodb+srv://<user>:<password>@project1.d1ulg.mongodb.net/orderDB?retryWrites=true&w=majority

#後端使用網址
SERVER_PORT_ENV=8080

#JWT
JWT_SECRET=hellott

#Google Cloud Storage
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
npm run swagger.js
node server.js
# if you have nodemen , npm start
```

---

## 🖥 Features (Completed)

### Auth & User

- JWT Login + redirect if not logged in
- Auto redirect by user role (e.g. user can't access merchant dashboard)
- User profile modal (view/edit)
- Toast notifications (login, merchant/category/profile)

### Dashboard & UI

- Dashboard mockup with user info and sample charts（I haven't written the API yet. It's on display.）
- Dark mode toggle (via Redux)

### Multi-Tenant (Merchant)

- Current merchant managed via Redux → fallback to cookie
- Default to first merchant after login
- Merchant switch like GCP project selector
- Add merchant / category (`mdd-merchant` page)
- List all merchants (`select` page)

### Menu & Product & Options

- Add products per merchant
- Add multiple options (number, text, checkbox, select)
  - Ex: Spicy level (mild/medium/hot), Toppings (芋圓/湯圓/粉條)

### Media Library

- Upload / delete / select images (stored in GCS)
- Reusable `media` component
- Image relation:
  - One-to-many: store `image.uuid`
  - Many-to-many: use pivot table

### Merchant Roles

- Merchants support multiple users
- Upload merchant logo, set categories, etc.

---

## Swagger UI (API Docs)

The backend is integrated with Swagger UI for quick preview of all available APIs and model structures.

Once the backend is running, you can view it directly:

- 👉 [Swagger UI Page](http://localhost:8080/api-docs)

---

## Database Model Summary

👉 [DataBase-Design-map](https://www.figma.com/board/gApRMrBsot08r0lVlDOOjp/order-db-design?node-id=0-1&t=4BVeEKLw70sQkGvL-1)

# Database Models Overview

| Model            | References                                                                                                                          | Fields                                                                                                                                              |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| User             | hasOne(Admin), hasMany(Merchant), hasMany(Image)                                                                                    | id, name, email, password, phoneNumber, address, role                                                                                               |
| Admin            | belongsTo(User)                                                                                                                     | id, user_id                                                                                                                                         |
| Merchant         | belongsTo(User), hasMany(Menu), hasMany(ProductOption), hasMany(MerchantCategory), belongsToMany(ProductCategory), belongsTo(Image) | id, user_id, business_name, description, feature, merchant_logo (abandoned), location, image_id, business_hours                                     |
| Image            | belongsTo(User), hasMany(MCategory), hasMany(Merchant)                                                                              | id, filename, url, user_id, width, height, size, mime_type, timespace                                                                               |
| MerchantCategory | belongsTo(Merchant), belongsTo(MCategory)                                                                                           | merchant_id, category_id                                                                                                                            |
| MCategory        | belongsToMany(ProductCategory), belongsTo(Image)                                                                                    | id, name, img (abandoned), description, img_id                                                                                                      |
| Menu             | belongsTo(Merchant), hasMany(Product)                                                                                               | id, name, description, merchant_id                                                                                                                  |
| Product          | belongsTo(Menu), hasMany(ProductImg), belongsToMany(ProductCategory), belongsToMany(ProductOption)                                  | id, name, description, price, menu_id                                                                                                               |
| ProductImg       | belongsTo(Product)                                                                                                                  | id, product_id, image_url, title, description                                                                                                       |
| ProductOption    | belongsTo(Product), belongsTo(Option) (junction table)                                                                              | id, product_id, option_id, required (boolean), sort_order (int), created_at, updated_at                                                             |
| Option           | hasMany(OptionValue), belongsToMany(Product through ProductOption), hasMany(OptionCategory)                                         | id, name, type (enum: select, checkbox, text, number), description, min_select, max_select, user_id, merchant_id, is_global, created_at, updated_at |
| OptionValue      | belongsTo(Option)                                                                                                                   | id, option_id, values, extra_price, is_default, sort_order, created_at, updated_at                                                                  |
| ProductCategory  | belongsTo(Product), belongsTo(Category)                                                                                             | product_id, category_id                                                                                                                             |
| P_Category       | belongsToMany(ProductCategory)                                                                                                      | id, name, description, img                                                                                                                          |
| Option_Category  | belongsTo(Option), belongsTo(O_Category) (junction table)                                                                           | id, option_id, o_category_id, created_at, updated_at                                                                                                |
| O_Category       | hasMany(OptionCategory)                                                                                                             | id, name, description, created_at, updated_at                                                                                                       |

---

## Next Steps / Roadmap

### Feature

- Public merchant API for guest homepage
- Product module: publish/unpublish toggle
- Order system: user-facing + admin interface
- Role-based access control (RBAC)

### Discovery & Ranking

- Merchant search with keyword relevance
- Popularity ranking based on views/sales/ratings
- Hot keyword tracking & autocomplete suggestions

### Performance & Infra

- Redis caching for homepage & frequent queries
- Dashboard charts with real-time backend data
- CI/CD pipeline (GitHub Actions + AWS or GCP)
- Consider background jobs (e.g. ranking sync, media cleanup)

### Future Ideas

- Merchant verification & approval flow
- Analytics dashboard for merchants (traffic, conversion)
- Multilingual support for merchant pages

---

## How to Contribute

1. Fork this project
2. Create a feature branch: `feature/your-feature`
3. Submit a Pull Request (PR) — I’ll assist with code review

---
