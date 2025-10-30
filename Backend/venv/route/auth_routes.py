from flask import Blueprint, request, jsonify

auth_bp = Blueprint('auth', __name__)

#  admin credentials
ADMIN_ID = "admin123"
ADMIN_PASSWORD = "password123"

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user_id = data.get("user_id")
    password = data.get("password")

    if user_id == ADMIN_ID and password == ADMIN_PASSWORD:
        return jsonify({"success": True, "message": "Login successful!"}), 200
    else:
        return jsonify({"success": False, "message": "Invalid credentials"}), 401
