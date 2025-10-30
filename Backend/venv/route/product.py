from flask import Blueprint, request, jsonify
from helper import insert_record, fetch_all_records,execute_query,update_record

product_bp = Blueprint('product', __name__)

@product_bp.route('/product', methods=['GET'])
def get_products():
    try:
        rows = fetch_all_records('products')
        return jsonify(rows), 200
    except Exception as e:
        print(f" Error fetching products: {e}")
        return jsonify({"error": str(e)}), 500

@product_bp.route('/product', methods=['POST'])
def add_product():
    data = request.get_json()
    insert_record('products', data)
    return jsonify({'success': True, 'message': 'Product added successfully'})

@product_bp.route('/product/<product_id>', methods=['DELETE'])
def delete_product(product_id):
    query = "DELETE FROM products WHERE product_id = %s"
    execute_query(query, (product_id,))
    return jsonify({'success': True, 'message': 'Product deleted successfully'})

@product_bp.route('/product/<product_id>', methods=['PUT'])
def update_product(product_id):
    data = request.get_json()
    update_record("products", 
                  {"product_name": data["product_name"], "qty": data["qty"]},
                  "product_id", product_id)
    return jsonify({"success": True, "message": "Product updated successfully"})