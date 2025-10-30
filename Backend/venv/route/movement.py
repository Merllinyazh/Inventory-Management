from flask import Blueprint, request, jsonify
from helper import insert_record, fetch_all_records, execute_query, update_record

movement_bp = Blueprint('movement', __name__)

@movement_bp.route('/movements', methods=['GET'])
def get_movements():
    movements = fetch_all_records('movements')
    return jsonify(movements)

@movement_bp.route('/movements', methods=['POST'])
def add_movement():
    data = request.get_json()
    insert_record('movements', data)
    execute_query(
        "UPDATE products SET qty = qty - %s WHERE product_id = %s",
        (data['mov_qty'], data['product_id'])
    )
    return jsonify({'success': True})

@movement_bp.route('/movements/<movement_id>', methods=['PUT'])
def update_movement(movement_id):
    data = request.get_json()
    update_record('movements', data, 'movement_id', movement_id)
    return jsonify({'success': True})
