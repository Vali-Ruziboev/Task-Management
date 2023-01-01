# Task Management

### Tech Stack

- **Reactjs** - _https://reactjs.org/_
- **Laravel** - _https://laravel.com/docs/9.x_
- **SQLite** - _https://www.sqlite.org/index.html_

## Application Setup Enviroment (Quick Guide)

### Backend

1. Create `database.sqlite` file in backend `/database` directory
2. Run Migration

```
cd .\backend\
php artisan migrate
```

3. Start backend

```
php artisan serve
```

### Frontend

1. Install dependencies

```
cd .\frontend\
npm install
```

2. Create .env.local file in root directory of `frontend` folder
   - Please follow the `.env.local.example` file in that directory
3. Start frontend

```
npm start
```

## API endpoints in Postman

- https://www.postman.com/valiruziboev/workspace/task-management
