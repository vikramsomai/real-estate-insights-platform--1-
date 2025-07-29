from flask import Flask, request, jsonify, send_file, session
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime, timedelta
import sqlite3
import pandas as pd
import json
import os
from io import BytesIO
import matplotlib.pyplot as plt
from reportlab.lib.pagesizes import letter, A4
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph, Spacer
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib import colors
from reportlab.lib.units import inch
import uuid

# Initialize Flask app
app = Flask(__name__)
app.config['SECRET_KEY'] = 'alfozan-insights-secret-key-2024'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///alfozan_insights.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize extensions
db = SQLAlchemy(app)
CORS(app, supports_credentials=True)

# Database Models
class Project(db.Model):
    __tablename__ = 'projects'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), nullable=False)
    type = db.Column(db.String(50), nullable=False)
    status = db.Column(db.String(50), nullable=False)
    location = db.Column(db.String(100), nullable=False)
    budget = db.Column(db.Float, nullable=False)
    progress = db.Column(db.Integer, default=0)
    units = db.Column(db.Integer, nullable=False)
    units_sold = db.Column(db.Integer, default=0)
    start_date = db.Column(db.Date)
    end_date = db.Column(db.Date)
    manager = db.Column(db.String(100))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'type': self.type,
            'status': self.status,
            'location': self.location,
            'budget': self.budget,
            'progress': self.progress,
            'units': self.units,
            'units_sold': self.units_sold,
            'start_date': self.start_date.isoformat() if self.start_date else None,
            'end_date': self.end_date.isoformat() if self.end_date else None,
            'manager': self.manager,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'sales_rate': round((self.units_sold / self.units * 100), 2) if self.units > 0 else 0
        }

class Competitor(db.Model):
    __tablename__ = 'competitors'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), nullable=False)
    market_share = db.Column(db.Float)
    digital_presence = db.Column(db.Integer)
    website = db.Column(db.String(200))
    recent_activity = db.Column(db.Text)
    trend = db.Column(db.String(20))
    change_percentage = db.Column(db.String(10))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'market_share': self.market_share,
            'digital_presence': self.digital_presence,
            'website': self.website,
            'recent_activity': self.recent_activity,
            'trend': self.trend,
            'change_percentage': self.change_percentage,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }

class Analytics(db.Model):
    __tablename__ = 'analytics'
    
    id = db.Column(db.Integer, primary_key=True)
    metric_type = db.Column(db.String(50), nullable=False)
    metric_value = db.Column(db.Float, nullable=False)
    period = db.Column(db.String(50), nullable=False)
    category = db.Column(db.String(50))
    recorded_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'metric_type': self.metric_type,
            'metric_value': self.metric_value,
            'period': self.period,
            'category': self.category,
            'recorded_at': self.recorded_at.isoformat() if self.recorded_at else None
        }

class User(db.Model):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(200), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    role = db.Column(db.String(50), default='analyst')
    department = db.Column(db.String(100))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'email': self.email,
            'name': self.name,
            'role': self.role,
            'department': self.department,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }

# ==================== AUTHENTICATION ROUTES ====================

@app.route('/api/auth/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')
        
        if not email or not password:
            return jsonify({'success': False, 'error': 'Email and password are required'}), 400
        
        user = User.query.filter_by(email=email).first()
        
        if user and check_password_hash(user.password_hash, password):
            session['user_id'] = user.id
            session['user_email'] = user.email
            
            return jsonify({
                'success': True,
                'data': {
                    'user': user.to_dict(),
                    'session_id': str(uuid.uuid4()),
                    'expires_at': (datetime.utcnow() + timedelta(hours=24)).isoformat()
                },
                'message': 'Login successful'
            })
        else:
            return jsonify({'success': False, 'error': 'Invalid email or password'}), 401
            
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/api/auth/logout', methods=['POST'])
def logout():
    session.clear()
    return jsonify({'success': True, 'message': 'Logged out successfully'})

# ==================== PROJECTS CRUD ROUTES ====================

