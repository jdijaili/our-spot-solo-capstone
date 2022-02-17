from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired

class Comment(FlaskForm):
    commentText = StringField('comment', validators=[DataRequired()])
