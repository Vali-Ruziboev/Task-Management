# Task Management
### Demo
   

https://user-images.githubusercontent.com/89704608/210167890-a4ffb48b-5a23-42c4-9971-60df90336530.mp4



### User Can:
 - Create/Update/Delete(soft delete) Tasks
 - Drag and Drop a task to a specific status to mark it as todo/in progress/completed
 - Tasks marked completed are deleted(soft delete) automatically in 30 days after marked as completed
 
### Tech Stack

- **Reactjs** - _https://reactjs.org/_
- **Laravel** - _https://laravel.com/docs/9.x_
- **SQLite** - _https://www.sqlite.org/index.html_

## Application Setup Enviroment (Quick Guide)

### Backend

1. Create `database.sqlite` file in backend `/database` directory

   ![image](https://user-images.githubusercontent.com/89704608/210167982-d1f55d44-702e-4a0d-83a6-024d531da05e.png)

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