@app.route('/api/projects', methods=['GET'])
def get_projects():
    try:
        projects = Project.query.all()
        return jsonify({
            'success': True,
            'data': [project.to_dict() for project in projects],
            'total': len(projects)
        })
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/api/projects/<int:project_id>', methods=['GET'])
def get_project(project_id):
    try:
        project = Project.query.get_or_404(project_id)
        return jsonify({
            'success': True,
            'data': project.to_dict()
        })
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/api/projects', methods=['POST'])
def create_project():
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['name', 'type', 'location', 'budget', 'units']
        for field in required_fields:
            if field not in data:
                return jsonify({'success': False, 'error': f'Missing required field: {field}'}), 400
        
        # Parse dates
        start_date = datetime.strptime(data.get('start_date'), '%Y-%m-%d').date() if data.get('start_date') else None
        end_date = datetime.strptime(data.get('end_date'), '%Y-%m-%d').date() if data.get('end_date') else None
        
        project = Project(
            name=data['name'],
            type=data['type'],
            status=data.get('status', 'Planning'),
            location=data['location'],
            budget=float(data['budget']),
            progress=int(data.get('progress', 0)),
            units=int(data['units']),
            units_sold=int(data.get('units_sold', 0)),
            start_date=start_date,
            end_date=end_date,
            manager=data.get('manager')
        )
        
        db.session.add(project)
        db.session.commit()
        
        return jsonify({
            'success': True,
            'data': project.to_dict(),
            'message': 'Project created successfully'
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/api/projects/<int:project_id>', methods=['PUT'])
def update_project(project_id):
    try:
        project = Project.query.get_or_404(project_id)
        data = request.get_json()
        
        # Update fields
        for field in ['name', 'type', 'status', 'location', 'budget', 'progress', 'units', 'units_sold', 'manager']:
            if field in data:
                if field in ['budget']:
                    setattr(project, field, float(data[field]))
                elif field in ['progress', 'units', 'units_sold']:
                    setattr(project, field, int(data[field]))
                else:
                    setattr(project, field, data[field])
        
        # Update dates
        if 'start_date' in data and data['start_date']:
            project.start_date = datetime.strptime(data['start_date'], '%Y-%m-%d').date()
        if 'end_date' in data and data['end_date']:
            project.end_date = datetime.strptime(data['end_date'], '%Y-%m-%d').date()
        
        db.session.commit()
        
        return jsonify({
            'success': True,
            'data': project.to_dict(),
            'message': 'Project updated successfully'
        })
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/api/projects/<int:project_id>', methods=['DELETE'])
def delete_project(project_id):
    try:
        project = Project.query.get_or_404(project_id)
        db.session.delete(project)
        db.session.commit()
        
        return jsonify({
            'success': True,
            'message': 'Project deleted successfully'
        })
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'success': False, 'error': str(e)}), 500

# ==================== COMPETITORS CRUD ROUTES ====================

@app.route('/api/competitors', methods=['GET'])
def get_competitors():
    try:
        competitors = Competitor.query.all()
        return jsonify({
            'success': True,
            'data': [competitor.to_dict() for competitor in competitors],
            'total': len(competitors)
        })
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/api/competitors', methods=['POST'])
def create_competitor():
    try:
        data = request.get_json()
        
        competitor = Competitor(
            name=data['name'],
            market_share=float(data.get('market_share', 0)),
            digital_presence=int(data.get('digital_presence', 0)),
            website=data.get('website'),
            recent_activity=data.get('recent_activity'),
            trend=data.get('trend', 'stable'),
            change_percentage=data.get('change_percentage', '0%')
        )
        
        db.session.add(competitor)
        db.session.commit()
        
        return jsonify({
            'success': True,
            'data': competitor.to_dict(),
            'message': 'Competitor added successfully'
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/api/competitors/<int:competitor_id>', methods=['PUT'])
def update_competitor(competitor_id):
    try:
        competitor = Competitor.query.get_or_404(competitor_id)
        data = request.get_json()
        
        for field in ['name', 'market_share', 'digital_presence', 'website', 'recent_activity', 'trend', 'change_percentage']:
            if field in data:
                if field == 'market_share':
                    setattr(competitor, field, float(data[field]))
                elif field == 'digital_presence':
                    setattr(competitor, field, int(data[field]))
                else:
                    setattr(competitor, field, data[field])
        
        db.session.commit()
        
        return jsonify({
            'success': True,
            'data': competitor.to_dict(),
            'message': 'Competitor updated successfully'
        })
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/api/competitors/<int:competitor_id>', methods=['DELETE'])
def delete_competitor(competitor_id):
    try:
        competitor = Competitor.query.get_or_404(competitor_id)
        db.session.delete(competitor)
        db.session.commit()
        
        return jsonify({
            'success': True,
            'message': 'Competitor deleted successfully'
        })
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'success': False, 'error': str(e)}), 500

# ==================== ANALYTICS ROUTES ====================

