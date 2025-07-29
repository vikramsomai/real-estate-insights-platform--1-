from flask import Flask, jsonify, request
from flask_cors import CORS
import json
from datetime import datetime, timedelta
import random

app = Flask(__name__)
CORS(app)

# Mock data storage
projects_data = [
    {
        "id": 1,
        "name": "Al Fozan Tower",
        "location": "Riyadh",
        "type": "Commercial",
        "status": "Active",
        "units": 120,
        "sold": 85,
        "revenue": 450.5,
        "completion": 75,
        "start_date": "2023-01-15",
        "end_date": "2025-06-30"
    },
    {
        "id": 2,
        "name": "Residential Complex A",
        "location": "Jeddah",
        "type": "Residential",
        "status": "Planning",
        "units": 200,
        "sold": 45,
        "revenue": 320.8,
        "completion": 25,
        "start_date": "2024-03-01",
        "end_date": "2026-12-15"
    },
    {
        "id": 3,
        "name": "Mixed Use Development",
        "location": "Dammam",
        "type": "Mixed",
        "status": "Active",
        "units": 150,
        "sold": 120,
        "revenue": 680.2,
        "completion": 90,
        "start_date": "2022-08-10",
        "end_date": "2024-11-20"
    }
]

competitors_data = [
    {
        "id": 1,
        "name": "Saudi Real Estate Co.",
        "market_share": 15.2,
        "projects": 8,
        "digital_score": 85,
        "location": "Riyadh"
    },
    {
        "id": 2,
        "name": "Kingdom Properties",
        "market_share": 12.8,
        "projects": 6,
        "digital_score": 78,
        "location": "Jeddah"
    },
    {
        "id": 3,
        "name": "Eastern Development",
        "market_share": 9.5,
        "projects": 4,
        "digital_score": 72,
        "location": "Dammam"
    }
]

@app.route('/api/projects', methods=['GET'])
def get_projects():
    return jsonify({
        "success": True,
        "data": projects_data,
        "total": len(projects_data)
    })

@app.route('/api/projects', methods=['POST'])
def create_project():
    data = request.get_json()
    new_project = {
        "id": len(projects_data) + 1,
        **data,
        "created_at": datetime.now().isoformat()
    }
    projects_data.append(new_project)
    return jsonify({"success": True, "data": new_project})

@app.route('/api/projects/<int:project_id>', methods=['PUT'])
def update_project(project_id):
    data = request.get_json()
    for project in projects_data:
        if project['id'] == project_id:
            project.update(data)
            return jsonify({"success": True, "data": project})
    return jsonify({"success": False, "error": "Project not found"}), 404

@app.route('/api/projects/<int:project_id>', methods=['DELETE'])
def delete_project(project_id):
    global projects_data
    projects_data = [p for p in projects_data if p['id'] != project_id]
    return jsonify({"success": True})

@app.route('/api/competitors', methods=['GET'])
def get_competitors():
    return jsonify({
        "success": True,
        "data": competitors_data,
        "total": len(competitors_data)
    })

@app.route('/api/analytics', methods=['GET'])
def get_analytics():
    total_projects = len(projects_data)
    total_revenue = sum(p['revenue'] for p in projects_data)
    total_units = sum(p['units'] for p in projects_data)
    total_units_sold = sum(p['sold'] for p in projects_data)
    sales_rate = (total_units_sold / total_units * 100) if total_units > 0 else 0
    
    # Generate monthly trends
    monthly_trends = []
    for i in range(12):
        month_date = datetime.now() - timedelta(days=30*i)
        monthly_trends.append({
            "month": month_date.strftime("%b %Y"),
            "revenue": random.uniform(50, 150),
            "sales": random.randint(10, 30),
            "projects": random.randint(1, 5)
        })
    
    # Regional performance
    regional_data = [
        {"region": "Riyadh", "projects": 5, "revenue": 450.5, "growth": 12.5},
        {"region": "Jeddah", "projects": 3, "revenue": 320.8, "growth": 8.2},
        {"region": "Dammam", "projects": 2, "revenue": 280.2, "growth": 15.1},
        {"region": "Mecca", "projects": 1, "revenue": 150.0, "growth": 5.8}
    ]
    
    return jsonify({
        "success": True,
        "data": {
            "kpis": {
                "total_projects": total_projects,
                "total_revenue": total_revenue,
                "total_units": total_units,
                "total_units_sold": total_units_sold,
                "sales_rate": sales_rate
            },
            "monthly_trends": monthly_trends,
            "regional_performance": regional_data,
            "project_types": [
                {"type": "Residential", "count": 8, "percentage": 45},
                {"type": "Commercial", "count": 6, "percentage": 35},
                {"type": "Mixed", "count": 4, "percentage": 20}
            ]
        }
    })

@app.route('/api/auth/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    
    # Demo credentials
    users = {
        'admin': {'password': 'admin123', 'role': 'admin', 'name': 'Admin User'},
        'manager': {'password': 'manager123', 'role': 'manager', 'name': 'Manager User'},
        'analyst': {'password': 'analyst123', 'role': 'analyst', 'name': 'Analyst User'}
    }
    
    if username in users and users[username]['password'] == password:
        return jsonify({
            "success": True,
            "user": {
                "username": username,
                "role": users[username]['role'],
                "name": users[username]['name']
            },
            "token": f"demo_token_{username}"
        })
    
    return jsonify({"success": False, "error": "Invalid credentials"}), 401

@app.route('/api/export', methods=['POST'])
def export_data():
    data = request.get_json()
    export_type = data.get('type', 'csv')
    
    if export_type == 'csv':
        csv_content = "ID,Name,Location,Type,Status,Units,Sold,Revenue\n"
        for project in projects_data:
            csv_content += f"{project['id']},{project['name']},{project['location']},{project['type']},{project['status']},{project['units']},{project['sold']},{project['revenue']}\n"
        
        return jsonify({
            "success": True,
            "data": csv_content,
            "filename": f"projects_export_{datetime.now().strftime('%Y%m%d')}.csv"
        })
    
    return jsonify({"success": True, "message": "Export completed"})

if __name__ == '__main__':
    print("Starting Al Fozan Insights Platform Backend...")
    print("Available endpoints:")
    print("- GET /api/projects")
    print("- POST /api/projects")
    print("- PUT /api/projects/<id>")
    print("- DELETE /api/projects/<id>")
    print("- GET /api/competitors")
    print("- GET /api/analytics")
    print("- POST /api/auth/login")
    print("- POST /api/export")
    app.run(debug=True, host='0.0.0.0', port=5000)
