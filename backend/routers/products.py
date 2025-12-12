from fastapi import APIRouter, HTTPException
from typing import List
from database import products_coll
from models import ProductCreate
from bson import ObjectId

router = APIRouter(prefix="/products", tags=["products"])

def _to_out(doc):
    doc["id"] = str(doc["_id"])
    doc.pop("passwordHash", None)
    doc["_id"] = str(doc["_id"])
    return doc

@router.get("", response_model=List[dict])
async def list_products():
    docs = []
    cursor = products_coll.find({"isActive": True})
    async for d in cursor:
        d["_id"] = str(d["_id"])
        docs.append(d)
    return docs

@router.get("/{product_id}")
async def get_product(product_id: str):
    doc = await products_coll.find_one({"_id": ObjectId(product_id)})
    if not doc:
        raise HTTPException(status_code=404, detail="Product not found")
    doc["_id"] = str(doc["_id"])
    return doc

@router.post("", response_model=dict)
async def create_product(payload: ProductCreate):
    doc = payload.dict()
    res = await products_coll.insert_one(doc)
    doc["_id"] = str(res.inserted_id)
    return doc

@router.put("/{product_id}")
async def update_product(product_id: str, payload: ProductCreate):
    doc = payload.dict()
    res = await products_coll.update_one({"_id": ObjectId(product_id)}, {"$set": doc})
    if res.matched_count == 0:
        raise HTTPException(status_code=404, detail="Not found")
    updated = await products_coll.find_one({"_id": ObjectId(product_id)})
    updated["_id"] = str(updated["_id"])
    return updated

@router.delete("/{product_id}")
async def delete_product(product_id: str):
    res = await products_coll.delete_one({"_id": ObjectId(product_id)})
    if res.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Not found")
    return {"status": "deleted"}
