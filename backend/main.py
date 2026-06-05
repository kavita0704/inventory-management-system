from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from database import SessionLocal, engine
from models import Product, Customer, Order
from schemas import ProductCreate, CustomerCreate, OrderCreate
import models

models.Base.metadata.create_all(bind=engine)

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# PRODUCTS

@app.post("/products")
def create_product(product: ProductCreate):

    db = SessionLocal()

    existing = db.query(Product).filter(
        Product.sku == product.sku
    ).first()

    if existing:
        raise HTTPException(
            status_code=400,
            detail="SKU already exists"
        )

    new_product = Product(**product.model_dump())

    db.add(new_product)
    db.commit()

    return {"message": "Product created"}

@app.get("/products")
def get_products():

    db = SessionLocal()

    return db.query(Product).all()

# CUSTOMERS

@app.post("/customers")
def create_customer(customer: CustomerCreate):

    db = SessionLocal()

    existing = db.query(Customer).filter(
        Customer.email == customer.email
    ).first()

    if existing:
        raise HTTPException(
            status_code=400,
            detail="Email already exists"
        )

    new_customer = Customer(**customer.model_dump())

    db.add(new_customer)
    db.commit()

    return {"message": "Customer created"}

@app.get("/customers")
def get_customers():

    db = SessionLocal()

    return db.query(Customer).all()

# ORDERS

@app.post("/orders")
def create_order(order: OrderCreate):

    db = SessionLocal()

    product = db.query(Product).filter(
        Product.id == order.product_id
    ).first()

    if not product:
        raise HTTPException(
            status_code=404,
            detail="Product not found"
        )

    if product.quantity < order.quantity:
        raise HTTPException(
            status_code=400,
            detail="Insufficient stock"
        )

    total = product.price * order.quantity

    product.quantity -= order.quantity

    new_order = Order(
        customer_id=order.customer_id,
        product_id=order.product_id,
        quantity=order.quantity,
        total_amount=total
    )

    db.add(new_order)
    db.commit()

    return {
        "message": "Order created",
        "total_amount": total
    }

@app.get("/orders")
def get_orders():

    db = SessionLocal()

    return db.query(Order).all()
@app.delete("/products/{product_id}")
def delete_product(product_id: int):

    db = SessionLocal()

    product = db.query(Product).filter(
        Product.id == product_id
    ).first()

    if not product:
        raise HTTPException(
            status_code=404,
            detail="Product not found"
        )

    db.delete(product)
    db.commit()

    return {"message": "Product deleted"}