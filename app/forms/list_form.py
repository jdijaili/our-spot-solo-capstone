from tokenize import String
from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField
from wtforms.validators import DataRequired, Length

class ListForm(FlaskForm):
    title = StringField('title', validators=[DataRequired(), Length(min=1, max=40, message='Title is too long. Please do not exceed 40 characters.')])
    description = TextAreaField('description')
