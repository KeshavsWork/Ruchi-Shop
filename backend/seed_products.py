import asyncio
import json
from database import products_coll
from pathlib import Path

async def run():
    path = Path(__file__).parent / "products.json"
    if not path.exists():
        print("products.json not found. Create it with sample data.")
        return
    data = json.loads(path.read_text(encoding="utf-8"))
    print(f"Found {len(data)} products; inserting...")
    # optionally clear existing
    await products_coll.delete_many({})
    for p in data:
        doc = p.copy()
        # ensure numeric fields
        doc["priceUnit"] = float(doc.get("priceUnit", 0))
        doc["stock"] = int(doc.get("stock", 0))
        await products_coll.insert_one(doc)
    print("Done.")

if __name__ == "__main__":
    asyncio.run(run())
