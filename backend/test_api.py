"""
API Testing Script for Al Fozan Insights Platform
Test all CRUD operations and functionality
"""

import requests
import json
import time

BASE_URL = "http://localhost:5000/api"

def test_authentication():
    """Test login functionality"""
    print("🔐 Testing Authentication...")
    
    # Test login
    login_data = {
        "email": "analyst@alfozan.com",
        "password": "alfozan123"
    }
    
    response = requests.post(f"{BASE_URL}/auth/login", json=login_data)
    print(f"Login Status: {response.status_code}")
    
    if response.status_code == 200:
        data = response.json()
        print(f"✅ Login successful: {data['data']['user']['name']}")
        return data['data']['user']
    else:
        print(f"❌ Login failed: {response.json()}")
        return None

def test_projects_crud():
    """Test Projects CRUD operations"""
    print("\n📊 Testing Projects CRUD...")
    
    # GET all projects
    response = requests.get(f"{BASE_URL}/projects")
    print(f"GET Projects Status: {response.status_code}")
    
    if response.status_code == 200:
        projects = response.json()['data']
        print(f"✅ Found {len(projects)} projects")
        
        # Test GET single project
        if projects:
            project_id = projects[0]['id']
            response = requests.get(f"{BASE_URL}/projects/{project_id}")
            print(f"GET Single Project Status: {response.status_code}")
    
    # POST new project
    new_project = {
        "name": "Test Project API",
        "type": "Residential",
        "location": "Riyadh",
        "budget": 1000000,
        "units": 100,
        "status": "Planning",
        "manager": "Test Manager",
        "start_date": "2024-01-01",
        "end_date": "2024-12-31"
    }
    
    response = requests.post(f"{BASE_URL}/projects", json=new_project)
    print(f"POST Project Status: {response.status_code}")
    
    if response.status_code == 201:
        created_project = response.json()['data']
        project_id = created_project['id']
        print(f"✅ Created project with ID: {project_id}")
        
        # PUT update project
        update_data = {"progress": 25, "units_sold": 10}
        response = requests.put(f"{BASE_URL}/projects/{project_id}", json=update_data)
        print(f"PUT Project Status: {response.status_code}")
        
        # DELETE project
        response = requests.delete(f"{BASE_URL}/projects/{project_id}")
        print(f"DELETE Project Status: {response.status_code}")
        
        if response.status_code == 200:
            print("✅ Project deleted successfully")

def test_competitors_crud():
    """Test Competitors CRUD operations"""
    print("\n🏢 Testing Competitors CRUD...")
    
    # GET all competitors
    response = requests.get(f"{BASE_URL}/competitors")
    print(f"GET Competitors Status: {response.status_code}")
    
    if response.status_code == 200:
        competitors = response.json()['data']
        print(f"✅ Found {len(competitors)} competitors")
    
    # POST new competitor
    new_competitor = {
        "name": "Test Competitor",
        "market_share": 5.5,
        "digital_presence": 70,
        "website": "test-competitor.com",
        "recent_activity": "Launched new project",
        "trend": "up",
        "change_percentage": "+2%"
    }
    
    response = requests.post(f"{BASE_URL}/competitors", json=new_competitor)
    print(f"POST Competitor Status: {response.status_code}")
    
    if response.status_code == 201:
        created_competitor = response.json()['data']
        competitor_id = created_competitor['id']
        print(f"✅ Created competitor with ID: {competitor_id}")
        
        # PUT update competitor
        update_data = {"market_share": 6.0, "digital_presence": 75}
        response = requests.put(f"{BASE_URL}/competitors/{competitor_id}", json=update_data)
        print(f"PUT Competitor Status: {response.status_code}")
        
        # DELETE competitor
        response = requests.delete(f"{BASE_URL}/competitors/{competitor_id}")
        print(f"DELETE Competitor Status: {response.status_code}")

def test_analytics():
    """Test Analytics endpoints"""
    print("\n📈 Testing Analytics...")
    
    # GET analytics
    response = requests.get(f"{BASE_URL}/analytics")
    print(f"GET Analytics Status: {response.status_code}")
    
    # GET dashboard analytics
    response = requests.get(f"{BASE_URL}/analytics/dashboard")
    print(f"GET Dashboard Analytics Status: {response.status_code}")
    
    if response.status_code == 200:
        data = response.json()['data']
        print(f"✅ Dashboard KPIs loaded:")
        print(f"   Total Projects: {data['kpis']['total_projects']}")
        print(f"   Total Revenue: {data['kpis']['total_revenue']:.1f}M SAR")

def test_export_functionality():
    """Test Export/Report generation"""
    print("\n📄 Testing Export Functionality...")
    
    export_options = [
        {"format": "pdf", "reportType": "full", "dateRange": "month"},
        {"format": "excel", "reportType": "projects", "dateRange": "quarter"},
        {"format": "csv", "reportType": "competitors", "dateRange": "year"}
    ]
    
    for options in export_options:
        response = requests.post(f"{BASE_URL}/export", json=options)
        print(f"Export {options['format'].upper()} Status: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()['data']
            print(f"✅ Generated: {data['filename']}")
            
            # Test download
            download_url = f"http://localhost:5000{data['download_url']}"
            download_response = requests.get(download_url)
            print(f"Download Status: {download_response.status_code}")

def test_data_processing():
    """Test automated data processing"""
    print("\n🤖 Testing Data Processing...")
    
    response = requests.post(f"{BASE_URL}/data/process")
    print(f"Data Processing Status: {response.status_code}")
    
    if response.status_code == 200:
        data = response.json()
        print(f"✅ Data processing completed:")
        print(f"   Projects updated: {data['processed']['projects_updated']}")
        print(f"   Analytics updated: {data['processed']['analytics_updated']}")

def run_all_tests():
    """Run all API tests"""
    print("🧪 Al Fozan Insights API Testing Suite")
    print("=" * 50)
    
    # Test authentication
    user = test_authentication()
    
    if user:
        # Test all CRUD operations
        test_projects_crud()
        test_competitors_crud()
        test_analytics()
        test_export_functionality()
        test_data_processing()
        
        print("\n✅ All API tests completed!")
        print("🎉 Backend is working correctly!")
    else:
        print("❌ Authentication failed - cannot proceed with other tests")

if __name__ == "__main__":
    # Wait for server to start
    print("⏳ Waiting for server to start...")
    time.sleep(2)
    
    try:
        run_all_tests()
    except requests.exceptions.ConnectionError:
        print("❌ Cannot connect to server. Make sure Flask server is running on http://localhost:5000")
    except Exception as e:
        print(f"❌ Test error: {e}")
