from fastapi import APIRouter, HTTPException, Depends
from models import UserIn, UserOut, TokenResponse
from database import users_coll
from security import hash_password, verify_password, create_access_token
from bson import ObjectId

router = APIRouter(prefix="/auth", tags=["auth"])

@router.post("/signup", response_model=UserOut)
async def signup(payload: UserIn):
    email = payload.email.lower()
    existing = await users_coll.find_one({"email": email})
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")
    user_doc = {
        "name": payload.name,
        "email": email,
        "passwordHash": hash_password(payload.password),
        "role": "customer",
        "createdAt": __import__("datetime").datetime.utcnow().isoformat()
    }
    res = await users_coll.insert_one(user_doc)
    user_doc["_id"] = str(res.inserted_id)
    return UserOut(id=user_doc["_id"], name=user_doc["name"], email=user_doc["email"], role=user_doc["role"])

@router.post("/login", response_model=TokenResponse)
async def login(payload: UserIn):
    # Here payload contains email + password
    email = payload.email.lower()
    user = await users_coll.find_one({"email": email})
    if not user or not verify_password(payload.password, user.get("passwordHash", "")):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    token = create_access_token(str(user["_id"]), extra={"name": user.get("name"), "role": user.get("role")})
    return {"access_token": token, "token_type": "bearer"}
