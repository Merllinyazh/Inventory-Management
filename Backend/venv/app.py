from flask import Flask
from flask_cors import CORS
from route.auth_routes import auth_bp
from route.product import product_bp
from route.location import location_bp
from route.movement import movement_bp
from route.report import report_bp
app = Flask(__name__)
CORS(app)

# Register Blueprints
app.register_blueprint(auth_bp, url_prefix='/api')
app.register_blueprint(product_bp, url_prefix='/api')
app.register_blueprint(location_bp, url_prefix='/api')
app.register_blueprint(movement_bp, url_prefix='/api')
app.register_blueprint(report_bp, url_prefix="/api")
if __name__ == "__main__":
    app.run(debug=True)