@app.route('/api/analytics', methods=['GET'])
def get_analytics():
    try:
        analytics_type = request.args.get('type')
        
        if analytics_type:
            analytics = Analytics.query.filter_by(metric_type=analytics_type).all()
        else:
            analytics = Analytics.query.all()
        
        return jsonify({
            'success': True,
            'data': [analytic.to_dict() for analytic in analytics],
            'total': len(analytics)
        })
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/api/analytics/dashboard', methods=['GET'])
def get_dashboard_analytics():
    try:
        # Get KPIs
        total_projects = Project.query.count()
        total_revenue = db.session.query(db.func.sum(Analytics.metric_value)).filter_by(metric_type='revenue').scalar() or 0
        total_units = db.session.query(db.func.sum(Project.units)).scalar() or 0
        total_units_sold = db.session.query(db.func.sum(Project.units_sold)).scalar() or 0
        
        # Get recent analytics data
        sales_data = Analytics.query.filter_by(metric_type='units_sold').order_by(Analytics.recorded_at.desc()).limit(12).all()
        revenue_data = Analytics.query.filter_by(metric_type='revenue').order_by(Analytics.recorded_at.desc()).limit(12).all()
        
        return jsonify({
            'success': True,
            'data': {
                'kpis': {
                    'total_projects': total_projects,
                    'total_revenue': total_revenue / 1000000,  # Convert to millions
                    'total_units': total_units,
                    'total_units_sold': total_units_sold,
                    'sales_rate': round((total_units_sold / total_units * 100), 2) if total_units > 0 else 0
                },
                'sales_data': [item.to_dict() for item in sales_data],
                'revenue_data': [item.to_dict() for item in revenue_data]
            }
        })
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

# ==================== REPORT GENERATION ROUTES ====================

@app.route('/api/export', methods=['POST'])
def export_report():
    try:
        data = request.get_json()
        report_format = data.get('format', 'pdf')
        report_type = data.get('reportType', 'full')
        date_range = data.get('dateRange', 'month')
        
        # Generate filename
        timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
        filename = f"alfozan_{report_type}_{date_range}_{timestamp}"
        
        if report_format == 'pdf':
            file_path = generate_pdf_report(report_type, date_range, filename)
        elif report_format == 'excel':
            file_path = generate_excel_report(report_type, date_range, filename)
        elif report_format == 'csv':
            file_path = generate_csv_report(report_type, date_range, filename)
        else:
            return jsonify({'success': False, 'error': 'Invalid format'}), 400
        
        return jsonify({
            'success': True,
            'data': {
                'filename': f"{filename}.{report_format}",
                'download_url': f"/api/download/{filename}.{report_format}",
                'file_path': file_path,
                'generated_at': datetime.now().isoformat()
            },
            'message': 'Report generated successfully'
        })
        
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/api/download/<filename>')
def download_file(filename):
    try:
        file_path = os.path.join('reports', filename)
        if os.path.exists(file_path):
            return send_file(file_path, as_attachment=True, download_name=filename)
        else:
            return jsonify({'success': False, 'error': 'File not found'}), 404
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

# ==================== REPORT GENERATION FUNCTIONS ====================

