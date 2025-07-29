"""
Automated Data Processing Script for Al Fozan Insights Platform
This script handles automated data updates, calculations, and maintenance tasks
"""

import sqlite3
import pandas as pd
from datetime import datetime, timedelta
import random
import json
import schedule
import time
import logging

# Setup logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('data_processor.log'),
        logging.StreamHandler()
    ]
)

class DataProcessor:
    def __init__(self, db_path='alfozan_insights.db'):
        self.db_path = db_path
        self.logger = logging.getLogger(__name__)
    
    def get_connection(self):
        """Get database connection"""
        return sqlite3.connect(self.db_path)
    
    def update_project_progress(self):
        """Update project progress based on time elapsed and milestones"""
        try:
            conn = self.get_connection()
            cursor = conn.cursor()
            
            # Get all active projects
            cursor.execute("""
                SELECT id, name, start_date, end_date, progress, status
                FROM projects 
                WHERE status IN ('In Progress', 'Planning')
            """)
            
            projects = cursor.fetchall()
            updated_count = 0
            
            for project in projects:
                project_id, name, start_date, end_date, current_progress, status = project
                
                if start_date and end_date:
                    start = datetime.strptime(start_date, '%Y-%m-%d')
                    end = datetime.strptime(end_date, '%Y-%m-%d')
                    now = datetime.now()
                    
                    # Calculate expected progress based on time
                    total_duration = (end - start).days
                    elapsed_duration = (now - start).days
                    
                    if total_duration > 0:
                        expected_progress = min(100, max(0, int((elapsed_duration / total_duration) * 100)))
                        
                        # Add some realistic variation
                        actual_progress = expected_progress + random.randint(-5, 10)
                        actual_progress = min(100, max(0, actual_progress))
                        
                        # Update status based on progress
                        new_status = status
                        if actual_progress >= 100:
                            new_status = 'Completed'
                        elif actual_progress > 0:
                            new_status = 'In Progress'
                        
                        # Update database
                        cursor.execute("""
                            UPDATE projects 
                            SET progress = ?, status = ?
                            WHERE id = ?
                        """, (actual_progress, new_status, project_id))
                        
                        updated_count += 1
                        self.logger.info(f"Updated {name}: {current_progress}% -> {actual_progress}%")
            
            conn.commit()
            conn.close()
            
            self.logger.info(f"✅ Updated progress for {updated_count} projects")
            return updated_count
            
        except Exception as e:
            self.logger.error(f"❌ Error updating project progress: {e}")
            return 0
    
    def update_sales_data(self):
        """Update units sold based on market conditions and project progress"""
        try:
            conn = self.get_connection()
            cursor = conn.cursor()
            
            # Get projects with available units
            cursor.execute("""
                SELECT id, name, units, units_sold, progress, type
                FROM projects 
                WHERE units_sold < units AND status != 'Planning'
            """)
            
            projects = cursor.fetchall()
            updated_count = 0
            
            for project in projects:
                project_id, name, total_units, current_sold, progress, project_type = project
                available_units = total_units - current_sold
                
                if available_units > 0 and progress > 20:  # Only sell if project is progressing
                    # Calculate sales based on project type and progress
                    base_sales_rate = {
                        'Residential': 0.15,
                        'Commercial': 0.08,
                        'Industrial': 0.05
                    }.get(project_type, 0.10)
                    
                    # Adjust sales rate based on progress
                    progress_multiplier = min(2.0, progress / 50)
                    adjusted_sales_rate = base_sales_rate * progress_multiplier
                    
                    # Calculate new sales (with some randomness)
                    max_new_sales = int(available_units * adjusted_sales_rate)
                    new_sales = random.randint(0, max(1, max_new_sales))
                    
                    if new_sales > 0:
                        new_total_sold = current_sold + new_sales
                        
                        cursor.execute("""
                            UPDATE projects 
                            SET units_sold = ?
                            WHERE id = ?
                        """, (new_total_sold, project_id))
                        
                        updated_count += 1
                        self.logger.info(f"Updated sales for {name}: +{new_sales} units (Total: {new_total_sold})")
            
            conn.commit()
            conn.close()
            
            self.logger.info(f"✅ Updated sales data for {updated_count} projects")
            return updated_count
            
        except Exception as e:
            self.logger.error(f"❌ Error updating sales data: {e}")
            return 0
    
    def update_analytics_metrics(self):
        """Update analytics metrics with current data"""
        try:
            conn = self.get_connection()
            cursor = conn.cursor()
            
            current_month = datetime.now().strftime('%Y-%b')
            
            # Calculate total revenue (based on progress and budget)
            cursor.execute("""
                SELECT SUM(budget * progress / 100) as total_revenue
                FROM projects
            """)
            total_revenue = cursor.fetchone()[0] or 0
            
            # Calculate total units sold this month
            cursor.execute("""
                SELECT SUM(units_sold) as total_units_sold
                FROM projects
            """)
            total_units_sold = cursor.fetchone()[0] or 0
            
            # Update or insert revenue metric
            cursor.execute("""
                INSERT OR REPLACE INTO analytics 
                (metric_type, metric_value, period, category, recorded_at)
                VALUES (?, ?, ?, ?, ?)
            """, ('revenue', total_revenue, current_month, 'financial', datetime.now()))
            
            # Update or insert units sold metric
            cursor.execute("""
                INSERT OR REPLACE INTO analytics 
                (metric_type, metric_value, period, category, recorded_at)
                VALUES (?, ?, ?, ?, ?)
            """, ('units_sold', total_units_sold, current_month, 'sales', datetime.now()))
            
            # Calculate and update market share (simulated)
            market_share = 17 + random.uniform(-1, 1)  # Base 17% with variation
            cursor.execute("""
                INSERT OR REPLACE INTO analytics 
                (metric_type, metric_value, period, category, recorded_at)
                VALUES (?, ?, ?, ?, ?)
            """, ('market_share', market_share, current_month, 'market', datetime.now()))
            
            conn.commit()
            conn.close()
            
            self.logger.info(f"✅ Updated analytics metrics for {current_month}")
            self.logger.info(f"   Revenue: {total_revenue/1000000:.1f}M SAR")
            self.logger.info(f"   Units Sold: {total_units_sold}")
            self.logger.info(f"   Market Share: {market_share:.1f}%")
            
            return True
            
        except Exception as e:
            self.logger.error(f"❌ Error updating analytics metrics: {e}")
            return False
    
    def update_competitor_data(self):
        """Update competitor market share and digital presence"""
        try:
            conn = self.get_connection()
            cursor = conn.cursor()
            
            # Get all competitors
            cursor.execute("SELECT id, name, market_share, digital_presence FROM competitors")
            competitors = cursor.fetchall()
            
            updated_count = 0
            
            for competitor in competitors:
                comp_id, name, current_share, current_digital = competitor
                
                # Simulate market share changes (small variations)
                share_change = random.uniform(-0.5, 0.5)
                new_share = max(0, min(50, current_share + share_change))
                
                # Simulate digital presence changes
                digital_change = random.randint(-2, 3)
                new_digital = max(0, min(100, current_digital + digital_change))
                
                # Update database
                cursor.execute("""
                    UPDATE competitors 
                    SET market_share = ?, digital_presence = ?
                    WHERE id = ?
                """, (new_share, new_digital, comp_id))
                
                updated_count += 1
                self.logger.info(f"Updated {name}: Share {current_share:.1f}% -> {new_share:.1f}%")
            
            conn.commit()
            conn.close()
            
            self.logger.info(f"✅ Updated {updated_count} competitors")
            return updated_count
            
        except Exception as e:
            self.logger.error(f"❌ Error updating competitor data: {e}")
            return 0
    
    def generate_daily_report(self):
        """Generate daily summary report"""
        try:
            conn = self.get_connection()
            cursor = conn.cursor()
            
            # Get summary statistics
            cursor.execute("""
                SELECT 
                    COUNT(*) as total_projects,
                    AVG(progress) as avg_progress,
                    SUM(units_sold) as total_units_sold,
                    SUM(budget) as total_budget
                FROM projects
            """)
            
            stats = cursor.fetchone()
            total_projects, avg_progress, total_units_sold, total_budget = stats
            
            # Create report
            report = {
                'date': datetime.now().strftime('%Y-%m-%d'),
                'summary': {
                    'total_projects': total_projects,
                    'average_progress': round(avg_progress, 2) if avg_progress else 0,
                    'total_units_sold': total_units_sold or 0,
                    'total_budget': total_budget or 0
                },
                'generated_at': datetime.now().isoformat()
            }
            
            # Save report to file
            report_filename = f"daily_report_{datetime.now().strftime('%Y%m%d')}.json"
            with open(f"reports/{report_filename}", 'w') as f:
                json.dump(report, f, indent=2)
            
            conn.close()
            
            self.logger.info(f"✅ Generated daily report: {report_filename}")
            return report_filename
            
        except Exception as e:
            self.logger.error(f"❌ Error generating daily report: {e}")
            return None
    
    def run_full_update(self):
        """Run all data processing tasks"""
        self.logger.info("🚀 Starting full data processing cycle...")
        
        # Update project progress
        projects_updated = self.update_project_progress()
        
        # Update sales data
        sales_updated = self.update_sales_data()
        
        # Update analytics
        analytics_updated = self.update_analytics_metrics()
        
        # Update competitors
        competitors_updated = self.update_competitor_data()
        
        # Generate daily report
        report_generated = self.generate_daily_report()
        
        self.logger.info("✅ Full data processing cycle completed!")
        self.logger.info(f"   Projects updated: {projects_updated}")
        self.logger.info(f"   Sales updated: {sales_updated}")
        self.logger.info(f"   Analytics updated: {analytics_updated}")
        self.logger.info(f"   Competitors updated: {competitors_updated}")
        self.logger.info(f"   Report generated: {report_generated}")

def main():
    """Main function to run scheduled data processing"""
    processor = DataProcessor()
    
    # Schedule tasks
    schedule.every().hour.do(processor.update_project_progress)
    schedule.every(2).hours.do(processor.update_sales_data)
    schedule.every(4).hours.do(processor.update_analytics_metrics)
    schedule.every(6).hours.do(processor.update_competitor_data)
    schedule.every().day.at("08:00").do(processor.generate_daily_report)
    schedule.every().day.at("18:00").do(processor.run_full_update)
    
    print("🤖 Al Fozan Data Processor Started")
    print("📊 Scheduled tasks:")
    print("   - Project progress: Every hour")
    print("   - Sales data: Every 2 hours")
    print("   - Analytics: Every 4 hours")
    print("   - Competitors: Every 6 hours")
    print("   - Daily report: 8:00 AM")
    print("   - Full update: 6:00 PM")
    print("\n⏰ Running scheduled tasks...")
    
    # Run initial update
    processor.run_full_update()
    
    # Keep running scheduled tasks
    while True:
        schedule.run_pending()
        time.sleep(60)  # Check every minute

if __name__ == "__main__":
    main()
