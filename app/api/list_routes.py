from flask import Blueprint, jsonify, make_response, request
from app.models import db, List, Park
from app.seeds import lists

list_routes = Blueprint('lists', __name__)

@list_routes.route('/<int:list_id>')
def get_lists(list_id):
    print('get route')
    park_list = List.query.get(list_id)
    return jsonify([park.to_JSON() for park in park_list.parks])
