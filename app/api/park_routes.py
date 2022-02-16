from flask import Blueprint, jsonify
from app.models import Park

park_routes = Blueprint('parks', __name__)

@park_routes.route('/')
def get_parks():
    return jsonify([park.to_JSON() for park in Park.query.all()])