def generate_pdf_report(report_type, date_range, filename):
    """Generate PDF report"""
    os.makedirs('reports', exist_ok=True)
    file_path = f"reports/{filename}.pdf"
    
    doc = SimpleDocTemplate(file_path, pagesize=A4)
    styles = getSampleStyleSheet()
    story = []
    
    # Title
    title_style = ParagraphStyle(
        'CustomTitle',
        parent=styles['Heading1'],
        fontSize=24,
        spaceAfter=30,
        textColor=colors.HexColor('#1e40af')
    )
    story.append(Paragraph("Al Fozan Insights Platform Report", title_style))
    story.append(Spacer(1, 20))
    
    # Report Info
    info_data = [
        ['Report Type:', report_type.title()],
        ['Date Range:', date_range.title()],
        ['Generated:', datetime.now().strftime('%Y-%m-%d %H:%M:%S')],
        ['Generated By:', 'Al Fozan Analytics System']
    ]
    
    info_table = Table(info_data, colWidths=[2*inch, 3*inch])
    info_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (0, -1), colors.grey),
        ('TEXTCOLOR', (0, 0), (0, -1), colors.whitesmoke),
        ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
        ('FONTNAME', (0, 0), (-1, -1), 'Helvetica'),
        ('FONTSIZE', (0, 0), (-1, -1), 10),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 12),
        ('BACKGROUND', (1, 0), (1, -1), colors.beige),
        ('GRID', (0, 0), (-1, -1), 1, colors.black)
    ]))
    
    story.append(info_table)
    story.append(Spacer(1, 30))
    
    # Projects Data
    if report_type in ['full', 'projects']:
        story.append(Paragraph("Project Portfolio", styles['Heading2']))
        story.append(Spacer(1, 12))
        
        projects = Project.query.all()
        project_data = [['Name', 'Type', 'Status', 'Progress', 'Budget (M SAR)', 'Units Sold']]
        
        for project in projects:
            project_data.append([
                project.name[:20] + '...' if len(project.name) > 20 else project.name,
                project.type,
                project.status,
                f"{project.progress}%",
                f"{project.budget/1000000:.1f}",
                f"{project.units_sold}/{project.units}"
            ])
        
        project_table = Table(project_data, colWidths=[2*inch, 1*inch, 1*inch, 0.8*inch, 1*inch, 1*inch])
        project_table.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, 0), colors.grey),
            ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
            ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
            ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
            ('FONTSIZE', (0, 0), (-1, 0), 10),
            ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
            ('BACKGROUND', (0, 1), (-1, -1), colors.beige),
            ('GRID', (0, 0), (-1, -1), 1, colors.black)
        ]))
        
        story.append(project_table)
        story.append(Spacer(1, 30))
    
    # Competitors Data
    if report_type in ['full', 'competitors']:
        story.append(Paragraph("Competitor Analysis", styles['Heading2']))
        story.append(Spacer(1, 12))
        
        competitors = Competitor.query.all()
        competitor_data = [['Name', 'Market Share', 'Digital Presence', 'Trend', 'Change']]
        
        for competitor in competitors:
            competitor_data.append([
                competitor.name,
                f"{competitor.market_share}%",
                f"{competitor.digital_presence}%",
                competitor.trend.title(),
                competitor.change_percentage
            ])
        
        competitor_table = Table(competitor_data, colWidths=[2*inch, 1*inch, 1.2*inch, 1*inch, 1*inch])
        competitor_table.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, 0), colors.grey),
            ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
            ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
            ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
            ('FONTSIZE', (0, 0), (-1, 0), 10),
            ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
            ('BACKGROUND', (0, 1), (-1, -1), colors.beige),
            ('GRID', (0, 0), (-1, -1), 1, colors.black)
        ]))
        
        story.append(competitor_table)
    
    doc.build(story)
    return file_path

def generate_excel_report(report_type, date_range, filename):
    """Generate Excel report"""
    os.makedirs('reports', exist_ok=True)
    file_path = f"reports/{filename}.xlsx"
    
    with pd.ExcelWriter(file_path, engine='openpyxl') as writer:
        # Projects sheet
        if report_type in ['full', 'projects']:
            projects = Project.query.all()
            projects_data = []
            
            for project in projects:
                projects_data.append({
                    'Name': project.name,
                    'Type': project.type,
                    'Status': project.status,
                    'Location': project.location,
                    'Budget (SAR)': project.budget,
                    'Progress (%)': project.progress,
                    'Total Units': project.units,
                    'Units Sold': project.units_sold,
                    'Sales Rate (%)': round((project.units_sold / project.units * 100), 2) if project.units > 0 else 0,
                    'Manager': project.manager,
                    'Start Date': project.start_date,
                    'End Date': project.end_date
                })
            
            df_projects = pd.DataFrame(projects_data)
            df_projects.to_excel(writer, sheet_name='Projects', index=False)
        
        # Competitors sheet
        if report_type in ['full', 'competitors']:
            competitors = Competitor.query.all()
            competitors_data = []
            
            for competitor in competitors:
                competitors_data.append({
                    'Name': competitor.name,
                    'Market Share (%)': competitor.market_share,
                    'Digital Presence (%)': competitor.digital_presence,
                    'Website': competitor.website,
                    'Recent Activity': competitor.recent_activity,
                    'Trend': competitor.trend,
                    'Change': competitor.change_percentage
                })
            
            df_competitors = pd.DataFrame(competitors_data)
            df_competitors.to_excel(writer, sheet_name='Competitors', index=False)
        
        # Analytics sheet
        if report_type in ['full', 'analytics']:
            analytics = Analytics.query.all()
            analytics_data = []
            
            for analytic in analytics:
                analytics_data.append({
                    'Metric Type': analytic.metric_type,
                    'Value': analytic.metric_value,
                    'Period': analytic.period,
                    'Category': analytic.category,
                    'Recorded At': analytic.recorded_at
                })
            
            df_analytics = pd.DataFrame(analytics_data)
            df_analytics.to_excel(writer, sheet_name='Analytics', index=False)
    
    return file_path

