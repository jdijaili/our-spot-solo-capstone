from flask.cli import AppGroup

from .lists import seed_lists, undo_lists
from .users import seed_users, undo_users
from .parks import seed_parks, undo_parks

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_parks()
    seed_lists()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_parks()
    undo_lists()
    # Add other undo functions here
