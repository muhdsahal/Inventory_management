# Inventory API

A simple Product Inventory API built with Django and Django REST Framework.

## Features
- Product model: `name`, `price`, `stock`
- CRUD API endpoints: list, create, update, delete
- Validation: price must be non-negative
- Uses DRF `ModelSerializer` and generic class-based views

## Requirements
- Python 3.11+
- Django, Django REST Framework

## Setup

```bash
python -m venv .venv
. .venv/Scripts/activate
python -m pip install --upgrade pip
python -m pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
```

## API Endpoints
- List/Create: `GET /api/products/`, `POST /api/products/`
- Retrieve/Update/Delete: `GET /api/products/{id}/`, `PUT /api/products/{id}/`, `PATCH /api/products/{id}/`, `DELETE /api/products/{id}/`

### Example Payload
```json
{
  "name": "Notebook",
  "price": 3.99,
  "stock": 50
}
```


## GitHub
Initialize git and push to your GitHub repository:

```bash
git init
git add .
git commit -m "Inventory API with DRF CRUD and validation"
git branch -M main
git remote add origin https://github.com/<your-username>/inventory-api.git
git push -u origin main
```

## Frontend (Bonus)
You can scaffold a quick Next.js app to consume this API:

```bash
npx create-next-app@latest inventory-frontend --ts --eslint --src-dir --app
cd inventory-frontend
npm run dev
```

Then fetch from `http://localhost:8000/api/products/` and build a simple list + form.
