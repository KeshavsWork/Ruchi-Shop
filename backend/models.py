# backend/models.py
from pydantic import BaseModel, EmailStr, Field
from typing import List, Optional

class UserIn(BaseModel):
    name: str
    email: EmailStr
    password: str

class UserOut(BaseModel):
    id: str
    name: str
    email: EmailStr
    role: Optional[str] = "customer"

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"

class ProductBase(BaseModel):
    name: str
    category: Optional[str] = "General"
    priceUnit: float
    priceLabel: Optional[str]
    unit: Optional[str] = "kg"
    images: Optional[List[dict]] = []
    stock: int = 0
    description: Optional[str] = None
    isActive: Optional[bool] = True

class ProductCreate(ProductBase):
    pass

class ProductOut(ProductBase):
    id: str = Field(..., alias="_id")

class OrderItem(BaseModel):
    productId: str
    name: str
    priceUnit: float
    qty: int

class OrderIn(BaseModel):
    userId: str
    items: List[OrderItem]
    shippingAddress: Optional[dict] = {}
    paymentMethod: Optional[str] = "cod"

class OrderOut(BaseModel):
    id: str = Field(..., alias="_id")
    userId: str
    items: List[OrderItem]
    totalAmount: float
    paymentStatus: str
    orderStatus: str
