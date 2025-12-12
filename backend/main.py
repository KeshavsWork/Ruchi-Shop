# from fastapi import FastAPI
# from pydantic import BaseModel
# from typing import List
# from fastapi.middleware.cors import CORSMiddleware
# import json
# import os

# app = FastAPI()

# # ✅ Allow React to talk to FastAPI
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["http://localhost:5173", "http://localhost:3000"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# ORDERS_FILE = "orders.json"

# # ✅ Order Item Schema
# class OrderItem(BaseModel):
#     id: int
#     name: str
#     priceUnit: float
#     qty: int

# # ✅ Order Schema
# class Order(BaseModel):
#     user: str
#     items: List[OrderItem]
#     totalAmount: float

# # ✅ Create orders file if not exists
# def init_orders_file():
#     if not os.path.exists(ORDERS_FILE):
#         with open(ORDERS_FILE, "w") as f:
#             json.dump([], f)

# init_orders_file()

# # ✅ Health Check
# @app.get("/")
# def root():
#     return {"status": "FastAPI Backend Running"}

# # ✅ PLACE ORDER API
# @app.post("/orders")
# def place_order(order: Order):
#     with open(ORDERS_FILE, "r") as f:
#         orders = json.load(f)

#     orders.append(order.dict())

#     with open(ORDERS_FILE, "w") as f:
#         json.dump(orders, f, indent=4)

#     return {
#         "message": "Order placed successfully",
#         "order": order
#     }

# backend/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os

load_dotenv()

from routers import auth, products, orders

app = FastAPI(title="Ruchi Backend (FastAPI + Motor)")

origins = [
    "http://localhost:5173",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(products.router)
app.include_router(orders.router)

@app.get("/")
async def root():
    return {"status": "Ruchi backend running"}