def generate_csv_report(report_type, date_range, filename):
    """Generate CSV report"""
    os.makedirs('reports', exist_ok=True)
    file_path = f"reports/{filename}.csv"
    
    if report_type == 'projects':
        projects = Project.query.all()
        projects_data = []
        
        for project in projects:
            projects_data.append({
                'Name': project.name,
                'Type': project.type,
                'Status': project.status,
                'Location': project.location,
                'Budget': project.budget,
                'Progress': project.progress,
                'Units': project.units,
                'Units_Sold': project.units_sold,
                'Manager': project.manager
            })
        
        df = pd.DataFrame(projects_data)
        df.to_csv(file_path, index=False)
    
    elif report_type == 'competitors':
        competitors = Competitor.query.all()
        competitors_data = []
        
        for competitor in competitors:
            competitors_data.append({
                'Name': competitor.name,
                'Market_Share': competitor.market_share,
                'Digital_Presence': competitor.digital_presence,
                'Website': competitor.website,
                'Trend': competitor.trend,
                'Change': competitor.change_percentage
            })
        
        df = pd.DataFrame(competitors_data)
        df.to_csv(file_path, index=False)
    
    return file_path

# ==================== DATA PROCESSING ROUTES ====================

@app.route('/api/data/process', methods=['POST'])
def process_data():
    """Automated data processing and updates"""
    try:
        # Update project progress based on time elapsed
        projects = Project.query.filter_by(status='In Progress').all()
        
        for project in projects:
            if project.start_date and project.end_date:
                total_days = (project.end_date - project.start_date).days
                elapsed_days = (datetime.now().date() - project.start_date).days
                
                if total_days > 0:
                    calculated_progress = min(100, max(0, int((elapsed_days / total_days) * 100)))
                    project.progress = calculated_progress
        
        # Update analytics data
        current_month = datetime.now().strftime('%Y-%b')
        
        # Calculate monthly revenue
        monthly_revenue = db.session.query(db.func.sum(Project.budget * Project.progress / 100)).scalar() or 0
        
        # Check if analytics for current month exists
        existing_revenue = Analytics.query.filter_by(
            metric_type='revenue',
            period=current_month
        ).first()
        
        if existing_revenue:
            existing_revenue.metric_value = monthly_revenue
        else:
            new_revenue = Analytics(
                metric_type='revenue',
                metric_value=monthly_revenue,
                period=current_month,
                category='financial'
            )
            db.session.add(new_revenue)
        
        db.session.commit()
        
        return jsonify({
            'success': True,
            'message': 'Data processing completed successfully',
            'processed': {
                'projects_updated': len(projects),
                'analytics_updated': True,
                'timestamp': datetime.now().isoformat()
            }
        })
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'success': False, 'error': str(e)}), 500

# ==================== INITIALIZATION ====================

def init_database():
    """Initialize database with sample data"""
    with app.app_context():
        db.create_all()
        
        # Create sample users
        if not User.query.first():
            users_data = [
                {
                    'email': 'analyst@alfozan.com',
                    'password': 'alfozan123',
                    'name': 'Al Fozan Analyst',
                    'role': 'analyst',
                    'department': 'IT Department'
                },
                {
                    'email': 'manager@alfozan.com',
                    'password': 'manager123',
                    'name': 'Project Manager',
                    'role': 'manager',
                    'department': 'Project Management'
                },
                {
                    'email': 'admin@alfozan.com',
                    'password': 'admin123',
                    'name': 'System Administrator',
                    'role': 'admin',
                    'department': 'IT Department'
                }
            ]
            
            for user_data in users_data:
                user = User(
                    email=user_data['email'],
                    password_hash=generate_password_hash(user_data['password']),
                    name=user_data['name'],
                    role=user_data['role'],
                    department=user_data['department']
                )
                db.session.add(user)
            
            db.session.commit()
            print("✅ Sample users created")

if __name__ == '__main__':
    init_database()
    print("🚀 Al Fozan Insights Backend Server Starting...")
    print("📊 Dashboard: http://localhost:5000")
    print("🔗 API Base URL: http://localhost:5000/api")
    app.run(debug=True, host='0.0.0.0', port=5000)
