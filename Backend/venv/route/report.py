from flask import Blueprint, jsonify, Response
from helper import execute_query
import csv
import io

report_bp = Blueprint('report', __name__)

@report_bp.route('/report', methods=['GET'])
def get_product_report():
    query = """
        SELECT 
            p.product_name AS product_name,
            l.location_name AS warehouse,
            IFNULL(SUM(m.mov_qty), 0) AS qty
        FROM products p
        JOIN movements m ON p.product_id = m.product_id
        JOIN locations l ON l.location_name = m.to_location
        GROUP BY p.product_name, l.location_name
        ORDER BY p.product_name, l.location_name;
    """
    report_data = execute_query(query, fetch=True)
    return jsonify(report_data)


@report_bp.route('/report/download', methods=['GET'])
def download_product_report():
    query = """
        SELECT 
            p.product_name AS product_name,
            l.location_name AS warehouse,
            IFNULL(SUM(m.mov_qty), 0) AS qty
        FROM products p
        JOIN movements m ON p.product_id = m.product_id
        JOIN locations l ON l.location_name = m.to_location
        GROUP BY p.product_name, l.location_name
        ORDER BY p.product_name, l.location_name;
    """
    report_data = execute_query(query, fetch=True)

    output = io.StringIO()
    writer = csv.writer(output)

    # Header row
    writer.writerow(["Product", "Warehouse", "Qty"])

    # Data rows
    for row in report_data:
        writer.writerow([row["product_name"], row["warehouse"], row["qty"]])

    output.seek(0)

    return Response(
        output.getvalue(),
        mimetype="text/csv",
        headers={"Content-Disposition": "attachment; filename=balance_report.csv"},
    )
