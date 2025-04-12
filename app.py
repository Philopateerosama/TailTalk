from flask import Flask, render_template, send_from_directory, request, jsonify
from flask_cors import CORS
from datetime import datetime
import os

app = Flask(__name__, template_folder='.')
CORS(app)  # Enable CORS for all routes

# Sample database
pets_db = {
    'dog': {
        'vaccinations': [
            {'name': 'Rabies', 'recommended_age': '8 weeks', 'status': 'Upcoming'},
            {'name': 'DHPP (Distemper)', 'recommended_age': '6-8 weeks', 'status': 'Completed (May 12, 2023)'},
            {'name': 'Bordetella', 'recommended_age': '14 weeks', 'status': 'Upcoming'},
            {'name': 'Leptospirosis', 'recommended_age': '12 weeks', 'status': 'Pending'}
        ],
        'health_log': [
            {'date': 'May 12, 2023', 'type': 'Vaccination', 'title': 'DHPP (Distemper)', 'description': 'First dose administered by Dr. Smith at Paws & Claws Clinic'},
            {'date': 'April 28, 2023', 'type': 'Vet Visit', 'title': 'Initial Checkup', 'description': 'General health check, all normal. Weight: 3.2 kg'},
            {'date': 'April 15, 2023', 'type': 'Medication', 'title': 'Deworming', 'description': 'Drontal Puppy - 1 tablet'},
            {'date': 'March 30, 2023', 'type': 'Note', 'title': 'Adoption Day!', 'description': 'Brought home our new puppy from the shelter. Name: Max'}
        ]
    },
    'cat': {
        'vaccinations': [
            {'name': 'FVRCP', 'recommended_age': '6-8 weeks', 'status': 'Upcoming'},
            {'name': 'Rabies', 'recommended_age': '8-12 weeks', 'status': 'Pending'},
            {'name': 'FeLV', 'recommended_age': '8-12 weeks', 'status': 'Pending'},
            {'name': 'FIP', 'recommended_age': '16 weeks', 'status': 'Pending'}
        ],
        'health_log': [
            {'date': 'June 1, 2023', 'type': 'Vet Visit', 'title': 'First Checkup', 'description': 'General health check, all normal. Weight: 1.8 kg'},
            {'date': 'May 25, 2023', 'type': 'Note', 'title': 'Adoption Day', 'description': 'Adopted Luna from the local shelter'}
        ]
    },
    'rabbit': {
        'vaccinations': [
            {'name': 'Myxomatosis', 'recommended_age': '8 weeks', 'status': 'Upcoming'},
            {'name': 'RHD (VHD)', 'recommended_age': '10 weeks', 'status': 'Pending'},
            {'name': 'RHD2', 'recommended_age': '12 weeks', 'status': 'Pending'}
        ],
        'health_log': [
            {'date': 'July 10, 2023', 'type': 'Vet Visit', 'title': 'Initial Exam', 'description': 'Rabbit health check, teeth look good'},
            {'date': 'July 5, 2023', 'type': 'Note', 'title': 'New Rabbit', 'description': 'Got Thumper from a breeder'}
        ]
    },
    'bird': {
        'vaccinations': [
            {'name': 'Polyomavirus', 'recommended_age': '4 weeks', 'status': 'Completed (June 15, 2023)'},
            {'name': 'Psittacosis', 'recommended_age': '6 weeks', 'status': 'Upcoming'},
            {'name': 'Pacheco\'s Disease', 'recommended_age': '8 weeks', 'status': 'Pending'}
        ],
        'health_log': [
            {'date': 'June 15, 2023', 'type': 'Vaccination', 'title': 'Polyomavirus', 'description': 'First vaccine administered'},
            {'date': 'June 1, 2023', 'type': 'Note', 'title': 'New Parakeet', 'description': 'Brought home Blue, our new parakeet'}
        ]
    }
}

reminders_db = []

# Serve the main page
@app.route('/')
def home():
    return render_template('main.html')

# Handle login page
@app.route('/login')
def login():
    return send_from_directory('.', 'login page.html')

# Serve static files (CSS, JS, images)
@app.route('/<path:filename>')
def static_files(filename):
    return send_from_directory('.', filename)

# API endpoints
@app.route('/api/vaccinations', methods=['GET'])
def get_vaccinations():
    pet_type = request.args.get('pet_type', 'dog')
    if pet_type not in pets_db:
        return jsonify({'error': 'Invalid pet type'}), 400
    return jsonify(pets_db[pet_type]['vaccinations'])

@app.route('/api/health_log', methods=['GET'])
def get_health_log():
    pet_type = request.args.get('pet_type', 'dog')
    if pet_type not in pets_db:
        return jsonify({'error': 'Invalid pet type'}), 400
    return jsonify(pets_db[pet_type]['health_log'])

@app.route('/api/reminders', methods=['POST'])
def add_reminder():
    data = request.get_json()
    if not data:
        return jsonify({'error': 'No data provided'}), 400
    
    reminder = {
        'id': len(reminders_db) + 1,
        'created_at': datetime.now().isoformat(),
        **data
    }
    
    reminders_db.append(reminder)
    
    pets_db[data['pet_type']]['health_log'].insert(0, {
        'date': datetime.now().strftime('%B %d, %Y'),
        'type': 'Reminder',
        'title': data['name'],
        'description': f"Scheduled for {data['date']}. Notes: {data.get('notes', 'None')}"
    })
    
    return jsonify({'success': True, 'reminder': reminder}), 201

if __name__ == '__main__':
    app.run(debug=True, port=5000)