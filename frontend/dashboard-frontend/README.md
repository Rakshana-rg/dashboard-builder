# Custom Dashboard Builder

##  Overview
The Custom Dashboard Builder allows users to create personalized dashboards by combining multiple widgets such as charts, tables, and KPI cards. The dashboard dynamically displays data from the Customer Order module.

## Tech Stack

*Frontend*
- React.js  
- Bootstrap  
- Chart.js  
- React Grid Layout  

*Backend* 
- Django  
- Django REST Framework  

*Database*  
- MySQL  

## Features

*Dashboard*
- Add widgets (Charts, Table, KPI)  
- Drag and resize widgets  
- Save dashboard configuration  
- Dynamic data from backend API  

*Charts*
- Bar Chart  
- Line Chart  
- Pie Chart  
- Area Chart  
- Scatter Plot  

*Table*
- Displays customer order data  

*KPI Card*
- Shows total revenue / summary values  

*Data Integration*
- Fetches real-time data from Django API  
- Updates dashboard dynamically  

*Customer Order Module*
- Create orders via Django Admin  
- Stores:  
  - Customer details  
  - Address  
  - Product info  
  - Quantity & pricing  
  - Status  

# API Endpoints
- Get Orders: `http://127.0.0.1:8000/api/orders/`  
- Dashboard Stats: `http://127.0.0.1:8000/api/dashboard/`  
  *username:admin*
  *password:admin@pass*
//to Run

*Backend*

cd backend/dashboard_project
python manage.py runserver

*Frontend*
cd frontend/dashboard-frontend
npm start

*Project Structure*
dashboard-builder/
│
├── backend/
│   ├── dashboard_project/
│   ├── orders/
│   ├── dashboard/
│
├── frontend/
│   ├── src/
│   ├── components/
|   ├──pages/
│
└── README.md

*working_demo* :
https://github.com/user-attachments/assets/5dbda936-7889-41ee-acc0-9e184ec4de7f

