from flask import Blueprint, request, jsonify
from helper import insert_record, fetch_all_records,update_record

location_bp = Blueprint('location', __name__)

@location_bp.route('/locations', methods=['GET'])
def get_locations():
    locations = fetch_all_records('locations')
    return jsonify(locations)

@location_bp.route('/locations', methods=['POST'])
def add_location():
    data = request.get_json()
    insert_record('locations', data)
    return jsonify({'success': True,'message': 'Location added successfully'})

@location_bp.route('/locations/<location_id>', methods=['PUT'])
def update_location(location_id):
    try:
        data = request.get_json()
        update_record('locations', data, 'location_id', location_id)
        return jsonify({'success': True, 'message': 'Location updated successfully'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500