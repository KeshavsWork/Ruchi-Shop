from fastapi import APIRouter, HTTPException, Depends, Header
from datetime import datetime
from database import products_coll, orders_coll
from models import OrderIn
from bson import ObjectId

router = APIRouter(prefix="/orders", tags=["orders"])

@router.post("", status_code=201)
async def create_order(order: OrderIn):
    # server-side compute total from current product prices
    products = []
    product_map = {}
    for it in order.items:
        prod = await products_coll.find_one({"_id": ObjectId(it.productId)})
        if not prod:
            raise HTTPException(status_code=404, detail=f"Product {it.productId} not found")
        product_map[it.productId] = prod
        products.append(prod)

    computed_total = 0.0
    for it in order.items:
        prod = product_map[it.productId]
        price = float(prod.get("priceUnit", 0))
        computed_total += price * it.qty

    # Optional: compare computed_total with client-provided (if client sent total). Not strictly required.
    # Validate stock and decrement using conditional update to reduce race issues
    # We'll attempt to decrement stock; if any update fails (stock insufficient), we abort.
    # perform checks first
    for it in order.items:
        prod = product_map[it.productId]
        if prod.get("stock", 0) < it.qty:
            raise HTTPException(status_code=400, detail=f"Not enough stock for {prod.get('name')}")

    # decrement stock (non-transactional per-driver) using find_one_and_update with $inc and condition
    for it in order.items:
        res = await products_coll.find_one_and_update(
            {"_id": ObjectId(it.productId), "stock": {"$gte": it.qty}},
            {"$inc": {"stock": -it.qty}}
        )
        if res is None:
            # rollback previously decremented items (best effort) - we'll increment back
            for prev in order.items:
                if prev.productId == it.productId:
                    break
                await products_coll.update_one({"_id": ObjectId(prev.productId)}, {"$inc": {"stock": prev.qty}})
            raise HTTPException(status_code=400, detail=f"Not enough stock for {it.productId} (concurrency)")

    order_record = {
        "userId": order.userId,
        "items": [it.dict() for it in order.items],
        "totalAmount": computed_total,
        "paymentStatus": "pending",
        "orderStatus": "placed",
        "shippingAddress": order.shippingAddress or {},
        "createdAt": datetime.utcnow().isoformat()
    }

    res = await orders_coll.insert_one(order_record)
    order_record["_id"] = str(res.inserted_id)
    return {"message": "order placed", "order": order_record}
