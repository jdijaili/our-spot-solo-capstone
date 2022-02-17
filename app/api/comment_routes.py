from flask import Blueprint, jsonify
from app.models import Comment

comment_routes = Blueprint('comments', __name__)


