from flask import Blueprint, jsonify, make_response, request
from app.models import db, List, Park

list_routes = Blueprint('lists', __name__)

@list_routes.route('/user/<int:user_id>')
def get_all_lists(user_id):
    lists = List.query.filter(List.user_id == user_id)
    return jsonify([list.to_JSON() for list in lists])

@list_routes.route('/<int:list_id>')
def get_park_list(list_id):
    park_list = List.query.get(list_id)
    return jsonify([park.to_JSON() for park in park_list.parks])
