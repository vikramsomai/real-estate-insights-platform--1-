import sqlite3
import json
from datetime import datetime, timedelta
import random

# Create database connection
conn = sqlite3.connect('alfozan_insights.db')
cursor = conn.cursor()

# Create tables
def create_tables():
    print("Creating database tables...")
    
    # Projects table
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS projects (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        type TEXT NOT NULL,
        status TEXT NOT NULL,
        location TEXT NOT NULL,
        budget REAL NOT NULL,
        progress INTEGER DEFAULT 0,
        units INTEGER NOT NULL,
        units_sold INTEGER DEFAULT 0,
        start_date DATE,
        end_date DATE,
        manager TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    ''')
    
    # Competitors table
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS competitors (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        market_share REAL,
        digital_presence INTEGER,
        website TEXT,
        recent_activity TEXT,
        trend TEXT,
        change_percentage TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    ''')
    
    # Analytics table
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS analytics (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        metric_type TEXT NOT NULL,
        metric_value REAL NOT NULL,
        period TEXT NOT NULL,
        category TEXT,
        recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    ''')
    
    print("Database tables created successfully")

# Seed projects data
def seed_projects():
    print("Seeding projects data...")
    
    projects_data = [
        ('Riyadh Business District', 'Commercial', 'In Progress', 'Riyadh', 2500000000, 75, 450, 340, '2023-01-15', '2024-12-31', 'Ahmed Al-Rashid'),
        ('Jeddah Waterfront Residences', 'Residential', 'Planning', 'Jeddah', 1800000000, 25, 280, 45, '2024-03-01', '2025-06-30', 'Fatima Al-Zahra'),
        ('Dammam Industrial Complex', 'Industrial', 'Completed', 'Dammam', 3200000000, 100, 120, 120, '2022-06-01', '2024-03-31', 'Omar Al-Mutairi'),
        ('Mecca Luxury Towers', 'Residential', 'In Progress', 'Mecca', 2100000000, 60, 320, 180, '2023-08-15', '2025-02-28', 'Sarah Al-Mahmoud'),
        ('Medina Commercial Hub', 'Commercial', 'Planning', 'Medina', 1500000000, 15, 200, 25, '2024-06-01', '2025-12-31', 'Khalid Al-Otaibi')
    ]
    
    cursor.executemany('''
    INSERT INTO projects (name, type, status, location, budget, progress, units, units_sold, start_date, end_date, manager)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ''', projects_data)
    
    print("Projects data seeded successfully")

# Seed competitors data
def seed_competitors():
    print("Seeding competitors data...")
    
    competitors_data = [
        ('Emaar Properties', 28.0, 85, 'emaar.com', 'Launched new residential project in Riyadh', 'up', '+5%'),
        ('Dar Al Arkan', 22.0, 72, 'alarkan.com', 'Expanded into commercial real estate', 'up', '+3%'),
        ('Jabal Omar', 18.0, 68, 'jabalomar.com.sa', 'Completed luxury hotel project', 'down', '-2%'),
        ('Saudi Real Estate', 15.0, 61, 'saudirealestate.com', 'Partnership with international firm', 'up', '+7%'),
        ('Al Rajhi Development', 12.0, 58, 'alrajhidevelopment.com', 'New sustainable housing initiative', 'up', '+4%')
    ]
    
    cursor.executemany('''
    INSERT INTO competitors (name, market_share, digital_presence, website, recent_activity, trend, change_percentage)
    VALUES (?, ?, ?, ?, ?, ?, ?)
    ''', competitors_data)
    
    print("Competitors data seeded successfully")

# Seed analytics data
def seed_analytics():
    print("Seeding analytics data...")
    
    # Revenue data for last 12 months
    months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    
    for i, month in enumerate(months):
        # Revenue data
        revenue = random.randint(120, 200) * 1000000  # 120M to 200M SAR
        cursor.execute('''
        INSERT INTO analytics (metric_type, metric_value, period, category)
        VALUES (?, ?, ?, ?)
        ''', ('revenue', revenue, f'2024-{month}', 'financial'))
        
        # Units sold data
        units_sold = random.randint(35, 65)
        cursor.execute('''
        INSERT INTO analytics (metric_type, metric_value, period, category)
        VALUES (?, ?, ?, ?)
        ''', ('units_sold', units_sold, f'2024-{month}', 'sales'))
        
        # Market share data
        market_share_value = 17 + random.uniform(-1, 1)  # Around 17% with some variation
        cursor.execute('''
        INSERT INTO analytics (metric_type, metric_value, period, category)
        VALUES (?, ?, ?, ?)
        ''', ('market_share', market_share_value, f'2024-{month}', 'market'))
    
    print("Analytics data seeded successfully")

# Generate sample reports
def generate_reports():
    print("Generating reports...")
    
    # Project performance report
    cursor.execute('''
    SELECT 
        name,
        type,
        status,
        progress,
        (units_sold * 100.0 / units) as sales_rate,
        budget / 1000000 as budget_millions
    FROM projects
    ORDER BY progress DESC
    ''')
    
    projects = cursor.fetchall()
    
    print("\nPROJECT PERFORMANCE REPORT")
    print("=" * 60)
    print(f"{'Project Name':<25} {'Type':<12} {'Progress':<10} {'Sales Rate':<12}")
    print("-" * 60)
    
    for project in projects:
        name, proj_type, status, progress, sales_rate, budget = project
        print(f"{name[:24]:<25} {proj_type:<12} {progress}%{'':<7} {sales_rate:.1f}%{'':<8}")
    
    # Market analysis - Fixed query
    cursor.execute('''
    SELECT 
        AVG(CASE WHEN metric_type = 'market_share' THEN metric_value ELSE NULL END) as avg_market_share,
        MAX(CASE WHEN metric_type = 'revenue' THEN metric_value ELSE NULL END) as max_revenue,
        SUM(CASE WHEN metric_type = 'units_sold' THEN metric_value ELSE 0 END) as total_units_sold
    FROM analytics
    ''')
    
    market_data = cursor.fetchone()
    avg_market_share, max_revenue, total_units_sold = market_data
    
    print(f"\nMARKET ANALYSIS")
    print("=" * 40)
    if avg_market_share:
        print(f"Average Market Share: {avg_market_share:.1f}%")
    if max_revenue:
        print(f"Peak Monthly Revenue: {max_revenue/1000000:.0f}M SAR")
    if total_units_sold:
        print(f"Total Units Sold: {int(total_units_sold)}")
    
    print("\nDatabase seeded and reports generated successfully!")

# Main execution
if __name__ == "__main__":
    print("Starting Al Fozan Insights Database Setup...")
    
    try:
        create_tables()
        seed_projects()
        seed_competitors()
        seed_analytics()
        generate_reports()
        
        # Commit changes and close connection
        conn.commit()
        conn.close()
        
        print("\nDatabase setup completed successfully!")
        print("Database file: alfozan_insights.db")
        
    except Exception as e:
        print(f"Error occurred: {e}")
        conn.rollback()
        conn.close()
